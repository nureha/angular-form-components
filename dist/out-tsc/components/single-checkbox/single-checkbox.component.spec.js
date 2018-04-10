"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:no-unused-variable */
var testing_1 = require("@angular/core/testing");
var forms_1 = require("@angular/forms");
var single_checkbox_component_1 = require("./single-checkbox.component");
var validate_message_component_1 = require("../validate-message/validate-message.component");
describe('AfmSingleCheckboxComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                single_checkbox_component_1.AfmSingleCheckboxComponent,
                validate_message_component_1.AfmValidateMessageComponent,
            ],
            imports: [forms_1.ReactiveFormsModule, forms_1.FormsModule]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(single_checkbox_component_1.AfmSingleCheckboxComponent);
        component = fixture.componentInstance;
        component.formControl = new forms_1.FormControl();
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=single-checkbox.component.spec.js.map