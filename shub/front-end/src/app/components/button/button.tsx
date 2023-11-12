import styles from './button.module.scss'

const Button = ({buttonName, success} : {buttonName: string; success: boolean}) => {
    return (
        <>
         {success && <button className={styles.success}>{buttonName}</button>}
         {!success && <button className={styles.delete}>{buttonName}</button>}
        </>

       
    )
}
export default Button;