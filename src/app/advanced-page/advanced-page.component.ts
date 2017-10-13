import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-advanced-page',
  templateUrl: './advanced-page.component.html',
  styleUrls: ['./advanced-page.component.css']
})
export class AdvancedPageComponent implements OnInit {
  photos: any[] = [
    {}, {}, {},
    {}, {}, {},
    {}, {}, {},
    {}, {}, {},
  ];

  constructor() { }

  ngOnInit() {
  }
}
