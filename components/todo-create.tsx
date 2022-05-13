import axios from 'axios';
import { ReactNode } from 'react'
import { TodoDto } from '../pages/api/api-types'


interface TodoCreateProps {
  // todoInfo: TodoDto;
  // handleTitleChange: (event: any) => void;
  // handleDescChange: (event: any) => void;
}

export const TodoCreate: React.FunctionComponent<TodoCreateProps> = props => {
  const {
    // todoInfo,
    // handleTitleChange,
    // handleDescChange
  } = props;

  const handleSubmit = async (e:any) => {
    console.log('save button / handleSubmit clicked');

    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:3001/todos', 
        {
          title: 'asdf', description: 'test desc', id: 1,
          priority: 9,
          isDone: false,
          type: 1
        });

      console.log(response);
    } catch (error) {
      console.log('error in create new todo')
      // setErrorRestaurants(error);
    }
  };

  return (
    <div className="card" style={{width: '18rem'}}>
        
      <div className="card-body">
        <h5>New Todo</h5>
        <div className="input-group input-group-sm mb-3">
            <span className="input-group-text" id="inputGroup-sizing-sm">Title</span>
            <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"/>
        </div>  
        <div className="input-group input-group-sm mb-3">
            <span className="input-group-text" >Description</span>
            <textarea className="form-control" aria-label="With textarea"></textarea>
        </div>
        {/* <button type="button" className="btn btn-secondary">Cancel</button> */}
        <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save</button>
      </div>
      
    </div>
  );
}
