"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:no-unused-variable */
var testing_1 = require("@angular/core/testing");
var forms_1 = require("@angular/forms");
var number_component_1 = require("./number.component");
var validate_message_component_1 = require("../validate-message/validate-message.component");
describe('AfmNumberComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                number_component_1.AfmNumberComponent,
                validate_message_component_1.AfmValidateMessageComponent
            ],
            imports: [forms_1.ReactiveFormsModule, forms_1.FormsModule]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(number_component_1.AfmNumberComponent);
        component = fixture.componentInstance;
        component.formControl = new forms_1.FormControl();
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=number.component.spec.js.map