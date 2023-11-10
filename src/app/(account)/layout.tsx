'use client'

import { useEffect, useState } from 'react'
import { usePathname, redirect } from 'next/navigation'
import Image from 'next/image'
import { motion, useAnimationControls } from "framer-motion"

import Footer from '@/app/_components/footer'
import squareGrunge from '@/assets/textures/transparent/square-grunge.png'
import Growth from '@/assets/svg/growth'
import { useAppSelector } from '@/store/store'


export default function AccountLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const currentUser = useAppSelector((state) => state.authReducer)
    const [pageLoading, setPageLoading] = useState(true);
    const currPathname = usePathname()
    const [prevPathname, setPrevPathname] = useState('');
    const animation = useAnimationControls()

    useEffect(() => {
        if(!currentUser.loading) {
            if (currentUser.isAuth) redirect('/')
            else setPageLoading(false)
        }
    }, [currentUser])

    useEffect(() => {
        if (prevPathname == '') setPrevPathname(currPathname)
        else
            if (prevPathname != currPathname) {
                animation.set({ rotateX: '90deg' })
                animation.start({ rotateX: '0deg' })
                setPrevPathname(currPathname)
            }
    }, [currPathname])
    
    return pageLoading ? null : (
        <>
            <Image className='body-background' src={squareGrunge} alt='body-background' priority={false} />
                <div className='page-auth'>
                    <main className='container'>
                        <div className="svg-holder"><Growth /></div>
                        <motion.div className="form-container box-shadow" animate={animation}>
                            {children}
                        </motion.div>
                    </main>
                </div>
            <Footer />
        </>
    )
}