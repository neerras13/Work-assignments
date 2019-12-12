import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  acc_no:string
  userForm:FormGroup
  constructor(private route: ActivatedRoute, private router: Router) {
    this.userForm = new FormGroup({
      name: new FormControl("", [Validators.required,Validators.minLength(3),Validators.pattern('^[a-zA-Z]*$')]),
      email: new FormControl("", [Validators.required,Validators.email]),
      acc_no:new FormControl("", [Validators.required,Validators.pattern('^[0-9]*$'),Validators.minLength(10)]),
      acc:new FormControl("", [Validators.required]),
      uid: new FormControl("", [Validators.required]),
      balance: new FormControl("", [Validators.required]),
      password: new FormControl("",[Validators.required,Validators.minLength(8)]),
      password1:new FormControl("", [Validators.required,Validators.minLength(8)]),
    })
  }
  ngOnInit() {
  }

  submit(){
    document.getElementById("hide-acc_no").style.display="none"; 
    document.getElementById("hide-email").style.display="none"; 
    document.getElementById("hide-password").style.display="none";   


    console.log("test");
    var url ="http://localhost:46767/users/signup";
     this.acc_no = this.userForm.value.acc_no;
    var _uid = this.userForm.value.name + this.acc_no.substr(6,9);
    let user = {
      name: this.userForm.value.name,
      email: this.userForm.value.email,
      uid: _uid, 
      acc_no: this.userForm.value.acc_no,
      acc:this.userForm.value.acc,
      balance: this.userForm.value.balance,
      password: this.userForm.value.password
    };
     
    if(this.userForm.value.password == this.userForm.value.password1)
    {
      fetch(url,{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      })
        .then(res => res.json())
        .then(res => {
          console.log(res);
          if(res.code == 1){  

           alert(`Registration Success. Your login ID is ${_uid}. Kindly login again. `)
          this.router.navigate(['/']);
          }
          else if(res.code == -1){
            document.getElementById("hide-acc_no").style.display="block"; 
          }
          else
          document.getElementById("hide-email").style.display="block"; 
        })
    }
    else
{ document.getElementById("hide-password").style.display="block";   
  //alert("Passwords do not match. Re enter password.")
}
    
  
  }


}
