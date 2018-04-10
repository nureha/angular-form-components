/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AfmSelect2Component } from './select2.component';
import { AfmValidateMessageComponent } from '../validate-message/validate-message.component';
import { MULTI_IMPORT_SERVICES_MAP } from '../../services';

describe('AfmSelect2Component', () => {
  let component: AfmSelect2Component;
  let fixture: ComponentFixture<AfmSelect2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AfmSelect2Component,
        AfmValidateMessageComponent,
      ],
      imports: [ReactiveFormsModule, FormsModule],
      providers: [{
        provide: MULTI_IMPORT_SERVICES_MAP,
        useValue: {
          map: new Map()
        }
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfmSelect2Component);
    component = fixture.componentInstance;
    component.sourceName = 'list';
    component.list = [];
    component.formControl = new FormControl();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
