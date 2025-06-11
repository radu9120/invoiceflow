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
import { useForm } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import { AlertTriangle, Plus } from "lucide-react";
import { billToSchema } from "@/schemas/invoiceSchema";
import { createClient } from "@/lib/actions/client.actions";
import { redirect } from "next/navigation";

interface ClientFormProps {
  business_id: number;
  defaultValues?: {
    id?: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    business_id: number;
  };
  onSubmit?: (values: z.infer<typeof billToSchema>) => Promise<void>;
  submitButtonText?: string;
  isSubmitting?: boolean;
}

export const ClientForm = ({
  business_id,
  defaultValues,
  onSubmit,
  submitButtonText = "Save Client",
  isSubmitting = false,
}: ClientFormProps) => {
  const form = useForm<z.infer<typeof billToSchema>>({
    resolver: zodResolver(billToSchema),
    defaultValues: defaultValues || {
      name: "",
      email: "",
      address: "",
      phone: "",
      business_id: business_id,
    },
  });

  const handleSubmit = async (values: z.infer<typeof billToSchema>) => {
    if (onSubmit) {
      // If onSubmit is provided, use it (for editing)
      await onSubmit(values);
    } else {
      // Default behavior for creating new clients
      const client = await createClient(values);
      if (client) {
        redirect(`/dashboard/clients?business_id=${business_id}`);
      } else {
        console.log("Failed to create a client");
        redirect(`/dashboard`);
      }
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6 w-full mt-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company/Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Company/Name"
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
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Email"
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="Phone" {...field} disabled={isSubmitting} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Address"
                  {...field}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="py-6">
          <div className="flex gap-3">
            <Button
              type="button"
              variant="secondary"
              className="flex-1 border-blue-200"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-primary to-accent text-white"
              disabled={!form.formState.isValid || isSubmitting}
            >
              <Plus className="h-4 w-4 mr-2" />
              {isSubmitting ? "Saving..." : submitButtonText}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
