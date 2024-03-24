
import styles from './button1.module.scss';

const Button1 = ({name,type,isDisabled,onClick} : {name:string, type: string, isDisabled?: boolean,onClick?:(event: React.MouseEvent<HTMLButtonElement>) => void}) => {
    return (
        <button className={
            type==='success' ? styles.buttonSuccess : styles.button} onClick={onClick} disabled={isDisabled} style={isDisabled ? {opacity:'40%'} : {} }>{name}</button>

    )
}
export default Button1;