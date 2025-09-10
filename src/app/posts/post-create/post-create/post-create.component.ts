import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { CreatePostsCommand } from '../../../models';

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
export class PostCreateComponent {
  private _fb = inject(FormBuilder);
  postsList = signal<CreatePostsCommand[]>([]);

  postFg = this._fb.nonNullable.group({
    title: this._fb.nonNullable.control<string>('', [Validators.required]),
    post: this._fb.nonNullable.control<string>('', [Validators.required]),
  });

  get postFgControls() {
    return this.postFg.controls;
  }

  onSubmit() {
    if (this.postFg.valid) {
      const newPost: CreatePostsCommand = {
        title: this.postFg.value.title!,
        post: this.postFg.value.post!,
      };
      this.postsList.update((posts) => [...posts, newPost]);
      this.postFg.reset();
    }
  }
}

