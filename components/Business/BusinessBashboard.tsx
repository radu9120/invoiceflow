import { ArrowLeft, Building, CrownIcon, PlusIcon, SettingsIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import CustomButton from '../ui/CustomButton';

export default function BusinessBashboard({
  business,
  userPlan,
}:{
  business: {id: any;
    name: any;
    email: any;};
  userPlan: string
}) {
  return (
    <div className='space-y-6'>
      <Link
        href="/dashboard"
        className="inline-flex items-center text-primary hover:text-primary-dark mb-4 transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Companies
      </Link>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
            <Building className="h-8 w-8 text-white" />
          </div>
          <div className="space-y-2">
            <div className="">
              <h1 className="text-3xl md:text-4xl font-bold text-header-text">
                {business.name}
              </h1>
            </div>
            <p className="text-secondary-text">
              {business.email}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <CustomButton label={"Create Invoice"} icon={PlusIcon} variant={"primary"} href={`/dashboard/invoices/new?business_id=${business.id}`}/>
          <CustomButton
            // onClick={onOpenSettings}
            variant="secondary"
            label="Settings"
            icon={SettingsIcon}
          />
          {userPlan === "free" && (
            <CustomButton
              // onClick={Updrade}
              variant="primary"
              label="Upgrade"
              icon={CrownIcon}
            />
          )}
        </div>
      </div>
    </div>
  )
}
