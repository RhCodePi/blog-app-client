import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-article',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-article.component.html',
  styleUrl: './create-article.component.scss'
})
export class CreateArticleComponent {

  form: FormGroup;
  
  onSubmit() {
    // const formData = new FormData();
    // formData.append('Title', this.form.value.title);
    // formData.append('Content', this.form.value.content);
  }

}
