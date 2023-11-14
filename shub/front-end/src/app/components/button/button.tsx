import styles from './button.module.scss'

const Button = ({buttonName, color} : {buttonName: string; color: string}) => {
    return (
        <>
         {color=='green' && <button className={styles.green}>{buttonName}</button>}
         {color=='red' && <button className={styles.red}>{buttonName}</button>}
         {color=='blue' && <button className={styles.blue}>{buttonName}</button>}
        </>

       
    )
}
export default Button;