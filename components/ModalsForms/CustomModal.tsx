'use client'

import { useState } from "react";
import { Button } from "../ui/button";
import { LucideIcon, Plus, X } from "lucide-react";
import ModalPortal from "../ui/ModalPortal";
import CustomButton from "../ui/CustomButton";


export default function CustomModal({
    heading,
    description,
    children,
    openBtnLabel,
    btnVariant,    
    btnIcon: Icon,
    className,
    disabled,
}:{
    heading: string;
    description: string;
    children: React.ReactNode;
    openBtnLabel?: string;
    btnVariant: 'primary' | 'secondary' | 'ghost';
    btnIcon: LucideIcon;
    className?: string;
    disabled?: boolean;
}) {
    const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);
    
    const openAddClientModal = (): void => {
        setIsAddClientModalOpen(true);
    };

    const closeAddClientModal = (): void => {
    setIsAddClientModalOpen(false);
    }

    return (
        <div className={className}>
            <CustomButton
                variant={btnVariant}
                onClick={openAddClientModal} 
                label={openBtnLabel}
                icon={Icon}
                disabled={disabled}
            />
            {isAddClientModalOpen && (
                <ModalPortal>
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
                        <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-x-hidden overflow-y-auto p-6">
                            <div className="flex items-center justify-between py-6 border-b border-blue-100">
                                <div>
                                    <h2 className="text-2xl font-bold text-header-text">
                                        {heading}
                                    </h2>
                                    <p className="text-secondary-text">
                                        {description}
                                    </p>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={closeAddClientModal}
                                    className="hover:bg-gray-100"
                                >
                                    <X className="h-5 w-5" />
                                </Button>
                            </div>
                            {children}
                        </div>
                    </div>
                </ModalPortal>
            )}
        </div>
    )
}
