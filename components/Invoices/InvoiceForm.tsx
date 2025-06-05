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
import { useForm, useWatch } from "react-hook-form";
import InvoiceItems from "./InvoiceItems";
import { Textarea } from "../ui/textarea";
import { createInvoice } from "@/lib/actions/invoice.actions";
import { CreateBusiness, formSchema } from "@/schemas/invoiceSchema";
import { redirect } from "next/navigation"
import { useEffect } from "react";


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
            discount: 0,
            shipping: 0,
            total: 0,
            notes: '',
            bank_details: '',
            currency: 'British pound',
        }
    })

    const items = useWatch({ control: form.control, name: "items" });
    const discount = Number(useWatch({ control: form.control, name: "discount" })) || 0;
    const shipping = Number(useWatch({ control: form.control, name: "shipping" })) || 0;
    const total = Number(useWatch({ control: form.control, name: "total" })) || 0;


    // Automatically calculate totals
    useEffect(() => {
        const subtotal = items?.reduce((sum, item) => {
            const quantity = item.amount || 0;
            return sum + quantity;
        }, 0) || 0;

        const discountAmount = subtotal * (discount / 100);
        const total = subtotal - discountAmount + shipping;

        // Keep form values in sync (optional – for submission)
        form.setValue("subtotal", subtotal);
        form.setValue("total", total);

    }, [items, discount, shipping]);

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
            <form onSubmit={form.handleSubmit(onSubmit)} >

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-8">
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
                                        <FormLabel className="block text-sm font-medium text-secondary-text ">Client Name</FormLabel>
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
                                        <FormLabel className="block text-sm font-medium text-secondary-text ">Email</FormLabel>
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
                                        <FormLabel className="block text-sm font-medium text-secondary-text ">Phone</FormLabel>
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
                                        <FormLabel className="block text-sm font-medium text-secondary-text ">Address</FormLabel>
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
                                name="invoice_number"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="block text-sm font-medium text-secondary-text ">Invoice number</FormLabel>
                                        <FormControl>
                                            <Input placeholder="ex: INV001" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="block text-sm font-medium text-secondary-text ">Description</FormLabel>
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
                                            <FormLabel className="block text-sm font-medium text-secondary-text ">Issue Date</FormLabel>
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
                                            <FormLabel className="block text-sm font-medium text-secondary-text ">Due Date</FormLabel>
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
                <div className="flex justify-end ">
                    <div className="flex flex-col gap-4 w-40">
                        <FormField
                            control={form.control}
                            name="total"
                            render={({ field }) => (
                            <FormItem className="px-2 bg-blue-50 py-2 border border-blue-100  rounded-xl">
                                <FormLabel className="block text-sm font-medium text-secondary-text ">Sub Total</FormLabel>
                                <FormControl>
                                    <span>{total.toFixed(2)}</span>
                                {/* <Input
                                    type="number"
                                    readOnly
                                    className="bg-gray-100"
                                    value={field.value.toFixed(2)}
                                /> */}
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        {/* Shipping */}
                        <FormField
                            control={form.control}
                            name="shipping"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel className="block text-sm font-medium text-secondary-text ">
                                    Shipping (£)
                                </FormLabel>
                                <FormControl>
                                    <Input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    placeholder="e.g. 15.99"
                                    {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />


                        {/* Discount */}
                        <FormField
                            control={form.control}
                            name="discount"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel className="block text-sm font-medium text-secondary-text ">
                                    Discount (%)
                                </FormLabel>
                                <FormControl>
                                    <Input
                                    type="number"
                                    min="0"
                                    max="100"
                                    step="0.01"
                                    placeholder="e.g. 10"
                                    {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />


                        {/* Total (readonly) */}
                        <FormField
                            control={form.control}
                            name="total"
                            render={({ field }) => (
                            <FormItem className="px-2 bg-blue-50 py-2 border border-blue-100  rounded-xl">
                                <FormLabel className="block text-sm font-medium text-secondary-text ">Total Amount</FormLabel>
                                <FormControl>
                                    <span>{total.toFixed(2)}</span>
                                {/* <Input
                                    type="number"
                                    readOnly
                                    className="bg-gray-100"
                                    value={field.value.toFixed(2)}
                                /> */}
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
                                    <Textarea placeholder="Add any additional notes, bank details, or payment terms..." {...field} />
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