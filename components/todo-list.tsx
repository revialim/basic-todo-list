import { useCallback, useEffect, useState } from 'react'
import { ResponseTodoDto } from '../pages/api/api-types';
import { TodosApi } from '../pages/api/todos-api';
import { TodoElement } from './todo-element';

type TodoListProps = {
  todoCreated: boolean;
}

export const TodoList: React.FunctionComponent<TodoListProps> = props => {
  const {
    todoCreated
  } = props;

  const todos: ResponseTodoDto[] = [];

  const [selectedType, setSelectedType] = useState(null);
  const [todoElements, setTodoElements] = useState(todos.map((t) => (<TodoElement onChange={onChange} todo={t} key={t.id} />)));
  const [upActive, setUpActive] = useState(false);
  const [todoElemChange, setTodoElemChange] = useState(false);
  // const [showOnlyUndone, setShowOnlyUndone] = useState(false);

  const onChange = useCallback(() => {
    if(todoElemChange){
      setTodoElemChange(false);
    } else {
      setTodoElemChange(true);
    }
  }, [todoElemChange])

  useEffect(() => {
    TodosApi.getTodoList()
      .then(resTodos => {
        if(selectedType == 'all types' || selectedType == null){
          if(upActive){
            const sortedTodos = resTodos.sort((t1, t2) => t1.priority - t2.priority);
            setTodoElements(sortedTodos.map((t) => (<TodoElement onChange={onChange} todo={t} key={t.id} />)));
          } else {
            const sortedTodos = resTodos.sort((t1, t2) => t2.priority - t1.priority);
            setTodoElements(sortedTodos.map((t) => (<TodoElement onChange={onChange} todo={t} key={t.id} />)));
          }
        } else {//if a type is selected
          const selectedTodos = resTodos.filter((t) =>  t.type == selectedType);
          if(upActive){
            const sortedTodos = selectedTodos.sort((t1, t2) => t1.priority - t2.priority);
            setTodoElements(sortedTodos.map((t) => (<TodoElement onChange={onChange} todo={t} key={t.id} />)));
          } else {
            const sortedTodos = selectedTodos.sort((t1, t2) => t2.priority - t1.priority);
            setTodoElements(sortedTodos.map((t) => (<TodoElement onChange={onChange} todo={t} key={t.id} />)));
          }
        }
      })
      .catch(err => console.error(err));
  }, [upActive, selectedType, todoElemChange, todoCreated, onChange]);

  const handleTypeChange = (e: any) => {
    const selected = (e.target.value);
    setSelectedType(selected);
  };
    
  return (
    <div>
      <hr/>
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
            <button type="button" className={upActive? "btn btn-outline-primary active" : "btn btn-outline-primary"} onClick={e => setUpActive(true)}>up</button>
            <button type="button" className={upActive? "btn btn-outline-primary" : "btn btn-outline-primary active"} onClick={e => setUpActive(false)}>down</button>
          </div>
        </div>
      <hr/>
      {todoElements.length === 0 ? "no todos" : todoElements}
    </div>
  )
};
