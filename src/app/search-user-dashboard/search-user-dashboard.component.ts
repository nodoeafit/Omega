import { Component } from '@angular/core';
import { ContainerComponent } from '../admin-components/container/container.component';

@Component({
  standalone: true,
  selector: 'app-search-user-dashboard',
  imports: [ContainerComponent],
  templateUrl: './search-user-dashboard.component.html',
  styleUrl: './search-user-dashboard.component.scss'
})
export class SearchUserDashboardComponent {
  
}
