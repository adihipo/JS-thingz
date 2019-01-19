import { Injectable } from '@angular/core';
import { Panda } from './panda';
import { pandalist } from './pandas';

@Injectable({
  providedIn: 'root'
})
export class PandaService {

  constructor() { }

  getPandas(): Panda[] {
    return pandalist;
  }
}
