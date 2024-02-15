import styles from './input.module.scss';
import Button1 from '../button/button1';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Editor from '@/app/views/files/Editor';
import { useShub } from '@/app/Provider/Provider';
const Input = ({label,type,value,changePossible=false}:{label: string, type: string, value?: string,changePossible?: boolean}) => {
    const { toggleCurrentPromptName, toggleShowChangePassword } = useShub()
    return (
        <div className={styles.container}>
            <label className={styles.label}>{label}</label>
            <div className={styles.inputContainer}>
                <input type={type} className={styles.input} value={value} disabled={true}/>
                {changePossible && <span className={styles.edit} 
                onClick={() => {
                    toggleShowChangePassword()
                    toggleCurrentPromptName()
                    }}><EditOutlinedIcon /></span>}
            </div>
            {0!==0 && <div className={styles.buttonContainer}>
                <Button1 name='Cancel' type=''/>
                <Button1 name='Save' type='success'/>
                
            </div>}
        </div>
    )
}
export default Input;