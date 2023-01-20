import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { newAxios } from "../Axios/axios"
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import SelectUser from './select'
import ModalPost from './modal'


export default function Posts(){
  let navigate = useNavigate();
  const [posts, setPosts] = useState([])
  const [postData, setPostData] = useState([])
  const [users, setUsers] = useState([])
  const [show, setShow] = useState(true)
  const [modalVisisble, setModalVisisble] = useState(false)
  const [idUser, setIdUser] = useState('')

  const post = {
    card:{
      height: '100px'
    },
    body:{
      minHeight: '100px'
    }
  }
  useEffect(()=>{
    getUsers()
  }, [])
  
  async function getUsers(){
    let a = await newAxios.get('users')
    let b = await newAxios.get('posts')
    setPostData(b.data)
    if (a && b) {
      setUsers(a.data)
      setPosts(b.data)
      setShow(false)
    }
  }
  
  function onePost(params) {
    navigate(`/posts/${params}`)
  }
  
  async function savePost(data) {
    const res = await newAxios.post('posts', data)
    if (res) {
      toast("Data is saved!")
      setPostData(prev=>{
        prev.unshift(res.data)
        setPosts(prev)
        return prev
      })
      setModalVisisble(prev=>!prev)
    }
    
  }
  
  function onSubmit(data){
    data.userId=users
    savePost(data)
    console.log(data);
  }
  
  function toggleModal(){
    setModalVisisble(prev=>!prev)
  }
  
  
  function onChangeUser(id){
    let UserPostsComments = postData.filter(item=>(item.userId===id) || id === '')
    setPosts(UserPostsComments);
    setIdUser(id)
    
  }
  
  function changeUser(id) {
    setUsers(id)
  }
  

  return (
    <div className={'container'}>
      <h1 className={'text-center bg-secondary text-white pb-2 '}>Posts</h1>
      <ModalPost toggle={toggleModal} isOpen={modalVisisble} save={onSubmit} changeUser={changeUser} />
      <ToastContainer />
      <SelectUser onChange={onChangeUser}/>
      <div className={'row '}>
        {
          show ? 
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>:
          posts.map((item, index)=><div onClick={()=>onePost(item.id)} key={index} className={'col-3 my-3'} >
            <div className={'card'}>
              <div className={'card-header bg-dark text-white text-center'} style={post.card}>
                { item.title }
              </div>
              <div className={'card-body'} style={post.body}>
                <p className={'card-text text-center'}>
                  { item.body }
                </p>
              </div>
            </div>
          </div>)
        }
      </div>
    </div>
  )
}