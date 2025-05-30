"use client";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { useEffect } from "react";

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
        <div key={index} className="grid grid-cols-8 gap-2 items-center">
             {/* Delete Button */}
            <div className="pl-2">
                <Button type="button" variant="destructive" onClick={onRemove} className=" px-2 w-full">
                    x
                </Button>
            </div>
            {/* Description */}
            <FormField
                name={`items.${index}.description`}
                render={() => (
                <FormItem className="col-span-3">
                    <FormControl>
                    <Input placeholder="Description" {...register(`items.${index}.description`)} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />

            {/* Unit Price */}
            <FormField
                name={`items.${index}.unit_price`}
                render={() => (
                <FormItem>
                    <FormControl>
                    <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        {...register(`items.${index}.unit_price`, { valueAsNumber: true })}
                    />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />

            {/* Quantity */}
            <FormField
                name={`items.${index}.quantity`}
                render={() => (
                <FormItem>
                    <FormControl>
                    <Input
                        type="number"
                        placeholder="0"
                        {...register(`items.${index}.quantity`, { valueAsNumber: true })}
                    />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />

            {/* Tax (%) */}
            <FormField
                name={`items.${index}.tax`}
                render={() => (
                <FormItem className="relative">
                    <FormControl>
                    <div className="relative">
                        <Input
                        type="number"
                        step="0.01"
                        placeholder="0"
                        {...register(`items.${index}.tax`, {
                            valueAsNumber: true,
                            setValueAs: (v) => (v === null || v === undefined ? 0 : v),
                        })}
                        className="pr-8"
                        />
                        <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">%</span>
                    </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />

            {/* Amount (read-only) */}
            <FormField
                name={`items.${index}.amount`}
                render={() => (
                <FormItem>
                    <FormControl>
                    <Input
                        type="number"
                        readOnly
                        {...register(`items.${index}.amount`, { valueAsNumber: true })}
                        className="bg-gray-100 cursor-not-allowed"
                    />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />

        </div>
    );
};

const InvoiceItems = () => {
    const { control } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "items",
    });

    return (
        <div className="space-y-4">
            {fields.map((field, index) => (
                <InvoiceItemRow key={field.id} index={index} onRemove={() => remove(index)} />
            ))}

            <div className="">
                <Button
                    type="button"
                    onClick={() =>
                        append({
                        description: "",
                        unit_price: 0,
                        quantity: 0,
                        tax: 0,
                        amount: 0,
                        })
                    }
                >
                    + Add Item
                </Button>
            </div>
        </div>
    );
};

export default InvoiceItems;
