"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { companySchema } from "@/schemas/invoiceSchema";
import BusinessForm from "./BusinessForm";
import { useEffect, useState } from "react";
import { BusinessType } from "@/types";
import { getBusinessById, updateBusiness } from "@/lib/actions/business.actions";
import { redirect } from "next/navigation";


type CompanyFormData = z.infer<typeof companySchema>
export const UpdateBusiness = ({ businessId }: { businessId: number }) => {

    const userPlan = "free"; // This should be fetched from user context or state

    const [business, setBusiness] = useState<BusinessType | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBusinessData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const fetchedBusiness = await getBusinessById(businessId); // Call your Supabase fetch function
                if (fetchedBusiness) {
                setBusiness(fetchedBusiness);
                } else {
                setError("Business not found.");
                }
            } catch (err) {
                console.error("Failed to fetch business:", err);
                setError("Failed to load business data. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };

        if (businessId) {
            fetchBusinessData();
        }
    }, [businessId]); // Re-run effect if businessId changes

    const form = useForm<z.infer<typeof companySchema>>({
        resolver: zodResolver(companySchema),
        defaultValues: {
            name: "",
            email: "",
            address: "",
            phone: "",
            vat: undefined,
            logo: '',
            },
        values: business ? { // Use `values` to reset the form when `business` changes
            name: business.name,
            email: business.email,
            address: business.address,
            phone: business.phone,
            vat: business.vat,
            logo: business.logo,
        } : undefined,
        mode: "onChange",
            // Add `mode: "onChange"` or `reValidateMode: "onChange"` if you want validation to occur as user types
    });

    // Reset the form with fetched data once `business` state updates
    useEffect(() => {
        if (business) {
            // This is crucial to initialize the form with the fetched data
            // and establish the "original" state for dirty fields tracking.
            form.reset({
                name: business.name,
                email: business.email,
                address: business.address,
                phone: business.phone,
                vat: business.vat,
                // For logo, we assume it's a URL in DB. We don't populate the file input value.
                // If you later handle logo upload, you'd send the new File or its URL.
                logo: undefined,
            });
        }
    }, [business, form]);

    const handleUpdateSubmit = async (values: CompanyFormData) => {
        if (!business) {
            console.error("No business data available to update.");
            setError("Cannot update: Business data not loaded.");
            return;
        }

        // Get the fields that have been changed from their initial values
        const dirtyFields = form.formState.dirtyFields;
        const formValues = form.getValues(); // Get the latest current values from the form

        // Initialize payload with its correct type.
        // We'll build this object with only the truly changed fields.
        const payload: Partial<CompanyFormData> = {};

        // Iterate over the keys of the form data
        // We use `Object.keys(dirtyFields)` to iterate only over fields that were actually modified.
        for (const key of Object.keys(dirtyFields) as Array<keyof CompanyFormData>) {
            // TypeScript should correctly infer `key` as a valid key of `CompanyFormData` here.

            if (key === 'logo') {
                payload.logo = formValues.logo;
            } else if (key === 'vat') {
                // VAT: Handles `number` or `undefined` directly.
                // `formValues.vat` will already be `number | undefined` as per your `BusinessForm`'s `onChange`.
                // The `dirtyFields` ensures we only send it if it was changed.
                payload.vat = formValues.vat;
            
            } else {
                // For all other fields that are dirty, assign their current value from the form
                // This assignment should now be correctly typed as `payload[key]` (which is `CompanyFormData[key] | undefined`)
                // is assigned `formValues[key]` (which is `CompanyFormData[key] | undefined`).
                payload[key] = formValues[key];
            }
        }


        if (Object.keys(payload).length === 0) {
            console.log("No changes detected. Not submitting update.");
            // Optionally, show a toast/notification to the user
            return;
        }

        try {
            const updated = await updateBusiness(business.id, payload);

            if (updated) {
                console.log("Business updated successfully!", updated);
                redirect(`/dashboard/business?business_id=${updated.id}&name=${updated.name}`);
            } else {
                console.error("Failed to update business: No data returned.");
                setError("Failed to update business. Please try again.");
            }
        } catch (err) {
            console.error("Error during business update:", err);
            setError("An error occurred during update: " + (err as Error).message);
        }
    };

    

    if (isLoading) {
        return (
            <div className="space-y-4 p-4">
                Loading...
            </div>
        );
    }

    if (error) {
        return
    }

    if (!business) {
        // This case should ideally be covered by `error` state, but as a fallback:
        return (
            <div className="text-center p-4 text-gray-500">
                No business data available for update.
            </div>
        );
    }

    return <BusinessForm form={form} onSubmit={handleUpdateSubmit} submitButtonText="Update Business"/>
};
