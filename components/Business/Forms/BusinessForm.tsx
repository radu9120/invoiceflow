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
import { Plus, AlertTriangle, Crown } from "lucide-react";
import { companySchema } from "@/schemas/invoiceSchema";
import { createBusiness } from "@/lib/actions/business.actions";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

interface BusinessFormProps {
  form: UseFormReturn<z.infer<typeof companySchema>>;
  onSubmit: (values: z.infer<typeof companySchema>) => Promise<void>;
  submitButtonText?: string;
  onFileChange: (file: File | null) => void;
  existingLogoUrl?: string | null;
  isSubmitting?: boolean;
  onCancel?: () => void;
}

export default function BusinessForm({
  form,
  onSubmit,
  submitButtonText = "Submit",
  onFileChange,
  existingLogoUrl,
  isSubmitting = false,
  onCancel,
}: BusinessFormProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const userPlan = "free";

  useEffect(() => {
    // More robust validation
    if (
      existingLogoUrl &&
      existingLogoUrl.trim() !== "" &&
      existingLogoUrl !== "null" &&
      existingLogoUrl !== "undefined" &&
      (existingLogoUrl.startsWith("http") ||
        existingLogoUrl.startsWith("/") ||
        existingLogoUrl.startsWith("blob:"))
    ) {
      setPreviewUrl(existingLogoUrl);
    } else {
      setPreviewUrl(null);
    }
  }, [existingLogoUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      onFileChange(file);
      setPreviewUrl(URL.createObjectURL(file));
      form.setValue("logo", "");
    } else {
      onFileChange(null);
      form.setValue("logo", "");
      // More robust validation here too
      if (
        existingLogoUrl &&
        existingLogoUrl.trim() !== "" &&
        existingLogoUrl !== "null" &&
        existingLogoUrl !== "undefined" &&
        (existingLogoUrl.startsWith("http") ||
          existingLogoUrl.startsWith("/") ||
          existingLogoUrl.startsWith("blob:"))
      ) {
        setPreviewUrl(existingLogoUrl);
      } else {
        setPreviewUrl(null);
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-8">
        {/* Company Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="block text-sm font-medium text-secondary-text">
                  Company/Name *
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter company name"
                    {...field}
                    disabled={isSubmitting}
                  />
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
                <FormLabel className="block text-sm font-medium text-secondary-text">
                  Email *
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter email address"
                    {...field}
                    disabled={isSubmitting}
                  />
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
                <FormLabel className="block text-sm font-medium text-secondary-text">
                  Phone
                </FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="Enter phone number"
                    {...field}
                    disabled={isSubmitting}
                  />
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
                <FormLabel className="block text-sm font-medium text-secondary-text">
                  VAT Number
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter VAT number"
                    type="number"
                    {...field}
                    value={field.value ?? ""}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Address Field */}
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-sm font-medium text-secondary-text">
                Address *
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter company address"
                  {...field}
                  disabled={isSubmitting}
                  rows={3}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Logo Upload Section */}
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="logo"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-medium text-secondary-text">
                  Company Logo
                </FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={isSubmitting}
                    className="cursor-pointer"
                  />
                </FormControl>
                <FormDescription className="text-xs text-secondary-text">
                  Upload a logo for your company (PNG, JPG, JPEG - Max 5MB)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Logo Preview */}
          {previewUrl && (
            <div className="w-full">
              <p className="text-sm font-medium text-secondary-text mb-2">
                Logo Preview:
              </p>
              <div className="w-32 h-20 border border-gray-200 rounded-md overflow-hidden bg-gray-50 flex items-center justify-center">
                <Image
                  src={previewUrl}
                  alt="Logo Preview"
                  className="max-w-full max-h-full object-contain"
                  width={128}
                  height={80}
                />
              </div>
            </div>
          )}
        </div>

        {/* Plan Information */}
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <h4 className="font-medium text-primary mb-2">
            {userPlan === "free" ? "Free Plan Includes:" : "Pro Plan Includes:"}
          </h4>
          <ul className="text-sm text-secondary-text space-y-1">
            {userPlan === "free" ? (
              <>
                <li>• 1 company</li>
                <li>• Up to 1 invoices</li>
                <li>• Basic client management</li>
                <li>• Email support</li>
              </>
            ) : (
              <>
                <li>• Unlimited companies</li>
                <li>• Unlimited invoices</li>
                <li>• Advanced client management</li>
                <li>• Priority support</li>
                <li>• Custom branding</li>
                <li>• Advanced reporting</li>
              </>
            )}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            className="flex-1 border-blue-200 hover:bg-blue-50"
            disabled={isSubmitting}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            className="flex-1 bg-gradient-to-r from-primary to-accent text-white hover:from-primary/90 hover:to-accent/90"
            disabled={!form.formState.isValid || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Saving...
              </>
            ) : (
              <>
                <Plus className="h-4 w-4 mr-2" />
                {submitButtonText}
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
