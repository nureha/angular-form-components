import { __extends, __spread } from 'tslib';
import { Component, Input, forwardRef, Output, EventEmitter, Renderer2, ElementRef, HostListener, Injectable, Injector, InjectionToken, ReflectiveInjector, Inject, ViewChild, NgModule } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { merge, combineLatest, share, filter, delay } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subscription } from 'rxjs/Subscription';
import { CommonModule } from '@angular/common';

var AfmInputComponent = /** @class */ (function () {
    function AfmInputComponent() {
        this.type = 'text';
        this._readonly = false;
    }
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
        var err = this.formControl.validator && this.formControl.validator(new FormControl());
        this.required = !!err && !!err['required'];
    };
    AfmInputComponent.prototype.writeValue = function (_) { };
    AfmInputComponent.prototype.registerOnChange = function (_) { };
    AfmInputComponent.prototype.registerOnTouched = function (_) { };
    return AfmInputComponent;
}());
AfmInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'afm-input',
                template: "<label *ngIf=\"label\"><span *ngIf=\"required\">*&nbsp;</span>{{ label }}</label>\n<input class=\"form-control\"\n  [type]=\"type\" [formControl]=\"formControl\" [readonly]=\"readonly\">\n<validate-message [control]=\"formControl\"><ng-content></ng-content></validate-message>\n",
                styles: [""],
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(function () { return AfmInputComponent; }),
                        multi: true
                    }]
            },] },
];
AfmInputComponent.ctorParameters = function () { return []; };
AfmInputComponent.propDecorators = {
    "formControl": [{ type: Input },],
    "label": [{ type: Input },],
    "type": [{ type: Input },],
    "readonly": [{ type: Input },],
};
var AfmValidateMessageComponent = /** @class */ (function () {
    function AfmValidateMessageComponent() {
    }
    AfmValidateMessageComponent.prototype.ngOnInit = function () { };
    return AfmValidateMessageComponent;
}());
AfmValidateMessageComponent.decorators = [
    { type: Component, args: [{
                selector: 'validate-message',
                template: "<span [hidden]=\"!control.touched || control.valid\"><ng-content></ng-content></span>\n",
                styles: ["span{position:absolute;color:#fff;top:-15px;right:-10px;padding:7px;background-color:#bd362f;border-radius:7px}span:before{content:\"\";position:absolute;top:100%;left:50%;margin-left:-7px;border:7px solid transparent;border-top:7px solid #bd362f}"]
            },] },
];
AfmValidateMessageComponent.ctorParameters = function () { return []; };
AfmValidateMessageComponent.propDecorators = {
    "control": [{ type: Input },],
};
var AfmTextareaComponent = /** @class */ (function () {
    function AfmTextareaComponent() {
    }
    AfmTextareaComponent.prototype.ngOnInit = function () {
        var err = this.formControl.validator && this.formControl.validator(new FormControl());
        this.required = err && !!err['required'];
    };
    AfmTextareaComponent.prototype.writeValue = function (_) { };
    AfmTextareaComponent.prototype.registerOnChange = function (_) { };
    AfmTextareaComponent.prototype.registerOnTouched = function (_) { };
    return AfmTextareaComponent;
}());
AfmTextareaComponent.decorators = [
    { type: Component, args: [{
                selector: 'afm-textarea',
                template: "<label *ngIf=\"label\"><span *ngIf=\"required\">*&nbsp;</span>{{ label }}</label>\n<textarea [formControl]=\"formControl\" class=\"form-control\"></textarea>\n<validate-message [control]=\"formControl\"><ng-content></ng-content></validate-message>\n",
                styles: [""],
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(function () { return AfmTextareaComponent; }),
                        multi: true
                    }]
            },] },
];
AfmTextareaComponent.ctorParameters = function () { return []; };
AfmTextareaComponent.propDecorators = {
    "formControl": [{ type: Input },],
    "label": [{ type: Input },],
};
function moveDigit(decimal, moves) {
    var nums = (decimal || 0).toString().split('.');
    var prefix = '';
    if (/^-/.test(nums[0])) {
        prefix = '-';
        nums[0] = nums[0].substring(1);
    }
    if (nums[1] && /e-/.test(nums[1])) {
        var _nums1 = nums[1].split('e-');
        nums[1] = '0.';
        for (var i = 1; i < parseInt(_nums1[1], 10); ++i) {
            nums[1] += '0';
        }
        nums[1] += _nums1[0].replace('.', '');
    }
    if (moves > 0) {
        if (!nums[1]) {
            return decimal * Math.pow(10, moves);
        }
        if (nums[1].length <= moves) {
            return parseInt(prefix + nums[0] + nums[1], 10) * Math.pow(10, (moves - nums[1].length));
        }
        return parseFloat(prefix + nums[0] + nums[1].substr(0, moves) + '.' + nums[1].substr(moves, (nums[1].length - moves)));
    }
    else {
        var base = '0.';
        if (nums[0] === '0') {
            for (var i = 0; i > moves; --i) {
                base += '0';
            }
            return parseFloat(prefix + base + nums[1]);
        }
        if (nums[0].length <= -moves) {
            for (var i = 0; i > (moves + nums[0].length); --i) {
                base += '0';
            }
            return parseFloat(prefix + base + nums[0] + nums[1]);
        }
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
        this.type = 'number';
        this.afterPointNum = 2;
        this.blur = new EventEmitter();
        this.innerFormControl = new FormControl();
        this._readonly = false;
        this.onChangePropagate = function () { };
    }
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
        var err = this.formControl.validator && this.formControl.validator(new FormControl());
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
    return AfmNumberComponent;
}());
AfmNumberComponent.decorators = [
    { type: Component, args: [{
                selector: 'afm-number',
                template: "<label *ngIf=\"label\"><span *ngIf=\"required\">*&nbsp;</span>{{ label }}</label>\n<input class=\"form-control\"\n  (blur)=\"onBlur()\"\n  type=\"number\" [formControl]=\"innerFormControl\">\n<input class=\"form-control\" (focus)=\"onFocus()\" [readonly]=\"readonly\">\n<validate-message [control]=\"formControl\"><ng-content></ng-content></validate-message>\n",
                styles: [""],
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(function () { return AfmNumberComponent; }),
                        multi: true
                    }]
            },] },
];
AfmNumberComponent.ctorParameters = function () { return [
    { type: Renderer2, },
    { type: ElementRef, },
]; };
AfmNumberComponent.propDecorators = {
    "formControl": [{ type: Input },],
    "label": [{ type: Input },],
    "type": [{ type: Input },],
    "afterPointNum": [{ type: Input },],
    "readonly": [{ type: Input },],
    "blur": [{ type: Output },],
    "onKeyDown": [{ type: HostListener, args: ['keydown', ['$event.key'],] },],
};
var FilterService = /** @class */ (function () {
    function FilterService(ob, _target, _type) {
        var _this = this;
        this.ob = ob;
        this._target = _target;
        this._type = _type;
        this.action$ = new Subject();
        this._regExp = RegExp('.*');
        this._and = [];
        this._or = [];
        ob.subscribe(function (v) {
            _this._val = v;
            _this._regExp = new RegExp(v);
        });
        this._onChange = this.action$.pipe(merge(ob));
    }
    Object.defineProperty(FilterService.prototype, "onChange", {
        get: function () {
            return this._onChange;
        },
        enumerable: true,
        configurable: true
    });
    FilterService.match = function (form, target) {
        return new FilterService(form.valueChanges, target, '~');
    };
    FilterService.equal = function (form, target) {
        return new FilterService(form.valueChanges, target, '=');
    };
    FilterService.graterThan = function (form, target) {
        return new FilterService(form.valueChanges, target, '>');
    };
    FilterService.over = function (form, target) {
        return new FilterService(form.valueChanges, target, '>=');
    };
    FilterService.lessThan = function (form, target) {
        return new FilterService(form.valueChanges, target, '<');
    };
    FilterService.under = function (form, target) {
        return new FilterService(form.valueChanges, target, '<=');
    };
    FilterService.prototype.check = function (item) {
        if (!(this._target in item)) {
            return false;
        }
        if (!this._val) {
            return true;
        }
        switch (this._type) {
            case '~':
                return !this._val || this._regExp.test(item[this._target]);
            case '=':
                return item[this._target] === this._val;
            case '>':
                return item[this._target] > this._val;
            case '>=':
                return item[this._target] >= this._val;
            case '<':
                return item[this._target] < this._val;
            case '<=':
                return item[this._target] <= this._val;
            default:
                break;
        }
        return true;
    };
    FilterService.prototype.checkAll = function (item) {
        return (this._or.length > 0 && this._or.some(function (s) { return s.checkAll(item); })) ||
            this.check(item) &&
                !this._and.some(function (s) { return !s.checkAll(item); });
    };
    FilterService.prototype.trigger = function () {
        this.action$.next(true);
    };
    FilterService.prototype.filter = function (list) {
        var _this = this;
        return list.filter(function (l) { return _this.checkAll(l); });
    };
    FilterService.prototype.and = function (s) {
        this._and.push(s);
        this._onChange = this._onChange.pipe(merge(s.onChange));
        return this;
    };
    FilterService.prototype.or = function (s) {
        this._or.push(s);
        this._onChange = this._onChange.pipe(merge(s.onChange));
        return this;
    };
    return FilterService;
}());
var Selectable = /** @class */ (function () {
    function Selectable() {
    }
    Object.defineProperty(Selectable.prototype, "forSelectName", {
        get: function () { throw new Error('unimplemented'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Selectable.prototype, "forSelectValue", {
        get: function () { throw new Error('unimplemented'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Selectable.prototype, "forSelectDefault", {
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Selectable.prototype, "forSelectOrder", {
        get: function () { throw new Error('unimplemented'); },
        enumerable: true,
        configurable: true
    });
    return Selectable;
}());
var MULTI_IMPORT_SERVICES_MAP = new InjectionToken('MULTI_IMPORT_SERVICES_MAP');
var SelectorServiceInjector = /** @class */ (function () {
    function SelectorServiceInjector(injector, services) {
        this.injector = injector;
        this.services = services;
        this.providers = Array.from(this.services.map.values());
    }
    SelectorServiceInjector.prototype.get = function (name) {
        var _class = this.services.map.get(name);
        if (_class) {
            var injector = ReflectiveInjector.resolveAndCreate((this.providers), this.injector);
            return injector.get(_class);
        }
        throw new Error(name + " is not provided!");
    };
    return SelectorServiceInjector;
}());
SelectorServiceInjector.decorators = [
    { type: Injectable },
];
SelectorServiceInjector.ctorParameters = function () { return [
    { type: Injector, },
    { type: undefined, decorators: [{ type: Inject, args: [MULTI_IMPORT_SERVICES_MAP,] },] },
]; };
var SelectableConstruct = /** @class */ (function (_super) {
    __extends(SelectableConstruct, _super);
    function SelectableConstruct(data) {
        var _this = _super.call(this) || this;
        _this.name = data.name;
        _this.value = data.value;
        _this.default = data.default;
        _this.sort = data.sort !== undefined ? data.sort : data.name;
        return _this;
    }
    Object.defineProperty(SelectableConstruct.prototype, "forSelectName", {
        get: function () {
            return this.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectableConstruct.prototype, "forSelectValue", {
        get: function () {
            return this.value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectableConstruct.prototype, "forSelectDefault", {
        get: function () {
            return this.default;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectableConstruct.prototype, "forSelectOrder", {
        get: function () {
            return this.sort;
        },
        enumerable: true,
        configurable: true
    });
    return SelectableConstruct;
}(Selectable));
var ArrayService = /** @class */ (function () {
    function ArrayService() {
        this.action$ = new ReplaySubject(1);
    }
    ArrayService.prototype.list = function () {
        return this.action$.pipe(share());
    };
    ArrayService.prototype.query = function (list) {
        this.action$.next(list.map(function (l) {
            if (l instanceof Selectable) {
                return l;
            }
            return new SelectableConstruct(l);
        }));
    };
    return ArrayService;
}());
var id = 0;
var AfmSelectBase = /** @class */ (function () {
    function AfmSelectBase(services) {
        var _this = this;
        this.services = services;
        this.list = [];
        this.rejects = [];
        this.innerFormControl = new FormControl();
        this.dataPrepared$ = new Subject();
        this.writeValue$ = new Subject();
        this.subscriptions = new Subscription();
        this.initialized$ = new Subject();
        this.onChangeEventPrepared$ = new Subject();
        this.defaultValue = null;
        this.onChangePropagate = function () { };
        this.subscriptions.add(this.dataPrepared$.pipe(filter(function (v) { return !!v; })).pipe(combineLatest(this.initialized$.pipe(filter(function (v) { return !!v; }))), combineLatest(this.onChangeEventPrepared$.pipe(filter(function (v) { return !!v; }))), combineLatest(this.writeValue$)).subscribe(function (v) {
            var value = (v[1]);
            if (value || value === 0) {
                if (typeof value === 'object' && value.forSelectValue) {
                    value = value.forSelectValue;
                }
                _this.innerFormControl.patchValue(value);
                if (!_this.validateInnerFormValue()) {
                    _this.innerFormControl.patchValue(!_this.defaultValue ? _this.defaultValue : _this.defaultValue.forSelectValue);
                }
            }
            else if (_this.innerFormControl.value || _this.innerFormControl.value === 0) {
                _this.value = _this.innerFormControl.value;
            }
        }));
        this.subscriptions.add(this.dataPrepared$.pipe(filter(function (v) { return !!v; })).pipe(combineLatest(this.initialized$.pipe(filter(function (v) { return !!v; }))), combineLatest(this.onChangeEventPrepared$.pipe(filter(function (v) { return !!v; }))), combineLatest(this.innerFormControl.valueChanges)).subscribe(function (v) {
            if (_this.data && _this.valueType === 'object') {
                v[1] = _this.data.find(function (d) { return d.forSelectValue === v[1]; });
            }
            _this.value = v[1];
        }));
    }
    Object.defineProperty(AfmSelectBase.prototype, "value", {
        set: function (value) {
            this.onChangePropagate(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AfmSelectBase.prototype, "_required", {
        get: function () {
            var err = this.formControl.validator && this.formControl.validator(new FormControl());
            this.required = !!err && !!err['required'];
            if (this.required) {
                this.innerFormControl.setValidators(Validators.required);
            }
            else {
                this.innerFormControl.clearValidators();
            }
            return this.required;
        },
        enumerable: true,
        configurable: true
    });
    AfmSelectBase.prototype.ngOnInit = function () {
        var _this = this;
        this.id = '_AfmSelect_' + id.toString();
        id++;
        this.required = this._required;
        this.subscriptions.add(this.observer().subscribe(function (d) {
            d.sort(function (a, b) {
                if (a.forSelectOrder > b.forSelectOrder) {
                    return 1;
                }
                else if (a.forSelectOrder < b.forSelectOrder) {
                    return -1;
                }
                return 0;
            });
            _this.defaultValue = null;
            _this.data = d.filter(function (item) {
                return _this.rejects.length === 0 || _this.rejects.indexOf(item.forSelectValue) === -1;
            }).map(function (item) {
                if (item.forSelectDefault || _this.defaultValue === null) {
                    _this.defaultValue = item;
                }
                return item;
            });
            _this.dataPrepared$.next(true);
            if (!_this.validateInnerFormValue()) {
                if (_this._required) {
                    _this.writeValue$.next(!_this.defaultValue ? _this.defaultValue : _this.defaultValue.forSelectValue);
                }
                else {
                    _this.value = null;
                }
            }
        }));
        this.query();
        this.initialized$.next(true);
    };
    AfmSelectBase.prototype.ngOnChanges = function (changes) {
        if (changes['sourceName'] && changes['sourceName'].currentValue !== changes['sourceName'].previousValue ||
            changes['list'] && changes['list'].currentValue.length !== changes['list'].previousValue.length ||
            changes['rejects'] && changes['rejects'].currentValue.length !== changes['rejects'].previousValue.length) {
            if (this._service) {
                this.query();
            }
        }
    };
    AfmSelectBase.prototype.ngOnDestroy = function () {
        this.subscriptions.unsubscribe();
    };
    AfmSelectBase.prototype.query = function () {
        this.dataPrepared$.next(false);
        var parsed = this._parse(this.sourceName);
        if ((parsed.name === 'list' || parsed.name === 'range') && this.list) {
            this._service.query(this.list);
        }
        else {
            this._service.query(parsed.query);
        }
    };
    AfmSelectBase.prototype.existsInSelector = function (val) {
        if (!val && val !== 0) {
            return false;
        }
        return this.data.some(function (item) { return item.forSelectValue === val; });
    };
    AfmSelectBase.prototype.observer = function () {
        if (!this._service) {
            var parsed = this._parse(this.sourceName);
            if (parsed.name === 'list') {
                this._service = new ArrayService();
            }
            else if (parsed.name === 'range') {
                if (parsed.query['to'] === undefined) {
                    throw Error('range.to is required');
                }
                parsed.query['from'] = parseInt((parsed.query['from'] || 0), 10);
                parsed.query['to'] = parseInt((parsed.query['to'] || 0), 10);
                parsed.query['default'] = parseInt((parsed.query['default'] || 0), 10);
                parsed.query['step'] = parseInt((parsed.query['step'] || 1), 10);
                parsed.query['unit'] = parsed.query['unit'] || '';
                this.list = [];
                for (var i = parsed.query['from']; i <= parsed.query['to']; i += parsed.query['step']) {
                    this.list.push({
                        name: i.toString() + parsed.query['unit'],
                        value: i,
                        default: i === parsed.query['default'],
                    });
                }
                this._service = new ArrayService();
            }
            else {
                var dataSource = this.services.get(parsed.name);
                if (!dataSource) {
                    throw Error('not exists service: ' + parsed.name);
                }
                this._service = dataSource;
            }
        }
        return this._service.list();
    };
    AfmSelectBase.prototype._parse = function (sourceName) {
        var exploded = sourceName.split(':');
        var query = {};
        if (exploded[1]) {
            exploded[1].split('&').forEach(function (keyValue) {
                var kv = keyValue.split('=');
                if (query[kv[0]] !== undefined) {
                    if (!(query[kv[0]] instanceof Array)) {
                        query[kv[0]] = [query[kv[0]]];
                    }
                    query[kv[0]].push(kv[1]);
                }
                else {
                    query[kv[0]] = kv[1];
                }
            });
        }
        return {
            name: exploded[0],
            query: query
        };
    };
    AfmSelectBase.prototype.validateInnerFormValue = function () {
        return !(this._required && !this.innerFormControl.value && this.innerFormControl.value !== 0 ||
            !this.existsInSelector(this.innerFormControl.value) &&
                (!!this.innerFormControl.value || this.innerFormControl.value === 0));
    };
    AfmSelectBase.prototype.writeValue = function (value) {
        if (!this.isEffectiveValue(value) && this._required) {
            if (this.isEffectiveValue(this.defaultValue)) {
                this.writeValue$.next(this.defaultValue.forSelectValue);
            }
            else if (this.isEffectiveValue(this.innerFormControl.value)) {
                this.writeValue$.next(this.innerFormControl.value);
            }
            return;
        }
        this.writeValue$.next(value);
    };
    AfmSelectBase.prototype.registerOnChange = function (fn) {
        this.onChangePropagate = fn;
        this.onChangeEventPrepared$.next(true);
    };
    AfmSelectBase.prototype.registerOnTouched = function (_) { };
    AfmSelectBase.prototype.isEffectiveValue = function (value) {
        return !!value || value === 0;
    };
    return AfmSelectBase;
}());
var AfmSelectComponent = /** @class */ (function (_super) {
    __extends(AfmSelectComponent, _super);
    function AfmSelectComponent(services) {
        var _this = _super.call(this, services) || this;
        _this.valueType = 'number';
        _this.list = [];
        _this.rejects = [];
        _this.selected = null;
        _this._readonly = false;
        _this.dataPrepared$.pipe(filter(function (v) { return !!v; }), combineLatest(_this.innerFormControl.valueChanges)).subscribe(function (v) {
            _this.selected = _this.data.find(function (d) { return d.forSelectValue === v[1]; });
        });
        return _this;
    }
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
    return AfmSelectComponent;
}(AfmSelectBase));
AfmSelectComponent.decorators = [
    { type: Component, args: [{
                selector: 'afm-select',
                template: "<label *ngIf=\"label\" [htmlFor]=\"id\"><span [hidden]=\"!required\">*&nbsp;</span>{{ label }}</label>\n<ng-container *ngIf=\"!readonly\">\n  <select [id]=\"id\" class=\"form-control\" [formControl]=\"innerFormControl\" [required]=\"required\">\n    <option *ngIf=\"!required\" [ngValue]=\"null\"></option>\n    <option *ngFor=\"let item of data\" [ngValue]=\"item.forSelectValue\" [innerHtml]=\"item.forSelectName\"></option>\n  </select>\n  <validate-message [control]=\"formControl\"><ng-content></ng-content></validate-message>\n</ng-container>\n<ng-container *ngIf=\"readonly\">\n  <span class=\"form-control\" readonly [innerHtml]=\"selected?.forSelectName\"></span>\n</ng-container>\n",
                styles: ["label.margin-bottom{margin-bottom:20px}span.selected{text-decoration:underline;-webkit-text-decoration-style:double;text-decoration-style:double}p.fit{margin-bottom:0}"],
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(function () { return AfmSelectComponent; }),
                        multi: true
                    },
                    SelectorServiceInjector
                ]
            },] },
];
AfmSelectComponent.ctorParameters = function () { return [
    { type: SelectorServiceInjector, },
]; };
AfmSelectComponent.propDecorators = {
    "formControl": [{ type: Input },],
    "sourceName": [{ type: Input },],
    "label": [{ type: Input },],
    "valueType": [{ type: Input },],
    "list": [{ type: Input },],
    "rejects": [{ type: Input },],
    "readonly": [{ type: Input },],
};
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
        _this.valueTrigger$ = new Subject();
        _this.preparedElement$ = new Subject();
        _this.mySubscriptions = new Subscription();
        _this.onChangePropagate = function () { };
        _this.mySubscriptions.add(_this.dataPrepared$.pipe(combineLatest(_this.preparedElement$), filter(function (v) { return !!v[0] && !!v[1]; }), combineLatest(_this.valueTrigger$), delay(0)).subscribe(function (v) {
            if (_this.element) {
                _this.element.val(v[1]).trigger('change').trigger('select2:select');
            }
            _this.selected = _this._data.find(function (d) { return d.forSelectValue === v[1]; });
        }));
        return _this;
    }
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
    return AfmSelect2Component;
}(AfmSelectBase));
AfmSelect2Component.decorators = [
    { type: Component, args: [{
                selector: 'afm-select2',
                template: "<label><span [hidden]=\"!required\">*&nbsp;</span>{{ label }}</label>\n<ng-container *ngIf=\"!readonly\">\n  <div>\n    <select #selector class=\"form-control\"></select>\n    <validate-message [control]=\"formControl\"><ng-content></ng-content></validate-message>\n  </div>\n</ng-container>\n<ng-container *ngIf=\"readonly\">\n  <span class=\"form-control\" readonly [innerHtml]=\"selected?.forSelectName\"></span>\n</ng-container>\n",
                styles: [""],
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(function () { return AfmSelect2Component; }),
                        multi: true
                    },
                    SelectorServiceInjector
                ]
            },] },
];
AfmSelect2Component.ctorParameters = function () { return [
    { type: SelectorServiceInjector, },
]; };
AfmSelect2Component.propDecorators = {
    "formControl": [{ type: Input },],
    "sourceName": [{ type: Input },],
    "label": [{ type: Input },],
    "valueType": [{ type: Input },],
    "list": [{ type: Input },],
    "rejects": [{ type: Input },],
    "placeholder": [{ type: Input },],
    "readonly": [{ type: Input },],
    "selector": [{ type: ViewChild, args: ['selector',] },],
};
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
                .pipe(filter(function (v) { return !!v; }), combineLatest(this.filter.onChange), delay(0))
                .subscribe(function (v) {
                _this.filteredData = _this.filter.filter(_this.data);
                if (_this.filteredData.length > 9) {
                    _this.width = (_this.filteredData.reduce(function (prev, d) {
                        return prev < d.forSelectName.length ? d.forSelectName.length : prev;
                    }, 0) * 15).toString() + 'px';
                }
            }));
            this.filter.trigger();
        }
        else {
            this.subscriptions.add(this.dataPrepared$
                .pipe(filter(function (v) { return !!v; }))
                .subscribe(function (v) {
                _this.filteredData = _this.data.filter(function (_) { return true; });
            }));
        }
        if (this._detaPrepared) {
            this.dataPrepared$.next(true);
        }
    };
    AfmCheckboxComponent.prototype.onChange = function ($event, val) {
        if ($event.target.checked) {
            if (this.valueType === 'object') {
                val = this.data.find(function (l) { return l.forSelectValue === val; });
            }
            this.value = __spread(this.value.filter(function (v) { return !!v; }), [
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
        this.value = __spread(this._value, this.filteredData.filter(function (d) { return _this._value.indexOf(d.forSelectValue) === -1; }).map(function (d) { return d.forSelectValue; }));
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
    return AfmCheckboxComponent;
}(AfmSelectBase));
AfmCheckboxComponent.decorators = [
    { type: Component, args: [{
                selector: 'afm-checkbox',
                template: "<p>{{ label }}</p>\n<div *ngIf=\"!!filter\">\n  <div class=\"form-group col-md-12\">\n    <div class=\"col-md-2\">\n      <p class=\"fit\">\u8868\u793A\u4E2D\u306E\u9078\u629E\u80A2\u3059\u3079\u3066\u3092</p>\n      <button type=\"button\" class=\"btn btn-info btn-sm\" (click)=\"allCheck()\">\u9078\u629E</button>\n      <button type=\"button\" class=\"btn btn-warning btn-sm\" (click)=\"allClear()\">\u30AF\u30EA\u30A2</button>\n    </div>\n  </div>\n</div>\n<label class=\"checkbox-inline hidden\"></label>\n<label htmlFor=\"{{ id }}_{{ item.forSelectValue }}\" *ngFor=\"let item of filteredData\"\n    class=\"checkbox-inline custom-checkbox nowrap margin-bottom\">\n  <input id=\"{{ id }}_{{ item.forSelectValue }}\" type=\"checkbox\" class=\"form-control\"\n    (change)=\"onChange($event, item.forSelectValue)\" [checked]=\"value.indexOf(item.forSelectValue) !== -1\">\n  <span [ngClass]=\"{'selected': value.indexOf(item.forSelectValue) !== -1}\"\n    [style.width]=\"width\" [innerHtml]=\"item.forSelectName\"></span>\n</label>\n<br>\n<validate-message [control]=\"formControl\"><ng-content></ng-content></validate-message>\n",
                styles: ["label.margin-bottom{margin-bottom:20px}span.selected{text-decoration:underline;-webkit-text-decoration-style:double;text-decoration-style:double}p.fit{margin-bottom:0}"],
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(function () { return AfmCheckboxComponent; }),
                        multi: true
                    },
                    SelectorServiceInjector
                ]
            },] },
];
AfmCheckboxComponent.ctorParameters = function () { return [
    { type: SelectorServiceInjector, },
]; };
AfmCheckboxComponent.propDecorators = {
    "formControl": [{ type: Input },],
    "sourceName": [{ type: Input },],
    "label": [{ type: Input },],
    "valueType": [{ type: Input },],
    "list": [{ type: Input },],
    "rejects": [{ type: Input },],
    "filter": [{ type: Input },],
};
var AfmRadioComponent = /** @class */ (function (_super) {
    __extends(AfmRadioComponent, _super);
    function AfmRadioComponent(services) {
        var _this = _super.call(this, services) || this;
        _this.valueType = 'number';
        _this.list = [];
        _this.rejects = [];
        return _this;
    }
    return AfmRadioComponent;
}(AfmSelectBase));
AfmRadioComponent.decorators = [
    { type: Component, args: [{
                selector: 'afm-radio',
                template: "<p *ngIf=\"!!label\"><span [hidden]=\"!required\">*&nbsp;</span>{{ label }}</p>\n<label htmlFor=\"{{ id }}_{{ item.forSelectValue }}\" *ngFor=\"let item of data\" class=\"radio-inline custom-radio nowrap\">\n  <input id=\"{{ id }}_{{ item.forSelectValue }}\" type=\"radio\" class=\"form-control\" name=\"{{ id }}\"\n    [value]=\"item.forSelectValue\" [formControl]=\"innerFormControl\">\n  <span [innerHtml]=\"item.forSelectName\"></span>\n</label>\n<br>\n<validate-message [control]=\"formControl\"><ng-content></ng-content></validate-message>\n",
                styles: ["label.margin-bottom{margin-bottom:20px}span.selected{text-decoration:underline;-webkit-text-decoration-style:double;text-decoration-style:double}p.fit{margin-bottom:0}"],
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(function () { return AfmRadioComponent; }),
                        multi: true
                    },
                    SelectorServiceInjector
                ]
            },] },
];
AfmRadioComponent.ctorParameters = function () { return [
    { type: SelectorServiceInjector, },
]; };
AfmRadioComponent.propDecorators = {
    "formControl": [{ type: Input },],
    "sourceName": [{ type: Input },],
    "label": [{ type: Input },],
    "valueType": [{ type: Input },],
    "list": [{ type: Input },],
    "rejects": [{ type: Input },],
};
var AfmSingleCheckboxComponent = /** @class */ (function () {
    function AfmSingleCheckboxComponent() {
        this._readonly = false;
        this.required = false;
        this.subscription = new Subscription();
        this.readonlyFormControl = new FormControl();
    }
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
        var err = this.formControl.validator && this.formControl.validator(new FormControl());
        this.required = err && !!err['required'];
        this.subscription.add(this.formControl.valueChanges.pipe(filter(function (v) { return (!v && v !== false); })).subscribe(function (_) {
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
    return AfmSingleCheckboxComponent;
}());
AfmSingleCheckboxComponent.decorators = [
    { type: Component, args: [{
                selector: 'single-checkbox',
                template: "<p *ngIf=\"!!label\"><span *ngIf=\"required\">*&nbsp;</span>{{ label }}</p>\n<label class=\"checkbox-inline custom-checkbox nowrap\">\n  <input type=\"checkbox\" class=\"form-control\" *ngIf=\"!readonly\" [formControl]=\"formControl\">\n  <input type=\"checkbox\" class=\"form-control\" *ngIf=\"readonly\" [formControl]=\"readonlyFormControl\">\n  <span>{{ trueValueLabel }}</span>\n</label>\n<validate-message [control]=\"formControl\"><ng-content></ng-content></validate-message>\n",
                styles: [""],
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(function () { return AfmSingleCheckboxComponent; }),
                        multi: true
                    }]
            },] },
];
AfmSingleCheckboxComponent.ctorParameters = function () { return []; };
AfmSingleCheckboxComponent.propDecorators = {
    "formControl": [{ type: Input },],
    "label": [{ type: Input },],
    "trueValueLabel": [{ type: Input },],
    "readonly": [{ type: Input },],
};
var COMPONENTS = [
    AfmInputComponent,
    AfmNumberComponent,
    AfmTextareaComponent,
    AfmValidateMessageComponent,
    AfmSelectComponent,
    AfmCheckboxComponent,
    AfmRadioComponent,
    AfmSelect2Component,
    AfmSingleCheckboxComponent,
];
var AngularFormComponentsModule = /** @class */ (function () {
    function AngularFormComponentsModule() {
    }
    return AngularFormComponentsModule;
}());
AngularFormComponentsModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                ],
                providers: [],
                declarations: __spread(COMPONENTS),
                exports: __spread(COMPONENTS)
            },] },
];

export { COMPONENTS, AngularFormComponentsModule, FilterService, Selectable, MULTI_IMPORT_SERVICES_MAP, SelectorServiceInjector, AfmInputComponent as ɵa, AfmNumberComponent as ɵb, AfmCheckboxComponent as ɵf, AfmRadioComponent as ɵg, AfmSelect2Component as ɵh, AfmSelectComponent as ɵe, AfmSingleCheckboxComponent as ɵi, AfmTextareaComponent as ɵc, AfmValidateMessageComponent as ɵd };
//# sourceMappingURL=angular-form-components.js.map
