"use client"

import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { ColorColumn, columns } from './column'
import { DataTable } from '@/components/ui/data-table'
import ApiList from '@/components/ui/api-list'


interface ColorsClientProps {
    data: ColorColumn[]
}
const ColorsClient = ({ data }: ColorsClientProps) => {

    const router = useRouter()
    const param = useParams()

    return (
        <>
            <div className='flex items-center justify-between '>

                <Heading
                    title={`Colors (${data.length})`}
                    description='Manage colors for your store' />
                <Button onClick={() => router.push(`/${param.storeId}/colors/new`)}>
                    <Plus className='mr-2 h-4 w-4' />
                    Add
                </Button>
            </div>
            <Separator />

            <DataTable columns={columns} data={data} searchKey='name' />

            <Heading title='API' description='API Calls for colors' />
            <Separator />
            <ApiList 
            entityName='colors'
            entityIdName='colorId'
            />
        </>
    )
}

export default ColorsClient