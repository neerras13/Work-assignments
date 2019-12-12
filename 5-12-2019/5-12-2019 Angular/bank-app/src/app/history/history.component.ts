import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  uid: string
  transactionData: any
  depositForm: FormGroup
  depositOtherForm: FormGroup
  constructor(private route: ActivatedRoute, private router: Router) {
    this.uid = "";
    this.transactionData = [];
  }
name:string
  ngOnInit() {
    this.name = localStorage.getItem("name");
    if(this.name == null)
        this.router.navigate(['/']);
  
    this.depositForm = new FormGroup({
      amount: new FormControl("")
    })

    this.depositOtherForm = new FormGroup({
      emailOther: new FormControl(""),
      amountOther: new FormControl("")
    })
    this.uid = localStorage.getItem("name");
    if (this.uid != null) {
      var url ="http://localhost:46767/users/history/"+this.uid;
      fetch(url)
        .then(res => res.json())
        .then(res => {
          console.log(res.data);
          if(res.data.length == 0){
            document.getElementById("spinner").hidden=true;
            document.getElementById("hide").style.display="block";
          }
          else
          {
          document.getElementById("table-hide").style.display="inherit";
          this.transactionData = res.data;


        }

        })
    }
  }
}
