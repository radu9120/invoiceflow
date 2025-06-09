import { DashboardBusinessStats } from '@/types'
import { Building, PlusIcon } from 'lucide-react';
import CustomButton from '../ui/CustomButton';
import BusinessCard from './BusinessCard';

export default function BusinessGrid({ dashboardData } : { dashboardData: DashboardBusinessStats[]}) {
    if (dashboardData.length === 0) {
        return (
            <div className="text-center py-16">
                <Building className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <h2 className="text-2xl font-bold text-header-text mb-2">
                    No Companies Yet
                </h2>
                <p className="text-secondary-text mb-6">
                    Create your first company to start managing invoices and clients.
                </p>
                <div className='flex justify-center'>
                    <CustomButton label={'Create Your First Company'} variant={'primary'} icon={PlusIcon}/>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboardData.map((company) => (
                <BusinessCard key={company.id} company={company}/>
            ))}
        </div>
    )
}
