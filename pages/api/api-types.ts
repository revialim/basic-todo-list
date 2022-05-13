// export interface TodoListDto {
//   items: TodoDto[];
// }
export interface TodoDto {
  id: number;
  title: string;
  description: string;
  priority: number;
  isDone: boolean;
  /**
   * {"WORK":1,"PERSONAL":2,"IMPORTANT":3}
   */
  type: 1 | 2 | 3 ;
  createdAt: Date;
  updatedAt: Date;
}