"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:no-unused-variable */
var testing_1 = require("@angular/core/testing");
var forms_1 = require("@angular/forms");
var input_component_1 = require("./input.component");
var validate_message_component_1 = require("../validate-message/validate-message.component");
describe('AfmInputComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                input_component_1.AfmInputComponent,
                validate_message_component_1.AfmValidateMessageComponent,
            ],
            imports: [forms_1.ReactiveFormsModule, forms_1.FormsModule]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(input_component_1.AfmInputComponent);
        component = fixture.componentInstance;
        component.formControl = new forms_1.FormControl();
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=input.component.spec.js.map