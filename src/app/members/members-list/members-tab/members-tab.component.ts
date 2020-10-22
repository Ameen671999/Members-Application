import { Component, Input, OnInit } from '@angular/core';
import { Member } from '../../members.model'

@Component({
  selector: 'app-members-tab',
  templateUrl: './members-tab.component.html',
  styleUrls: ['./members-tab.component.css']
})
export class MembersTabComponent implements OnInit {
  @Input() member: Member;
  @Input() index : number;

  constructor() { }

  ngOnInit(): void {
  }

}
