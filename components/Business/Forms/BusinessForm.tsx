"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { Textarea } from "../../ui/textarea";
import { Plus } from "lucide-react";
import { companySchema } from "@/schemas/invoiceSchema";
import { createBusiness } from "@/lib/actions/business.actions";
import { redirect } from "next/navigation";

export default function BusinessForm({
    form,
    onSubmit,
    submitButtonText = 'Submit',
    onFileChange
}: {
    form: UseFormReturn<z.infer<typeof companySchema>>;
    onSubmit: (values: z.infer<typeof companySchema>) => Promise<void>; // Expects an async function
    submitButtonText?: string; // Optional custom text for the submit button
    onFileChange: (file: File | null) => void;
}) {

    const userPlan = 'free'

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel className="block text-sm font-medium text-secondary-text ">Company/Name</FormLabel>
                            <FormControl>
                            <Input placeholder="Company/Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel className="block text-sm font-medium text-secondary-text ">Email</FormLabel>
                            <FormControl>
                            <Input placeholder="Email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel className="block text-sm font-medium text-secondary-text ">Phone</FormLabel>
                            <FormControl>
                            <Input placeholder="Phone" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="vat"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel className="block text-sm font-medium text-secondary-text ">Vat</FormLabel>
                            <FormControl>
                            <Input placeholder="VAT" type="number" {...field} value={field.value ?? ""} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="block text-sm font-medium text-secondary-text ">Address</FormLabel>
                        <FormControl>
                            <Textarea placeholder="Address" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="logo"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="block text-sm font-medium text-secondary-text ">Logo</FormLabel>
                        <FormControl>
                            <Input
                            type="file"
                            accept="image/*"
                            max={1}
                            onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                    onFileChange(e.target.files[0])
                                    field.onChange('')
                                } else {
                                    onFileChange(null); // No file selected, clear the state in parent
                                    field.onChange(''); // Clear the form's 'logo' field
                                }
                            }}
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="space-y-6">
                    {/* Free Plan Warning */}
                    {/* {userPlan === "free" && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                        <div className="flex items-start gap-3">
                            <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                            <div>
                            <h4 className="font-medium text-red-800 mb-1">
                                Company Limit Reached
                            </h4>
                            <p className="text-sm text-red-700">
                                Free plan allows only 1 company. Upgrade to Pro to create
                                unlimited companies.
                            </p>
                            </div>
                        </div>
                        </div>
                    )} */}

                    <div className="bg-blue-50 rounded-lg p-4 ">
                        <h4 className="font-medium text-primary mb-2">
                            {userPlan === "free"
                                ? "Free Plan Includes:"
                                : "Pro Plan Includes:"}
                        </h4>
                        <ul className="text-sm text-secondary-text space-y-1">
                            {userPlan === "free" ? (
                                <>
                                <li>• 1 company</li>
                                <li>• Up to 1 invoice</li>
                                <li>• Basic client management</li>
                                <li>• Email support</li>
                                </>
                            ) : (
                                <>
                                <li>• Unlimited companies</li>
                                <li>• Unlimited invoices</li>
                                <li>• Advanced client management</li>
                                <li>• Priority support</li>
                                </>
                            )}
                        </ul>
                    </div>

                    <div className="flex gap-3">
                        <Button
                        variant="secondary"
                        //   onClick={() => setIsNewCompanyModalOpen(false)}
                        className="flex-1 border-blue-200"
                        >
                        Cancel
                        </Button>
                        {/* {userPlan === "free" && companies.length >= 1 ? (
                        <Button className="flex-1 bg-gradient-to-r from-primary to-accent text-white">
                            <Crown className="h-4 w-4 mr-2" />
                            Upgrade to Pro
                        </Button>
                        ) : ( */}
                        <Button
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-primary to-accent text-white w-full"
                        disabled={!form.formState.isValid || form.formState.isSubmitting}
                        >
                        <Plus className="h-4 w-4 mr-2" />
                            {submitButtonText}
                        </Button>
                        {/* )} */}
                    </div>
                </div>
            </form>
        </Form>
    )
}
