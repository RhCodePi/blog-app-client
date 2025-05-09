import { Component } from '@angular/core';
import { LayoutComponent } from './layout/layout.component';


@Component({
  selector: 'app-ui',
  standalone: true,
  imports: [LayoutComponent],
  templateUrl: './ui.component.html',
  styleUrl: './ui.component.scss'
})
export class UiComponent {

}
