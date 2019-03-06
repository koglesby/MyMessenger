import { Post } from "./post.model";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

// provides the service at the root level, creating only 1 instance for the entire app.
@Injectable({ providedIn: "root" })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  getPosts() {
    return [...this.posts];
  }

  getPostUpdateListener() {
    // returns the updated posts array, can be subscribed to
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = { title, content };
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }
}
