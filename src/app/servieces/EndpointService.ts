import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    return this.http.get(this.url + 'getFile/' + id);
  }

  public getItem(name: string): Observable<any> {
    return this.http.get(this.url + 'getName/' + name);
  }

  public getAllItems(): Observable<ImageViewerModel[]> {
    return this.http.get<ImageViewerModel[]>(this.url + '/getAllItems');
  }
}
