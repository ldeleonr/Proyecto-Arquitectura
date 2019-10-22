import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CoreEnvironment } from '@angular/compiler/src/compiler_facade_interface';


@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  api = environment.BaseUrl;
  appId = environment.appId;

  constructor(private http: HttpClient) { }

  public startApp(): Observable<any> {
    return this.http.get<any>(`${this.api}/startAppWithoutForm/1001`);
  }

  public sendProcess(params: any): Observable<any> {
    return this.http.post<any>(`${this.api}/send-process`, params);
  }

  public getTask(param: any): Observable<any> {
    return this.http.post<any>(`${this.api}/next-task`, param);
  }

  public uploadFile(files: FileList, url: string): Observable<any> {

    const formData = new FormData();
    formData.append('file', files[files.length - 1], files[files.length - 1].name);

    return this.http.post<any>(`${url}`, formData);

  }

  public sendInfo(taskId: number, params: any): Observable<any> {
    return this.http.post<any>(`${this.api}/send-task/${taskId}`, params);
  }

}
