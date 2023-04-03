import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(private userService :UserService) { }
  users : any = {};
  ngOnInit(): void {

    this.userService.getAllUsers().subscribe((data: any) => {
      this.users = data.users;
      console.log(this.users);
    } )

  }
  deleteUser(id: any){
    this.userService.deleteUser(id).subscribe((data: any) => {

    if(confirm("Are you sure to delete?")){
      this.users.splice(id,1);
    }

     
  


    })
  }
}
