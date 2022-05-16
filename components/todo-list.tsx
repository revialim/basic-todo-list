import { useState } from 'react'
import { ResponseTodoDto } from '../pages/api/api-types';
import TodoElement from './todo-element';

type TodoListProps = {
  todos: ResponseTodoDto[];
  onChange: () => void;
}

export const TodoList: React.FunctionComponent<TodoListProps> = props => {
  const {
    todos,
    onChange
  } = props;

  const [selectedType, setSelectedType] = useState(null);
  const [todoElements, setTodoElements] = useState(todos.map((t) => (<TodoElement onChange={onChange} todo={t} key={t.id} />)));
  const [upActive, setUpActive] = useState(false);

  const handleTypeChange = (e: any) => {
    const selected = (e.target.value);
    setSelectedType(selected);
    if(selected !== 'all types'){
      const selectedTodos = todos.filter((t) =>  t.type == selected);
      setTodoElements(selectedTodos.map((t) => (<TodoElement onChange={onChange} todo={t} key={t.id} />)));
    } else {
      setTodoElements(todos.map((t) => (<TodoElement onChange={onChange} todo={t} key={t.id} />)));
    }
  };

  const handlePriorityUpClick = (e:any) => {
    setUpActive(true);
    if(selectedType == 'all types' ||  selectedType == null){
      const sortedTodos = todos.sort((t1, t2) => t1.priority - t2.priority);
      setTodoElements(sortedTodos.map((t) => (<TodoElement onChange={onChange} todo={t} key={t.id} />)));
    } else {
      const selectedTodos = todos.filter((t) =>  t.type == selectedType);
      const sortedTodos = selectedTodos.sort((t1, t2) => t1.priority - t2.priority);
      setTodoElements(sortedTodos.map((t) => (<TodoElement onChange={onChange} todo={t} key={t.id} />)));
    }
  }

  const handlePriorityDownClick = (e:any) => {
    setUpActive(false);
    if(selectedType == 'all types' ||  selectedType == null){
      const sortedTodos = todos.sort((t1, t2) => t2.priority - t1.priority);
      setTodoElements(sortedTodos.map((t) => (<TodoElement onChange={onChange} todo={t} key={t.id} />)));
    } else {
      const selectedTodos = todos.filter((t) =>  t.type == selectedType);
      const sortedTodos = selectedTodos.sort((t1, t2) => t2.priority - t1.priority);
      setTodoElements(sortedTodos.map((t) => (<TodoElement onChange={onChange} todo={t} key={t.id} />)));
    }
  }
    
  return (
    <div>
      <div>
        <p>Filter by type:</p>
        <select className="form-select form-select-sm" aria-label=".form-select-sm example" onChange={handleTypeChange}>
          <option defaultValue="0">all types</option>
          <option value="1">work</option>
          <option value="2">personal</option>
          <option value="3">important</option>
        </select>
      </div>
      <div>
        <p>Display by priority</p>
        <div className="btn-group" role="group" aria-label="Basic outlined example">
          <button type="button" className={upActive? "btn btn-outline-primary active" : "btn btn-outline-primary"} onClick={handlePriorityUpClick}>up</button>
          <button type="button" className={upActive? "btn btn-outline-primary" : "btn btn-outline-primary active"} onClick={handlePriorityDownClick}>down</button>
        </div>
      </div>
      {todoElements.length === 0 ? "no todos" : todoElements}
    </div>
  )
};
