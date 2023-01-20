import React, {useState, useEffect} from "react";
import { Routes, Route } from "react-router-dom";
import {newAxios} from './Axios/axios'
import Header from './Header/header'
import Home from './Components/home'
import Posts from './Components/posts'
import Users from './Components/users'
import Todos from './Components/todos'
import OnePost from "./Components/onePost";

function App() {
  const [postData, setPostData] = useState([])
  const [usersData, setUsersData] = useState([])
  const [todosData, setTodosData] = useState([])
  

  return (
    <div>
      <Header />
      <Routes>
        <Route path={'/'} element={<Home/>}/>
        <Route path={'/posts/:id'} element={<OnePost />}/>
        <Route path={'/posts'} element={<Posts />}/>
        <Route path={'/users'} element={<Users />}/>
        <Route path={'/todos'} element={<Todos />}/>
      </Routes>
    </div>
  );
}

export default App;
