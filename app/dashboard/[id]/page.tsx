import { redirect } from "next/navigation";
import { getBusinessById } from "@/lib/actions/business.actions";
import DashboardClient from "@/components/dashboard-id/dashboard-client";

export default async function CompanyDashboard({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  try {
    const company = await getBusinessById(id);

    if (!company) {
      redirect("/dashboard");
    }

    return <DashboardClient company={company} />;
  } catch (error) {
    console.error("Error loading company:", error);
    redirect("/dashboard");
  }
}
