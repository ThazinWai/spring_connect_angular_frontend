import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { PostModel } from '../shared/post-model';
import { PostService } from '../shared/post.service';
import { AuthService } from '../auth/shared/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts: Array<PostModel> = [];
  headers: HttpHeaders;

  constructor(private postService: PostService, private authService: AuthService) {
    const token = this.authService.getJwtToken();
    this.headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  ngOnInit(): void {
    this.postService.getAllPosts({ headers: this.headers }).subscribe(
      posts => {
        this.posts = posts;
      },
      error => {
        console.error('Error fetching posts:', error);
      }
    );
  }
}
