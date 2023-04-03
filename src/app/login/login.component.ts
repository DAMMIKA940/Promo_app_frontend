import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userData :any={}
  constructor(private user:UserService,private _router: Router) { }

  ngOnInit(): void {
  }


  loginUser() {
    this.user.loginUser(this.userData).subscribe(
    
      (res) => {

        if (res.code == 200 && res.success == true) {
          console.log("dammika",res);
          localStorage.setItem('token', JSON.stringify(res.token));
          localStorage.setItem('user', JSON.stringify(res.data));
        
          this._router.navigate(['/dashboard']).then(() => {
            window.location.reload();
          });
        }

      
        if (res.code == 200 && res.message === "Invalid Email") {
          alert(res.message);
        }
        if (res.code == 200 && res.message === "Invalid Password") {
          alert(res.message);
        }
      },
      (err) => {
        console.log(err);
        window.alert(err.error);
      }
    );
  }

}
