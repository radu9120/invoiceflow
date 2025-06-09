import { AlertTriangle, CheckCircle, Edit, Send } from "lucide-react";
import { Badge } from "./badge"

const getStatusBadge = (status: string) => {
  switch (status) {
    case "paid":
        return (
            <Badge className="bg-green-100 text-green-800">
                <CheckCircle className="h-3 w-3 mr-1" />
                Paid
            </Badge>
        );
    case "sent":
        return (
            <Badge className=" bg-blue-100 text-blue-800">
                <Send className="h-3 w-3 mr-1" />
                Sent
            </Badge>
        );
    case "overdue":
        return (
            <Badge className=" bg-red-100 text-red-800">
                <AlertTriangle className="h-3 w-3 mr-1" />
                Overdue
            </Badge>
        );
    case "draft":
        return (
            <Badge className=" bg-gray-100 text-gray-800">
                <Edit className="h-3 w-3 mr-1" />
                Draft
            </Badge>
        );
    default:
        return null;
  }
};

export default getStatusBadge;