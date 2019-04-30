import { Component, OnInit } from '@angular/core';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'fennel-todo-target',
  template: `
  <div class="target-wrapper">
    <div class="target-block">
      <label for="target{{uniqueId}}">
        <ng-content></ng-content>
      </label>
      <input type="checkbox" id="target{{uniqueId}}" />
      <div class="checkmark-wrapper"></div>
    </div>
  </div>
  `,
  styleUrls: ['./todo-target.component.scss'],
})
export class TodoTargetComponent implements OnInit {

  public uniqueId: Guid;

  constructor() { 
    this.uniqueId = Guid.create();
  }

  ngOnInit() { }

}
