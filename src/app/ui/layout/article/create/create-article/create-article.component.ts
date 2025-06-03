import { Component} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ArticleService } from '../../../../../services/common/models/article.service';
import { CustomToastrService, ToastrMessagePositon, ToastrMessageType } from '../../../../../services/common/custom-toastr.service';

@Component({
  selector: 'app-create-article',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-article.component.html',
  styleUrl: './create-article.component.scss',
})
export class CreateArticleComponent{
  constructor(
    private articleService: ArticleService,
    private toastr: CustomToastrService
  ) {}

  async create(){
    const title = document.getElementById('title') as HTMLInputElement
    const content = document.getElementById('content') as HTMLInputElement

    const json_content = JSON.stringify(content.value)

    const result = await this.articleService.createArticle(title.value, json_content)

    if(result === undefined) return

    if(result){
      this.toastr.alert("article created!", "Success", ToastrMessageType.SUCCESS)
    }
    else {
      this.toastr.alert("something went wrong!", "Error", ToastrMessageType.ERROR, {
        progressBar: true, 
        position: ToastrMessagePositon.BOTTOM_RIGHT
      })
    }
  }

}
