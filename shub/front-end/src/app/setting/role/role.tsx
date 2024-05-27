"use client"

import styles from './role.module.scss'
import Navigation from '../navigation/navigation'
import  fonts  from '../../../../public/fonts/fonts'
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'
import Select from '@/app/components/select/select'
import { DropReason, DropResult } from 'react-beautiful-dnd'
import axios from 'axios';
import { useEffect, useState } from 'react'
import { useShub } from '@/app/Provider/Provider'


export default function Role () {
    interface Role {
        role_id: string;
        idInt: number;
        level: number;
        role_name: string;
        role_type: number;
        role_organization: string;
      }
      interface RoleType {
        id: number,
        name: string,
        type: number,
        roles: Role[] 
    }
    const [selectedOrgId, setSelectedOrgId] = useState('Org1');
    const [newRole,setNewRole] = useState<string>("")
    const [isSaving,setIsSaving]= useState<Boolean>(false)
    const { toggleShowNewRole, toggleCurrentPromptName} = useShub()
    const [ isAddNew, setIsAddNew] = useState<Boolean>(false)
    const [roles,setRoles] = useState<Role[]>([])
    const [roleType,setRoleType] = useState<RoleType[]>([])
    const [listRoles,setListRoles] = useState<RoleType[] | []>([])
    const fetchData = async () => {
        const params = {
            role_organization: selectedOrgId,
        }
        const res = await axios.get(`http://localhost:3001/role/org`,{ params});
        var data : RoleType [] = [
         
          {
              id: 0,
              name: "Role Actived",
              type: 1,
              roles: [
                  
              ]
          },
          {
              id: 1,
              name: "Role Inactived",
              type: 0,
              roles: [
               
              ]
          }
         
        ]
        res.data.forEach((item: Role) => {
          data[item.role_type==0 ? 1 : 0 ].roles.push(item)
        })
        data[0].roles.sort((a,b) => {
            return a.level - b.level
        })
        console.log(data);
        setListRoles(data);
      }
    useEffect(() => {
        
        fetchData();
      }, [selectedOrgId]
      )
    const data = [
        {
            id: 0,
            name: "Role Actived",
            type: 1,
            roles: [
                {
                    id: 'role_1',
                    idInt: 1,
                    name: 'admin',
                },
                {
                    id: 'role_2',
                    idInt: 2,
                    name: 'user',
                }
            ]
        },
        {
            id: 1,
            name: "Role Inactived",
            type: 0,
            roles: [
                {
                    id:  'role_3',
                    idInt: 3,
                    name: 'subLeader',
                },
            ]
        }
    ]   
    
    
    const onDragEnd = (e:DropResult) => {
        if (isSaving===true) return;
        setIsSaving(true)
        console.log(e);
        const {source,destination} =e;
        if (!destination) return;
        if (source.droppableId === destination?.droppableId) {
            
            console.log('case 1');
            const newListRoles = [...listRoles]
            const index=parseInt(source.droppableId.split("droppable")[1]);
            console.log(index);
            
            console.log(newListRoles[index].roles);
            const el = newListRoles[index].roles.splice(source.index,1)
            console.log(el);
            newListRoles[index].roles.splice(destination.index,0,...el);
            console.log(newListRoles);
            
            if (index===0 && source.index !== destination.index) {
                newListRoles[0].roles.forEach((role,index) => {
                    role.level=index;
                })
                const params = {roles: newListRoles[0].roles}
                console.log(params);
                axios.put(`http://localhost:3001/role/updateLevel`, params, {
                
                }).then(respone => {
                    setIsSaving(false)
                    fetchData()
                })
            }
        //     const params = {
                
        //     }
        //     axios.put(`http://localhost:3001/role/updateTypeRole`, params, {
                
        // })
            setListRoles(newListRoles);
        }
        else {
            console.log('case 2');
            const newListRoles = [...listRoles];
            const oldIndex= parseInt(source.droppableId.split("droppable")[1])
            
            const newIndex = parseInt(destination.droppableId.split("droppable")[1]);
            const el= newListRoles[oldIndex].roles.splice(source.index,1)
            newListRoles[newIndex].roles.splice(destination.index,0,...el);
            
            setListRoles(newListRoles)

                const params = {
                    role_id : el[0].role_id,
                    role_type: newIndex? 0 : 1,
                }
                el[0].role_type= newIndex? 0 : 1
                console.log('heyyyy: ',el[0]);
                axios.put(`http://localhost:3001/role/updateTypeRole`, params, {
                
                }).then(respone => {
                        
                        newListRoles[0].roles.forEach((role,index) => {
                            role.level=index;
                        })
                        const params = {roles: newListRoles[0].roles}
                        console.log(params);
                        axios.put(`http://localhost:3001/role/updateLevel`, params, {
                        
                        }).then(respone2 => {
                            setIsSaving(false)
                            fetchData()
                        })
                    
                    
                })
      

        }
    }
    const handleAddNew = () => {
        setIsAddNew(!isAddNew)
    }
    const handleCreateRole = () => {
        setIsSaving(true)
        const newRoleData = {
            role_name: newRole,
            level: -1,
            role_type: 0,
            role_organization: selectedOrgId,
         }
         axios.post(`http://localhost:3001/role/new`, newRoleData,{
        }).then(response=> {
            fetchData()
            setNewRole("")
            setIsSaving(false)
            handleAddNew();
        })
        
        
    }
    const handleInputNewRole = (event: any) => {
        setNewRole(event.target.value);
        console.log(newRole);
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
    const handleDelete = async (roleId: string) => {
        setIsSaving(true)
        const response = await axios.delete(`http://localhost:3001/role/${roleId}`).then(res => {
            setIsSaving(false)
            fetchData();
        });

    }
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOrgId(event.target.value);
      };
    return (
        <>
            <Navigation />
           
            <div className={styles.container+' '+fonts.poppins.className}>
                <h1 className={styles.header}>Role Setting</h1>
                <div className="" style={{margin: '0 0 2em 0', width: '30%'}}>
                <select value={selectedOrgId} onChange={handleChange} style={{padding: '.5em',borderRadius: '10px',boxShadow: '1px 1px 2px silver'}}>
                    {orgs.map((org) => (
                    <option key={org.id} value={org.id}>
                        {org.name}
                    </option>
                ))}
            </select>
                </div>
               
                <div className={styles.content+" grid grid-cols-2 gap-4"}>
                <DragDropContext onDragEnd={onDragEnd}>
                    {listRoles.length && listRoles.map((roleType,index) =>
                       ( 
                       <Droppable key={roleType.id} droppableId={`droppable${roleType.id}`}>
                           { 
                           (provided) => 
                            <div className={styles.roleActive}
                            key={index}
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            >
                                <div className={styles.headerRole}>
                                    
                                    <p className={styles.type}>{roleType.name} </p>
                                    {roleType.id==1 && !isAddNew && <button className={styles.new} onClick={handleAddNew}>New</button>}
                                </div>
                                {   roleType.id==1 && isAddNew &&
                                    <div className={styles.cardInactive}>
                                        <input type="text" className={styles.inputNew} value={newRole} onChange={handleInputNewRole}/>
                                        <div className={styles.button}>
                                           {!isSaving && <button className={styles.btn} onClick={handleCreateRole}>Add</button>}
                                           {!isSaving && <button className={styles.btn} style={{background:'red'}} onClick={handleAddNew}>Cancel</button>}
                                        </div>
                                        
                                    </div>
                                }
                                {
                                    roleType.roles.map((role,index) => (
                                        <Draggable key={role.role_id} draggableId={`draggable${role.idInt}`} index={index} >
                                            { 
                                                (provided) => (
                                                <div className={roleType.type===1  ? (isSaving ? styles.cardSaving : styles.card) : (isSaving ? styles.cardInactiveSaving  :styles.cardInactive)}
                                                key={role.idInt} 
                                                {...provided.dragHandleProps}
                                                {...provided.draggableProps}
                                                ref={provided.innerRef}
                                                >{isSaving && role.role_type ? '...' : role.role_type ? '#'+(role.level+1)+'.' : ''} {role.role_name}
                                                {role.role_type===0 && !isSaving && <span className={styles.delete} onClick={()=> handleDelete(role.role_id)}>X</span>}
                                                </div>
                                                )
                                            }
                                        </Draggable>
                                       
                                       
                                    ))
                                }
                                {provided.placeholder}
                               
                            </div>
                        }
                        </Droppable>
                        )
                    )}
                    
                </DragDropContext>
                </div>

            </div>
        </>
    )
}