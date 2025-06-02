import ClientCard from "@/components/Clients/ClientCard";
import ClientManagement from "@/components/Clients/ClientManagement";
import { getAllClients } from "@/lib/actions/client.actions";
import { SearchParams } from "@/types";
import { ArrowLeft, Users } from "lucide-react";
import Link from "next/link";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: number }>;
  searchParams: SearchParams
}) {
  const awaitedParams = await params;
  const filter = await searchParams;
  const serachTerm = filter.searchTerm || ''

  const clients = await getAllClients({business_id: awaitedParams.id})

  console.log(clients)

  return (
    <main>
      <ClientManagement clients={clients} business_id= {awaitedParams.id}/>
    </main>
  );
};


