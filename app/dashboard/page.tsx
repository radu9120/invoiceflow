import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUserBusinesses } from "@/lib/actions/business.actions";
import DashboardClient from "@/components/dashboard-bussines/dashboard";

export default async function Dashboard() {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  let businessData

  try {
    const businessData = await getUserBusinesses();
    return <DashboardClient initialBusinesses={businessData} />;
  } catch (error) {
    console.error("Error loading businesses:", error);
    return <DashboardClient initialBusinesses={[]} />;
  }
}
