import type { Metadata } from 'next'
import '@/styles/index.scss'
import App from '@/app/app'
import ReduxProvider from '@/app/provider'


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
                <ReduxProvider>
                    <App>
                        {children}
                    </App>
                </ReduxProvider>
            </body>
        </html>
    )
}
