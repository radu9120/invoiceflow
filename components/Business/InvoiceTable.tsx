'use client'
import { InvoiceListItem } from '@/types'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader } from '../ui/card'
import CustomButton from '../ui/CustomButton'
import { Download, DownloadIcon, Eye, EyeIcon, FileText, FilterIcon, MoreVertical, MoreVerticalIcon, PlusIcon, SearchIcon } from 'lucide-react'
import getStatusBadge from '../ui/getStatusBadge'
import { Button } from '../ui/button'


export default function InvoiceTable({ invoices, business_id }:{ invoices: InvoiceListItem[]; business_id: Number}) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentPage = Number(searchParams.get("page") || 1)
  const search = searchParams.get("searchTerm") || ""
  const filter = searchParams.get("filter") || ""

  const changePage = (newPage: string) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", newPage)
    router.push(`?${params.toString()}`)
  }

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.currentTarget;
    const term = (form.elements.namedItem("search") as HTMLInputElement)?.value || "";

    const params = new URLSearchParams(searchParams)
    params.set("searchTerm", term)
    params.set("page", "1")
    router.push(`?${params.toString()}`)
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams)
    params.set("filter", e.target.value)
    params.set("page", "1")
    router.push(`?${params.toString()}`)
  }


  return (
    <Card>
      <CardHeader className='flex justify-between'>
        <h2 className="text-xl font-bold text-header-text">All Invoices</h2>
        <div className="flex items-center gap-3">
          <CustomButton label={"Filter"} icon={FilterIcon} variant={"secondary"}/>
          <CustomButton label={"Search"} icon={SearchIcon} variant={"secondary"}/>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto lg:w-full w-[1200px] ">
          <div className="w-full">
            <div className="border-b w-full py-3 px-4 border-blue-100 grid grid-cols-6 gap-2">
              <div className="font-medium text-secondary-text">
                Invoice
              </div>
              <div className="font-medium text-secondary-text">
                Amount
              </div>
              <div className="font-medium text-secondary-text">
                Status
              </div>
              <div className="font-medium text-secondary-text">
                Sent Date
              </div>
              
              <div className="font-medium text-secondary-text">
                Due Date
              </div>
              <div className="text-right font-medium text-secondary-text">
                Actions
              </div>
            </div>

            {invoices.length > 0 ? (
              <div>
                {invoices.map((invoice) => (
                  <div
                    key={invoice.id}
                    className="border-b border-blue-50 hover:bg-blue-50/50 w-full py-3 px-4 grid grid-cols-6 gap-2"
                  >
                    <div className="">
                      <div>
                        <p className="font-medium text-header-text">
                          {invoice.invoice_number}
                        </p>
                        <p className="text-sm text-secondary-text">
                          {invoice.due_date}
                        </p>
                      </div>
                    </div>
                    <div className="">
                      <p className="font-semibold text-header-text">
                        {invoice.total}
                      </p>
                    </div>
                    <div className="">
                      {getStatusBadge(invoice.status)}
                    </div>
                    <div>Sent date to implement</div>
                    <div className="">
                      <p className="text-header-text">
                        {invoice.due_date}
                      </p>
                    </div>
                    
                    <div className="w-full">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:bg-blue-100"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:bg-blue-100"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:bg-blue-100"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ):(
              <div className="text-center py-12">
                <FileText className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-semibold text-header-text mb-2">
                    No Invoices Yet
                  </h3>
                  <p className="text-secondary-text mb-6">
                    Create your first invoice to start tracking payments and managing
                    your business.
                  </p>
                  <CustomButton label={"Create Your First Invoice"} icon={PlusIcon} variant={"primary"} href={`/dashboard/${business_id}/invoices/new?business_id=${business_id}`}/>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
