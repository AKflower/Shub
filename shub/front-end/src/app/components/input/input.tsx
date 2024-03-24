import styles from './input.module.scss';
import Button1 from '../button/button1';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Editor from '@/app/views/files/Editor';
import ErrorIcon from '@mui/icons-material/Error';
import { useShub } from '@/app/Provider/Provider';
import { Erica_One } from 'next/font/google';


const Input = ({label,type,value,changePossible=false,isDisabled=true,isError=false, isProcessing=false,onChange}:{label: string, type: string, value?: string,changePossible?: boolean, isDisabled?: boolean, isError?: boolean, isProcessing?:boolean, onChange?: (value: string) => void}) => {
    const { toggleCurrentPromptName, toggleShowChangePassword } = useShub()
    return (
        <div className={styles.container}>
            <label className={styles.label}>{label}</label>
            <div className={styles.inputContainer}>
                <input type={type} className={styles.input} value={value} disabled={isDisabled} style={isError ? {borderColor: 'red'}: isProcessing ? {opacity: '50%'} : {}} onChange={e => onChange && onChange(e.target.value)}/>
                {changePossible && <span className={styles.edit} 
                onClick={() => {
                    toggleShowChangePassword()
                    toggleCurrentPromptName()
                    }}><EditOutlinedIcon /></span>}
                {isError && <span style={{color: 'red'}}>
                    <ErrorIcon />
                    </span>
                }
            </div>
            {0!==0 && <div className={styles.buttonContainer}>
                <Button1 name='Cancel' type=''/>
                <Button1 name='Save' type='success'/>
                
            </div>}
        </div>
    )
}
export default Input;