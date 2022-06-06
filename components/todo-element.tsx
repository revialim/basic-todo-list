import { useState } from 'react'
import { ResponseTodoDto } from '../pages/api/api-types';
import { TodosApi } from '../pages/api/todos-api';
import { TodoIsDoneCheck } from './todo-form-elements';

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
  const [todoPriorityEdit, setTodoPriorityEdit] = useState(todo.priority);
  const [todoTypeEdit, setTodoTypeEdit] = useState(todo.type);
  const [todoIsDone, setTodoIsDone] = useState(todo.isDone);

  const handleDelete = async (e:any) => {
    e.preventDefault();
    await TodosApi.deleteTodo(todo.id).then((res) => {
      onChange();
    });;
  }
  const handleSubmit = async (e:any) => {
    e.preventDefault();

    await TodosApi.updateTodo(
      todo.id,
      {
        title: todoTitleEdit,
        description: todoDescEdit,
        priority: todoPriorityEdit,
        type: todoTypeEdit,
      }
    ).then((res) => {
      setEditMode(false);
      onChange();
    });
  };

  const handleIsDoneChange = async (e: any) => {
    if(todoIsDone){
      setTodoIsDone(false);
      await TodosApi.updateTodoIsDone(todo.id, false).then(res => (onChange()));
    } else {
      setTodoIsDone(true);
      await TodosApi.updateTodoIsDone(todo.id, true).then(res => (onChange()));
    }
  }

  const handleTitleChange = (e: any) => {setTodoTitleEdit(e.target.value)};
  const handleDescChange = (e: any) => {setTodoDescEdit(e.target.value)};
  const handlePriorityChange = (e: any) => {setTodoPriorityEdit(e.target.value)};
  const handleTypeChange = (e: any) => {setTodoTypeEdit(e.target.value)};
  
  if(!editMode){ // VIEW MODE
    const todoTypeText = todo.type === 1? 'work' : todo.type === 2? 'personal' : 'important' ;

    return (
      <div className="card" style={{width: '30rem'}}>
  
        <div className="card-body">
          <span className="badge rounded-pill bg-light text-dark">{todo.id}</span>
          <span className="badge bg-info text-dark">{todoTypeText}</span>
          <h5 className="card-title">
            {todo.title}
          </h5>
          <p className="card-text">{todo.description}</p>
          <p>Priority: {todo.priority}</p>

          <TodoIsDoneCheck isDone={todoIsDone} onChange={handleIsDoneChange} />

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
          <div>
            <label htmlFor="customRange2" className="form-label">Priority: {todoPriorityEdit}</label>
            <input type="range" className="form-range" defaultValue={todoPriorityEdit} min="1" max="10" id="customRange2" onChange={handlePriorityChange}/>
          </div>
          <div>
            <p>Type: {todoTypeEdit}</p>
            <select defaultValue={todoTypeEdit} className="form-select form-select-sm" aria-label=".form-select-sm example" onChange={handleTypeChange}>
              <option value="1">work</option>
              <option value="2">personal</option>
              <option value="3">important</option>
            </select>
          </div>
          <button type="button" className="btn btn-secondary" onClick={e => setEditMode(false)}>Cancel</button>
          <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save</button>
        </div>

      </div>
    )
  }
  
}
