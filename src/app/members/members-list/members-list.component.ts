import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Member } from '../members.model';
import { MembersService } from '../members.service'

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.css']
})
export class MembersListComponent implements OnInit {

  members: Member[];
  subscription:Subscription

  constructor(private membersService:MembersService,
    private router:Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.membersService.membersChanged.subscribe(
      (members:Member[]) => {
        this.members = members;
      }
    );
    this.members = this.membersService.getMembers();
  }

  onNewMember() {
    this.router.navigate(['new'], {relativeTo: this.route});//also giving current route
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
