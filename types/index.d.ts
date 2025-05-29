interface CreateInvoiceHistory {
    created_at: string;
    user_id: string;
    invoice_number: string;
    company_details: string;
    bill_to: string;
    date: string;
    due_date: string;
    items: InvoiceItems[];
    subtotal: string;
    tax?: string;
    discount?: string;
    shipping?: string;
    total: string;
    notes: string;
    bank_details: string;
    logo: string;

}

interface InvoiceItems {
    description: string;
    unit_price: string;
    quantity: string;
    amount: string;
}