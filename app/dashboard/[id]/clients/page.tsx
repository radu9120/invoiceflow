import ClientManagement from "@/components/Clients/ClientManagement";
import { getAllClients } from "@/lib/actions/client.actions";
import { SearchParams } from "@/types";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: number }>;
  searchParams: Promise<SearchParams>; // Make searchParams a Promise
}) {
  const awaitedParams = await params;
  const filter = await searchParams; // Now this will work correctly
  const searchTerm = filter.searchTerm || "";

  const clients = await getAllClients({ business_id: awaitedParams.id });

  console.log(clients);

  return (
    <main>
      <ClientManagement clients={clients} business_id={awaitedParams.id} />
    </main>
  );
}
