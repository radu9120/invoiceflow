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
import { CreateBusiness, CreateClient, formSchema } from "@/schemas/invoiceSchema";
import { redirect } from "next/navigation"
import { useEffect } from "react";
import { BusinessType, ClientType } from "@/types";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import Link from "next/link";
import CustomButton from '../ui/CustomButton';


const InvoiceForm = ({
    company_data,
    client_data,
    clients,
}:{
    company_data: BusinessType;
    client_data?: ClientType ;
    clients?: ClientType[]
}) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            invoice_number: 'INV0001',
            company_details: company_data
            // {
            //     name: '',
            //     email: '',
            //     address: '',
            //     phone: '',
            //     vat: undefined,
            // }
            ,
            bill_to: client_data,
            issue_date: new Date(), // or '2025-06-01' (ISO string)
            due_date: new Date(), // or some other default
            items: [{
                    description: '',
                    unit_price: 0,
                    quantity: 0,
                    tax: 0 ,
                    amount: 0,
            }],
            description: '',
            subtotal: 0,
            discount: 0,
            shipping: 0,
            total: 0,
            notes: '',
            bank_details: '',
            currency: 'British pound',
            client_id: client_data?.id || undefined,
        }
    })

    const items = useWatch({ control: form.control, name: "items" });
    const discount = Number(useWatch({ control: form.control, name: "discount" })) || 0;
    const shipping = Number(useWatch({ control: form.control, name: "shipping" })) || 0;
    const total = Number(useWatch({ control: form.control, name: "total" })) || 0;
    const bill_to = useWatch({ control: form.control, name: "bill_to" })


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
        console.log("Submitting invoice with values:", values)
        const invoice = await createInvoice(values)

        if (invoice) {
            redirect(`/invoices/${invoice.id}`)
        } else {
            console.log('Failed to create an invoice')
            redirect(`/dashboard`)
        }
    }

    const today = new Date();

    console.log(form.formState.errors);

    
    return(
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} >

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-8">
                    {/* Client Information */}
                    <div>
                        <h3 className="text-lg font-semibold text-header-text mb-4">
                            Client Information
                        </h3>
                        {client_data ? (
                            <div className="space-y-4">
                                <div className="">
                                    <p>
                                        <span className="block text-sm font-medium text-secondary-text ">Name:</span>                                        
                                        {client_data.name}
                                    </p>
                                </div>
                                <div className="">
                                    <p>
                                        <span className="block text-sm font-medium text-secondary-text ">Email:</span>                                        
                                        {client_data.email}
                                    </p>
                                </div>
                                <div className="">
                                    <p>
                                        <span className="block text-sm font-medium text-secondary-text ">Phone:</span>                                        
                                        {client_data.phone}
                                    </p>
                                </div>
                                <div className="">
                                    <p>
                                        <span className="block text-sm font-medium text-secondary-text ">Address:</span>                                        
                                        {client_data.address}
                                    </p>
                                </div>
                                
                            </div>
                        ): clients && clients.length > 0 ? (
                            <div>
                                <FormField
                                    control={form.control}
                                    name="client_id"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel className="block text-sm font-medium text-secondary-text">
                                            Select Client
                                        </FormLabel>
                                        <FormControl>
                                            <Select
                                            onValueChange={(value) => {
                                                const selectedClient = clients.find((client) => client.id === Number(value));
                                                if (selectedClient) {
                                                form.setValue("client_id", selectedClient.id);
                                                form.setValue("bill_to", {
                                                    name: selectedClient.name,
                                                    email: selectedClient.email,
                                                    address: selectedClient.address,
                                                    phone: selectedClient.phone,
                                                    id: selectedClient.id,
                                                    business_id: selectedClient.business_id,
                                                });
                                                }
                                                field.onChange(Number(value));
                                            }}
                                            defaultValue={String(field.value)} // ensure it's a string
                                            >
                                            <SelectTrigger className="w-full" />
                                            <SelectContent>
                                                {clients.map((client) => (
                                                <SelectItem key={client.id} value={String(client.id)}>
                                                    {client.name} — {client.email}
                                                </SelectItem>
                                                ))}
                                            </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {bill_to && (
                                    <div className="space-y-4">
                                        <div className="">
                                            <p>
                                                <span className="block text-sm font-medium text-secondary-text ">Name:</span>                                        
                                                {bill_to.name}
                                            </p>
                                        </div>
                                        <div className="">
                                            <p>
                                                <span className="block text-sm font-medium text-secondary-text ">Email:</span>                                        
                                                {bill_to.email}
                                            </p>
                                        </div>
                                        <div className="">
                                            <p>
                                                <span className="block text-sm font-medium text-secondary-text ">Phone:</span>                                        
                                                {bill_to.phone}
                                            </p>
                                        </div>
                                        <div className="">
                                            <p>
                                                <span className="block text-sm font-medium text-secondary-text ">Address:</span>                                        
                                                {bill_to.address}
                                            </p>
                                        </div>
                                        
                                    </div>
                                )}
                            </div>
                        ):(
                            <div className="text-sm text-muted-foreground">
                                <p>No clients found for this business.</p>
                                <Button variant="link" className="px-0 mt-2" asChild>
                                    <Link href={`/dashboard/${company_data.id}/clients`}>+ Create a new client</Link>
                                </Button>
                            </div>
                        )}
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
                                    name="issue_date"
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
                <div className="flex w-full gap-6">
                    <div className="flex-1 space-y-6 ">
                        {/* bank details */}
                        <div className="">
                            <FormField
                                control={form.control}
                                name="bank_details"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Bank details</FormLabel>
                                        <FormControl>
                                            <Textarea className="min-h-32" placeholder="Bank details or payment method" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Notes */}
                        <div className="">
                            <FormField
                                control={form.control}
                                name="notes"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Notes</FormLabel>
                                        <FormControl>
                                            <Textarea className="min-h-28" placeholder="Add any additional notes or payment terms..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
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

                <CustomButton type="submit" label={"Submit"}  variant={"primary"}/>
            </form>
        </Form>
    )
}

export default InvoiceForm;