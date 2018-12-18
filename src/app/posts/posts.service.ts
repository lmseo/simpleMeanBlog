import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

import { Post } from "./post.model";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private httpClient: HttpClient) {}
  // Fetch ALL POSTS
  getPosts() {
    this.httpClient
      .get<{ message: string; posts: any }>("http://localhost:3000/api/posts")
      .pipe(
        map(res => {
          return this.transformToPostArrayData(res);
        })
      )
      .subscribe(data => {
        this.posts = data;
        this.postsUpdated.next([...this.posts]);
      });
  }
  // FETCH POST BY ID
  getPost(id: string): Observable<Post> {
    return this.httpClient
      .get<{ message: string; posts: any }>(
        "http://localhost:3000/api/posts/" + id
      )
      .pipe(
        map(data => {
          return this.transformToPostData(data);
        })
      );
  }
  // UPDATE POST BY ID
  onUpdate(id: string, title: string, content: string) {
    const post: Post = {
      id: id,
      title: title,
      content: content
    };
    // Latest copy of this.posts
    const updatedPosts = [...this.posts];

    // Current post being updated
    const oldPostIndex = updatedPosts.findIndex(p => p.id === id);

    updatedPosts[oldPostIndex] = post;
    this.posts = updatedPosts;
    this.postsUpdated.next([...this.posts]);
    return this.httpClient.put<{ message: string; data: any }>(
      "http://localhost:3000/api/posts/" + id,
      post
    );
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = { id: null, title: title, content: content };
    return this.httpClient
      .post<{ message: string; postId: string }>(
        "http://localhost:3000/api/posts",
        post
      )
      .pipe(
        map(data => {
          post.id = data.postId;
          this.posts.push(post);
          this.postsUpdated.next([...this.posts]);
          return data;
        })
      );
  }
  deletePost(id: string) {
    this.httpClient
      .delete<{ message: string }>("http://localhost:3000/api/posts/" + id)
      .subscribe(data => {
        this.posts = this.posts.filter(posts => posts.id !== id);
        this.postsUpdated.next([...this.posts]);
      });
  }
  private transformToPostData(res): Post {
    return {
      id: res.post._id,
      title: res.post.title,
      content: res.post.content
    };
  }
  private transformToPostArrayData(data): Post[] {
    return data.posts.map(post => {
      return {
        id: post._id,
        title: post.title,
        content: post.content
      };
    });
  }
}
