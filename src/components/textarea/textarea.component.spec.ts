/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AfmTextareaComponent } from './textarea.component';
import { AfmValidateMessageComponent } from '../validate-message/validate-message.component';

describe('AfmTextareaComponent', () => {
  let component: AfmTextareaComponent;
  let fixture: ComponentFixture<AfmTextareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AfmTextareaComponent,
        AfmValidateMessageComponent,
      ],
      imports: [ReactiveFormsModule, FormsModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfmTextareaComponent);
    component = fixture.componentInstance;
    component.formControl = new FormControl();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
