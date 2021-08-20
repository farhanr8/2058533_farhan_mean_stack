import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TestModel } from './test.model';

@Injectable({
  providedIn: 'root'
})
export class GraderService {

  constructor(public http:HttpClient) { }

  checkTestInfo():Observable<TestModel[]> {
    return this.http.get<TestModel[]>("/assets/test.json");
  }
}
