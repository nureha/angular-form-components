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
var Subscription_1 = require("rxjs/Subscription");
var Subject_1 = require("rxjs/Subject");
var operators_1 = require("rxjs/operators");
var services_1 = require("../../services");
var select_base_component_1 = require("./select-base.component");
var AfmSelect2Component = /** @class */ (function (_super) {
    __extends(AfmSelect2Component, _super);
    function AfmSelect2Component(service) {
        var _this = _super.call(this, service) || this;
        _this.valueType = 'number';
        _this.rejects = [];
        _this.placeholder = '';
        _this._readonly = false;
        _this.selected = null;
        _this._data = [];
        _this.valueTrigger$ = new Subject_1.Subject();
        _this.preparedElement$ = new Subject_1.Subject();
        _this.mySubscriptions = new Subscription_1.Subscription();
        _this.onChangePropagate = function () { };
        _this.mySubscriptions.add(_this.dataPrepared$.pipe(operators_1.combineLatest(_this.preparedElement$), operators_1.filter(function (v) { return !!v[0] && !!v[1]; }), operators_1.combineLatest(_this.valueTrigger$), operators_1.delay(0)).subscribe(function (v) {
            if (_this.element) {
                _this.element.val(v[1]).trigger('change').trigger('select2:select');
            }
            _this.selected = _this._data.find(function (d) { return d.forSelectValue === v[1]; });
        }));
        return _this;
    }
    AfmSelect2Component_1 = AfmSelect2Component;
    Object.defineProperty(AfmSelect2Component.prototype, "readonly", {
        get: function () {
            return this._readonly;
        },
        set: function (flag) {
            this._readonly = flag;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AfmSelect2Component.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (data) {
            this._data = data;
            this.renderSelect2();
        },
        enumerable: true,
        configurable: true
    });
    AfmSelect2Component.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (this.selector) {
            this.element = jQuery(this.selector.nativeElement);
            this.renderSelect2();
            this.element.on('select2:select', function () {
                var val = _this.selector.nativeElement.value;
                // FIXME 文字列だけど数字だけの値を扱うこともあるかもしれない・・・
                if (/^[0-9]+$/.test(val)) {
                    val = parseInt(val, 10);
                }
                if (_this._value !== val) {
                    if (_this.valueType === 'object') {
                        val = _this.data.find(function (l) { return l.forSelectValue === val; });
                    }
                    _this._value = val;
                    _this.onChangePropagate(val);
                }
            });
        }
        this.preparedElement$.next(true);
        // default値設定のときだけ
        this.mySubscriptions.add(this.innerFormControl.valueChanges.subscribe(function (v) {
            _this.valueTrigger$.next(v);
        }));
    };
    AfmSelect2Component.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
        this.mySubscriptions.unsubscribe();
        if (this.element) {
            this.element.off('select2:select');
        }
    };
    AfmSelect2Component.prototype.renderSelect2 = function () {
        if (!this.element) {
            return;
        }
        if (this.element.hasClass('select2-hidden-accessible') === true) {
            this.element.select2('destroy');
            this.element.html('');
        }
        this.element.select2({
            data: this._data.map(function (d) {
                return { id: d.forSelectValue, text: d.forSelectName };
            }),
            theme: 'bootstrap',
            placeholder: this.placeholder,
            allowClear: !this._required
        });
        this.valueTrigger$.next(this.formControl.value);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", forms_1.FormControl)
    ], AfmSelect2Component.prototype, "formControl", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AfmSelect2Component.prototype, "sourceName", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AfmSelect2Component.prototype, "label", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], AfmSelect2Component.prototype, "valueType", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], AfmSelect2Component.prototype, "list", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], AfmSelect2Component.prototype, "rejects", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], AfmSelect2Component.prototype, "placeholder", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], AfmSelect2Component.prototype, "readonly", null);
    __decorate([
        core_1.ViewChild('selector'),
        __metadata("design:type", core_1.ElementRef)
    ], AfmSelect2Component.prototype, "selector", void 0);
    AfmSelect2Component = AfmSelect2Component_1 = __decorate([
        core_1.Component({
            selector: 'afm-select2',
            templateUrl: './select2.component.html',
            styleUrls: ['./select2.component.css'],
            providers: [{
                    provide: forms_1.NG_VALUE_ACCESSOR,
                    useExisting: core_1.forwardRef(function () { return AfmSelect2Component_1; }),
                    multi: true
                },
                services_1.SelectorServiceInjector
            ]
        }),
        __metadata("design:paramtypes", [services_1.SelectorServiceInjector])
    ], AfmSelect2Component);
    return AfmSelect2Component;
    var AfmSelect2Component_1;
}(select_base_component_1.AfmSelectBase));
exports.AfmSelect2Component = AfmSelect2Component;
//# sourceMappingURL=select2.component.js.map