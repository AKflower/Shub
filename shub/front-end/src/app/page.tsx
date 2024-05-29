import Login from './views/Login';
import { ShubProvider } from './Provider/Provider';
import Head from 'next/head';
import 'primeicons/primeicons.css';
import { PrimeReactProvider } from 'primereact/api';
import 'primeflex/primeflex.css';  
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import Foot from './components/footer/footer';


export default function Home() {
  
  return (
      <PrimeReactProvider>
        <ShubProvider>
          <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" />
          </Head>
          <Login/>
          <Foot />
        </ShubProvider>
      </PrimeReactProvider>
  )
}
