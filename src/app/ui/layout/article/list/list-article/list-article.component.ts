import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Article } from '../../../../../contracts/articles/article';
import { ArticleService } from '../../../../../services/common/models/article.service';
import { MatDialog } from '@angular/material/dialog';
import { EditArticleDialogComponent } from '../../../../../dialogs/edit-article-dialog/edit-article-dialog.component';

@Component({
  selector: 'app-list-article',
  standalone: true,
  imports: [MatPaginatorModule, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './list-article.component.html',
  styleUrl: './list-article.component.scss',
})
export class ListArticleComponent implements OnInit {
  displayedColumns: string[] = [
    'title',
    'createdDate',
    'updatedDate',
    'actions',
  ];
  dataSource = new MatTableDataSource<Article>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private articleService: ArticleService,
    private dialog: MatDialog
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getUser();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

   onEdit(event: MouseEvent,article: Article) {
    (event.currentTarget as HTMLElement).blur();
    console.log('Edit:', article); //todo craete modal
    this.dialog.open(EditArticleDialogComponent, {
      width: '450px',
      data: article,
    }).afterClosed().subscribe(async (result) => {
      if(result){
        await this.getUser()
      }
    });
  }

  onDelete(article: Article) {
  }

  private async getUser(){
    var result = await this.articleService.getUserArticles();

    result.map(p => p.content = JSON.parse(p.content))

    if (result === undefined) return;

    this.dataSource.data = result;
  }

}
