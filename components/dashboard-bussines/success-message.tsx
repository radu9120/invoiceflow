import { CheckCircle } from "lucide-react";

interface SuccessMessageProps {
  justCreated: string | null;
  onDismiss: () => void;
}

export default function SuccessMessage({
  justCreated,
  onDismiss,
}: SuccessMessageProps) {
  if (!justCreated) return null;

  return (
    <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4">
      <div className="flex items-center gap-3">
        <CheckCircle className="h-5 w-5 text-green-600" />
        <div className="flex-1">
          <h4 className="font-medium text-green-800">
            Company Created Successfully!
          </h4>
          <p className="text-sm text-green-700">
            Your new company has been created. Click on it below to start
            managing invoices and clients.
          </p>
        </div>
        <button
          onClick={onDismiss}
          className="text-green-600 hover:text-green-800"
        >
          ×
        </button>
      </div>
    </div>
  );
}
