"use client";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";

const InvoiceItemRow = ({ index, onRemove }: { index: number; onRemove: () => void }) => {
  const { control, register, setValue } = useFormContext();

  const quantity = useWatch({ control, name: `items.${index}.quantity` });
  const unitPrice = useWatch({ control, name: `items.${index}.unit_price` });
  const tax = useWatch({ control, name: `items.${index}.tax` });

  useEffect(() => {
    const q = Number(quantity) || 0;
    const u = Number(unitPrice) || 0;
    const t = Number(tax) || 0;

    const baseAmount = u * q;
    const taxAmount = baseAmount * (t / 100);
    const total = baseAmount + taxAmount;

    setValue(`items.${index}.amount`, parseFloat(total.toFixed(2)));
  }, [quantity, unitPrice, tax, index, setValue]);

    return (
        <tr key={index} className="border-t border-blue-100">
            {/* Description */}
            <td className="py-3 px-4">
                <FormField
                    name={`items.${index}.description`}
                    render={() => (
                    <FormItem className="w-full">
                        <FormControl>
                        <Input className="w-60" placeholder="Item description" {...register(`items.${index}.description`)} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
            </td>
            
            {/* Quantity */}
            <td className="py-3 px-4">
                <FormField
                name={`items.${index}.quantity`}
                render={() => (
                    <FormItem>
                        <FormControl>
                        <Input
                            type="number"
                            placeholder="0"
                            className="w-20"
                            min='1'
                            {...register(`items.${index}.quantity`, { valueAsNumber: true })}
                        />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
            </td>
            {/* Unit Price */}
            <td className="py-3 px-4">
                <FormField
                    name={`items.${index}.unit_price`}
                    render={() => (
                    <FormItem>
                        <FormControl>
                            <Input
                                type="number"
                                step="0.01"
                                placeholder="0"
                                min='0.00'
                                className="w-24 text-center"
                                {...register(`items.${index}.unit_price`, { valueAsNumber: true })}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
            </td>      

            <td className="py-3 px-4">
                {/* Tax (%) */}
                <FormField
                    name={`items.${index}.tax`}
                    render={() => (
                    <FormItem className="relative ">
                        <FormControl>
                        <div className="relative">
                            <Input
                            type="number"
                            step="0.01"
                            placeholder="0"
                            min='0'
                            {...register(`items.${index}.tax`, {
                                valueAsNumber: true,
                                setValueAs: (v) => (v === null || v === undefined ? 0 : v),
                            })}
                            className="pr-6 w-20"
                            />
                            <span className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">%</span>
                        </div>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
            </td>
            <td className="py-3 px-4 w-[140px] text-right font-medium text-primary-text">
                {/* Amount (read-only) */}
                <FormField
                    name={`items.${index}.amount`}
                    render={() => (
                    <FormItem>
                        <FormControl>
                            <span>
                                £{(useWatch({ control, name: `items.${index}.amount` }) ?? 0).toFixed(2)}
                            </span>
                            {/* <Input
                                type="number"
                                readOnly
                                {...register(`items.${index}.amount`, { valueAsNumber: true })}
                                className="bg-gray-100 cursor-not-allowed "
                            /> */}
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
            </td>
            <td className="py-3 px-4">
                <Button
                variant="ghost"
                size="sm"
                onClick={onRemove}
                className="text-red-600 hover:bg-red-50"
                >
                <Trash2 className="h-4 w-4" />
                </Button>
            </td>

        </tr>
    );
};

const InvoiceItems = () => {
    const { control } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "items",
    });

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-header-text">
                    Line Items
                </h3>
                <Button
                    onClick={() =>
                        append({
                        description: "",
                        unit_price: 0,
                        quantity: 0,
                        tax: 0,
                        amount: 0,
                        })
                    }
                    size="sm"
                    className="bg-primary text-white"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                </Button>

            </div>
            <div className="bg-white border border-blue-100 rounded-lg overflow-hidden">
                <table className="w-full">
                    <thead className="bg-blue-50">
                        <tr>
                            <th className="text-left py-3 px-4 text-sm font-medium text-secondary-text">
                                Description
                            </th>
                            <th className="text-center py-3 px-4 text-sm font-medium text-secondary-text">
                                Qty
                            </th>
                            <th className="text-center py-3 px-4 text-sm font-medium text-secondary-text">
                                Rate
                            </th>
                            <th className="text-center py-3 px-4 text-sm font-medium text-secondary-text">
                                Tax
                            </th>
                            <th className="text-right py-3 px-4 text-sm font-medium text-secondary-text">
                                Amount
                            </th>
                            <th className="w-16">

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {fields.map((field, index) => (
                            <InvoiceItemRow key={field.id} index={index} onRemove={() => remove(index)} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        
    );
};

export default InvoiceItems;
