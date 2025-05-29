import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"


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
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
                invoice_number: '',
                company_details: '<p></p>',
                bill_to: '<p></p>',
                date: '',
                due_date: '',
                items: [{
                        description: '',
                        unit_price: 0,
                        quantity: 0,
                        amount: 0,
                }],
                subtotal: 0,
                tax: undefined,
                discount: undefined,
                shipping: undefined,
                total: 0,
                notes: '<p></p>',
                bank_details: '<p></p>',
                logo: '',
        }
    })

    return(
        <div></div>
    )
}

export default InvoiceForm;