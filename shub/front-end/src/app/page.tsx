import Image from 'next/image'
import Sidebar from './components/sidebar/sidebar'
import Search from './components/search/search'


export default function Home() {
  return (
    <main className="min-h-screen">
       <Sidebar />
       <Search />
    </main>
  )
}
