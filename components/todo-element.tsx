import { ReactNode, useState } from 'react'
// import { TodoDto } from '../pages/api/api-types';
import { TodosApi } from '../pages/api/todos-api';

interface TodoElementProps {
  // children?: ReactNode,
  // todo: TodoDto,
  todoTitle: string;
  todoDesc: string;
  todoId: number ;
  onChange: () => void;
}

export const TodoElement: React.FunctionComponent<TodoElementProps> = props => {
  const {
    todoTitle,
    todoDesc,
    todoId,
    onChange
  } = props;

  const [editMode, setEditMode] = useState(false);
  const [todoTitleEdit, setTodoTitleEdit] = useState(todoTitle);
  const [todoDescEdit, setTodoDescEdit] = useState(todoDesc);

  const handleDelete = async (e:any) => {
    e.preventDefault();
    await TodosApi.deleteTodo(todoId).then((res) => {
      console.log('handleDelete res', res);
      onChange();
    });;
  }
  const handleSubmit = async (e:any) => {
    console.log('TodoElement => handleSubmit =>> todoTitleEdit ', todoTitleEdit);
    e.preventDefault();

    await TodosApi.updateTodo(
      todoId,
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
  
  if(!editMode){
    return (
      <div className="card" style={{width: '30rem'}}>
  
        <div className="card-body">
          <span>{todoId}</span>
          <h5 className="card-title">{todoTitle}</h5>
          <p className="card-text">{todoDesc}</p>
  
          <button type="button" className="btn btn-secondary" onClick={e => setEditMode(true)}>Edit</button>
          <button type="button" className="btn btn-danger" onClick={e => handleDelete(e)}>Delete</button>
        </div>
  
      </div>
    )
  } else {
    return (
      <div className="card" style={{width: '30rem'}}>

        <div className="card-body">
          <span>{todoId}</span>
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