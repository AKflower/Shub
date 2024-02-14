import styles from './input.module.scss';
import Button1 from '../button/button1';
const Input = ({label,type,value}:{label: string, type: string, value?: string}) => {
    return (
        <div className={styles.container}>
            <label className={styles.label}>{label}</label>
            <input type={type} className={styles.input} value={value}/>
            {0!==0 && <div className={styles.buttonContainer}>
                <Button1 name='Cancel' type=''/>
                <Button1 name='Save' type='success'/>
                
            </div>}
        </div>
    )
}
export default Input;