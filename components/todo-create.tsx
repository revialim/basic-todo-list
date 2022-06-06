import { useState } from 'react';
import { oneThroughThree } from '../pages/api/api-types';
import { TodosApi } from '../pages/api/todos-api';


interface TodoCreateProps {
  onCreate: () => void;
}

export const TodoCreate: React.FunctionComponent<TodoCreateProps> = props => {
  const {
    onCreate,
  } = props;

  const [inputFieldVisibility, setInputFieldVisibility] = useState(false);
  const [todoTitle, setTodoTitle] = useState('input title');
  const [todoDescription, setTodoDescription] = useState('input description');
  const [todoPriority, setTodoPriority] = useState(1);
  const [todoType, setTodoType] = useState<oneThroughThree>(1);

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    await TodosApi.createTodo({
      title: todoTitle,
      description: todoDescription,
      priority: todoPriority,
      type: todoType,
    }).then((res) => {
      onCreate();
      //reset create element
      setInputFieldVisibility(false);
      setTodoTitle('');
      setTodoDescription('');
      setTodoPriority(1);
      setTodoType(1);
    });
  };

  const handleTitleChange = (e: any) => {setTodoTitle(e.target.value)};
  const handleDescChange = (e: any) => {setTodoDescription(e.target.value)};
  const handlePriorityChange = (e: any) => {setTodoPriority(e.target.value)};
  const handleTypeChange = (e: any) => {setTodoType(e.target.value)};


  if(inputFieldVisibility){
    return (
      <div className="card" style={{width: '30rem'}}>
          
        <div className="card-body">
          <h5>New Todo</h5>
          <div className="input-group input-group-sm mb-3">
              <span className="input-group-text" id="inputGroup-sizing-sm">Title</span>
              <input type="text" defaultValue='' onChange={handleTitleChange} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"/>
          </div>  
          <div className="input-group input-group-sm mb-3">
              <span className="input-group-text" >Description</span>
              <textarea defaultValue='' onChange={handleDescChange} className="form-control" aria-label="With textarea" />
          </div>
          <div>
            <label htmlFor="customRange2" className="form-label">Priority: {todoPriority}</label>
            <input type="range" className="form-range" defaultValue={todoPriority} min="1" max="10" id="customRange2" onChange={handlePriorityChange}/>
          </div>
          <div>
            <p>Type: {todoType}</p>
            <select className="form-select form-select-sm" aria-label=".form-select-sm example" onChange={handleTypeChange}>
              <option value="1">work</option>
              <option value="2">personal</option>
              <option value="3">important</option>
            </select>
          </div>
          <p className="card-text"></p>{/* hacky way to add space between select element and buttons */}
          <button type="button" className="btn btn-secondary" onClick={e => setInputFieldVisibility(false)}>Cancel</button>
          <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save</button>
        </div>
        
      </div>
    );
  } else {
    return (
      <button type="button" className="btn btn-primary" onClick={e => setInputFieldVisibility(true)}>Create new todo</button>
    )
  }

}
