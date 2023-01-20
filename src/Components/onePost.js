import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { newAxios } from "../Axios/axios"

export default  function OnePost (){
  const [post, setPost ] = useState('')
  const [user, setUser ] = useState('')
  const [spinner, setSpinner ] = useState(true)
  let params = useParams();
  
  useEffect(()=>{
    getPost(params.id)
  }, [])
  
  async function getPost(id) {
    let a = await newAxios.get(`posts/${id}`)
    let i = await newAxios.get(`users/${a.data.userId}`)
    if (a && i) {
      setPost(a.data)
      setUser(i.data)
      setSpinner(false)
    }
  }
  
  return (
    <div className="container">
      <h1>One Post</h1>
      {
        spinner ? 
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div> :
        <div className="row">
          <div className="col-md-4">
            <div className="card bg-secondary">
              <div className="card-header text-white fs-3">{user.name}</div>
              <div className="card-body text-white fs-3">{user.phone}</div>
            </div>
          </div>
          <div className="col-md-8 ">
            <div className="card bg-secondary">
              <div className="card-header text-white fs-3">{post.body}</div>
            </div>
          </div>
        </div>
      }
    </div>
  )
}