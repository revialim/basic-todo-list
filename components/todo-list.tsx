import { ReactNode } from 'react'
import { ResponseTodoDto } from '../pages/api/api-types';
import TodoElement from './todo-element';

type TodoListProps = {
  // children?: ReactNode
  todos: ResponseTodoDto[];
  onChange: () => void;
}

export const TodoList: React.FunctionComponent<TodoListProps> = props => {
  const {
    todos,
    onChange
  } = props;

  console.log('TodoList -- todos ', todos);
  const todoElements = todos.map((t) => (<TodoElement onChange={onChange} todoTitle={t.title} todoDesc={t.description} todoId={t.id} key={t.id} />))
    
  return (
    <div>
      {todoElements}
    </div>
  )
};
