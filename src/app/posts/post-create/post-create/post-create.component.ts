import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { CreatePostsCommand } from '../../../models';
import { PostService } from '../../../services/post-service.service';
import { filter, take, tap } from 'rxjs';

@Component({
  selector: 'app-post-create',
  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatExpansionModule,
  ],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostCreateComponent implements OnInit {
  private _fb = inject(FormBuilder);
  private _postService = inject(PostService);
  postsList = signal<CreatePostsCommand[]>([]);

  postFg = this._fb.nonNullable.group({
    title: this._fb.nonNullable.control<string>('', [Validators.required]),
    content: this._fb.nonNullable.control<string>('', [Validators.required]),
  });

  get postFgControls() {
    return this.postFg.controls;
  }

  ngOnInit(): void {
    this.fetchAllPosts();
  }

  onSubmit() {
    if (this.postFg.valid) {
      const newPost: CreatePostsCommand = {
        title: this.postFg.value.title!,
        content: this.postFg.value.content!,
        id: '',
      };

      this.savePost(newPost);

      this.postsList.update((posts) => [...posts, newPost]);
    }
  }

  fetchAllPosts() {
    this._postService
      .fetchAllPosts()
      .pipe(
        filter((res) => !!res),
        take(1)
      )
      .subscribe({
        next: (res) => {
          this.postsList.set(res.data);
        },
        error: () => {},
        complete: () => {},
      });
  }

  savePost(item: CreatePostsCommand) {
    this._postService
      .savePost(item)
      .pipe(
        filter((res) => !!res),
        take(1),
        tap(() => this.postFg.reset())
      )
      .subscribe({
        next: (res) => console.log(res),
      });
  }
}
