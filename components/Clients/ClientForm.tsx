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
import { createBusiness } from "@/lib/actions/business.actions";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/actions/client.actions";

export const ClientForm = ({ business_id }: { business_id: number }) => {
  const form = useForm<z.infer<typeof billToSchema>>({
    resolver: zodResolver(billToSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
      phone: "",
      business_id: business_id,
    },
  });
  const onSubmit = async (values: z.infer<typeof billToSchema>) => {
    const client = await createClient(values);

    if (client) {
      redirect(`/dashboard/clients?business_id=${business_id}`);
    } else {
      console.log("Failed to create a business");
      redirect(`/dashboard`);
    }
  };
  console.log(form.formState.isValid);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4  w-full mt-8  "
      >
        <div className="space-y-4 grid-cols-2 grid space-x-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company/Name</FormLabel>
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
                <FormLabel>Email</FormLabel>
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
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="Phone" {...field} />
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
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Textarea placeholder="Address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="py-6">
          <div className="flex gap-3">
            <Button
              variant="secondary"
              //   onClick={() => setIsNewCompanyModalOpen(false)}
              className="flex-1 border-blue-200"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-primary to-accent text-white w-full"
              disabled={form.formState.isSubmitting}
            >
              <Plus className="h-4 w-4 mr-2" />
              Save Client
            </Button>
            {/* )} */}
          </div>
        </div>
      </form>
    </Form>
  );
};
