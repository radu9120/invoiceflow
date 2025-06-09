import React from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
import { UserActivityLog } from '@/types'
import { Building, FileText } from 'lucide-react'

export default function RecentActivity({ recentActivities } : { recentActivities: UserActivityLog[]}) {
  return (
    <Card>
        <CardHeader>
            <h2 className="text-xl font-bold text-header-text mb-6">
                Recent Activity
            </h2>
        </CardHeader>
        <CardContent>
            {recentActivities.map((activity, idx) => (
                <div 
                    key={idx} 
                    className={`flex items-center gap-4 p-4 rounded-lg ${
                            activity.target_type === 'business'
                            ? 'bg-blue-50' 
                            : activity.target_type === 'invoice'
                            ? 'bg-green-50'
                            : 'bg-purple-50'
                        }`}
                >
                    {activity.target_type === 'business' ? (
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <Building className="h-4 w-4 text-primary" />
                        </div>
                    ):activity.target_type === 'invoice' ? (
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <FileText className="h-4 w-4 text-green-600" />
                        </div>
                    ):(
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                            <FileText className="h-4 w-4 text-purple-600" />
                        </div>
                    )}
                    <div className="flex-1">
                        <p className="font-medium text-header-text">
                            {activity.action}{' '}{activity.target_name}
                        </p>
                        <p className="text-sm text-secondary-text">
                            • {activity.created_at}
                        </p>
                    </div>

                </div>
            ))}
        </CardContent>
    </Card>
  )
}
