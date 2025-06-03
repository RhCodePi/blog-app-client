import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Article } from '../../../../../contracts/articles/article';
import { ArticleService } from '../../../../../services/common/models/article.service';

@Component({
  selector: 'app-list-article',
  standalone: true,
  imports: [MatPaginatorModule, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './list-article.component.html',
  styleUrl: './list-article.component.scss',
})
export class ListArticleComponent implements OnInit {
  displayedColumns: string[] = ['title', 'createdDate', 'updatedDate', 'actions'];
  dataSource = new MatTableDataSource<Article>();
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private articleService: ArticleService){}


  async ngOnInit(): Promise<void> {

    var result = await this.articleService.getUserArticles()

    if(result === undefined) return;

    this.dataSource.data = result

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onEdit(article: Article) {
    console.log('Edit:', article);
  }

  onDelete(article: Article) {
  }

}
