"use client"

import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { ProductColumn, columns } from './column'
import { DataTable } from '@/components/ui/data-table'
import ApiList from '@/components/ui/api-list'


interface ProductClientProps {
    data: ProductColumn[]
}
const ProductClient = ({ data }: ProductClientProps) => {

    const router = useRouter()
    const param = useParams()

    return (
        <>
            <div className='flex items-center justify-between '>

                <Heading
                    title={`Products (${data.length})`}
                    description='Manage products for your store' />
                <Button onClick={() => router.push(`/${param.storeId}/products/new`)}>
                    <Plus className='mr-2 h-4 w-4' />
                    Add
                </Button>
            </div>
            <Separator />

            <DataTable columns={columns} data={data} searchKey='name' />

            <Heading title='API' description='API Calls for products' />
            <Separator />
            <ApiList 
            entityName='products'
            entityIdName='productId'
            />
        </>
    )
}

export default ProductClient