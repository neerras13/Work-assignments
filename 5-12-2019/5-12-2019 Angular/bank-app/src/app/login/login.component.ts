import { Component, OnInit, ViewChild, ElementRef, Inject, PLATFORM_ID, Injector } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userForm:FormGroup
  private modalService: NgbModal
  constructor(private route: ActivatedRoute, private router: Router,@Inject(PLATFORM_ID)private platformId: Object,private injector: Injector) 
  {
    if(isPlatformBrowser(this.platformId)){
      this.modalService = this.injector.get(NgbModal);
    }
    this.userForm = new FormGroup({
        uid: new FormControl("", [Validators.required]),
        password: new FormControl("",[Validators.required])
      })
  }

  ngOnInit() {
  }

  submit(){
    var url ="http://localhost:46767/users/loginNew";
    let user = {
      uid: this.userForm.value.uid, 
      password: this.userForm.value.password
    };
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
        if(res.code == 1){
          localStorage.setItem("name", user.uid); 
          this.router.navigate(['/userHome']);
        }
        else if(res.code == 0)
        {
          document.getElementById("button").click();
          //this.openModal.nativeElement.click();
        // alert("User ID does not exist! Register with us here.")
        }
        else if(res.code == -1)
document.getElementById("hide-password").style.display="block";
        else
        alert("Server error!");
        
      })
  
  }

  
}
