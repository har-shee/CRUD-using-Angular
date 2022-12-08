import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms'
import { RestService } from './service';
import { user } from './user';
import {MatDialog} from '@angular/material/dialog'
import { option } from 'ngx-bootstrap-icons';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CRUD';

  constructor(private service: RestService, 
    private dialog:MatDialog){
   

  }

  ngOnInit(){
    this.usersToDisplay=this.service.getUsers();
  }

  user={
    id:1,
    name:'',
    salary:'',
    designation:'Manager',
  }

  
  

  usersToDisplay: user[]=this.service.getUsers();

  addingUser=new FormGroup({
    name: new FormControl('',Validators.required),
    salary: new FormControl('',Validators.required),
    designation: new FormControl('Manager',Validators.required)
  })

  get addingUserControl(){
    return this.addingUser.controls;
  }

  addUser(){
    debugger
    if(this.service.editId == 0) {

      const usersStored=this.service.getUsers()
    if(usersStored.length>0){
      const id=usersStored[usersStored.length-1].id;
      this.user.id=id+1
    }
    else{
      this.user.id=1
    }

    this.service.addingUser(this.user);
   
    this.addingUser.reset();
    this.usersToDisplay=this.service.getUsers();

    }
    else{
      console.log(this.service.editId)
      const index= this.service.editId-1;
      console.log(this.usersToDisplay[index])
      //this.usersToDisplay[this.service.editId-1]=this.service.editUSer.userInfo;
      this.usersToDisplay[index]["name"] = this.user.name;
      this.usersToDisplay[this.service.editId- 1]["salary"] = this.user.salary;
      this.usersToDisplay[this.service.editId- 1]["designation"] = this.user.designation;
      localStorage.setItem("usersDet",JSON.stringify(this.usersToDisplay));
      this.reset();
    } 

    
  }

  deleteUser(id:number){

    //const popUp=this.dialog.open(CustomConfirmBoxComponent)
  
    this.service.deleteUser(id);
    this.usersToDisplay=this.service.getUsers();
  }

  reset(){
    this.service.editId=0;
    this.user.designation='Manager'
    this.user.name=''
    this.user.salary=''
  }


  editUser(id: number){
  

    this.service.editUSer(id);
    //console.log(this.usersToDisplay)
    
    this.user.designation = this.service.userInfo[0]["designation"];
    this.user.name = this.service.userInfo[0]["name"];
    this.user.salary = this.service.userInfo[0]["salary"];
    this.usersToDisplay=this.service.getUsers();


   
   
   
  }
}
