import { Component, OnInit } from '@angular/core';
import { AuthHelperService } from '../../../services/helpers/auth-helper.service';
import { ArticleService } from '../../../services/common/models/article.service';
import { CommonModule } from '@angular/common';
import { Article } from '../../../contracts/articles/article';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss',
})
export class ArticleComponent implements OnInit {
  constructor(private articleService: ArticleService) {}
  form: FormGroup;

  articles: Article[] = [];

  ngOnInit() {
    
  }
  onSubmit() {
    // const formData = new FormData();
    // formData.append('Title', this.form.value.title);
    // formData.append('Content', this.form.value.content);
  }
}
