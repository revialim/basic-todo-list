import { 
  TodoDto 
} from "./api-types";
// import {Api} from '@puni/api-axios';
import axios from 'axios';

const server = 'http://localhost:3001/'

export class TodosApi {

  public static getTodo({todoId}: {todoId: string | number}): Promise<TodoDto> {
    return axios.get(`${server}todos/${todoId}`);
  }

  public static async getTodoList(): Promise<TodoDto[]> {
    const res = await axios.get(`${server}todos`);
    console.log('res.data', res.data);
    return res.data;
  }

  // public static createTodo(){}

  // public updateCourseLecture(
  //   {courseLectureId}: {courseLectureId: string | number},
  //   req: CreateAdmCourseLectureDto,
  // ): Promise<AdmResponseCourseLectureDto> {
  //   return this.api.put(`v3/adm/courses/courseLecture/${courseLectureId}`, req);
  // }
  // public deleteCourseLecture({courseLectureId}: {courseLectureId: string | number}): Promise<void> {
  //   return this.api.delete(`v3/adm/courses/courseLecture/${courseLectureId}`);
  // }
  // public saveCourseLectureVideo(
  //   {courseLectureId}: {courseLectureId: string | number},
  //   req: AdmCreateCourseLectureVideoEntry,
  // ): Promise<AdmResponseVideoDto> {
  //   return this.api.post(`v3/adm/courses/courseLecture/saveVideo/${courseLectureId}`, req);
  // }
  // public createCourseLecture(
  //   {courseId}: {courseId: string | number},
  //   req: CreateAdmCourseLectureDto,
  // ): Promise<AdmResponseCourseLectureDto> {
  //   return this.api.post(`v3/adm/courses/courseLecture/${courseId}`, req);
  // }
  // public findMany(req: {
  //   offset?: string | number;
  //   limit?: string | number;
  //   title: string | number;
  // }): Promise<ResponseAdminCourseCollectionDto> {
  //   return this.api.get(`v3/adm/courses`, req);
  // }
}
