'use server'
import { auth } from '@clerk/nextjs/server'
import { createSupabaseClient } from '@/lib/supabase'
import { CreateInvoice } from '@/schemas/invoiceSchema'

export const createInvoice = async(formData: CreateInvoice) => {
    const { userId: author } = await auth()
    const supabase = createSupabaseClient()

    const { data, error } = await supabase.from('Invoices').insert({...formData, author}).select()

    if (error || !data) throw new Error(error?.message || 'Failed to create an invoice')

    return data[0]
}

