import React from 'react'
import prismadb from '@/lib/prismadb'

import SizesClient from './components/client'
import { SizeColumn } from './components/column'
import format from 'date-fns/format'

const SizesPage = async ({ params }: { params: { storeId: string } }) => {

    const size = await prismadb.size.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    const formattedSizes: SizeColumn[] = size.map((item) => ({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }))

    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <SizesClient data={formattedSizes} />
            </div>
        </div>

    )
}

export default SizesPage