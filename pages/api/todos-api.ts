import { 
  CreateTodoDto,
  ResponseTodoDto
} from "./api-types";
import axios from 'axios';

const server = 'http://localhost:3001'

export class TodosApi {

  public static getTodo({todoId}: {todoId: string | number}): Promise<ResponseTodoDto> {
    return axios.get(`${server}/todos/${todoId}`);
  }

  public static async getTodoList(): Promise<ResponseTodoDto[]> {
    const res = await axios.get(`${server}/todos`);
    return res.data;
  }

  public static async createTodo(todo : CreateTodoDto): Promise<any>{
    try {
      const res = await axios.post(
        `${server}/todos`, 
        {
          title: todo.title, 
          description: todo.description, 
          priority: todo.priority,
          isDone: false, 
          type: todo.type
        });
      return res;
    } catch (error) {
      return error;
    }
  }

  public static async updateTodoIsDone(id: number, isDone : boolean): Promise<any>{
    try {
      const res = await axios.put(`${server}/todos/isDone/${id}/${isDone}`);
      return res;
    } catch (error) {
      return error;
    }
  }

  public static async updateTodo(id: number, todo : CreateTodoDto): Promise<any>{
    try {
      const res = await axios.put(
        `${server}/todos/${id}`, 
        {
          title: todo.title, 
          description: todo.description, 
          priority: todo.priority,
          type: todo.type
        });
      return res;
    } catch (error) {
      return error;
    }
  }

  public static async deleteTodo(id: number): Promise<any> {
    try {
      const res = await axios.delete(
        `${server}/todos/${id}`
      );
      return res;
    } catch (error) {
      return error;
    }
  }
}
