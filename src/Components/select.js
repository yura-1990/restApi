import { useEffect, useState } from "react";
import { newAxios } from "../Axios/axios";

export default function SelectUser({onChange, changeUser}) {
  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState('')
  
  async function getUsers() {
    const res = await newAxios('users')
    setUsers(res.data)
  }
  
  useEffect(()=>{
    getUsers()
  }, [])
  
  function onChangeSelect(event){
    let id = event.target.value === '' ? '' : parseInt(event.target.value) 
    setCurrentUser(id)
    if (changeUser)
      changeUser(id) 
    if (onChange)
      onChange(id)
  }
  
  
  return (
    <select className="form-select" value={currentUser} onChange={onChangeSelect}>
        <option value={""}>all</option>
        {
          users.map((item, index)=><option key={index} value={item.id}>
            {item.name}
          </option>)
        }
      </select>
  )
}