import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-secondcard',
  templateUrl: './secondcard.component.html',
  styleUrls: ['./secondcard.component.css']
})
export class SecondcardComponent implements OnInit {

  items:Array<any> =[];
  constructor(){
    this.items=[
      {name:"../../assets/images/Delhi.jpg"},
      {name:"../../assets/images/Delhi.jpg"},
      {name:"../../assets/images/Delhi.jpg"},
      {name:"../../assets/images/Delhi.jpg"},
      {name:"../../assets/images/Delhi.jpg"},
      {name:"../../assets/images/Delhi.jpg"},
      {name:"../../assets/images/Delhi.jpg"},
      {name:"../../assets/images/Delhi.jpg"},{name:"../../assets/images/Delhi.jpg"},{name:"../../assets/images/Delhi.jpg"},
      {name:"../../assets/images/Delhi.jpg"},
      {name:"../../assets/images/Delhi.jpg"},
      {name:"../../assets/images/Delhi.jpg"},
      {name:"../../assets/images/Delhi.jpg"}
     
    ];
  }
  
   

  ngOnInit() {
  }

}
