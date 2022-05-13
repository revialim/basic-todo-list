import { ReactNode } from 'react'

type Props = {
  children?: ReactNode,
  todoTitle: string,
  todoDesc: string
}

const TodoElement = ({ children, todoTitle, todoDesc }: Props) => {
  return (
    <div className="card" style={{width: '18rem'}}>

      <div className="card-body">
        <h5 className="card-title">{todoTitle}</h5>
        <p className="card-text">{todoDesc}</p>

        <button type="button" className="btn btn-secondary">Edit</button>
        <button type="button" className="btn btn-danger">Delete</button>
      </div>

      <div className="card-body">
        <div className="input-group input-group-sm mb-3">
            <span className="input-group-text" id="inputGroup-sizing-sm">Title</span>
            <input type="text" className="form-control" placeholder={todoTitle} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"/>
        </div>  
        <div className="input-group input-group-sm mb-3">
            <span className="input-group-text" >Description</span>
            <textarea className="form-control" aria-label="With textarea" placeholder={todoDesc}></textarea>
        </div>
        <button type="button" className="btn btn-secondary">Cancel</button>
        <button type="button" className="btn btn-primary">Save</button>
      </div>
      
    </div>
  )
  
}

export default TodoElement