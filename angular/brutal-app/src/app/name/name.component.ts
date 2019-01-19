import { Component, OnInit } from '@angular/core';
import { PandaService } from '../panda.service';
import { Panda } from '../panda';

@Component({
  selector: 'app-name',
  templateUrl: './name.component.html',
  styleUrls: ['./name.component.scss']
})
export class NameComponent implements OnInit {

  pandas: Panda[];
  selectedPanda: Panda;

  constructor(private pandaService: PandaService) {}

  ngOnInit() {
    this.pandas = this.pandaService.getPandas();
  }

  selectPanda(panda: Panda): void {
    this.selectedPanda = panda;
  }

}
