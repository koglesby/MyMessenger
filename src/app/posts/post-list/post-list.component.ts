import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  // takes in the posts array
  posts: Post[] = [];
  isLoading = false;
  totalPosts = 10;
  postsPerPage = 3;
  pageSizeOptions = [1, 2, 5, 10, 25, 50];
  private postsSub: Subscription;

  // public keyword will create a new property (postsService) and store incoming value in that property
  constructor(public postsService: PostsService) {}

  ngOnInit() {
    this.postsService.getPosts();
    this.isLoading = true;
    // getPostUpdateListener() returns the updated posts,
    // and with subscribe, whenever they change, it will update posts here as well
    this.postsSub = this.postsService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.isLoading = false;
        this.posts = posts;
      });
  }

  onChangedPage(pageData: PageEvent) {
    console.log(pageData);
  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }

  // will prevent memory leaks
  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
