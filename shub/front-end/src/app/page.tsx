import Image from 'next/image'
import Sidebar from './components/sidebar/sidebar'
import Search from './components/search/search'
import Breadcrumbs from './components/breadcumbs/breadcrumbs'
import { I18nextProvider } from 'react-i18next';
import i18n from './components/settings/languages/i18n';
import LanguageSelector from './components/settings/languages/lanuages'
import UserForm from './components/settings/user/userForm';
import Button from './components/button/button';
export default function Home() {
  return (
    
      <main className="min-h-screen flex">
      
        {/* <Sidebar />
        <Search /> */}
        <UserForm />
        
      </main>
    
    
  )
}
