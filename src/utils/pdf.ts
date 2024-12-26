import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { ReceptionAct } from "../types";
import { ACT_TYPES } from "../constants/actTypes";
import { FIELDS_BY_TYPE } from "../constants/formFields";

export const generateReceptionActPDF = (act: ReceptionAct) => {
  const doc = new jsPDF("landscape", "mm", "letter");
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;

  const actTypeName = ACT_TYPES[act.actType];

  // Helper para formato seguro de fecha
  const safeFormatDate = (date: string) => {
    try {
      return format(new Date(date), "PPP", { locale: es });
    } catch (error) {
      return "Fecha no válida";
    }
  };

  // Función para dibujar el Header
  const drawHeader = () => {
    doc.setFontSize(20);
    doc.text("Droguería SENA", pageWidth / 2, 15, { align: "center" });
    doc.setFontSize(16);
    doc.text(`Acta de Recepción Tecnica De ${actTypeName}`, pageWidth / 2, 25, {
      align: "center",
    });
  };

  const drawActDetails = () => {
    const combinedDetails = [
      [
        "Fecha de Recepción:",
        safeFormatDate(act.receptionDate),
        "Factura de Compra:",
        act.purchaseInvoice,
      ],
      ["Responsable:", act.responsible, "Proveedor:", act.provider],
    ];

    autoTable(doc, {
      theme: "plain",
      startY: 40,
      styles: { fontSize: 10 },
      columnStyles: {
        0: { cellWidth: 50, fontStyle: "bold" },
        1: { cellWidth: 80 },
        2: { cellWidth: 50, fontStyle: "bold" },
        3: { cellWidth: 80 },
      },
      body: combinedDetails,
      margin: { left: 20 },
    });
  };

  // Dibujar la tabla de productos con campos dinámicos
  const drawProductsTable = () => {
    const fields = FIELDS_BY_TYPE[act.actType];
    const tableHeaders = fields.map((field) => field.label);

    const tableBody = act.products.map((product) =>
      fields.map((field) => product[field.name])
    );

    autoTable(doc, {
      head: [tableHeaders],
      body: tableBody,
      startY: 65,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [40, 167, 69] },
      didDrawPage: (data) => {
        drawHeader();
        doc.setFontSize(8);
        doc.text(
          `Página ${data.pageNumber} de ${doc.getNumberOfPages()}`,
          pageWidth - 50,
          pageHeight - 10
        );
      },
    });
  };

  const drawSignatures = () => {
    const finalY = doc.lastAutoTable.finalY + 20;

    if (finalY + 40 > pageHeight) {
      doc.addPage();
      drawHeader();
    }

    doc.line(50, finalY + 30, 110, finalY + 30);
    doc.line(160, finalY + 30, 220, finalY + 30);
    doc.setFontSize(10);
    doc.text("Responsable", 70, finalY + 35);
    doc.text("Regente", 180, finalY + 35);
  };

  drawHeader();
  drawActDetails();
  drawProductsTable();
  drawSignatures();

  const fileName = `acta-recepcion-${actTypeName.toLowerCase()}-${act.id}.pdf`;
  return { doc, fileName };
};
