import Login from './views/Login';
import { ShubProvider } from './Provider/Provider';


export default function Home() {
  
  return (
        <ShubProvider>
          <Login/>
        </ShubProvider>
  )
}
