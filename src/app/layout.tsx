import type { Metadata } from 'next'
import '@/styles/index.scss'
import App from '@/app/app'
import ReduxProvider from '@/app/provider'
import { Suspense } from 'react'
import { PageLoading } from './_components/loadings'
import { SpeedInsights } from '@vercel/speed-insights/next';


export const metadata: Metadata = {
    title: 'ProjectPaper'
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <html lang="en">
            <body>
                <Suspense fallback={<PageLoading />}>
                    <ReduxProvider>
                        <App>
                            {children}
                        </App>
                    </ReduxProvider>
                </Suspense>
                <SpeedInsights />
            </body>
        </html>
    )
}
