import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PostModel } from './post-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private baseUrl = 'http://localhost:8080/api/posts';

  constructor(private http: HttpClient) { }

  getAllPosts(options?: { headers?: HttpHeaders }): Observable<PostModel[]> {
    return this.http.get<PostModel[]>(`${this.baseUrl}/getAllPosts`, options);
  }

}
