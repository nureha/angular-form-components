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
var operators_1 = require("rxjs/operators");
var Subscription_1 = require("rxjs/Subscription");
var AfmSingleCheckboxComponent = /** @class */ (function () {
    function AfmSingleCheckboxComponent() {
        this._readonly = false;
        this.required = false;
        this.subscription = new Subscription_1.Subscription();
        this.readonlyFormControl = new forms_1.FormControl();
    }
    AfmSingleCheckboxComponent_1 = AfmSingleCheckboxComponent;
    Object.defineProperty(AfmSingleCheckboxComponent.prototype, "readonly", {
        get: function () {
            return this._readonly;
        },
        set: function (flag) {
            this._readonly = flag;
        },
        enumerable: true,
        configurable: true
    });
    AfmSingleCheckboxComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.readonlyFormControl.disable();
        this.trueValueLabel = this.trueValueLabel ? this.trueValueLabel : this.label;
        var err = this.formControl.validator && this.formControl.validator(new forms_1.FormControl());
        this.required = err && !!err['required'];
        this.subscription.add(this.formControl.valueChanges.pipe(operators_1.filter(function (v) { return (!v && v !== false); })).subscribe(function (_) {
            _this.onChangePropagate(false);
        }));
    };
    AfmSingleCheckboxComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    AfmSingleCheckboxComponent.prototype.writeValue = function (v) {
        this.readonlyFormControl.patchValue(v);
    };
    AfmSingleCheckboxComponent.prototype.registerOnChange = function (fn) {
        this.onChangePropagate = fn;
    };
    AfmSingleCheckboxComponent.prototype.registerOnTouched = function (_) { };
    __decorate([
        core_1.Input(),
        __metadata("design:type", forms_1.FormControl)
    ], AfmSingleCheckboxComponent.prototype, "formControl", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AfmSingleCheckboxComponent.prototype, "label", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AfmSingleCheckboxComponent.prototype, "trueValueLabel", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], AfmSingleCheckboxComponent.prototype, "readonly", null);
    AfmSingleCheckboxComponent = AfmSingleCheckboxComponent_1 = __decorate([
        core_1.Component({
            selector: 'single-checkbox',
            templateUrl: './single-checkbox.component.html',
            styleUrls: ['./single-checkbox.component.css'],
            providers: [{
                    provide: forms_1.NG_VALUE_ACCESSOR,
                    useExisting: core_1.forwardRef(function () { return AfmSingleCheckboxComponent_1; }),
                    multi: true
                }]
        }),
        __metadata("design:paramtypes", [])
    ], AfmSingleCheckboxComponent);
    return AfmSingleCheckboxComponent;
    var AfmSingleCheckboxComponent_1;
}());
exports.AfmSingleCheckboxComponent = AfmSingleCheckboxComponent;
//# sourceMappingURL=single-checkbox.component.js.map