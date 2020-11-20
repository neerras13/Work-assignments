import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
   data = [{
    'subject' : 'Internet of Things',
    'date' : '15 - 18 Sep',
    'topic' : 'Create an IOT system',
    'description' : 'Build an IOT system for house alarm system with email and SMS alerts.'
  },
  {
    'subject' : 'Test1',
    'date' : '919 - 919 Feb',
    'topic' : 'creat1e a test',
    'description' : '1It sho1uld be used sparingly though, since 1it is basically violating the component style encapsulation as provided by Angular. On one or two places, it’s fine.'
  },
  {
    'subject' : 'Test',
    'date' : '99 - 99 Feb',
    'topic' : 'create a test',
    'description' : 'It should be used sparingly though, since it is basically violating the component style encapsulation as provided by Angular. On one or two places, it’s fine.'
  },
  {
    'subject' : 'Test',
    'date' : '99 - 99 Feb',
    'topic' : 'create a test',
    'description' : 'It should be used sparingly though, since it is basically violating the component style encapsulation as provided by Angular. On one or two places, it’s fine.'
  }
  
];
  constructor() { }

  ngOnInit(): void {
    
  }

}
