import { ReactNode } from 'react'
import { TodoDto } from '../pages/api/api-types';
import TodoElement from './todo-element';

type TodoListProps = {
  // children?: ReactNode
  todos: TodoDto[];
}

export const TodoList: React.FunctionComponent<TodoListProps> = props => {
  const {
    todos
  } = props;

  console.log('TodoList -- todos ', todos);
  const todoElements = todos.map((t) => (<TodoElement todoTitle={t.title} todoDesc={t.description} />))
    
  return (
    <div>
      {todoElements}
    </div>
  )
};
