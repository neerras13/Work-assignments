import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {
  balance:number
  name:string
  userForm:FormGroup
  constructor(private route: ActivatedRoute, private router: Router) {
      this.userForm = new FormGroup({
        amount: new FormControl("",[Validators.required]),
        id: new FormControl("",[Validators.required])
      })
       }

  ngOnInit() {
    document.getElementById("spinner").hidden=true;
    this.name = localStorage.getItem("name");
    if(this.name == null)
        this.router.navigate(['/']);
  }

  submit(){
    document.getElementById("spinner").hidden=false;
    var uid = localStorage.getItem("name");
    var url ="http://localhost:46767/transaction/sendUser";
    var userDetails = {
      from : uid,
      to: this.userForm.value.id,
      amount: parseInt( this.userForm.value.amount,10)
    };
    if(this.userForm.value.id == uid){
      alert("Payee ID cannot be same as current user! Enter another ID.");
    }
    else{   
    fetch(url,{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userDetails)
    })
      .then(res => res.json())
      .then(res => {
        console.log(res.code);
        if(res.code == 1)
       { 
         this.modalSpinner();
        //  document.getElementById("button").click();
      this.getBalance();
    }
        else if(res.code == 0 ){
          alert("Insufficient balance!")
        } 
        else
        alert("Transfer failed. Try again later.")
        
      })

    }
  }

modalSpinner(){
  setTimeout(()=>{
    document.getElementById("spinner").hidden=true;
    document.getElementById("button").click();

  },2000);
}

  getBalance(){
    var url ="http://localhost:46767/users/balance/"+localStorage.getItem("name");
    fetch(url,{
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => res.json())
    .then(res => {
      this.balance = res.balance
    })
   
   }
  
  

}
