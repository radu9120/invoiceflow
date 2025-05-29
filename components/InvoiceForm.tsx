import { useForm } from "react-hook-form";
import { z } from "zod";
import { minLength } from "zod/v4";


const modulesSchema = z.object({
    description: z.string().min(1, {message: 'Item description is required'}),
    unit_price: z.coerce.number().min(1, {message: 'Price per unit is required'}),
    quantity: z.coerce.number().min(1, {message: 'Quantity is required'}),
    amount: z.coerce.number().min(1, {message: 'Ammount is required'}),
})

const formSchema = z.object({
    invoice_number: z.string().min(1, {message: 'Invoice number is required.'}),
    company_details: z.string().min(1, {message: 'Company details is required.'}),
    bill_to: z.string().min(1, {message: 'Invoice number is required.'}),
    date: z.string().min(1, {message: 'Invoice number is required.'}),
    due_date: z.string().min(1, {message: 'Invoice number is required.'}),
    items: z.array(modulesSchema).min(1, {message: 'Min 1 item is required.'}),
    subtotal: z.coerce.number(),
    tax: z.coerce.number().optional(),
    discount: z.coerce.number().optional(),
    shipping: z.coerce.number().optional(),
    total: z.coerce.number(),
    notes: z.string().min(1, {message: 'Invoice number is required.'}),
    bank_details: z.string().min(1, {message: 'Invoice number is required.'}),
    logo: z.string().min(1, {message: 'Invoice number is required.'}),
})

const InvoiceForm = () => {
    const form = useForm<z.infer<typeof formSchema>>

    return(
        <div></div>
    )
}

export default InvoiceForm;