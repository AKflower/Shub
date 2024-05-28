"use client"

import { useState, useEffect } from 'react';
import styles from './permission.module.scss'
import axios from 'axios';
import Navigation from '../navigation/navigation';


export default function Permission() {
    interface Role {
        role_id: string;
        idInt: number;
        level: number;
        role_name: string;
        role_type: number;
        role_organization: string;
        role_permissionIds: string[];
      }
    interface Permission {
        permission_id: string,
        permission_name: string
    }
    const [selectedOrgId, setSelectedOrgId] = useState('Org1');
    const [listPermissions,setListPermissions] = useState<Permission[]>([])
    const [listRoles,setListRoles] = useState<Role[]>([])
    const [newRole,setNewRole] = useState<string>("")
    const [isSaving,setIsSaving]= useState<boolean>(false)
  
    const [ isAddNew, setIsAddNew] = useState<Boolean>(false)
   

    const fetchData = async () => {
        setIsSaving(true)
        const params = {
            role_organization: selectedOrgId,
        }
        const res = await axios.get(`http://localhost:3001/role/org`,{ params});
      
        setListRoles(res.data);
        const per = await axios.get(`http://localhost:3001/permission`);
        setListPermissions(per.data)

        setIsSaving(false)

      }
    useEffect(() => {
        
        fetchData();
      }, [selectedOrgId]
      )
    const handleChangePermission = (role: Role,permission_id: string) => {
        if (isSaving) return;
        setIsSaving(true)
        console.log(role,permission_id);
        if (role.role_permissionIds)
        {
            let index = role.role_permissionIds.indexOf(permission_id);
            if (index!==-1) role.role_permissionIds.splice(index, 1);
            else {
                role.role_permissionIds.push(permission_id);
            }
        }
        else role.role_permissionIds=[permission_id];
        console.log(role,permission_id);
        const params = {
            role_id: role.role_id,
            role_permissionIds : role.role_permissionIds
        }
        axios.put(`http://localhost:3001/role/updatePermissionIds`, params, {
                
        }).then(respone => {
            setIsSaving(false)
            fetchData()
        })

    }
    const orgs= [
        {
            id: "Org1",
            name: "Khoa Máy Tính"
        },
        {
            id: "Org2",
            name: "Phòng đào tạo"
        },
        {
            id: "Org3",
            name: "Phòng CTCTSV"
        }
    ]
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOrgId(event.target.value);
      };
    return (
        <>
           <Navigation />
           <div className={styles.container}>
                <div className={styles.header}>
                <label htmlFor="" className="">Organization</label>
                <select value={selectedOrgId} onChange={handleChange} style={{padding: '.5em',borderRadius: '10px',boxShadow: '1px 1px 2px silver'}}>
                    {orgs.map((org) => (
                    <option key={org.id} value={org.id}>
                        {org.name}
                    </option>
                ))}
            </select>
                </div>
                <table className={styles.table}>
                <thead className={styles.thead}>
                    <tr className={styles.tr}>
                        <th className={styles.th}>Name</th>
                        {listPermissions.map((permission) => (<th key={permission.permission_id} className={styles.th}>{permission.permission_name}</th>))}
                        
                    </tr>
                </thead>
                <tbody className="">
                    {listRoles.map((role) => (
                         <tr className="">
                              <td className={styles.td} style={{minWidth:'max-content'}}>{role.role_name}</td>
                              {listPermissions.map((permission) => (
                                 <td className={styles.td}>
                                    {(role.role_permissionIds && role.role_permissionIds.includes(permission.permission_id)) ?
                                        <input type="checkbox" checked={true} className={styles.checkbox+' '+(isSaving ? styles.disabled: '')} onClick={() => handleChangePermission(role,permission.permission_id)} disabled={isSaving}/> : <input type="checkbox" className={styles.checkbox+' '+(isSaving ? styles.disabled: '')} onClick={() => handleChangePermission(role,permission.permission_id)} disabled={isSaving}/>
                                    }
                                    
                                </td>
                              ))}
                         </tr>
                    ))}
                   
                </tbody>
            </table>

           </div>
           
          
        </>
    )
}