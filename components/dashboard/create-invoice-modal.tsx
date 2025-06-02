"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X, Plus, Save, Trash2, Crown, AlertTriangle } from "lucide-react";
import { Invoice, InvoiceItem } from "@/types";

interface CreateInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  userPlan: "free" | "pro" | "enterprise";
  invoicesLength: number;
  onCreateInvoice: (invoice: Invoice) => void;
}

export default function CreateInvoiceModal({
  isOpen,
  onClose,
  userPlan,
  invoicesLength,
  onCreateInvoice,
}: CreateInvoiceModalProps) {
  const [newInvoice, setNewInvoice] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    clientAddress: "",
    description: "",
    dueDate: "",
    items: [
      {
        description: "",
        quantity: 1,
        rate: 0,
        amount: 0,
      },
    ] as InvoiceItem[],
    subtotal: 0,
    tax: 0,
    total: 0,
    notes: "",
  });

  if (!isOpen) return null;

  const updateInvoiceItem = (
    index: number,
    field: keyof InvoiceItem,
    value: string | number
  ): void => {
    const updatedItems = [...newInvoice.items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };

    if (field === "quantity" || field === "rate") {
      updatedItems[index].amount =
        updatedItems[index].quantity * updatedItems[index].rate;
    }

    const subtotal = updatedItems.reduce((sum, item) => sum + item.amount, 0);
    const total = subtotal + newInvoice.tax;

    setNewInvoice({
      ...newInvoice,
      items: updatedItems,
      subtotal,
      total,
    });
  };

  const addInvoiceItem = (): void => {
    const newItem: InvoiceItem = {
      description: "",
      quantity: 1,
      rate: 0,
      amount: 0,
    };

    setNewInvoice({
      ...newInvoice,
      items: [...newInvoice.items, newItem],
    });
  };

  const removeInvoiceItem = (index: number): void => {
    const updatedItems = newInvoice.items.filter((_, i) => i !== index);
    const subtotal = updatedItems.reduce((sum, item) => sum + item.amount, 0);
    const total = subtotal + newInvoice.tax;

    setNewInvoice({
      ...newInvoice,
      items: updatedItems,
      subtotal,
      total,
    });
  };

  const handleCreateInvoice = () => {
    if (
      !newInvoice.clientName.trim() ||
      !newInvoice.clientEmail.trim() ||
      !newInvoice.dueDate ||
      newInvoice.items.some((item) => !item.description.trim())
    ) {
      alert("Please fill in all required fields");
      return;
    }

    const invoice: Invoice = {
      id: Date.now().toString(),
      number: `INV-${String(invoicesLength + 1).padStart(3, "0")}`,
      clientName: newInvoice.clientName,
      clientEmail: newInvoice.clientEmail,
      clientPhone: newInvoice.clientPhone,
      clientAddress: newInvoice.clientAddress,
      amount: newInvoice.total,
      description: newInvoice.description,
      status: "draft",
      dueDate: newInvoice.dueDate,
      createdDate: new Date().toISOString().split("T")[0],
      items: newInvoice.items,
      subtotal: newInvoice.subtotal,
      tax: newInvoice.tax,
      total: newInvoice.total,
      notes: newInvoice.notes,
    };

    onCreateInvoice(invoice);

    // Reset form
    setNewInvoice({
      clientName: "",
      clientEmail: "",
      clientPhone: "",
      clientAddress: "",
      description: "",
      dueDate: "",
      items: [
        {
          description: "",
          quantity: 1,
          rate: 0,
          amount: 0,
        },
      ],
      subtotal: 0,
      tax: 0,
      total: 0,
      notes: "",
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-blue-100">
          <div>
            <h2 className="text-2xl font-bold text-header-text">
              Create New Invoice
            </h2>
            <p className="text-secondary-text">
              Generate a detailed invoice for your client
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6">
          {/* Free Plan Warning */}
          {userPlan === "free" && invoicesLength >= 1 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-red-800 mb-1">
                    Invoice Limit Reached
                  </h4>
                  <p className="text-sm text-red-700">
                    Free plan allows only 1 invoice. Upgrade to Pro to create
                    unlimited invoices.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Client Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-header-text mb-4">
                Client Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-text mb-1">
                    Client Name *
                  </label>
                  <Input
                    value={newInvoice.clientName}
                    onChange={(e) =>
                      setNewInvoice({
                        ...newInvoice,
                        clientName: e.target.value,
                      })
                    }
                    className="w-full"
                    placeholder="Enter client name"
                    disabled={userPlan === "free" && invoicesLength >= 1}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-text mb-1">
                    Email *
                  </label>
                  <Input
                    type="email"
                    value={newInvoice.clientEmail}
                    onChange={(e) =>
                      setNewInvoice({
                        ...newInvoice,
                        clientEmail: e.target.value,
                      })
                    }
                    className="w-full"
                    placeholder="client@example.com"
                    disabled={userPlan === "free" && invoicesLength >= 1}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-text mb-1">
                    Phone
                  </label>
                  <Input
                    value={newInvoice.clientPhone}
                    onChange={(e) =>
                      setNewInvoice({
                        ...newInvoice,
                        clientPhone: e.target.value,
                      })
                    }
                    className="w-full"
                    placeholder="+1 (555) 123-4567"
                    disabled={userPlan === "free" && invoicesLength >= 1}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-text mb-1">
                    Address
                  </label>
                  <Textarea
                    value={newInvoice.clientAddress}
                    onChange={(e) =>
                      setNewInvoice({
                        ...newInvoice,
                        clientAddress: e.target.value,
                      })
                    }
                    className="w-full"
                    rows={3}
                    placeholder="Client address"
                    disabled={userPlan === "free" && invoicesLength >= 1}
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-header-text mb-4">
                Invoice Details
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-text mb-1">
                    Description
                  </label>
                  <Input
                    value={newInvoice.description}
                    onChange={(e) =>
                      setNewInvoice({
                        ...newInvoice,
                        description: e.target.value,
                      })
                    }
                    className="w-full"
                    placeholder="Invoice description"
                    disabled={userPlan === "free" && invoicesLength >= 1}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-text mb-1">
                    Due Date *
                  </label>
                  <Input
                    type="date"
                    value={newInvoice.dueDate}
                    onChange={(e) =>
                      setNewInvoice({
                        ...newInvoice,
                        dueDate: e.target.value,
                      })
                    }
                    className="w-full"
                    disabled={userPlan === "free" && invoicesLength >= 1}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Line Items */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-header-text">
                Line Items
              </h3>
              <Button
                onClick={addInvoiceItem}
                size="sm"
                className="bg-primary text-white"
                disabled={userPlan === "free" && invoicesLength >= 1}
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
                    <th className="text-right py-3 px-4 text-sm font-medium text-secondary-text">
                      Rate
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-secondary-text">
                      Amount
                    </th>
                    <th className="w-16"></th>
                  </tr>
                </thead>
                <tbody>
                  {newInvoice.items.map((item, index) => (
                    <tr key={index} className="border-t border-blue-100">
                      <td className="py-3 px-4">
                        <Input
                          value={item.description}
                          onChange={(e) =>
                            updateInvoiceItem(
                              index,
                              "description",
                              e.target.value
                            )
                          }
                          className="w-full"
                          placeholder="Item description"
                          disabled={userPlan === "free" && invoicesLength >= 1}
                        />
                      </td>
                      <td className="py-3 px-4">
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            updateInvoiceItem(
                              index,
                              "quantity",
                              parseInt(e.target.value) || 0
                            )
                          }
                          className="w-20 text-center"
                          min="1"
                          disabled={userPlan === "free" && invoicesLength >= 1}
                        />
                      </td>
                      <td className="py-3 px-4">
                        <Input
                          type="number"
                          value={item.rate}
                          onChange={(e) =>
                            updateInvoiceItem(
                              index,
                              "rate",
                              parseFloat(e.target.value) || 0
                            )
                          }
                          className="w-24 text-right"
                          min="0"
                          step="0.01"
                          disabled={userPlan === "free" && invoicesLength >= 1}
                        />
                      </td>
                      <td className="py-3 px-4 text-right font-medium text-primary-text">
                        ${item.amount.toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        {newInvoice.items.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeInvoiceItem(index)}
                            className="text-red-600 hover:bg-red-50"
                            disabled={
                              userPlan === "free" && invoicesLength >= 1
                            }
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="mt-6 flex justify-end">
              <div className="w-64 space-y-2">
                <div className="flex justify-between">
                  <span className="text-secondary-text">Subtotal:</span>
                  <span className="text-primary-text">
                    ${newInvoice.subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-secondary-text">Tax:</span>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={newInvoice.tax}
                      onChange={(e) => {
                        const tax = parseFloat(e.target.value) || 0;
                        const total = newInvoice.subtotal + tax;
                        setNewInvoice({
                          ...newInvoice,
                          tax,
                          total,
                        });
                      }}
                      className="w-20 text-right"
                      min="0"
                      step="0.01"
                      disabled={userPlan === "free" && invoicesLength >= 1}
                    />
                  </div>
                </div>
                <div className="flex justify-between font-bold text-lg border-t border-blue-100 pt-2">
                  <span className="text-header-text">Total:</span>
                  <span className="text-header-text">
                    ${newInvoice.total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="mb-8">
            <label className="block text-lg font-semibold text-header-text mb-4">
              Notes
            </label>
            <Textarea
              value={newInvoice.notes}
              onChange={(e) =>
                setNewInvoice({
                  ...newInvoice,
                  notes: e.target.value,
                })
              }
              className="w-full"
              rows={4}
              placeholder="Add any additional notes or payment terms..."
              disabled={userPlan === "free" && invoicesLength >= 1}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-blue-100">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-blue-200"
            >
              Cancel
            </Button>
            {userPlan === "free" && invoicesLength >= 1 ? (
              <Button className="flex-1 bg-gradient-to-r from-primary to-accent text-white">
                <Crown className="h-4 w-4 mr-2" />
                Upgrade to Pro
              </Button>
            ) : (
              <Button
                onClick={handleCreateInvoice}
                disabled={
                  !newInvoice.clientName.trim() ||
                  !newInvoice.clientEmail.trim() ||
                  !newInvoice.dueDate ||
                  newInvoice.items.some((item) => !item.description.trim())
                }
                className="flex-1 bg-gradient-to-r from-primary to-accent text-white"
              >
                <Save className="h-4 w-4 mr-2" />
                Create Invoice
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
