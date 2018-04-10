"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:no-unused-variable */
var testing_1 = require("@angular/core/testing");
var forms_1 = require("@angular/forms");
var textarea_component_1 = require("./textarea.component");
var validate_message_component_1 = require("../validate-message/validate-message.component");
describe('AfmTextareaComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                textarea_component_1.AfmTextareaComponent,
                validate_message_component_1.AfmValidateMessageComponent,
            ],
            imports: [forms_1.ReactiveFormsModule, forms_1.FormsModule],
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(textarea_component_1.AfmTextareaComponent);
        component = fixture.componentInstance;
        component.formControl = new forms_1.FormControl();
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=textarea.component.spec.js.map