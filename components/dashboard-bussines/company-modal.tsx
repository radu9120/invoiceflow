import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { BussinesForm } from "@/components/busineses/business-form";

interface CreateCompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCompanyCreated: (company: any) => void;
}

export default function CreateCompanyModal({
  isOpen,
  onClose,
  onCompanyCreated,
}: CreateCompanyModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl p-6 w-full">
        <div className="flex items-center justify-between p-6 border-b border-blue-100">
          <div>
            <h2 className="text-xl font-bold text-header-text">
              Create New Company
            </h2>
            <p className="text-secondary-text text-sm">
              Add a new company to manage separately
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
        <BussinesForm />
      </div>
    </div>
  );
}
