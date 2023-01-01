export type oneThroughThree = 1 | 2 | 3;
export interface CreateTodoDto {
  title: string;
  description: string;
  priority: number;
  /**
   * {"WORK":1,"PERSONAL":2,"IMPORTANT":3}
   */
  type: oneThroughThree;
  deadline: Date;
}

export interface ResponseTodoDto {
  id: number;
  title: string;
  description: string;
  priority: number;
  isDone: boolean;
  /**
   * {"WORK":1,"PERSONAL":2,"IMPORTANT":3}
   */
  type: oneThroughThree;
  deadline: Date;
  createdAt?: Date;
  updatedAt?: Date;
}