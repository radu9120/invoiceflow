import { notFound } from "next/navigation";
import { getInvoicesByAuthor } from "@/lib/actions/invoice.actions";
import { getBusinessById } from "@/lib/actions/business.actions";
import InvoiceSuccessView from "@/components/Invoices/InvoiceSuccessView";

interface PageProps {
  searchParams: {
    business_id?: string;
    invoice_id?: string;
  };
}

export default async function InvoiceSuccessPage({ searchParams }: PageProps) {
  const { business_id, invoice_id } = searchParams;

  if (!business_id || !invoice_id) {
    notFound();
  }

  try {
    const [allInvoices, businessData] = await Promise.all([
      getInvoicesByAuthor(),
      getBusinessById(Number(business_id)),
    ]);

    const invoice = allInvoices.find(
      (inv) => String(inv.id) === String(invoice_id)
    );

    if (!invoice || !businessData) {
      notFound();
    }

    return <InvoiceSuccessView invoice={invoice} company={businessData} />;
  } catch (error) {
    console.error("Error fetching invoice:", error);
    notFound();
  }
}
