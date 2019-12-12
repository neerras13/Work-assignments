import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  name:string 
  constructor(private route: ActivatedRoute, private router: Router) {

   }

  ngOnInit() {
    this.name = localStorage.getItem("name");
    if(this.name == null)
        this.router.navigate(['/']);
      }


}
