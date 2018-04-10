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
var operators_1 = require("rxjs/operators");
var services_1 = require("../../services");
var select_base_component_1 = require("./select-base.component");
var AfmSelectComponent = /** @class */ (function (_super) {
    __extends(AfmSelectComponent, _super);
    function AfmSelectComponent(services) {
        var _this = _super.call(this, services) || this;
        _this.valueType = 'number';
        _this.list = [];
        _this.rejects = [];
        _this.selected = null;
        _this._readonly = false;
        _this.dataPrepared$.pipe(operators_1.filter(function (v) { return !!v; }), operators_1.combineLatest(_this.innerFormControl.valueChanges)).subscribe(function (v) {
            _this.selected = _this.data.find(function (d) { return d.forSelectValue === v[1]; });
        });
        return _this;
    }
    AfmSelectComponent_1 = AfmSelectComponent;
    Object.defineProperty(AfmSelectComponent.prototype, "readonly", {
        get: function () {
            return this._readonly;
        },
        set: function (flag) {
            this._readonly = flag;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(),
        __metadata("design:type", forms_1.FormControl)
    ], AfmSelectComponent.prototype, "formControl", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AfmSelectComponent.prototype, "sourceName", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AfmSelectComponent.prototype, "label", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], AfmSelectComponent.prototype, "valueType", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], AfmSelectComponent.prototype, "list", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], AfmSelectComponent.prototype, "rejects", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], AfmSelectComponent.prototype, "readonly", null);
    AfmSelectComponent = AfmSelectComponent_1 = __decorate([
        core_1.Component({
            selector: 'afm-select',
            templateUrl: './select.component.html',
            styleUrls: ['./select.component.css'],
            providers: [{
                    provide: forms_1.NG_VALUE_ACCESSOR,
                    useExisting: core_1.forwardRef(function () { return AfmSelectComponent_1; }),
                    multi: true
                },
                services_1.SelectorServiceInjector
            ]
        }),
        __metadata("design:paramtypes", [services_1.SelectorServiceInjector])
    ], AfmSelectComponent);
    return AfmSelectComponent;
    var AfmSelectComponent_1;
}(select_base_component_1.AfmSelectBase));
exports.AfmSelectComponent = AfmSelectComponent;
//# sourceMappingURL=select.component.js.map