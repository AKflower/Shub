
import styles from './button1.module.scss';

const Button1 = ({name,type,onClick} : {name:string, type: string,onClick?:(event: React.MouseEvent<HTMLButtonElement>) => void}) => {
    return (
        <button className={
            type==='success' ? styles.buttonSuccess : styles.button} onClick={onClick}>{name}</button>

    )
}
export default Button1;