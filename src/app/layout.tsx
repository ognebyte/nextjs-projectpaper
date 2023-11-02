import type { Metadata } from 'next'
import '@/styles/index.scss'
import App from './app'
import ReduxProvider from '@/app/provider'


export const metadata: Metadata = {
    title: 'Home'
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
