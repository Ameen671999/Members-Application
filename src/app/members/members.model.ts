import { Children } from './childeren-model';

export class Member {
  public reg: string;
  public name: string;
  public date: string;
  public age: number;
  public father: string;
  public mother: string;
  public ingender: string;
  public memberFinance: string;
  public memberMarital: string;
  public aadhar: number;
  public phone: number;
  public description : string;
  public imagePath: string;
  public children : Children[]; //bcs its an array

  constructor(reg: string,name: string, date: string, age: number, father: string,
     mother: string, ingender: string, memberFinance: string, memberMarital: string,
      aadhar: number, phone: number, desc: string,
    imagePath: string, children: Children[]) {
    this.reg = reg;
    this.name = name;
    this.date = date;
    this.age = age;
    this.father = father;
    this.mother = mother;
    this.ingender = ingender;
    this.memberFinance = memberFinance;
    this.memberMarital = memberMarital;
    this.aadhar = aadhar;
    this.phone = phone;
    this.description = desc;
    this.imagePath = imagePath;
    this.children = children;
  }
}
