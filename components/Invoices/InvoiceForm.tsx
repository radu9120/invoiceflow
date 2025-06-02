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
import InvoiceItems from "./InvoiceItems";
import { Textarea } from "../ui/textarea";
import { createInvoice } from "@/lib/actions/invoice.actions";
import { formSchema } from "@/schemas/invoiceSchema";
import { redirect } from "next/navigation"


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

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const invoice = await createInvoice(values)

        if (invoice) {
            redirect(`/invoices/${invoice.id}`)
        } else {
            console.log('Failed to create an invoice')
            redirect(`/dashboard`)
        }
    }

    const today = new Date();
    
    return(
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 lg:max-w-4xl w-full  bg-white p-4 border border-gray-200 shadow-2xl mx-auto rounded-xl">
                
                <div className="flex items-center justify-between p-6 border-b border-blue-100">
                    <div>
                        <h2 className="text-2xl font-bold text-header-text">
                            Invoice
                        </h2>
                        <FormField
                            control={form.control}
                            name="invoice_number"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Invoice number</FormLabel>
                                    <FormControl>
                                        <Input placeholder="ex: INV001" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <p className="text-secondary-text">
                            Make changes to your invoice
                        </p>
                    </div>
                    
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        {/* Client Information */}
                        <div>
                            <h3 className="text-lg font-semibold text-header-text mb-4">
                                Client Information
                            </h3>
                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="bill_to.name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="block text-sm font-medium text-secondary-text mb-1">Client Name</FormLabel>
                                            <FormControl>
                                                <Input className="w-full" {...field} />
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
                                            <FormLabel className="block text-sm font-medium text-secondary-text mb-1">Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="email@company.com" {...field} />
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
                                            <FormLabel className="block text-sm font-medium text-secondary-text mb-1">Phone</FormLabel>
                                            <FormControl>
                                                <Input placeholder="+44 1234 567890" {...field} />
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
                                            <FormLabel className="block text-sm font-medium text-secondary-text mb-1">Address</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="123 Business Street" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        {/* Invoice Information */}
                        <div>
                            <h3 className="text-lg font-semibold text-header-text mb-4">
                                Invoice Details
                            </h3>
                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="block text-sm font-medium text-secondary-text mb-1">Description</FormLabel>
                                            <FormControl>
                                                <Input className="w-full" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="date"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="block text-sm font-medium text-secondary-text mb-1">Issue Date</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="date"
                                                        className="w-full"
                                                        value={field.value ? field.value.toISOString().split('T')[0] : ''}
                                                        onChange={e => field.onChange(new Date(e.target.value))}
                                                        onBlur={field.onBlur}
                                                        name={field.name}
                                                        ref={field.ref}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="due_date"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="block text-sm font-medium text-secondary-text mb-1">Due Date</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="date"
                                                        className="w-full"
                                                        value={field.value ? field.value.toISOString().split('T')[0] : ''}
                                                        onChange={e => field.onChange(new Date(e.target.value))}
                                                        onBlur={field.onBlur}
                                                        name={field.name}
                                                        ref={field.ref}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>                                
                            </div>
                        </div>
                    </div>
                    <div className="mb-8">
                        <FormField
                            control={form.control}
                            name="items"
                            render={() => (
                                <FormItem>
                                    <FormControl>
                                        <InvoiceItems />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                {/* Notes */}
                <div className="mb-8">
                    <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Notes</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Add any additional notes or payment terms..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}

export default InvoiceForm;