import { Crown } from "lucide-react";

interface PlanBadgeProps {
  plan: "free" | "pro" | "enterprise";
}

export default function PlanBadge({ plan }: PlanBadgeProps) {
  switch (plan) {
    case "free":
      return (
        <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
          Free
        </span>
      );
    case "pro":
      return (
        <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
          <Crown className="h-3 w-3 mr-1" />
          Pro
        </span>
      );
    case "enterprise":
      return (
        <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
          <Crown className="h-3 w-3 mr-1" />
          Enterprise
        </span>
      );
    default:
      return null;
  }
}
