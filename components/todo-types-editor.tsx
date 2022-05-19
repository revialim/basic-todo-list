// import axios from 'axios';
import { useState } from 'react';
// import { oneThroughThree } from '../pages/api/api-types';
// // import { TodoDto } from '../pages/api/api-types';
// import { TodosApi } from '../pages/api/todos-api';


interface TodoTypesEditorProps {
  // onCreate: () => void;
}

export const TodoTypesEditor: React.FunctionComponent<TodoTypesEditorProps> = props => {
  const {
    // onCreate,
  } = props;

  // const 
  const [todoTypeInput, setTodoTypeInput] = useState('');

  const handleTextInputChange = (e:any) => {
    setTodoTypeInput(e.target.value);
  }

  return (
    <div>
      <div className="input-group input-group-sm mb-3">
        <span className="input-group-text" id="inputGroup-sizing-sm">Todo type</span>
        <input type="text" defaultValue='' onChange={handleTextInputChange} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"/>
      </div>
      {todoTypeInput? `Create new type ${todoTypeInput}?` : ''}
      <button type="button" className="btn btn-outline-primary" onClick={e => {}}>create new todo type</button>
    </div>
  );

}
