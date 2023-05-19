import { Component, Input, OnInit } from '@angular/core';
import { DeveloperSimplified } from 'src/app/model/developer/developerSimplified';

@Component({
  selector: 'app-developer-list',
  templateUrl: './developer-list.component.html',
  styleUrls: ['./developer-list.component.css']
})
export class DeveloperListComponent implements OnInit {

  // it takes data from components we include this one in
  @Input() developers: DeveloperSimplified[];

  constructor() { }

  ngOnInit(): void {
  }

}
