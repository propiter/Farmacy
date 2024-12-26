import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Product } from "../types";
import { getExpirationStatus } from "./inventory";

export const generateInventoryReport = (inventory: Product[]) => {
  const doc = new jsPDF();

  // Header
  doc.setFontSize(20);
  doc.text("Droguería SENA", 105, 15, { align: "center" });
  doc.setFontSize(16);
  doc.text("Reporte de Inventario", 105, 25, { align: "center" });
  doc.setFontSize(10);
  doc.text(`Fecha: ${format(new Date(), "PPP", { locale: es })}`, 105, 35, {
    align: "center",
  });

  // Table
  const tableHeaders = [
    "Nombre",
    "Laboratorio",
    "Lote",
    "Stock",
    "Vencimiento",
    "Estado",
  ];

  const tableBody = inventory.map((product) => [
    product.name,
    product.laboratory,
    product.lote,
    product.stock,
    format(new Date(product.expirationDate), "dd/MM/yyyy"),
    getExpirationStatus(product.expirationDate) === "danger"
      ? "Crítico"
      : getExpirationStatus(product.expirationDate) === "warning"
      ? "Alerta"
      : "Normal",
  ]);

  autoTable(doc, {
    head: [tableHeaders],
    body: tableBody,
    startY: 45,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [40, 167, 69] },
    didDrawPage: (data) => {
      doc.setFontSize(8);
      doc.text(
        `Página ${data.pageNumber} de ${doc.getNumberOfPages()}`,
        doc.internal.pageSize.width - 20,
        doc.internal.pageSize.height - 10
      );
    },
  });

  doc.save("inventario-drogueria-sena.pdf");
};
