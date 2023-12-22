'use client'

import { useEffect, useState } from 'react'
import { redirect, useSearchParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import { useAppSelector } from '@/store/store'
import Header from '@/app/_components/header'
import { PageLoading } from '@/app/_components/loadings'

const ModalLayout = dynamic(() => import('@/app/_components/modals/modalLayout'))


export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const authState = useAppSelector((state) => state.authReducer)
    const [pageLoading, setPageLoading] = useState(true);
    const searchParams = useSearchParams()
    const modalParam = searchParams.get('modal')


    useEffect(() => {
        if (!authState.loading) {
            if (authState.isAuth) setPageLoading(false)
            else redirect('/signin')
        }
    }, [authState])


    return pageLoading ? <PageLoading /> : (
        <>
            <Header />
            <div className="dashboard">
                {children}
                <ModalLayout modalParam={modalParam} />
            </div>
        </>
    )
}