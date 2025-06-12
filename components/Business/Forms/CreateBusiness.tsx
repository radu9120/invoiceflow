"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { companySchema } from "@/schemas/invoiceSchema"; // Adjust path as needed
import BusinessForm from "./BusinessForm"; // Adjust path as needed
import { createBusiness as createBusinessAction } from "@/lib/actions/business.actions"; // Adjust path
import { useState } from "react";
import { uploadFileAndGetUrl } from "@/lib/actions/logo.action"; // Adjust path
import { useRouter } from "next/navigation"; // Import useRouter

interface CreateBusinessProps {
  closeModal?: () => void; // Optional prop to close the modal
  onSuccess?: () => void; // Optional generic success callback
}

export const CreateBusiness = ({
  closeModal,
  onSuccess,
}: CreateBusinessProps) => {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // For loading state

  const form = useForm<z.infer<typeof companySchema>>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
      phone: "",
      vat: undefined,
      logo: "", // Initialize as empty string
    },
  });

  const handleCreateSubmit = async (values: z.infer<typeof companySchema>) => {
    setIsSubmitting(true);
    try {
      let logoUrl: string = "";

      if (selectedFile) {
        logoUrl = await uploadFileAndGetUrl(selectedFile);
      }
      // No need to check values.logo here for create, as it's for new entities

      const finalValues = {
        ...values,
        logo: logoUrl,
      };

      const business = await createBusinessAction(finalValues);

      if (business) {
        console.log("Success, created business:", business);
        router.refresh(); // Refresh page data

        if (onSuccess) {
          // Call generic onSuccess if provided
          onSuccess();
        }

        if (closeModal) {
          // Close the modal
          closeModal();
        }
      } else {
        console.error(
          "Failed to create a business: No data returned from action."
        );
        // Handle error display to user, e.g., using a toast or form error
        form.setError("root", {
          message: "Failed to create business. Please try again.",
        });
      }
    } catch (error: any) {
      console.error("Error during business creation:", error);
      form.setError("root", {
        message: error.message || "An unexpected error occurred.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <BusinessForm
      form={form}
      onSubmit={handleCreateSubmit}
      submitButtonText="Create Business"
      onFileChange={setSelectedFile}
      isSubmitting={isSubmitting} // Pass submitting state to the form
      // If BusinessForm has an onCancel that should also close the modal:
      onCancel={closeModal}
    />
  );
};
