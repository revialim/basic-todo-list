import { 
  CreateTodoDto,
  ResponseTodoDto
} from "./api-types";
// import {Api} from '@puni/api-axios';
import axios from 'axios';

const server = 'http://localhost:3001/'

export class TodosApi {

  public static getTodo({todoId}: {todoId: string | number}): Promise<ResponseTodoDto> {
    return axios.get(`${server}todos/${todoId}`);
  }

  public static async getTodoList(): Promise<ResponseTodoDto[]> {
    const res = await axios.get(`${server}todos`);
    // console.log('TodosApi => getTodoList => res.data', res.data);
    return res.data;
  }

  public static async createTodo(todo : CreateTodoDto): Promise<any>{
    try {
      const res = await axios.post(
        'http://localhost:3001/todos', 
        {
          title: todo.title, 
          description: todo.description, 
          priority: todo.priority,
          isDone: false, 
          type: todo.type
        });
      // console.log('post todo ', res);
      return res;
    } catch (error) {
      // console.log('error in create new todo', error);
      return error;
    }
  }

  public static async updateTodoIsDone(id: number, isDone : boolean): Promise<any>{
    try {
      const res = await axios.put(`http://localhost:3001/todos/isDone/${id}/${isDone}`);
      // console.log('post todo ', res);
      return res;
    } catch (error) {
      // console.log('error in create new todo', error);
      return error;
    }
  }

  public static async updateTodo(id: number, todo : CreateTodoDto): Promise<any>{
    try {
      const res = await axios.put(
        `http://localhost:3001/todos/${id}`, 
        {
          title: todo.title, 
          description: todo.description, 
          priority: todo.priority,
          // isDone: , 
          type: todo.type
        });
      // console.log('post todo ', res);
      return res;
    } catch (error) {
      // console.log('error in create new todo', error);
      return error;
    }
  }

  public static async deleteTodo(id: number): Promise<any> {
    try {
      const res = await axios.delete(
        `http://localhost:3001/todos/${id}`
      );
      // console.log('delete todo ==> res', res);
      return res;
    } catch (error) {
      return error;
    }
  }
}
