import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AfmInputComponent } from './components/input/input.component';
import { AfmValidateMessageComponent } from './components/validate-message/validate-message.component';
import { AfmTextareaComponent } from './components/textarea/textarea.component';
import { AfmNumberComponent } from './components/number/number.component';
import { AfmSelectComponent, AfmCheckboxComponent, AfmRadioComponent, AfmSelect2Component } from './components/select';

export const COMPONENTS = [
  AfmInputComponent,
  AfmNumberComponent,
  AfmTextareaComponent,
  AfmValidateMessageComponent,
  AfmSelectComponent,
  AfmCheckboxComponent,
  AfmRadioComponent,
  AfmSelect2Component,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
  ],
  declarations: [...COMPONENTS],
  exports:[...COMPONENTS]
})
export class AngularFormComponentsModule {}
