"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Search,
  Users,
  FileText,
  DollarSign,
  PlusIcon,
  FilterIcon,
} from "lucide-react";
import { ClientForm } from "@/components/Clients/ClientForm";
import ClientCard from "@/components/Clients/ClientCard";
import { useState } from "react";
import { ClientType } from "@/types";
import CustomModal from "../ModalsForms/CustomModal";
import CustomButton from "../ui/CustomButton";

export default function ClientManagement({
  clients,
  business_id,
}: {
  clients: ClientType[];
  business_id: number;
}) {
  const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);

  const openAddClientModal = (): void => {
    setIsAddClientModalOpen(true);
  };

  const closeAddClientModal = (): void => {
    setIsAddClientModalOpen(false);
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/dashboard"
          className="inline-flex items-center text-primary hover:text-primary-dark mb-4 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <Users className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-header-text">
              Client Management
            </h1>
            <p className="text-secondary-text mt-1">
              Manage your clients and their information.
            </p>
          </div>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-text h-4 w-4" />
            <Input
              type="text"
              placeholder="Search clients..."
              // value={searchTerm}
              // onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border-blue-200 focus:ring-primary"
            />
          </div>
          <CustomButton
            label={"Filter"}
            icon={FilterIcon}
            variant={"secondary"}
          />
        </div>
        <CustomModal
          openBtnLabel="Add Client"
          description="Add a new client to your system"
          heading="Add New Client"
          btnIcon={PlusIcon}
          btnVariant="primary"
        >
          <ClientForm business_id={business_id} />
        </CustomModal>
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.map((client) => (
          <ClientCard client={client} key={client.id} />
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-blue-100">
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-header-text">
              {clients.length}
            </p>
            <p className="text-sm text-secondary-text">Total Clients</p>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-blue-100">
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            {/* <p className="text-2xl font-bold text-header-text">
                    {clients.filter((c) => c.status === "active").length}
                </p> */}
            <p className="text-sm text-secondary-text">Active Clients</p>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-blue-100">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            {/* <p className="text-2xl font-bold text-header-text">
                    {clients.reduce((sum, client) => sum + client.invoices, 0)}
                </p> */}
            <p className="text-sm text-secondary-text">Total Invoices</p>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-blue-100">
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-header-text">0</p>{" "}
            {/* Replace with actual revenue calculation */}
            <p className="text-sm text-secondary-text">Total Revenue</p>
          </div>
        </div>
      </div>
    </div>
  );
}
