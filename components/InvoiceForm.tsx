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

const phoneType = z.string().regex(/^\+?[0-9\s-]{7,15}$/, "Invalid phone number").optional()

const itemSchema = z.object({
    description: z.string().min(1, {message: 'Item description is required'}),
    unit_price: z.coerce.number().min(1, {message: 'Price per unit is required'}),
    quantity: z.coerce.number().min(1, {message: 'Quantity is required'}),
    tax: z.coerce.number().optional(),
    amount: z.coerce.number().min(1, {message: 'Ammount is required'}),
})

const companySchema = z.object({
    name: z.string().min(1, {message: 'Name is required'}),
    email: z.string().regex(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Invalid email format"
    ),
    address: z.string().min(1, {message: 'Quantity is required'}),
    phone: phoneType,
    vat: z.coerce.number().optional(),
})

const billToSchema = z.object({
    name: z.string().min(1, {message: 'Name is required'}),
    email: z.string().regex(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Invalid email format"
    ),
    address: z.string().min(1, {message: 'Quantity is required'}),
    phone: phoneType,
})



const formSchema = z.object({
    invoice_number: z.string().min(1, {message: 'Invoice number is required.'}),
    company_details: companySchema,
    bill_to: billToSchema,
    date: z.coerce.date({ required_error: 'Invoice date is required.' }),
    due_date: z.coerce.date({ required_error: 'Due date is required.' }),
    items: z.array(itemSchema).min(1, {message: 'Min 1 item is required.'}),
    subtotal: z.coerce.number(),
    discount: z.coerce.number().optional(),
    shipping: z.coerce.number().optional(),
    total: z.coerce.number(),
    notes: z.string().min(1, { message: 'Notes are required.' }),
    bank_details: z.string().min(1, { message: 'Bank details are required.' }),
    logo: z.string().min(1, { message: 'Logo is required.' }),
    currency: z.string().min(1, { message: 'Logo is required.' }),
})

const InvoiceForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            invoice_number: 'INV0001',
            company_details: {
                name: '',
                email: '',
                address: '',
                phone: '',
                vat: undefined,
            },
            bill_to: {
                name: '',
                email: '',
                address: '',
                phone: '',
            },
            date: new Date(), // or '2025-06-01' (ISO string)
            due_date: new Date(), // or some other default
            items: [{
                    description: '',
                    unit_price: 0,
                    quantity: 0,
                    amount: 0,
            }],
            subtotal: 0,
            discount: undefined,
            shipping: undefined,
            total: 0,
            notes: '',
            bank_details: '',
            logo: '',
            currency: 'British pound'
        }
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values)
    }

    return(
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="invoice_number"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public display name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}

export default InvoiceForm;