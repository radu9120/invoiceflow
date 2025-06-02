import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getBusinessById } from "@/lib/actions/business.actions";
import DashboardClient from "@/components/dashboard/dashboard-client";

export default async function CompanyDashboard({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

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
