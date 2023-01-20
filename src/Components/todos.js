import { useEffect, useState } from "react";
import { newAxios } from "../Axios/axios";
import Todo from "./todo";

export default function Todos() {
  const [todosData, setTodosData] = useState([]);
  const [todosDataService, setTodosDataService] = useState([]);
  const [userData, setUserData] = useState([]);
  const [showTodosData, setShowTodosData] = useState(true);
  const [completedTodo, setComplatedTodo] = useState(false);
  const [filtering, setFiltering] = useState(false);
  const [resetAll, setResetAll] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    putTodoData();
  }, []);

  async function putTodoData() {
    let a = await newAxios.get("todos");
    let u = await newAxios.get("users");

    if (a && u) {
      setTodosDataService(a.data);
      setUserData(u.data);
      setShowTodosData(false);
      const datas = a.data.filter((item, index) => index >= 0 && index < 10);
      setTodosData(datas);
    }
  }

  function filter(userId, complated, page ) {
    return todosDataService
    .filter((data) => (data.userId === parseInt(userId) || !userId) && (data.completed === complated || !filtering))
    .filter((data, index)=>index >= ((page-1)*10) && index < page*10);
  }

  function onChangeUserId(event) {
    let userId = event.target.value;
    let res = filter(userId, completedTodo, page)
    setTodosData(res)
    setResetAll(userId)
  }

  function complated(event) {
    setComplatedTodo(event.target.checked);
    const res = filter(resetAll, event.target.checked, page)
    setTodosData(res)
    setFiltering(true)
  }

  function reset() {
    setResetAll("");
    setTodosData(todosDataService.filter((item, index) => index >= 0 && index < 10));
  }

  function prevClicked() {
    setPage((prev) => (prev > 1 ? prev - 1 : 1));
 
  }
  function nextClicked() {
    setPage(prev => prev + 1 );
  }
  
  useEffect(()=>{
    const res = filter(resetAll, completedTodo, page)
    setTodosData(res)
  }, [page])
  
  
  return (
    <div className="container">
      <h1>Todos</h1>
      {showTodosData ? (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div>
          <div className="d-flex gap-3">
            <select
              className="form-select w-50"
              onChange={onChangeUserId}
              value={resetAll}
            >
              <option value={""}>All</option>
              {userData.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            <input
              type="checkbox"
              id="btncheck1"
              checked={completedTodo}
              onChange={complated}
            />
            <button className="btn btn-dark" onClick={reset}>
              Reset
            </button>
          </div>

          {todosData.map((item, index) => (
            <Todo key={index} item={item} />
          ))}

          <div className="d-flex gap-5">
            <button className="btn btn-dark" onClick={prevClicked}>
              {"<< "} Prev
            </button>
            <h2>{page}</h2>
            <button className="btn btn-dark" onClick={nextClicked}>
              Next {" >>"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
