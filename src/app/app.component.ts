import { Component } from '@angular/core';
import { UiComponent } from './ui/ui.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UiComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'blog-app-client';
}
