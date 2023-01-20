export default function Todo({item}){
  
  const inputStyle = {
    transform: 'scale(2)'
  }
  
  return (
    <div className="d-flex align-items-center gap-5 ">
      <div>
        <input style={inputStyle} type={'checkbox'} id={('todo'+item.id).toString()} checked={item.completed}/>
      </div>
      <label htmlFor={('todo'+item.id).toString()} className="my-2 fs-2">
        {item.title}
      </label>
    </div>
  )
}