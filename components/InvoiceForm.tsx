"use client";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useForm } from "react-hook-form";

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

    const today = new Date();
    
    return(
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 lg:w-2/3 mx-auto">
                <div className="grid grid-cols-2">
                    <div className="space-y-4 w-[300px]">
                        
                        <FormField
                            control={form.control}
                            name="logo"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input className="w-[150px] h-[100px]" type="file" placeholder="Add your logo" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <h2>FROM</h2>
                        <FormField
                            control={form.control}
                            name="company_details.name"
                            render={({ field }) => (
                                <FormItem>
                                    
                                    <FormControl>
                                        <Input placeholder="Company/Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="company_details.email"
                            render={({ field }) => (
                                <FormItem>
                                    
                                    <FormControl>
                                        <Input placeholder="email@company.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="company_details.address"
                            render={({ field }) => (
                                <FormItem>
                                    
                                    <FormControl>
                                        <Input placeholder="123 Business Street" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="company_details.phone"
                            render={({ field }) => (
                                <FormItem>
                                    
                                    <FormControl>
                                        <Input placeholder="+44 1234 567890" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="company_details.vat"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>VAT Number</FormLabel>
                                    <FormControl>
                                        <Input placeholder="123456789" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    
                    <div className="flex justify-end ">
                        <div className="w-[300px] space-y-6  ">
                            <h2 className="text-4xl">Invoice</h2>
                            <FormField
                                control={form.control}
                                name="invoice_number"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Invoice number</FormLabel>
                                        <FormControl>
                                            <Input placeholder="shadcn" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        
                    </div>
                </div>
                <div className="grid grid-cols-2">
                    <div className="space-y-4 w-[300px]">
                        <h2>BILL TO</h2>
                        <FormField
                            control={form.control}
                            name="bill_to.name"
                            render={({ field }) => (
                                <FormItem>
                                    
                                    <FormControl>
                                        <Input placeholder="Company/Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="bill_to.email"
                            render={({ field }) => (
                                <FormItem>
                                    
                                    <FormControl>
                                        <Input placeholder="email@company.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="bill_to.address"
                            render={({ field }) => (
                                <FormItem>
                                    
                                    <FormControl>
                                        <Input placeholder="123 Business Street" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="bill_to.phone"
                            render={({ field }) => (
                                <FormItem>
                                    
                                    <FormControl>
                                        <Input placeholder="+44 1234 567890" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="space-y-4 w-[300px]">
                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Date</FormLabel>
                                    <FormControl>
                                        {/* <Input type="date" placeholder='date' {...field} /> */}
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Date</FormLabel>
                                    <FormControl>
                                        {/* <Input type="date" placeholder='date' {...field} /> */}
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}

export default InvoiceForm;