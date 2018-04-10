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
var services_2 = require("../../services");
var select_base_component_1 = require("./select-base.component");
var AfmCheckboxComponent = /** @class */ (function (_super) {
    __extends(AfmCheckboxComponent, _super);
    function AfmCheckboxComponent(services) {
        var _this = _super.call(this, services) || this;
        _this.valueType = 'number';
        _this.list = [];
        _this.rejects = [];
        _this.filteredData = [];
        _this.width = '';
        _this.selectedNames = [];
        _this._detaPrepared = false;
        _this.dataPrepared$.subscribe(function (v) { return _this._detaPrepared = !!v; });
        return _this;
    }
    AfmCheckboxComponent_1 = AfmCheckboxComponent;
    Object.defineProperty(AfmCheckboxComponent.prototype, "value", {
        get: function () {
            return this._value instanceof Array ? this._value : [this._value];
        },
        set: function (value) {
            var _this = this;
            this._value = value instanceof Array ? value : value !== null ? [value] : [];
            this.onChangePropagate(this.value);
            this.selectedNames = this.data.filter(function (l) { return _this._value.indexOf(l.forSelectValue) !== -1; }).map(function (l) { return l.forSelectName; });
        },
        enumerable: true,
        configurable: true
    });
    AfmCheckboxComponent.prototype.ngOnInit = function () {
        var _this = this;
        _super.prototype.ngOnInit.call(this);
        if (this.filter) {
            this.subscriptions.add(this.dataPrepared$
                .pipe(operators_1.filter(function (v) { return !!v; }), operators_1.combineLatest(this.filter.onChange), operators_1.delay(0))
                .subscribe(function (v) {
                _this.filteredData = _this.filter.filter(_this.data);
                // FIXME for magic number
                if (_this.filteredData.length > 9) {
                    _this.width = (_this.filteredData.reduce(function (prev, d) {
                        // 実際の文字数より多い数が返る可能性があるが厳密な数値は必要ではないし、長い分には問題ない
                        return prev < d.forSelectName.length ? d.forSelectName.length : prev;
                    }, 0) * 15).toString() + 'px';
                }
            }));
            this.filter.trigger();
        }
        else {
            this.subscriptions.add(this.dataPrepared$
                .pipe(operators_1.filter(function (v) { return !!v; }))
                .subscribe(function (v) {
                _this.filteredData = _this.data.filter(function (_) { return true; });
            }));
        }
        // HACK: キャッシュから読む場合など↑でsubscribeする前にnextされてしまってる場合への対処
        if (this._detaPrepared) {
            this.dataPrepared$.next(true);
        }
    };
    AfmCheckboxComponent.prototype.onChange = function ($event, val) {
        if ($event.target.checked) {
            if (this.valueType === 'object') {
                val = this.data.find(function (l) { return l.forSelectValue === val; });
            }
            this.value = this.value.filter(function (v) { return !!v; }).concat([
                val
            ]);
        }
        else {
            if (this.valueType === 'object') {
                this.value = this.value.filter(function (v) { return !!v && v.value !== val; });
            }
            else {
                this.value = this.value.filter(function (v) { return v !== val; });
            }
        }
    };
    AfmCheckboxComponent.prototype.allCheck = function () {
        var _this = this;
        this.value = this._value.concat(this.filteredData.filter(function (d) { return _this._value.indexOf(d.forSelectValue) === -1; }).map(function (d) { return d.forSelectValue; }));
    };
    AfmCheckboxComponent.prototype.allClear = function () {
        var filteredDataArray = this.filteredData.map(function (d) { return d.forSelectValue; });
        this.value = this._value.filter(function (v) { return filteredDataArray.indexOf(v) === -1; });
    };
    AfmCheckboxComponent.prototype.existsInSelector = function (val) {
        var _this = this;
        var _val = (!val || val instanceof Array) ? val : [val];
        return !_val || !_val.length || _val.reduce(function (prev, curr) {
            return prev || _this.data.some(function (item) { return item.forSelectValue === curr; });
        }, false);
    };
    AfmCheckboxComponent.prototype.writeValue = function (val) {
        this._value = val;
        this.innerFormControl.patchValue(val);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", forms_1.FormControl)
    ], AfmCheckboxComponent.prototype, "formControl", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AfmCheckboxComponent.prototype, "sourceName", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AfmCheckboxComponent.prototype, "label", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], AfmCheckboxComponent.prototype, "valueType", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], AfmCheckboxComponent.prototype, "list", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], AfmCheckboxComponent.prototype, "rejects", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", services_1.FilterService)
    ], AfmCheckboxComponent.prototype, "filter", void 0);
    AfmCheckboxComponent = AfmCheckboxComponent_1 = __decorate([
        core_1.Component({
            selector: 'afm-checkbox',
            templateUrl: './checkbox.component.html',
            styleUrls: ['./select.component.css'],
            providers: [{
                    provide: forms_1.NG_VALUE_ACCESSOR,
                    useExisting: core_1.forwardRef(function () { return AfmCheckboxComponent_1; }),
                    multi: true
                },
                services_2.SelectorServiceInjector
            ]
        }),
        __metadata("design:paramtypes", [services_2.SelectorServiceInjector])
    ], AfmCheckboxComponent);
    return AfmCheckboxComponent;
    var AfmCheckboxComponent_1;
}(select_base_component_1.AfmSelectBase));
exports.AfmCheckboxComponent = AfmCheckboxComponent;
//# sourceMappingURL=checkbox.component.js.map