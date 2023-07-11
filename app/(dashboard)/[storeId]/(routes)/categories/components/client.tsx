"use client"

import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { CategoryColumn, columns } from './column'
import { DataTable } from '@/components/ui/data-table'
import ApiList from '@/components/ui/api-list'


interface CategoryClientProps {
    data: CategoryColumn[]
}
const CategoryClient = ({ data }: CategoryClientProps) => {

    const router = useRouter()
    const param = useParams()

    return (
        <>
            <div className='flex items-center justify-between '>

                <Heading
                    title={`Categories (${data.length})`}
                    description='Manage categories for your store' />
                <Button onClick={() => router.push(`/${param.storeId}/categories/new`)}>
                    <Plus className='mr-2 h-4 w-4' />
                    Add
                </Button>
            </div>
            <Separator />

            <DataTable columns={columns} data={data} searchKey='name' />

            <Heading title='API' description='API Calls for categories' />
            <Separator />
            <ApiList 
            entityName='categories'
            entityIdName='categoryId'
            />
        </>
    )
}

export default CategoryClient