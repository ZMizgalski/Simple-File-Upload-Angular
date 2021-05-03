import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ImageViewerModel } from './../image-viewer/models/image-viewer.model';

@Injectable({
  providedIn: 'root',
})
export class EndpointService {
  public url: string;
  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/api/';
  }

  public getFile(id: string): Observable<any> {
    return this.http.get<Blob>(this.url + 'getFile/' + id, {
      observe: 'response',
      responseType: 'blob' as 'json',
    });
  }

  public getItem(name: string): Observable<any> {
    return this.http.get(this.url + 'getName/' + name);
  }

  public getAllItems(): Observable<ImageViewerModel[]> {
    return this.http.get<ImageViewerModel[]>(this.url + '/getAllItems');
  }
}
