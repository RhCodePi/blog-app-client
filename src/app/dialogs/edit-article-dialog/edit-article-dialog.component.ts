import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Article } from '../../contracts/articles/article';
import { ArticleService } from '../../services/common/models/article.service';
import {
  CustomToastrService,
  ToastrMessagePositon,
  ToastrMessageType,
  ToastrProgressAnimation,
} from '../../services/common/custom-toastr.service';

@Component({
  selector: 'app-edit-article-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './edit-article-dialog.component.html',
  styleUrl: './edit-article-dialog.component.scss',
})
export class EditArticleDialogComponent implements OnInit {
  form = this.fb.group({
    title: ['', Validators.required],
    content: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditArticleDialogComponent>,
    private articleService: ArticleService,
    private toastr: CustomToastrService,
    @Inject(MAT_DIALOG_DATA) public data: Article
  ) {}
  ngOnInit(): void {
    this.form.patchValue(this.data);
    debugger;
  }

  onSave() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value); // send back edited article
      if (
        this.data.title !== this.form.value.title ||
        this.data.content !== this.form.value.content
      ) {
        this.articleService.editArticle(
          this.data.id,
          this.form.value.title,
          JSON.stringify(this.form.value.content)
        );
        this.toastr.alert(
          'article edit!',
          'Success',
          ToastrMessageType.SUCCESS,
          {
            progressBar: true,
          }
        );
      } else {
        this.toastr.alert(
          'Cannot same the old!',
          'Error',
          ToastrMessageType.ERROR,
          {
            position: ToastrMessagePositon.BOTTOM_RIGHT,
            progressBar: true,
          }
        );
      }
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
