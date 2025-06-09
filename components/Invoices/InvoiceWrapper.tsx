'use client'

import { getBusinessById } from "@/lib/actions/business.actions";
import { redirect } from "next/navigation";
import InvoiceForm from "./InvoiceForm";
import { ParamValue } from "next/dist/server/request/params";
import { useEffect, useState } from "react";
import { BusinessType, ClientType } from "@/types";

export default function InvoiceByBusinessClient({ company_id, client }: { company_id: ParamValue; client: ClientType }) {
    const id = String(company_id);

    const [companyDetails, setCompanyDetails] = useState<BusinessType | null>(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!id) return;

        async function fetchCompany() {
            const company = await getBusinessById(id);
            if (!company || company instanceof Error) {
                setError(true);
                return;
            }
            setCompanyDetails(company);
        }

        fetchCompany();
    }, [id]);

    if (error) {
        redirect("/dashboard");
    }

    if (!companyDetails) {
        return <div>Loading...</div>; // or a spinner
    }

    return <InvoiceForm company_data={companyDetails} client_data={client} />;
}
