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
function moveDigit(decimal, moves) {
    var nums = (decimal || 0).toString().split('.');
    var prefix = '';
    if (/^-/.test(nums[0])) {
        prefix = '-';
        nums[0] = nums[0].substring(1);
    }
    // 小数が 0.0e-00 形式だった場合
    if (nums[1] && /e-/.test(nums[1])) {
        var _nums1 = nums[1].split('e-');
        nums[1] = '0.';
        for (var i = 1; i < parseInt(_nums1[1], 10); ++i) {
            nums[1] += '0';
        }
        nums[1] += _nums1[0].replace('.', '');
    }
    // 正の変換
    if (moves > 0) {
        // もともと整数だった場合
        if (!nums[1]) {
            return decimal * Math.pow(10, moves);
        }
        // 計算結果が整数になる場合
        if (nums[1].length <= moves) {
            return parseInt(prefix + nums[0] + nums[1], 10) * Math.pow(10, (moves - nums[1].length));
        }
        // それ以外の場合
        return parseFloat(prefix + nums[0] + nums[1].substr(0, moves) + '.' + nums[1].substr(moves, (nums[1].length - moves)));
        // 負の変換
    }
    else {
        var base = '0.';
        if (nums[0] === '0') {
            for (var i = 0; i > moves; --i) {
                base += '0';
            }
            return parseFloat(prefix + base + nums[1]);
        }
        // 計算結果が1より小さくなる場合
        if (nums[0].length <= -moves) {
            for (var i = 0; i > (moves + nums[0].length); --i) {
                base += '0';
            }
            return parseFloat(prefix + base + nums[0] + nums[1]);
        }
        // それ以外の場合
        return parseFloat(prefix + nums[0].substr(0, nums[0].length + moves) + '.' + nums[0].substr(nums[0].length + moves, -moves) + nums[1]);
    }
}
function numberFormat(num, underPoint) {
    if (underPoint === void 0) { underPoint = -1; }
    if (typeof num === 'object') {
        return '';
    }
    if (underPoint > -1) {
        num = moveDigit(Math.round(moveDigit(num, underPoint)), -underPoint);
    }
    return num.toString().split('.').map(function (str, index) {
        return index > 0 ? str : str.split('').reverse()
            .map(function (s, i) { return s += i && (i % 3 === 0) && s !== '-' ? ',' : ''; })
            .reverse().join('');
    }).join('.');
}
var AfmNumberComponent = /** @class */ (function () {
    function AfmNumberComponent(renderer, elm) {
        this.renderer = renderer;
        this.elm = elm;
        this.type = 'number'; // number|percent
        this.afterPointNum = 2;
        this.blur = new core_1.EventEmitter();
        this.innerFormControl = new forms_1.FormControl();
        this._readonly = false;
        this.onChangePropagate = function () { };
    }
    AfmNumberComponent_1 = AfmNumberComponent;
    Object.defineProperty(AfmNumberComponent.prototype, "readonly", {
        get: function () {
            return this._readonly;
        },
        set: function (flag) {
            this._readonly = flag;
            this.onBlur(true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AfmNumberComponent.prototype, "formatedValue", {
        get: function () {
            if (this.type === 'percent') {
                return numberFormat(this.innerFormControl.value) + '%';
            }
            return numberFormat(this.innerFormControl.value);
        },
        enumerable: true,
        configurable: true
    });
    AfmNumberComponent.prototype.onKeyDown = function (key) {
        switch (key) {
            case 't':
                this.innerFormControl.patchValue(moveDigit(this.innerFormControl.value, 3));
                break;
            case 'm':
                this.innerFormControl.patchValue(moveDigit(this.innerFormControl.value, 6));
                break;
        }
    };
    AfmNumberComponent.prototype.ngOnInit = function () {
        var _this = this;
        var err = this.formControl.validator && this.formControl.validator(new forms_1.FormControl());
        this.required = !!err && !!err['required'];
        this.innerFormControl.setValidators(this.formControl.validator);
        var inputs = Array.prototype.filter.call(this.elm.nativeElement.childNodes, function (c) { return c.nodeName === 'INPUT'; });
        this.realInput = inputs[0];
        this.dummyInput = inputs[1];
        this.innerFormControl.valueChanges.subscribe(function (v) {
            if (_this.type === 'percent') {
                v = moveDigit(v, -_this.afterPointNum);
            }
            if (v !== _this.formControl.value) {
                _this.onChangePropagate(v);
            }
        });
    };
    AfmNumberComponent.prototype.ngAfterViewInit = function () {
        this.onBlur(true);
    };
    AfmNumberComponent.prototype.onBlur = function (noEmit) {
        if (noEmit === void 0) { noEmit = false; }
        if (this.realInput) {
            if (this.innerFormControl.value === '') {
                this.innerFormControl.patchValue(0);
            }
            this.renderer.setStyle(this.realInput, 'display', 'none');
            this.renderer.setStyle(this.dummyInput, 'display', 'inherit');
            this.renderer.setProperty(this.dummyInput, 'value', this.formatedValue);
        }
        if (!noEmit) {
            this.blur.emit();
        }
    };
    AfmNumberComponent.prototype.onFocus = function () {
        if (!this.readonly) {
            this.renderer.setStyle(this.dummyInput, 'display', 'none');
            this.renderer.setStyle(this.realInput, 'display', 'inherit');
            if (this.innerFormControl.value === 0) {
                this.innerFormControl.patchValue('');
            }
            if (this.elm.nativeElement['fucus']) {
                this.elm.nativeElement['fucus']();
            }
        }
    };
    AfmNumberComponent.prototype.writeValue = function (value) {
        if (this.type === 'percent') {
            value = moveDigit(value, this.afterPointNum);
        }
        this.innerFormControl.patchValue(value);
        this.renderer.setProperty(this.dummyInput, 'value', this.formatedValue);
    };
    AfmNumberComponent.prototype.registerOnChange = function (fn) {
        this.onChangePropagate = fn;
    };
    AfmNumberComponent.prototype.registerOnTouched = function (_) { };
    __decorate([
        core_1.Input(),
        __metadata("design:type", forms_1.FormControl)
    ], AfmNumberComponent.prototype, "formControl", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AfmNumberComponent.prototype, "label", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], AfmNumberComponent.prototype, "type", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], AfmNumberComponent.prototype, "afterPointNum", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], AfmNumberComponent.prototype, "readonly", null);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], AfmNumberComponent.prototype, "blur", void 0);
    __decorate([
        core_1.HostListener('keydown', ['$event.key']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], AfmNumberComponent.prototype, "onKeyDown", null);
    AfmNumberComponent = AfmNumberComponent_1 = __decorate([
        core_1.Component({
            selector: 'afm-number',
            templateUrl: './number.component.html',
            styleUrls: ['./number.component.css'],
            providers: [{
                    provide: forms_1.NG_VALUE_ACCESSOR,
                    useExisting: core_1.forwardRef(function () { return AfmNumberComponent_1; }),
                    multi: true
                }]
        }),
        __metadata("design:paramtypes", [core_1.Renderer2,
            core_1.ElementRef])
    ], AfmNumberComponent);
    return AfmNumberComponent;
    var AfmNumberComponent_1;
}());
exports.AfmNumberComponent = AfmNumberComponent;
//# sourceMappingURL=number.component.js.map