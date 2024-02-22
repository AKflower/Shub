import Login from './views/Login';
import { ShubProvider } from './Provider/Provider';
import Head from 'next/head';

export default function Home() {
  
  return (
        <ShubProvider>
          <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" />
          </Head>
          <Login/>
        </ShubProvider>
  )
}
