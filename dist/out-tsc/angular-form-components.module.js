"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var input_component_1 = require("./components/input/input.component");
var validate_message_component_1 = require("./components/validate-message/validate-message.component");
var textarea_component_1 = require("./components/textarea/textarea.component");
var number_component_1 = require("./components/number/number.component");
var select_1 = require("./components/select");
exports.COMPONENTS = [
    input_component_1.AfmInputComponent,
    number_component_1.AfmNumberComponent,
    textarea_component_1.AfmTextareaComponent,
    validate_message_component_1.AfmValidateMessageComponent,
    select_1.AfmSelectComponent,
    select_1.AfmCheckboxComponent,
    select_1.AfmRadioComponent,
    select_1.AfmSelect2Component,
];
var AngularFormComponentsModule = /** @class */ (function () {
    function AngularFormComponentsModule() {
    }
    AngularFormComponentsModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
            ],
            providers: [],
            declarations: exports.COMPONENTS.slice(),
            exports: exports.COMPONENTS.slice()
        })
    ], AngularFormComponentsModule);
    return AngularFormComponentsModule;
}());
exports.AngularFormComponentsModule = AngularFormComponentsModule;
//# sourceMappingURL=angular-form-components.module.js.map