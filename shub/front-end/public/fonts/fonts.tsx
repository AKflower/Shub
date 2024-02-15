import { Inter, Lora, Source_Sans_3, Port_Lligat_Sans, Poppins } from 'next/font/google'

// const port_lligat_sans = Port_Lligat_Sans();
const fontLogo=Port_Lligat_Sans({
    subsets: ['latin'],
    weight:'400'}
  );
const poppins = Poppins( {
    subsets: ['latin'],
    display: 'swap',
    weight: "400"
})
const fonts = {fontLogo,poppins}
export default fonts;