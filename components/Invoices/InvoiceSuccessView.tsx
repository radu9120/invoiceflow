"use client";
import { CheckCircle, Download, ArrowLeft, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import CustomButton from "@/components/ui/CustomButton";
import Link from "next/link";
import jsPDF from "jspdf";

export default function InvoiceSuccessView({
  invoice,
  company,
}: {
  invoice: any;
  company: any;
}) {
  // Parse items safely
  let items: any[] = [];
  try {
    if (Array.isArray(invoice.items)) {
      items = invoice.items;
    } else if (typeof invoice.items === "string") {
      items = JSON.parse(invoice.items);
    } else if (invoice.items && typeof invoice.items === "object") {
      items = Object.values(invoice.items);
    }
  } catch (error) {
    console.error("Error parsing items:", error);
    items = [];
  }

  // Parse bill_to safely
  let billTo = null;
  try {
    if (typeof invoice.bill_to === "string") {
      billTo = JSON.parse(invoice.bill_to);
    } else if (invoice.bill_to && typeof invoice.bill_to === "object") {
      billTo = invoice.bill_to;
    }
  } catch (error) {
    console.error("Error parsing bill_to:", error);
    billTo = null;
  }

  const downloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;

    // Company Header Section (matching success view)
    doc.setFontSize(22);
    doc.setTextColor(37, 99, 235); // Blue-600
    doc.text(company.name || "Company Name", 20, 25);

    doc.setFontSize(10);
    doc.setTextColor(75, 85, 99); // Gray-600
    doc.text(company.email || "No email provided", 20, 35);
    doc.text(company.phone || "No phone provided", 20, 40);
    doc.text(company.address || "No address provided", 20, 45);

    // Invoice Title and Details Box (right side)
    doc.setFontSize(32);
    doc.setTextColor(31, 41, 55); // Gray-800
    doc.text("INVOICE", pageWidth - 70, 30);

    // Invoice details box (matching success view)
    doc.setFillColor(249, 250, 251); // Gray-50
    doc.rect(pageWidth - 85, 35, 75, 25, "F");
    doc.setDrawColor(229, 231, 235); // Gray-200
    doc.rect(pageWidth - 85, 35, 75, 25, "S");

    doc.setFontSize(9);
    doc.setTextColor(55, 65, 81); // Gray-700
    doc.text(
      `Invoice #: ${invoice.invoice_number || "N/A"}`,
      pageWidth - 82,
      42
    );
    doc.text(
      `Issue Date: ${new Date(invoice.issue_date).toLocaleDateString()}`,
      pageWidth - 82,
      48
    );
    doc.text(
      `Due Date: ${new Date(invoice.due_date).toLocaleDateString()}`,
      pageWidth - 82,
      54
    );

    // Bill To Section (matching success view with blue background)
    let yPos = 75;
    doc.setFontSize(14);
    doc.setTextColor(31, 41, 55); // Gray-800
    doc.text("Bill To:", 20, yPos);

    // Add underline
    doc.setDrawColor(229, 231, 235);
    doc.line(20, yPos + 2, 60, yPos + 2);

    yPos += 10;

    if (billTo) {
      // Blue background box for client info
      doc.setFillColor(239, 246, 255); // Blue-50
      doc.setDrawColor(191, 219, 254); // Blue-200
      doc.rect(20, yPos - 3, 100, 25, "FD");

      doc.setFontSize(11);
      doc.setTextColor(31, 41, 55); // Gray-800
      doc.text(billTo.name || "No name", 23, yPos + 3);

      doc.setFontSize(10);
      doc.setTextColor(75, 85, 99); // Gray-600
      doc.text(billTo.email || "No email", 23, yPos + 9);
      doc.text(billTo.phone || "No phone", 23, yPos + 15);
      doc.text(billTo.address || "No address", 23, yPos + 21);

      yPos += 35;
    } else {
      // Gray background for no client info
      doc.setFillColor(249, 250, 251); // Gray-50
      doc.setDrawColor(229, 231, 235); // Gray-200
      doc.rect(20, yPos - 3, 100, 15, "FD");

      doc.setFontSize(10);
      doc.setTextColor(107, 114, 128); // Gray-500
      doc.text("No client information available", 23, yPos + 5);

      yPos += 25;
    }

    // Description Section (if exists)
    if (invoice.description) {
      doc.setFontSize(14);
      doc.setTextColor(31, 41, 55); // Gray-800
      doc.text("Description:", 20, yPos);

      // Add underline
      doc.setDrawColor(229, 231, 235);
      doc.line(20, yPos + 2, 70, yPos + 2);

      yPos += 10;

      // Description box
      doc.setFillColor(249, 250, 251); // Gray-50
      doc.setDrawColor(229, 231, 235); // Gray-200
      doc.rect(20, yPos - 3, pageWidth - 40, 15, "FD");

      doc.setFontSize(10);
      doc.setTextColor(75, 85, 99); // Gray-700
      doc.text(invoice.description, 23, yPos + 5);

      yPos += 25;
    }

    // Items Section Header
    doc.setFontSize(14);
    doc.setTextColor(31, 41, 55); // Gray-800
    doc.text("Items:", 20, yPos);

    // Add underline
    doc.setDrawColor(229, 231, 235);
    doc.line(20, yPos + 2, 50, yPos + 2);

    yPos += 15;

    // Items Table (matching success view exactly)
    const tableStartY = yPos;
    const colWidths = [60, 20, 30, 20, 30]; // Adjusted widths
    const colPositions = [20, 80, 100, 130, 150];

    // Table header
    doc.setFillColor(243, 244, 246); // Gray-100
    doc.rect(20, yPos - 3, pageWidth - 40, 12, "F");

    // Header borders
    doc.setDrawColor(209, 213, 219); // Gray-300
    doc.rect(20, yPos - 3, pageWidth - 40, 12, "S");

    // Vertical lines for columns
    colPositions.slice(1).forEach((pos) => {
      doc.line(pos, yPos - 3, pos, yPos + 9);
    });

    doc.setFontSize(10);
    doc.setTextColor(31, 41, 55); // Gray-800
    doc.text("Description", 23, yPos + 4);
    doc.text("Qty", 85, yPos + 4);
    doc.text("Unit Price", 103, yPos + 4);
    doc.text("Tax", 135, yPos + 4);
    doc.text("Amount", 155, yPos + 4);

    yPos += 12;

    // Table rows
    if (items.length > 0) {
      items.forEach((item: any, index: number) => {
        // Row background (alternating)
        if (index % 2 === 1) {
          doc.setFillColor(249, 250, 251); // Gray-50
          doc.rect(20, yPos - 3, pageWidth - 40, 10, "F");
        }

        // Row borders
        doc.setDrawColor(209, 213, 219); // Gray-300
        doc.rect(20, yPos - 3, pageWidth - 40, 10, "S");

        // Vertical lines
        colPositions.slice(1).forEach((pos) => {
          doc.line(pos, yPos - 3, pos, yPos + 7);
        });

        doc.setFontSize(9);
        doc.setTextColor(31, 41, 55); // Gray-800
        doc.text(item.description || "No description", 23, yPos + 2);
        doc.text(String(item.quantity || 0), 85, yPos + 2);
        doc.text(`£${(item.unit_price || 0).toFixed(2)}`, 103, yPos + 2);
        doc.text(`${item.tax || 0}%`, 135, yPos + 2);

        doc.setFont(undefined, "bold");
        doc.text(`£${(item.amount || 0).toFixed(2)}`, 155, yPos + 2);
        doc.setFont(undefined, "normal");

        yPos += 10;
      });
    } else {
      // No items row
      doc.setDrawColor(209, 213, 219); // Gray-300
      doc.rect(20, yPos - 3, pageWidth - 40, 15, "S");

      doc.setFontSize(10);
      doc.setTextColor(107, 114, 128); // Gray-500
      doc.text("No items found", pageWidth / 2, yPos + 5, { align: "center" });

      yPos += 15;
    }

    yPos += 15;

    // Bottom Section Layout (matching success view)
    const leftColumnWidth = (pageWidth - 60) * 0.65;
    const rightColumnX = 20 + leftColumnWidth + 20;
    const rightColumnWidth = 60;

    // Bank Details (left side)
    if (invoice.bank_details) {
      doc.setFontSize(14);
      doc.setTextColor(31, 41, 55); // Gray-800
      doc.text("Bank Details:", 20, yPos);

      // Add underline
      doc.setDrawColor(229, 231, 235);
      doc.line(20, yPos + 2, 70, yPos + 2);

      yPos += 10;

      // Bank details box
      doc.setFillColor(249, 250, 251); // Gray-50
      doc.setDrawColor(229, 231, 235); // Gray-200
      doc.rect(20, yPos - 3, leftColumnWidth, 25, "FD");

      doc.setFontSize(9);
      doc.setTextColor(75, 85, 99); // Gray-700
      const bankLines = invoice.bank_details.split("\n");
      bankLines.forEach((line: string, index: number) => {
        doc.text(line, 23, yPos + 3 + index * 5);
      });
    }

    // Notes (left side, below bank details)
    let notesY = yPos + 35;
    if (invoice.notes) {
      doc.setFontSize(14);
      doc.setTextColor(31, 41, 55); // Gray-800
      doc.text("Notes:", 20, notesY);

      // Add underline
      doc.setDrawColor(229, 231, 235);
      doc.line(20, notesY + 2, 50, notesY + 2);

      notesY += 10;

      // Notes box
      doc.setFillColor(249, 250, 251); // Gray-50
      doc.setDrawColor(229, 231, 235); // Gray-200
      doc.rect(20, notesY - 3, leftColumnWidth, 20, "FD");

      doc.setFontSize(9);
      doc.setTextColor(75, 85, 99); // Gray-700
      const noteLines = invoice.notes.split("\n");
      noteLines.forEach((line: string, index: number) => {
        doc.text(line, 23, notesY + 3 + index * 5);
      });
    }

    // Totals Section (right side - matching success view exactly)
    let totalsY = yPos;

    // Subtotal box (blue background)
    doc.setFillColor(239, 246, 255); // Blue-50
    doc.setDrawColor(191, 219, 254); // Blue-200
    doc.roundedRect(
      rightColumnX,
      totalsY - 3,
      rightColumnWidth,
      15,
      3,
      3,
      "FD"
    );

    doc.setFontSize(9);
    doc.setTextColor(75, 85, 99); // Gray-600
    doc.text("Sub Total", rightColumnX + 3, totalsY + 2);

    doc.setFontSize(12);
    doc.setFont(undefined, "bold");
    doc.setTextColor(31, 41, 55); // Gray-800
    doc.text(
      `£${(invoice.subtotal || 0).toFixed(2)}`,
      rightColumnX + 3,
      totalsY + 8
    );
    doc.setFont(undefined, "normal");

    totalsY += 20;

    // Shipping
    doc.setFontSize(9);
    doc.setTextColor(75, 85, 99); // Gray-600
    doc.text("Shipping (£)", rightColumnX + 3, totalsY);

    doc.setFillColor(249, 250, 251); // Gray-50
    doc.setDrawColor(229, 231, 235); // Gray-200
    doc.rect(rightColumnX, totalsY + 2, rightColumnWidth, 8, "FD");

    doc.setFontSize(9);
    doc.setTextColor(31, 41, 55); // Gray-800
    doc.text(
      `£${(invoice.shipping || 0).toFixed(2)}`,
      rightColumnX + 3,
      totalsY + 7
    );

    totalsY += 15;

    // Discount
    doc.setFontSize(9);
    doc.setTextColor(75, 85, 99); // Gray-600
    doc.text("Discount (%)", rightColumnX + 3, totalsY);

    doc.setFillColor(249, 250, 251); // Gray-50
    doc.setDrawColor(229, 231, 235); // Gray-200
    doc.rect(rightColumnX, totalsY + 2, rightColumnWidth, 8, "FD");

    doc.setFontSize(9);
    doc.setTextColor(31, 41, 55); // Gray-800
    doc.text(`${invoice.discount || 0}%`, rightColumnX + 3, totalsY + 7);

    totalsY += 15;

    // Total Amount box (blue background, larger)
    doc.setFillColor(239, 246, 255); // Blue-50
    doc.setDrawColor(191, 219, 254); // Blue-200
    doc.roundedRect(
      rightColumnX,
      totalsY - 3,
      rightColumnWidth,
      15,
      3,
      3,
      "FD"
    );

    doc.setFontSize(9);
    doc.setTextColor(75, 85, 99); // Gray-600
    doc.text("Total Amount", rightColumnX + 3, totalsY + 2);

    doc.setFontSize(14);
    doc.setFont(undefined, "bold");
    doc.setTextColor(29, 78, 216); // Blue-700
    doc.text(
      `£${(invoice.total || 0).toFixed(2)}`,
      rightColumnX + 3,
      totalsY + 9
    );
    doc.setFont(undefined, "normal");

    // Save the PDF
    doc.save(`Invoice-${invoice.invoice_number || "unnamed"}.pdf`);
  };

  return (
    <main className="relative w-full min-h-[100vh]">
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-white z-0" />
      <div className="absolute top-20 right-10 md:right-40 w-64 md:w-96 h-64 md:h-96 rounded-full bg-green-100/40 mix-blend-multiply blur-3xl"></div>

      <div className="relative z-10 max-w-5xl mx-auto p-6 space-y-6">
        {/* Success Header */}
        <Card className="bg-green-50 border-green-200 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <CheckCircle className="h-12 w-12 text-green-600" />
              <div>
                <h1 className="text-2xl font-bold text-green-800">
                  Invoice Created Successfully!
                </h1>
                <p className="text-green-600">
                  Invoice #{invoice.invoice_number || "N/A"} has been saved and
                  is ready to use.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Invoice Preview - Matching InvoiceForm structure exactly */}
        <Card className="shadow-2xl">
          <CardHeader className="bg-gray-50 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Invoice Preview
              </h2>
              <Button
                onClick={downloadPDF}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-8 bg-white">
            {/* Matching InvoiceForm structure: Client Information and Invoice Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-8">
              {/* Client Information */}
              <div>
                <h3 className="text-lg font-semibold text-header-text mb-4">
                  Client Information
                </h3>
                {billTo ? (
                  <div className="space-y-4">
                    <div className="">
                      <p>
                        <span className="block text-sm font-medium text-secondary-text">
                          Name:
                        </span>
                        {billTo.name || "No name"}
                      </p>
                    </div>
                    <div className="">
                      <p>
                        <span className="block text-sm font-medium text-secondary-text">
                          Email:
                        </span>
                        {billTo.email || "No email"}
                      </p>
                    </div>
                    <div className="">
                      <p>
                        <span className="block text-sm font-medium text-secondary-text">
                          Phone:
                        </span>
                        {billTo.phone || "No phone"}
                      </p>
                    </div>
                    <div className="">
                      <p>
                        <span className="block text-sm font-medium text-secondary-text">
                          Address:
                        </span>
                        {billTo.address || "No address"}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground">
                    <p>No client information available</p>
                  </div>
                )}
              </div>

              {/* Invoice Information */}
              <div>
                <h3 className="text-lg font-semibold text-header-text mb-4">
                  Invoice Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <span className="block text-sm font-medium text-secondary-text">
                      Invoice number
                    </span>
                    <p className="mt-1 p-2 bg-gray-50 border rounded">
                      {invoice.invoice_number || "N/A"}
                    </p>
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-secondary-text">
                      Description
                    </span>
                    <p className="mt-1 p-2 bg-gray-50 border rounded">
                      {invoice.description || "No description"}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="block text-sm font-medium text-secondary-text">
                        Issue Date
                      </span>
                      <p className="mt-1 p-2 bg-gray-50 border rounded text-sm">
                        {new Date(invoice.issue_date).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <span className="block text-sm font-medium text-secondary-text">
                        Due Date
                      </span>
                      <p className="mt-1 p-2 bg-gray-50 border rounded text-sm">
                        {new Date(invoice.due_date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Items Table - Matching InvoiceForm structure */}
            <div className="mb-8">
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                        Description
                      </th>
                      <th className="border border-gray-300 px-4 py-3 text-center font-semibold">
                        Qty
                      </th>
                      <th className="border border-gray-300 px-4 py-3 text-right font-semibold">
                        Unit Price
                      </th>
                      <th className="border border-gray-300 px-4 py-3 text-center font-semibold">
                        Tax
                      </th>
                      <th className="border border-gray-300 px-4 py-3 text-right font-semibold">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.length > 0 ? (
                      items.map((item: any, index: number) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="border border-gray-300 px-4 py-3">
                            {item.description || "No description"}
                          </td>
                          <td className="border border-gray-300 px-4 py-3 text-center">
                            {item.quantity || 0}
                          </td>
                          <td className="border border-gray-300 px-4 py-3 text-right">
                            £{(item.unit_price || 0).toFixed(2)}
                          </td>
                          <td className="border border-gray-300 px-4 py-3 text-center">
                            {item.tax || 0}%
                          </td>
                          <td className="border border-gray-300 px-4 py-3 text-right font-medium">
                            £{(item.amount || 0).toFixed(2)}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={5}
                          className="border border-gray-300 px-4 py-3 text-center text-gray-500"
                        >
                          No items found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bottom Section - Matching InvoiceForm structure exactly */}
            <div className="flex w-full gap-6">
              <div className="flex-1 space-y-6">
                {/* Bank details */}
                <div className="">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bank details
                  </label>
                  <div className="min-h-32 p-3 bg-gray-50 border rounded-md">
                    <p className="text-gray-700 whitespace-pre-line">
                      {invoice.bank_details || "No bank details provided"}
                    </p>
                  </div>
                </div>

                {/* Notes */}
                <div className="">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes
                  </label>
                  <div className="min-h-28 p-3 bg-gray-50 border rounded-md">
                    <p className="text-gray-700 whitespace-pre-line">
                      {invoice.notes || "No additional notes"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Totals Section - Matching InvoiceForm structure exactly */}
              <div className="flex flex-col gap-4 w-40">
                <div className="px-2 bg-blue-50 py-2 border border-blue-100 rounded-xl">
                  <label className="block text-sm font-medium text-secondary-text">
                    Sub Total
                  </label>
                  <span className="text-lg font-semibold">
                    £{(invoice.subtotal || 0).toFixed(2)}
                  </span>
                </div>

                {/* Shipping */}
                <div>
                  <label className="block text-sm font-medium text-secondary-text">
                    Shipping (£)
                  </label>
                  <div className="mt-1 p-2 bg-gray-50 border rounded text-sm">
                    £{(invoice.shipping || 0).toFixed(2)}
                  </div>
                </div>

                {/* Discount */}
                <div>
                  <label className="block text-sm font-medium text-secondary-text">
                    Discount (%)
                  </label>
                  <div className="mt-1 p-2 bg-gray-50 border rounded text-sm">
                    {invoice.discount || 0}%
                  </div>
                </div>

                {/* Total */}
                <div className="px-2 bg-blue-50 py-2 border border-blue-100 rounded-xl">
                  <label className="block text-sm font-medium text-secondary-text">
                    Total Amount
                  </label>
                  <span className="text-lg font-semibold">
                    £{(invoice.total || 0).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center pt-4">
          <Link href={`/dashboard?business_id=${company.id}`}>
            <CustomButton
              label="Back to Dashboard"
              icon={ArrowLeft}
              variant="secondary"
            />
          </Link>
          <Link href={`/dashboard/invoices?business_id=${company.id}`}>
            <CustomButton label="View All Invoices" variant="primary" />
          </Link>
        </div>
      </div>
    </main>
  );
}
