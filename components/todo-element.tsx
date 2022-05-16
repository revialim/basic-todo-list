import { useState } from 'react'
import { ResponseTodoDto } from '../pages/api/api-types';
import { TodosApi } from '../pages/api/todos-api';

interface TodoElementProps {
  todo: ResponseTodoDto;
  onChange: () => void;
}

export const TodoElement: React.FunctionComponent<TodoElementProps> = props => {
  const {
    todo,
    onChange
  } = props;

  const [editMode, setEditMode] = useState(false);
  const [todoTitleEdit, setTodoTitleEdit] = useState(todo.title);
  const [todoDescEdit, setTodoDescEdit] = useState(todo.description);

  const handleDelete = async (e:any) => {
    e.preventDefault();
    await TodosApi.deleteTodo(todo.id).then((res) => {
      console.log('handleDelete res', res);
      onChange();
    });;
  }
  const handleSubmit = async (e:any) => {
    console.log('TodoElement => handleSubmit =>> todoTitleEdit ', todoTitleEdit);
    e.preventDefault();

    await TodosApi.updateTodo(
      todo.id,
      {
        title: todoTitleEdit,
        description: todoDescEdit,
        priority: 9,
        type:1,
      }
    ).then((res) => {
      // console.log('todoElement => handleSubmit => res', res);
      setEditMode(false);
      onChange();
    });
  };
  const handleTitleChange = (e: any) => {setTodoTitleEdit(e.target.value)};
  const handleDescChange = (e: any) => {setTodoDescEdit(e.target.value)};
  
  if(!editMode){ // VIEW MODE
    return (
      <div className="card" style={{width: '30rem'}}>
  
        <div className="card-body">
          <span className="badge rounded-pill bg-light text-dark">{todo.id}</span>
          <span className="badge bg-info text-dark">Type: {todo.type}</span>
          <h5 className="card-title">
            {todo.title}
          </h5>
          <p className="card-text">{todo.description}</p>
          <p>Priority: {todo.priority}</p>
  
          <button type="button" className="btn btn-secondary" onClick={e => setEditMode(true)}>Edit</button>
          <button type="button" className="btn btn-danger" onClick={e => handleDelete(e)}>Delete</button>
        </div>
  
      </div>
    )
  } else { // EDIT MODE
    return (
      <div className="card" style={{width: '30rem'}}>

        <div className="card-body">
          <span>{todo.id}</span>
          <div className="input-group input-group-sm mb-3">
              <span className="input-group-text" id="inputGroup-sizing-sm">Title</span>
              <input type="text" defaultValue={todoTitleEdit} onChange={handleTitleChange} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"/>
          </div>  
          <div className="input-group input-group-sm mb-3">
              <span className="input-group-text" >Description</span>
              <textarea defaultValue={todoDescEdit} onChange={handleDescChange} className="form-control" aria-label="With textarea"></textarea>
          </div>
          <button type="button" className="btn btn-secondary" onClick={e => setEditMode(false)}>Cancel</button>
          <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save</button>
        </div>

      </div>
    )
  }
  
}

export default TodoElement