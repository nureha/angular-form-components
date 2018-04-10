import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'validate-message',
  templateUrl: './validate-message.component.html',
  styleUrls: ['./validate-message.component.css']
})
export class AfmValidateMessageComponent implements OnInit {

  @Input() control: FormControl;

  constructor() {}

  ngOnInit() {}

}
