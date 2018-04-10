/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AfmNumberComponent } from './number.component';
import { AfmValidateMessageComponent } from '../validate-message/validate-message.component';

describe('AfmNumberComponent', () => {
  let component: AfmNumberComponent;
  let fixture: ComponentFixture<AfmNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AfmNumberComponent,
        AfmValidateMessageComponent
      ],
      imports: [ReactiveFormsModule, FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfmNumberComponent);
    component = fixture.componentInstance;
    component.formControl = new FormControl();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
