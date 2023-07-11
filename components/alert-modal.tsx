"use client"
import React, { useEffect, useState } from 'react'
import Modal from './ui/Modal';
import { Button } from './ui/button';

interface AlertModal {
    isOpen: boolean;
    loading: boolean;
    onClose: () => void;
    onConfirm: () => void;
}


const AlertModal = ({ isOpen, loading, onClose, onConfirm }: AlertModal) => {

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    //prevent hydration error
    if (!isMounted) {
        return null;
    }
    return (
        <>
            <Modal
                title='Are you sure?'
                description='This action cannot be undone'
                isOpen={isOpen}
                onClose={onClose}
            >

                <div className='pt-6 space-x-2 flex items-center justify-end w-full'>
                    <Button
                        disabled={loading}
                        variant="outline"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>

                    <Button
                        disabled={loading}
                        variant="destructive"
                        onClick={onConfirm}
                    >
                        Continue
                    </Button>

                </div>

            </Modal>
        </>
    )
}

export default AlertModal