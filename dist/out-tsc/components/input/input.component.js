"use strict";
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
var AfmInputComponent = /** @class */ (function () {
    function AfmInputComponent() {
        this.type = 'text';
        this._readonly = false;
    }
    AfmInputComponent_1 = AfmInputComponent;
    Object.defineProperty(AfmInputComponent.prototype, "readonly", {
        get: function () {
            return this._readonly;
        },
        set: function (flag) {
            this._readonly = flag;
        },
        enumerable: true,
        configurable: true
    });
    AfmInputComponent.prototype.ngOnInit = function () {
        var err = this.formControl.validator && this.formControl.validator(new forms_1.FormControl());
        this.required = !!err && !!err['required'];
    };
    AfmInputComponent.prototype.writeValue = function (_) { };
    AfmInputComponent.prototype.registerOnChange = function (_) { };
    AfmInputComponent.prototype.registerOnTouched = function (_) { };
    __decorate([
        core_1.Input(),
        __metadata("design:type", forms_1.FormControl)
    ], AfmInputComponent.prototype, "formControl", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AfmInputComponent.prototype, "label", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], AfmInputComponent.prototype, "type", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], AfmInputComponent.prototype, "readonly", null);
    AfmInputComponent = AfmInputComponent_1 = __decorate([
        core_1.Component({
            selector: 'afm-input',
            templateUrl: './input.component.html',
            styleUrls: ['./input.component.css'],
            providers: [{
                    provide: forms_1.NG_VALUE_ACCESSOR,
                    useExisting: core_1.forwardRef(function () { return AfmInputComponent_1; }),
                    multi: true
                }]
        }),
        __metadata("design:paramtypes", [])
    ], AfmInputComponent);
    return AfmInputComponent;
    var AfmInputComponent_1;
}());
exports.AfmInputComponent = AfmInputComponent;
//# sourceMappingURL=input.component.js.map