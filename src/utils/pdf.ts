import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { ReceptionAct, Product } from "../types";
import { TEMPERATURE_OPTIONS } from "../constants/pharmacy";

export const generateReceptionActPDF = (
  act: ReceptionAct,
  products: Product[]
) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;

  // Header
  doc.setFontSize(16);
  doc.text("DROGUERÍA SENA", pageWidth / 2, 20, { align: "center" });
  doc.setFontSize(14);
  doc.text(
    `ACTA DE RECEPCIÓN TÉCNICA DE ${act.tipo_acta.toUpperCase()}`,
    pageWidth / 2,
    30,
    { align: "center" }
  );

  // Act Details
  const actDetails = [
    [
      "Fecha:",
      format(new Date(act.fecha_recepcion), "dd/MM/yyyy"),
      "Ciudad:",
      act.ciudad,
    ],
    ["Factura:", act.numero_factura, "Proveedor:", act.proveedor],
    ["Responsable:", act.responsable],
  ];

  autoTable(doc, {
    startY: 40,
    head: [],
    body: actDetails,
    theme: "plain",
    styles: { fontSize: 10, cellPadding: 2 },
    columnStyles: {
      0: { fontStyle: "bold", cellWidth: 30 },
      1: { cellWidth: 50 },
      2: { fontStyle: "bold", cellWidth: 30 },
      3: { cellWidth: 50 },
    },
  });

  // Products Table
  const tableHeaders = [
    "Producto",
    "Presentación",
    "Lote",
    "Vencimiento",
    "Cantidad",
    "Temperatura",
    "Reg. INVIMA",
  ];

  const tableBody = products.map((product) => [
    `${product.nombre_producto}\n${product.laboratorio}`,
    product.presentacion,
    product.lote_id,
    format(new Date(product.fecha_vencimiento), "dd/MM/yyyy"),
    product.cantidad_recibida,
    product.temperatura_id
      ? TEMPERATURE_OPTIONS[product.temperatura_id]?.label || "Ambiente"
      : "Ambiente",
    product.registro_sanitario,
  ]);

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 10,
    head: [tableHeaders],
    body: tableBody,
    headStyles: { fillColor: [40, 167, 69] },
    styles: { fontSize: 8, cellPadding: 2 },
    columnStyles: {
      0: { cellWidth: 50 },
      1: { cellWidth: 30 },
      2: { cellWidth: 20 },
      3: { cellWidth: 25 },
      4: { cellWidth: 20 },
      5: { cellWidth: 25 },
      6: { cellWidth: 20 },
    },
  });

  // Observations
  if (act.observaciones) {
    doc.setFontSize(10);
    doc.text("Observaciones:", 14, doc.lastAutoTable.finalY + 20);
    doc.setFontSize(9);
    const splitObservations = doc.splitTextToSize(
      act.observaciones,
      pageWidth - 28
    );
    doc.text(splitObservations, 14, doc.lastAutoTable.finalY + 25);
  }

  // Signatures
  const signY = doc.lastAutoTable.finalY + (act.observaciones ? 45 : 30);
  doc.line(20, signY, 90, signY);
  doc.line(120, signY, 190, signY);
  doc.setFontSize(10);
  doc.text("Responsable de Recepción", 30, signY + 5);
  doc.text("Regente de Farmacia", 140, signY + 5);

  // Footer
  doc.setFontSize(8);
  doc.text(
    `Fecha de generación: ${format(new Date(), "dd/MM/yyyy HH:mm", {
      locale: es,
    })}`,
    14,
    280
  );
  doc.text(`Página 1 de 1`, pageWidth - 20, 280, { align: "right" });

  return doc;
};
