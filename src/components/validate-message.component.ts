import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'validate-message',
  template: '<span [hidden]="!control.touched || control.valid"><ng-content></ng-content></span>',
  styles: [`
    span {
      position: absolute;
      color: #ffffff;
      top: -15px;
      right: -10px;
      padding: 7px;
      background-color: #bd362f;
      border-radius: 7px;
    }
  `, `
    span:before {
      content: "";
      position: absolute;
      top: 100%;
      left: 50%;
      margin-left: -7px;
      border: 7px solid transparent;
      border-top: 7px solid #bd362f;
    }
  `]
})
export class AfcValidateMessageComponent implements OnInit {

  @Input() control: FormControl;

  constructor() {}

  ngOnInit() {}

}
