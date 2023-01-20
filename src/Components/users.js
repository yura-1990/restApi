import {useState, useEffect} from 'react'
import {newAxios} from '../Axios/axios'

export default function Users(){
  const [usersData, setUsersData] = useState([])
  const [userShow, setUserShow] = useState(true)
  
  useEffect(()=>{
    putUser()
  }, [])
  
  async function putUser(){
    let a = await newAxios.get('users')
    if (a) {
      setUsersData(a.data)
      setUserShow(false)
    }
  }
  
  return (
    <div>
      <div className={'container'}>
        <h1 className={'text-center bg-secondary text-white pb-2'}>Users</h1>
        {
          userShow ?
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div> :
          <table className={'table'}>
            <thead>
              <tr>
                <th>number</th>
                <th>Full Name</th>
                <th>Address</th>
                <th>Company</th>
                <th>Contact</th>
                <th>website</th>
              </tr>
            </thead>
            <tbody>
              {
                usersData.map((item, index)=><tr key={item.id}>
                  <td>{index +1}</td>
                  <td>{item.name}</td>
                  <td>{item.address.street}{item.address.suite}</td>
                  <td>{item.company.name}</td>
                  <td>{item.phone}</td>
                  <td>{item.website}</td>
                </tr>)
              }
            </tbody>

          </table>
        }
      </div>
    </div>
  )
}