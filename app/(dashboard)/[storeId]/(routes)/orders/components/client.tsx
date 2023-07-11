"use client"

import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { OrderColumn, columns } from './column'
import { DataTable } from '@/components/ui/data-table'
import ApiList from '@/components/ui/api-list'


interface OrderClientProps {
    data: OrderColumn[]
}
const OrderClient = ({ data }: OrderClientProps) => {

    const router = useRouter()
    const param = useParams()

    return (
        <>

            <Heading
                title={`Order (${data.length})`}
                description='Manage Orders for your store' />


            <Separator />

            <DataTable columns={columns} data={data} searchKey='products' />

           
        </>
    )
}

export default OrderClient