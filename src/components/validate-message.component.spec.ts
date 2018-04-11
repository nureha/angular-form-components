/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { AfcValidateMessageComponent } from './validate-message.component';

describe('AfcValidateMessageComponent', () => {
  let component: AfcValidateMessageComponent;
  let fixture: ComponentFixture<AfcValidateMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AfcValidateMessageComponent],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfcValidateMessageComponent);
    component = fixture.componentInstance;
    component.control = new FormControl();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
