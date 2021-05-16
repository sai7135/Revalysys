import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TestDuration } from './models/testduration.model';
import { Test } from './models/test.model';
import { Result } from './models/result.model';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {
  public communicate:EventEmitter<{loggedin:boolean,username:string}>=new EventEmitter<{loggedin:boolean,username:string}>();
  public selectedTest:TestDuration;
  constructor(private http:HttpClient) { }
  public SignUp(model){
    return this.http.post("https://localhost:44308/api/Users/SignUp",model);
  }
  public Login(model):Observable<{token:string}>{
    return this.http.post<{token:string}>("https://localhost:44308/api/Users/LogIn",model);
  }
  public AdminLogin(model):Observable<{token:string}>{
    return this.http.post<{token:string}>("https://localhost:44308/api/Admin/LogIn",model);
  }
  public CheckUserExist():Observable<boolean>{
    return this.http.get<{message:string}>("https://localhost:44308/api/Users/UserName",{observe: 'response'}).pipe(map(val=>{
      if(val.status==200){
        return true;
      }
      else{
        return false;
      }
    }),catchError(r=>of(false)));
  }
  public CheckAdminExist():Observable<boolean>{
    return this.http.get<{message:string}>("https://localhost:44308/api/Admin/UserName",{observe: 'response'}).pipe(map(val=>{
      if(val.status==200){
        return true;
      }
      else{
        return false;
      }
    }),catchError(r=>of(false)));
  }
  public GetUserName():Observable<{message:string}>{
    return this.http.get<{message:string}>("https://localhost:44308/api/Users/UserName");
  }
  public GetAdminName():Observable<{message:string}>{
    return this.http.get<{message:string}>("https://localhost:44308/api/Admin/UserName");
  }
  public AddQuestion(model){
    return this.http.post("https://localhost:44308/api/AdminPortal/AddQuestion",model);
  }
  public AddTest(model){
    return this.http.post("https://localhost:44308/api/AdminPortal/AddTest",model);
  }
  public GetAllAdminTest():Observable<TestDuration[]>{
    return this.http.get<TestDuration[]>("https://localhost:44308/api/AdminPortal/Test");
  }
  public GetAllUserTest():Observable<TestDuration[]>{
    return this.http.get<TestDuration[]>("https://localhost:44308/api/UsertTest/Test");
  }
  public GetTestData(testName:string):Observable<Test[]>{
    return this.http.get<Test[]>(`https://localhost:44308/api/UsertTest/TestData?TestName=${testName}`);
  }
  public SubmitAnswers(model){
    return this.http.post('https://localhost:44308/api/UsertTest/Submit',model);
  }
  public GetResults(tableName:string):Observable<Result[]>{
    return this.http.get<Result[]>(`https://localhost:44308/api/AdminPortal/GetResults?TestName=${tableName}`)
  }
}
