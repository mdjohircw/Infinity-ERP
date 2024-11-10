import { Component } from '@angular/core';
import { ApiServiceService } from '../../api-service.service';


@Component({
  selector: 'app-leave-application',
  templateUrl: './leave-application.component.html',
  styleUrl: './leave-application.component.css'
})
export class LeaveApplicationComponent {

  BlogPosts: any[];

  // Inject the service and fetch blog posts
  constructor(service: ApiServiceService) {
    this.BlogPosts = service.getBlogPosts();
  }
  country = ["Bangladesh", "Japan", "India","Nepal"]

  LeaveType=["casual Leave ","Sick Leave","Anual Leave","Metarity Leave"]

}
