
import styles from './button1.module.scss';

const Button1 = ({name,type} : {name:string, type: string}) => {
    return (
        <button className={
            type==='success' ? styles.buttonSuccess : styles.button}>{name}</button>

    )
}
export default Button1;