import Image from 'next/image'
import Header from '@/app/components/header'
import squareGrunge from '@/assets/textures/transparent/square-grunge.png'
import { Growth } from '@/assets/svg/Growth'


export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <section style={{width: '100%', height: '100%'}}>
            <Header/>
            <Image className='body-background' src={squareGrunge} alt='body-background' />
            <div className='page-auth'>
                <main className='container'>
                    <div className="svg-holder"><Growth/></div>
                    <div className="form-container">
                        {children}
                    </div>
                </main>
            </div>
        </section>
    )
}