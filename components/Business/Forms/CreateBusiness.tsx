"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { companySchema } from "@/schemas/invoiceSchema";
import BusinessForm from "./BusinessForm";
import { createBusiness } from "@/lib/actions/business.actions";
import { useState } from "react";
import { uploadFileAndGetUrl } from "@/lib/actions/logo.action";

export const CreateBusiness = () => {
  const userPlan = "free"; // This should be fetched from user context or state
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // New state to hold the selected File object
  const [isUploading, setIsUploading] = useState(false); // New loading state for the upload process

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
  });

  const handleCreateSubmit = async (values: z.infer<typeof companySchema>) => {
    setIsUploading(true);
    try {
      let logoUrl: string = '';
      
      if (selectedFile) {
        console.log("Uploading selected logo file...");
        // Call the server action to upload the file to Supabase Storage
        // The 'business-logos' string is the folder name in your Supabase bucket
        logoUrl = await uploadFileAndGetUrl(selectedFile);  
      } else if (values.logo && typeof values.logo === 'string') {
        // If no new file was selected but the form already has a logo string (e.g., for edits),
        // use the existing logo URL.
        logoUrl = values.logo;
      }

      const finalValues = {
        ...values,
        logo: logoUrl,
      };
      const business = await createBusiness(finalValues);

      if (business) {
        console.log('success, created business with logo', business)
          // redirect(`/dashboard/business?business_id=${business.id}&name=${business.name}`);
      } else {
          console.log("Failed to create a business");
          // redirect(`/dashboard`);
      }
    } catch (error: any) {
      console.error("Error during logo upload or business creation:", error);
      // Provide user feedback about the error
      alert(`Error: ${error.message || "Something went wrong during business creation."}`);
      // redirect(`/dashboard?error=${encodeURIComponent(error.message || "failed_to_create_business")}`);
    } finally {
      setIsUploading(false); // Stop loading indicator
    }
  }
  

  return <BusinessForm form={form} onSubmit={handleCreateSubmit} submitButtonText="Create Business" onFileChange={setSelectedFile} />
};
