import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { Post } from "../post.model";
import { PostsService } from "../posts.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"]
})
export class PostListComponent implements OnInit, OnDestroy {
  // takes in the posts array
  posts: Post[] = [];
  private postsSub: Subscription;

  // public keyword will create a new property (postsService) and store incoming value in that property
  constructor(public postsService: PostsService) { }

  ngOnInit() {
    this.postsService.getPosts();

    // getPostUpdateListener() returns the updated posts,
    // and with subscribe, whenever they change, it will update posts here as well
    this.postsSub = this.postsService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }

  // will prevent memory leaks
  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
