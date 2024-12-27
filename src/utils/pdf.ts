import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { ReceptionAct, Product } from "../types";
import { TEMPERATURE_OPTIONS } from "../constants/pharmacy";

export const generateReceptionActPDF = (
  act: ReceptionAct,
  products: Product[]
) => {
  const doc = new jsPDF({ orientation: "landscape", format: "letter" });
  const pageWidth = doc.internal.pageSize.width;

  // Header
  const addHeader = () => {
    doc.setFontSize(16);
    doc.text("DROGUERÍA SENA", pageWidth / 2, 20, { align: "center" });
    doc.setFontSize(14);
    doc.text(
      `ACTA DE RECEPCIÓN TÉCNICA DE ${act.tipo_acta.toUpperCase()}`,
      pageWidth / 2,
      28,
      { align: "center" }
    );
  };

  // Add Act Details
  const addActDetails = () => {
    const actDetails = [
      [
        "Fecha:",
        format(new Date(act.fecha_recepcion), "dd/MM/yyyy"),
        "Responsable:",
        act.Responsable,
      ],
      ["Factura:", act.numero_factura, "Proveedor:", act.proveedor],
    ];

    autoTable(doc, {
      startY: 35,
      head: [],
      body: actDetails,
      theme: "plain",
      styles: { fontSize: 10, cellPadding: 2 },
      columnStyles: {
        0: { fontStyle: "bold", cellWidth: 40 },
        1: { cellWidth: 70 },
        2: { fontStyle: "bold", cellWidth: 40 },
        3: { cellWidth: 70 },
      },
    });
  };

  // Define Headers Based on Act Type
  const getTableHeaders = () => {
    const commonHeaders = [
      "Presentación",
      "Laboratorio",
      "Lote",
      "Vencimiento",
      "Cantidad",
      "Temperatura",
      "Reg. INVIMA",
    ];

    switch (act?.tipo_acta) {
      case "Medicamentos":
        return ["Nombre del Medicamento", ...commonHeaders];
      case "Dispositivos_Médicos":
        return ["Nombre del Dispositivo", ...commonHeaders];
      case "Aseo":
      case "Cosméticos":
      case "Reactivos de Diagnóstico":
        return ["Marca/Nombre Comercial", ...commonHeaders];
      default:
        return ["Nombre del Producto", ...commonHeaders];
    }
  };

  // Add Table
  const addTable = () => {
    const tableHeaders = getTableHeaders();

    const tableBody = products.map((product) => {
      const productName =
        act.tipo_acta === "Medicamentos"
          ? [
              product.nombre_producto || "",
              product.forma_farmaceutica || "",
              product.concentracion || "",
            ]
              .filter(Boolean)
              .join(" - ")
          : product.nombre_producto || "";

      return [
        productName,
        product.presentacion || "N/A",
        product.laboratorio || "N/A",
        product.lote_id || "N/A",
        product.fecha_vencimiento
          ? format(new Date(product.fecha_vencimiento), "dd/MM/yyyy")
          : "Sin Fecha",
        product.cantidad_recibida || "0",
        product.temperatura_id
          ? TEMPERATURE_OPTIONS[product.temperatura_id]?.label || "Ambiente"
          : "Ambiente",
        product.registro_sanitario || "N/A",
      ];
    });

    autoTable(doc, {
      startY: doc.lastAutoTable?.finalY + 6 || 42,
      head: [tableHeaders],
      body: tableBody,
      headStyles: { fillColor: [40, 167, 69] },
      styles: { fontSize: 8, cellPadding: 2 },
      columnStyles: {
        0: { cellWidth: 55 },
        1: { cellWidth: 30 },
        2: { cellWidth: 30 },
        3: { cellWidth: 30 },
        4: { cellWidth: 25 },
        5: { cellWidth: 20 },
        6: { cellWidth: 30 },
        7: { cellWidth: 32 },
      },
      didDrawPage: (data) => {
        // Handle Footer for Pagination
        addFooter(doc.internal.getNumberOfPages());
      },
    });
  };

  // Add Observations
  const addObservations = (yPosition: number) => {
    if (act.observaciones) {
      doc.setFontSize(10);
      doc.text("Observaciones:", 15, yPosition);
      doc.setFontSize(9);
      const splitObservations = doc.splitTextToSize(
        act.observaciones,
        pageWidth - 25
      );
      doc.text(splitObservations, 14, yPosition + 6);
    }
  };

  // Add Signatures
  const addSignatures = (yPosition: number) => {
    const signY = yPosition + 15;
    doc.line(50, signY, 110, signY);
    doc.line(170, signY, 230, signY);
    doc.setFontSize(10);
    doc.text("Responsable de Recepción", 60, signY + 5);
    doc.text("Regente de Farmacia", 180, signY + 5);
  };

  // Footer
  const addFooter = () => {
    const totalPages = doc.internal.getNumberOfPages();

    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i); // Ir a cada página
      doc.setFontSize(7);

      // Fecha de generación
      doc.text(
        `Fecha de generación: ${format(new Date(), "dd/MM/yyyy HH:mm", {
          locale: es,
        })}`,
        14,
        doc.internal.pageSize.height - 5
      );

      // Número de página con formato "Página X de Y"
      doc.text(
        `Página ${i} de ${totalPages}`,
        pageWidth - 20,
        doc.internal.pageSize.height - 5,
        { align: "right" }
      );
    }
  };

  // Generate PDF
  addHeader();
  addActDetails();
  addTable();

  // Check if Observations and Signatures Fit
  const currentY = doc.lastAutoTable.finalY + 10;
  if (currentY + 40 > doc.internal.pageSize.height) {
    doc.addPage();
    addObservations(40);
    addSignatures(70);
  } else {
    addObservations(currentY);
    addSignatures(currentY + 20);
  }

  addFooter();

  return doc;
};
