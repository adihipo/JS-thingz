import { Component, OnInit, Input } from '@angular/core';
import { Panda } from '../panda';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  @Input() myPanda: Panda;

  constructor() { }

  ngOnInit() {
  }

}
