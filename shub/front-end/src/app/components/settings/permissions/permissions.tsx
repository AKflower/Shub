import styles from './permission.module.scss'

const Permissions = () => { 
    return (
    <div className={styles.container}>
    <h3 className={styles.header}>Permissions</h3>
    <p className={styles.description}>You can set the user to be an administrator or choose the permissions individually. If you select "Administrator", all of the other options will be automatically checked. The management of users remains a privilege of an administrator.</p>

    <p className={styles.content}>
      <input type="checkbox"  className={styles.checkbox}/>
      Administrator
    </p>

    <p className={styles.content}>
      <input type="checkbox"  className={styles.checkbox}/>
      Create files and directories
    </p>
    <p className={styles.content}>
      <input type="checkbox" className={styles.checkbox}/>
      Delete files and directories
    </p>
    <p className={styles.content}>
      <input type="checkbox"  className={styles.checkbox}/>
      Download
    </p>
    <p className={styles.content}>
      <input type="checkbox"  className={styles.checkbox}/>
      Edit files
    </p>
    <p className={styles.content}>
      <input type="checkbox"  className={styles.checkbox}/>
      Execute commands
    </p>
    <p className={styles.content}>
      <input type="checkbox"  className={styles.checkbox}/>
      Rename or move files and directories
    </p>
    <p className={styles.content}>
      <input type="checkbox"  className={styles.checkbox}/>
      Share files
    </p>
  </div>
    )
}
export default Permissions;