import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CreatePostsCommand } from '../models';
import { constants } from '../constants/app.constant';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private http = inject(HttpClient);

  private baseUrl = constants.BASE_URL;

  fetchAllPosts() {
    return this.http.get<{ message: string; data: CreatePostsCommand[] }>(
      `${this.baseUrl}/api/getAllPosts`
    );
  }

  savePost(data: CreatePostsCommand) {
   return this.http.post<{ message: string }>(this.baseUrl + '/api/savePost', data);
  }
}
