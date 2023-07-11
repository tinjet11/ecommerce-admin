"use client"

import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { BillboardColumn, columns } from './column'
import { DataTable } from '@/components/ui/data-table'
import ApiList from '@/components/ui/api-list'


interface BillboardClientProps {
    data: BillboardColumn[]
}
const BillboardClient = ({ data }: BillboardClientProps) => {

    const router = useRouter()
    const param = useParams()

    return (
        <>
            <div className='flex items-center justify-between '>

                <Heading
                    title={`Billboard (${data.length})`}
                    description='Manage billboards for your store' />
                <Button onClick={() => router.push(`/${param.storeId}/billboards/new`)}>
                    <Plus className='mr-2 h-4 w-4' />
                    Add
                </Button>
            </div>
            <Separator />

            <DataTable columns={columns} data={data} searchKey='label' />

            <Heading title='API' description='API Calls for billboards' />
            <Separator />
            <ApiList 
            entityName='billboards'
            entityIdName='billboardId'
            />
        </>
    )
}

export default BillboardClient