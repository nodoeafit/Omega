import { Component } from '@angular/core';
import { SearchBarComponent } from "../search-bar/search-bar.component";
import { UserCardComponent } from "../user-card/user-card.component";
import { SearchFilterComponent } from "../search-filter/search-filter.component";
import { AddUserButtonComponent } from "../add-user-button/add-user-button.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-container',
  imports: [SearchBarComponent, UserCardComponent, SearchFilterComponent, AddUserButtonComponent],
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss'
})
export class ContainerComponent {

}
