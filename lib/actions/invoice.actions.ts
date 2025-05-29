'use server'
import { auth } from '@clerk/nextjs/server'
import { createSupabaseClient } from '@/lib/supabase'

export const createInvoice = async(formData: CreateInvoiceHistory) => {
    const { userId: author } = await auth()
    const supabase = createSupabaseClient()

    const { data, error } = await supabase.from('invoices').insert({...formData, author}).select()

    if (error || !data) throw new Error(error?.message || 'Failed to create a companion')

    return data[0]
}

