import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.css']
})
export class UserRolesComponent implements OnInit {
  userForm:FormGroup
  constructor(private route: ActivatedRoute, private router: Router) {
    this.userForm = new FormGroup({
      uid: new FormControl("", [Validators.required]),
      password: new FormControl("",[Validators.required])
    })
  }

  ngOnInit() {
  }
  
  submit(){
  var url ="http://localhost:46767/users/login";
  let user = {
    uid: this.userForm.value.uid, 
    password: this.userForm.value.password};
  fetch(url,{
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(res => res.json())
    .then(res => {
      console.log(res.code);
      if(res.code == "user")
      this.router.navigate(['/user']);
      else if(res.code == "admin")
      this.router.navigate(['/admin']);
      else if (res.code == 0)
      alert("User is not registered/Wrong credentials");
      else
      alert("database error");
    })

}
}