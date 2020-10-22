import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MembersService } from '../members.service';
import { UUID } from 'angular2-uuid';

@Component({
  selector: 'app-members-edit',
  templateUrl: './members-edit.component.html',
  styleUrls: ['./members-edit.component.css']
})
export class MembersEditComponent implements OnInit {

  genders = ['Male','Female'];
  ingenders = ['Male','Female'];
  id: number;
  editMode = false;
  memberForm: FormGroup;
  Finance: any = ['Poor (below poverty line)', 'Middle class (on poverty line)', 'Rich (above poverty line)'];
  Marital: any = ['Married', 'Divorced', 'Widow'];
  marked = false;
  theCheckbox = false;

  toggleVisibility(e){
    this.marked= e.target.checked;
  }

   uuidValue:string;
   age;
   showAge;

   ageCalculator(){
     if(this.age){
       const convertAge = new Date(this.age);
       const timeDiff = Math.abs(Date.now() - convertAge.getTime());
       this.showAge = Math.floor((timeDiff / (1000 * 3600 * 24))/365);
     }
   }

    changeFinance(e) {
    console.log(e.value)
    this.memberFinance.setValue(e.target.value, {
      onlySelf: true
    })
  }

  // Getter method to access formcontrols
  get memberFinance() {
    return this.memberForm.get('memberFinance');
  }

    // Choose finance using select dropdown
  changeMarital(e) {
    console.log(e.value)
    this.memberMarital.setValue(e.target.value, {
      onlySelf: true
    })
  }

  // Getter method to access formcontrols
  get memberMarital() {
    return this.memberForm.get('memberMarital');
  }

 generateUUID(){
    this.uuidValue=UUID.UUID();
    return this.uuidValue;
 }


  constructor(private route: ActivatedRoute,
    private membersService: MembersService,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initFrom();
      }
    )
  }

  onSubmit() {

    if(this.editMode) {
      this.membersService.updateMember(this.id, this.memberForm.value);//reactiveForm saves data
    }else{
      this.membersService.addMember(this.memberForm.value);
    }
    this.onCancel();
  }

  onAddChildren() {
    (<FormArray>this.memberForm.get('children')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'gender': new FormControl('Male'),
        'childAge': new FormControl(null,Validators.required)
      })
    )
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo:this.route})
  }

  onDeleteChildren(index: number) {
    (<FormArray>this.memberForm.get('children')).removeAt(index);
  }

  private initFrom() {
    let memberReg = '';
    let memberName = '';
    let memberDate = '';
    let memberAge = null ;
    let memberFather = '';
    let memberMother = '';
    let memberGender = '';
    let memberFinance = '';
    let memberMarital = '';
    let memberAadhar = null;
    let memberPhone = null;
    let memberImagePath = '';
    let memberDescription = '';
    let memberchildren = new FormArray([]);

    if (this.editMode) {
      const member = this.membersService.getMember(this.id)
      memberReg = member.reg;
      memberName = member.name;
      memberDate = member.date;
      memberAge = member.age;
      memberFather = member.father;
      memberMother = member.mother;
      memberGender = member.ingender;
      memberAadhar = member.aadhar;
      memberPhone = member.phone;
      memberFinance = member.memberFinance;
      memberMarital = member.memberMarital;
      memberImagePath = member.imagePath;
      memberDescription = member.description;
      if (member['children']) {
        for (let children of member.children) {
          memberchildren.push(
            new FormGroup({
              'name': new FormControl(children.name, Validators.required),
              'gender': new FormControl(children.gender,Validators.required),
              'childAge': new FormControl(children.childAge,Validators.required)
            })
          )
        }
      }
    }
    this.memberForm = new FormGroup({
      'reg': new FormControl(memberReg,Validators.required),
      'name': new FormControl(memberName, Validators.required),
      'date': new FormControl(memberDate, Validators.required),
      'age': new FormControl(memberAge, Validators.required),
      'father': new FormControl(memberFather, Validators.required),
      'mother': new FormControl(memberMother, Validators.required),
      'memberFinance': new FormControl(memberFinance, Validators.required),
      'memberMarital': new FormControl(memberMarital, Validators.required),
      'ingender': new FormControl(memberGender, Validators.required),
      'aadhar': new FormControl(memberAadhar, [Validators.required ,Validators.maxLength(14)]),
      'phone': new FormControl(memberPhone, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/),Validators.maxLength(10)]),
      'imagePath': new FormControl(memberImagePath, Validators.required),
      'description': new FormControl(memberDescription, Validators.required),
      'children': memberchildren
    });
  }


  get controls() { // a getter!
    return (<FormArray>this.memberForm.get('children')).controls;
  }

}
