"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X, Settings } from "lucide-react";
import { updateBusiness } from "@/lib/actions/business.actions";
import { Company } from "@/types";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  company: Company;
  formatDate: (dateString: string) => string;
  invoicesLength: number;
}

export default function SettingsModal({
  isOpen,
  onClose,
  company,
  formatDate,
  invoicesLength,
}: SettingsModalProps) {
  const [editCompany, setEditCompany] = useState({
    name: company.name,
    email: company.email,
    address: company.address,
    phone: company.phone || "",
    vat: company.vat,
  });

  if (!isOpen) return null;

  const handleUpdateCompany = async () => {
    if (!editCompany.name.trim()) {
      alert("Company name is required");
      return;
    }

    try {
      await updateBusiness(company.id, {
        name: editCompany.name,
        email: editCompany.email,
        address: editCompany.address,
        phone: editCompany.phone,
        vat: editCompany.vat,
      });

      onClose();
    } catch (error) {
      console.error("Error updating company:", error);
      alert("Failed to update company. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-blue-100">
          <div>
            <h2 className="text-xl font-bold text-header-text">
              Company Settings
            </h2>
            <p className="text-secondary-text text-sm">
              Update your company information
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
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-secondary-text mb-2">
                Company Name *
              </label>
              <Input
                value={editCompany.name}
                onChange={(e) =>
                  setEditCompany({
                    ...editCompany,
                    name: e.target.value,
                  })
                }
                placeholder="Enter company name"
                className="w-full"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-text mb-2">
                Email *
              </label>
              <Input
                type="email"
                value={editCompany.email}
                onChange={(e) =>
                  setEditCompany({
                    ...editCompany,
                    email: e.target.value,
                  })
                }
                placeholder="Enter company email"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-text mb-2">
                Address
              </label>
              <Textarea
                value={editCompany.address}
                onChange={(e) =>
                  setEditCompany({
                    ...editCompany,
                    address: e.target.value,
                  })
                }
                placeholder="Enter company address"
                className="w-full"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-text mb-2">
                Phone
              </label>
              <Input
                value={editCompany.phone}
                onChange={(e) =>
                  setEditCompany({
                    ...editCompany,
                    phone: e.target.value,
                  })
                }
                placeholder="Enter company phone"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-text mb-2">
                VAT Number
              </label>
              <Input
                type="number"
                value={editCompany.vat || ""}
                onChange={(e) =>
                  setEditCompany({
                    ...editCompany,
                    vat: e.target.value
                      ? parseFloat(e.target.value)
                      : undefined,
                  })
                }
                placeholder="Enter VAT number"
                className="w-full"
              />
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 mt-6">
            <h4 className="font-medium text-primary mb-2">
              Company Information
            </h4>
            <div className="text-sm text-secondary-text space-y-1">
              <p>• Company ID: {company.id}</p>
              <p>• Created: {formatDate(company.created_at)}</p>
              <p>• Total Invoices: {invoicesLength}</p>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <Button
              variant="secondary"
              onClick={onClose}
              className="flex-1 border-blue-200"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdateCompany}
              disabled={!editCompany.name.trim() || !editCompany.email.trim()}
              className="flex-1 bg-gradient-to-r from-primary to-accent text-white"
            >
              <Settings className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
