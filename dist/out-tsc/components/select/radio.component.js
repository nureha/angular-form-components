"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var services_1 = require("../../services");
var select_base_component_1 = require("./select-base.component");
var AfmRadioComponent = /** @class */ (function (_super) {
    __extends(AfmRadioComponent, _super);
    function AfmRadioComponent(services) {
        var _this = _super.call(this, services) || this;
        _this.valueType = 'number';
        _this.list = [];
        _this.rejects = [];
        return _this;
    }
    AfmRadioComponent_1 = AfmRadioComponent;
    __decorate([
        core_1.Input(),
        __metadata("design:type", forms_1.FormControl)
    ], AfmRadioComponent.prototype, "formControl", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AfmRadioComponent.prototype, "sourceName", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AfmRadioComponent.prototype, "label", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], AfmRadioComponent.prototype, "valueType", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], AfmRadioComponent.prototype, "list", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], AfmRadioComponent.prototype, "rejects", void 0);
    AfmRadioComponent = AfmRadioComponent_1 = __decorate([
        core_1.Component({
            selector: 'afm-radio',
            templateUrl: './radio.component.html',
            styleUrls: ['./select.component.css'],
            providers: [{
                    provide: forms_1.NG_VALUE_ACCESSOR,
                    useExisting: core_1.forwardRef(function () { return AfmRadioComponent_1; }),
                    multi: true
                },
                services_1.SelectorServiceInjector
            ]
        }),
        __metadata("design:paramtypes", [services_1.SelectorServiceInjector])
    ], AfmRadioComponent);
    return AfmRadioComponent;
    var AfmRadioComponent_1;
}(select_base_component_1.AfmSelectBase));
exports.AfmRadioComponent = AfmRadioComponent;
//# sourceMappingURL=radio.component.js.map