import Head from 'next/head';
import Link from 'next/link';
 

export default function Layout( { children, home }) {
    return (
        <div>
            <Head>
                <title>Pierce's Next.js App</title>
            </Head>
            <main>{children}
            {!home}</main>
        </div>
    )
}