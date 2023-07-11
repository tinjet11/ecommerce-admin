import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react'
import SettingsForm from './components/settings-form';

interface SettingsPageProps {
    params: {
        storeId: string
    }
}

const Settingspage = async ({ params }: SettingsPageProps) => {

    const { userId } = auth();

    if (!userId) {
        redirect('/sign-in');
    }

    const store = await prismadb.store.findFirst({
        where: {
            userId: userId,
            id: params.storeId,
        }
    });

    if (!store) {
        redirect('/');
    }

    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <SettingsForm initialData={store} />
            </div>


        </div>
    )
}

export default Settingspage