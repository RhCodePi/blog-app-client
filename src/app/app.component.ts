import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { UiComponent } from "./ui/ui.component";
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UiComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'blog-app-client';
}
