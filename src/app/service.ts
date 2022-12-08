
import { Injectable } from "@angular/core";
import { user} from "./user";

@Injectable({
    providedIn: 'root'
})
export class RestService{

    usersList: user[]=this.getUsers();

    userInfo =  []   
    

    getUsers(){
        return JSON.parse(localStorage.getItem('usersDet')||"[]")
    }

    addingUser(u: user){
        console.log(this.usersList)
        this.usersList=this.getUsers();
        this.usersList.push(u);
     //   localStorage.setItem(this.usersList.indexOf,)
        localStorage.setItem("usersDet",JSON.stringify(this.usersList));
        console.log(this.usersList)
    }

    saveUsers(){
        this.usersList=this.getUsers();
        localStorage.setItem("usersDet",JSON.stringify(this.usersList));
        
    }


    deleteUser(userId: number){
       // console.log(userId)
        this.usersList=this.getUsers().filter((user:{id:number;})=>
        
            user.id!==userId)
      //  console.log(this.usersList)
        localStorage.setItem("usersDet",JSON.stringify(this.usersList))
    }
    editId = 0;
    editUSer(userId: number){

    

        

        this.userInfo=this.getUsers().filter((user:{id:number;})=>
        
        user.id===userId)
        
        //console.log(this.userInfo[0])
        this.editId = this.userInfo[0]["id"];
        //console.log(this.editId);

        //this.user
        

    
    }

    constructor(){}
}