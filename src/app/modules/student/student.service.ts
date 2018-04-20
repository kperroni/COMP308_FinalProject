import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class StudentService {

  constructor(private http: HttpClient) { }

  getStudentByUserId(id) {
    return this.http.post('student/getStudentByUserId', id);
  }

  getStudentByStudentNumber(studentNumber) {
    console.log('studentNumber', studentNumber);
    return this.http.post('student/getStudentByStudentNumber', studentNumber);
  }
  getStudentByStudentId(studentId) {
    return this.http.post('student/getStudentByStudentId', studentId);
  }
}
