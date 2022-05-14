// import axios from 'axios';
import { ReactNode, useState } from 'react';
// import { TodoDto } from '../pages/api/api-types';
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
  // const [todoPriority, setTodoPriority] = useState(0);

  const handleSubmit = async (e:any) => {
    // console.log('save button / handleSubmit clicked');
    // console.log('handleSubmit =>> todoTitle ', todoTitle);
    e.preventDefault();

    await TodosApi.createTodo({
      title: todoTitle,
      description: todoDescription,
      priority: 9,
      type:1,
    }).then((res) => {
      // console.log('handleSubmit res', res);
      onCreate();
    });
  };

  const handleTitleChange = (e: any) => {setTodoTitle(e.target.value)};
  const handleDescChange = (e: any) => {setTodoDescription(e.target.value)};


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
          {/* <button type="button" className="btn btn-secondary">Cancel</button> */}
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
