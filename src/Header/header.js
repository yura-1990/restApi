import { Link } from "react-router-dom";

export default function header(){
  return (
    <header>
      <nav className={'bg-dark'}>
        <div className={'container'}>
          <ul className={'navbar'}>
            <li><Link to="/" className={'nav-link text-white '}>React Api Caller</Link></li>
            <li><Link to="/todos" className={'nav-link text-white '}>Todos</Link></li>
            <li><Link to="/users" className={'nav-link text-white '}>Users</Link></li>
            <li><Link to="/posts" className={'nav-link text-white '}>Posts</Link></li>
          </ul>
        </div>
      </nav>
    </header>
  )
}