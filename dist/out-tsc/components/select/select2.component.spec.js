"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:no-unused-variable */
var testing_1 = require("@angular/core/testing");
var forms_1 = require("@angular/forms");
var select2_component_1 = require("./select2.component");
var validate_message_component_1 = require("../validate-message/validate-message.component");
var services_1 = require("../../services");
describe('AfmSelect2Component', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                select2_component_1.AfmSelect2Component,
                validate_message_component_1.AfmValidateMessageComponent,
            ],
            imports: [forms_1.ReactiveFormsModule, forms_1.FormsModule],
            providers: [{
                    provide: services_1.MULTI_IMPORT_SERVICES_MAP,
                    useValue: {
                        map: new Map()
                    }
                }]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(select2_component_1.AfmSelect2Component);
        component = fixture.componentInstance;
        component.sourceName = 'list';
        component.list = [];
        component.formControl = new forms_1.FormControl();
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=select2.component.spec.js.map