/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { AfmValidateMessageComponent } from './validate-message.component';

describe('AfmValidateMessageComponent', () => {
  let component: AfmValidateMessageComponent;
  let fixture: ComponentFixture<AfmValidateMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AfmValidateMessageComponent],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfmValidateMessageComponent);
    component = fixture.componentInstance;
    component.control = new FormControl();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
