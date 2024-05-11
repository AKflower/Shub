import styles from './select.module.scss'

const Select = ({label,list,value, onChange}:{label:string,list:string[],value?:string,onChange?: (value: string) => void}) => {

    return (
    <div className={styles.container}>
        <label htmlFor="" className={styles.label}>{label}</label>
        <select name="" value={value} id="" className={styles.select} onChange={e => onChange && onChange(e.target.value)}>
            {list.map((item)=> (
                <option value={item} className="">{item}</option>
                
            ))}
            
        </select>
    </div>
    
    )
}
export default Select;