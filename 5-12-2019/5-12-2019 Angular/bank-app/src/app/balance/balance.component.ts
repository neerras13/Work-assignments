import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit {
  balance: number
  name:string
  constructor(private router: Router) { }

  ngOnInit() {
    document.getElementById("bal").hidden=true;
    document.getElementById("icon").hidden=true;
    this.name = localStorage.getItem("name");
    if(this.name == null)
        this.router.navigate(['/']);
  
    var uid = localStorage.getItem("name");
    console.log(uid);
    var url ="http://localhost:46767/users/balance/"+uid;
    fetch(url,{
      method: "GET",
      headers:{
        "Content-Type":"application/json"
      }
    })
    .then(res => res.json())
    .then(res=>{
      console.log(res.balance);
     document.getElementById("icon").hidden=false;
      document.getElementById("bal").hidden=false;
      document.getElementById("spinner").hidden=true;
      this.balance = res.balance;
    })
  }

}
