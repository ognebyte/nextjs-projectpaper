'use client'

import { useEffect, useState } from 'react'
import { redirect, useSearchParams } from 'next/navigation'
import { useAppSelector } from '@/store/store'
import Header from '@/app/_components/header'
import ModalCreateProject from '@/app/_components/modals/modalCreateProject'


export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const currentUser = useAppSelector((state) => state.authReducer)
    const [pageLoading, setPageLoading] = useState(true);
    const searchParams = useSearchParams()
    const search = searchParams.get('modal')
    const [modal, setModal] = useState(false);

    useEffect(() => {
        if (!currentUser.loading) {
            if (currentUser.isAuth) setPageLoading(false)
            else redirect('/signin')
        }
    }, [currentUser])

    useEffect(() => {
        if (search == 'createProject') setModal(true)
        else setModal(false)
    }, [search])

    return pageLoading ? null : (
        <div className="dashboard">
            <Header />
            {children}
            <ModalCreateProject isOpen={modal} />
        </div>
    )
}