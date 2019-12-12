import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-self-transfer',
  templateUrl: './self-transfer.component.html',
  styleUrls: ['./self-transfer.component.css']
})
export class SelfTransferComponent implements OnInit {
  balance:number
  userForm:FormGroup
  name:string
  constructor(private route: ActivatedRoute, private router: Router) {
      this.userForm = new FormGroup({
        amount: new FormControl("",[Validators.required]),
        transfer: new FormControl()
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
    var option = this.userForm.value.transfer;
    var uid = localStorage.getItem("name");
    console.log(uid);
    var url ="http://localhost:46767/transaction/";
    var userDetails = {
      from : uid,
      to: uid,
      amount:   parseInt( this.userForm.value.amount,10)
    };

    //type of transfer
    if(option == "Deposit")
    {
      url = url + "deposit";
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
            document.getElementById("spinner").hidden=true;
            document.getElementById("button").click();
        this.getBalance();}
          else if(res.code == 0 ){
            alert("Deposit limit exceeded.")
          } 
          else
          alert("Deposit failed. Try again later.")
          
        })
    }

    if(option == "Withdraw"){  
    url = url + "withdraw";
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
       {// alert("Amount withdrawal successful!")
        document.getElementById("button").click();
        this.getBalance();
      }
        else if(res.code == 0 ){
          alert("Withdrawal limit exceeded.")
        } 
        else if(res.code == -1 ){
          alert("Insufficient balance")
        } 
        else
        alert("Withdrawal failed. Try again later.")
        
      })
    }

  }

  onOptionsSelected(val){
    document.getElementById('hidden_div1').style.display = "none";
      document.getElementById('hidden_div2').style.display = "none";
      document.getElementById('hidden_div3').style.display = "none";
    if(val == "Deposit"){
     document.getElementById('hidden_div1').style.display = "block";
     document.getElementById('hidden_div3').style.display = "block";

    } 
    else if(val == "Withdraw"){
      document.getElementById('hidden_div2').style.display = "block";
      document.getElementById('hidden_div3').style.display = "block";

    }
    else
    {
      document.getElementById('hidden_div1').style.display = "none";
      document.getElementById('hidden_div2').style.display = "none";
      document.getElementById('hidden_div3').style.display = "none";

    }
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
