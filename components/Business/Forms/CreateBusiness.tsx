"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { companySchema } from "@/schemas/invoiceSchema";
import BusinessForm from "./BusinessForm";
import { createBusiness } from "@/lib/actions/business.actions";
import { redirect } from "next/navigation";

export const CreateBusiness = () => {
  const userPlan = "free"; // This should be fetched from user context or state

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
        const business = await createBusiness(values);

        if (business) {
            redirect(`/dashboard/business?business_id=${business.id}&name=${business.name}`);
        } else {
            console.log("Failed to create a business");
            redirect(`/dashboard`);
        }
    };
  

  return <BusinessForm form={form} onSubmit={handleCreateSubmit} submitButtonText="Create Business"/>
};
