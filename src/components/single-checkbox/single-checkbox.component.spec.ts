/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AfmSingleCheckboxComponent } from './single-checkbox.component';
import { AfmValidateMessageComponent } from '../validate-message/validate-message.component';

describe('AfmSingleCheckboxComponent', () => {
  let component: AfmSingleCheckboxComponent;
  let fixture: ComponentFixture<AfmSingleCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AfmSingleCheckboxComponent,
        AfmValidateMessageComponent,
      ],
      imports: [ReactiveFormsModule, FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfmSingleCheckboxComponent);
    component = fixture.componentInstance;
    component.formControl = new FormControl();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
