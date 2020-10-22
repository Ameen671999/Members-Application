import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Member } from '../members.model'
import { MembersService } from '../members.service';

@Component({
  selector: 'app-members-detail',
  templateUrl: './members-detail.component.html',
  styleUrls: ['./members-detail.component.css']
})
export class MembersDetailComponent implements OnInit {

 member: Member;
 id: number;

  constructor(private membersService:MembersService,
    private route:ActivatedRoute,
    private router:Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params:Params) => {
        this.id = +params['id'];
        this.member = this.membersService.getMember(this.id);//subscribe used in edit also
      }
    )
  }

  // onAddtoShoppingList() {
  //   this.membersService.addIngredientsToShoppingList(this.recipe.ingredients);
  // }

  onEditMember() {
    this.router.navigate(['edit'], {relativeTo: this.route})
    //this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteMember() {
    this.membersService.deleteMembers(this.id);
    this.router.navigate(['/members']);
  }

}
