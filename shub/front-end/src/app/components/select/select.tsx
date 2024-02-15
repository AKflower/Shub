import styles from './select.module.scss'

const Select = ({label,list}:{label:string,list:string[]}) => {

    return (
    <div className={styles.container}>
        <label htmlFor="" className={styles.label}>{label}</label>
        <select name="" value='' id="" className={styles.select}>
            {list.map((item)=> (
                <option value={item} className="">{item}</option>
                
            ))}
            
        </select>
    </div>
    
    )
}
export default Select;