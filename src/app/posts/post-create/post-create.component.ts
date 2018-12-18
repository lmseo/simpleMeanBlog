import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";

import { PostsService } from "../posts.service";
import { Post } from "../post.model";
import { MatchValidator } from "../../shared/match.validator";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"]
})
export class PostCreateComponent implements OnInit {
  private mode = "create";
  private post: Post;
  private postId: string;
  private isLoading = false;
  private formPost: FormGroup;

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formPost = new FormGroup({
      title: new FormControl("", [Validators.required]),
      content: new FormControl("", [Validators.required])
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("postId")) {
        this.mode = "edit";
        this.postId = paramMap.get("postId");
        this.isLoading = true;
        this.postsService.getPost(this.postId).subscribe(post => {
          this.isLoading = false;
          this.content.patchValue(post.content);
          this.title.patchValue(post.title);
          this.post = post;
          if (this.post) {
            const matchValidator = new MatchValidator(this.post);
            this.formPost.setValidators(
              matchValidator.match.bind(matchValidator)
            );
          }
        });
      } else {
        this.mode = "create";
        this.post = null;
      }
    });
  }

  onSavePost() {
    if (this.formPost.invalid) {
      return;
    }
    if (this.mode === "create") {
      this.isLoading = true;
      this.postsService
        .addPost(this.title.value, this.content.value)
        .subscribe(data => {
          this.snackBar.open(data.message, "CLOSE", {
            duration: 2000
          });
          this.isLoading = false;
          this.formPost.reset();
          this.router
            .navigate(["/", "edit", data.postId])
            .then(() => {})
            .catch(() => {});
        });
    } else if (this.mode === "edit") {
      this.postsService
        .onUpdate(this.post.id, this.title.value, this.content.value)
        .subscribe(data => {
          this.snackBar.open(data.message, "CLOSE", {
            duration: 2000
          });
          this.post.title = this.title.value;
          this.post.content = this.content.value;
          this.formPost.reset(this.formPost.value);
        });
    }
  }

  get content() {
    return this.formPost.get("content");
  }

  get title() {
    return this.formPost.get("title");
  }
}
