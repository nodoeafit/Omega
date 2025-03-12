import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UserService } from '../../services/admin-user-dashboard-services/user.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { SidecontentService } from '../../services/servicesDesign/sidecontent.service';

@Component({
  selector: 'app-user-card',
  imports: [CommonModule, RouterLink],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})

export class UserCardComponent implements OnInit {
  @ViewChild('contentCards', { static: true }) contentCards!: ElementRef<HTMLElement>;
  users: any[] = [];

  activateSideContent: boolean = false;

  constructor(
    private userService: UserService,
    private SidecontentService:SidecontentService,
    private renderer: Renderer2,
  ) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });

    setTimeout(() => {
      console.log(this.contentCards)

      const cardCourses = this.contentCards.nativeElement.querySelectorAll('.card-courses');
      console.log(cardCourses);

      this.SidecontentService.activateSideContent.subscribe((value) => {
        this.activateSideContent = value;
        if (this.activateSideContent) {
          cardCourses?.forEach((element) => {
            this.renderer.addClass(element, 'openSideContentCourses');
          });
        } else {
          cardCourses?.forEach((element) => {
            this.renderer.removeClass(element, 'openSideContentCourses');
          });
        }
      });
    }, 1000);
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(() => {
      this.users = this.users.filter(user => user.id !== id);
    });
  }
}
