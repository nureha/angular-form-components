(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('rxjs/Subject'), require('rxjs/operators'), require('rxjs/ReplaySubject'), require('rxjs/Subscription'), require('@angular/common')) :
	typeof define === 'function' && define.amd ? define('angular-form-components', ['exports', '@angular/core', '@angular/forms', 'rxjs/Subject', 'rxjs/operators', 'rxjs/ReplaySubject', 'rxjs/Subscription', '@angular/common'], factory) :
	(factory((global['angular-form-components'] = {}),global.ng.core,global.ng.forms,global.Rx,global.Rx.Observable.prototype,global.Rx,global.Rx,global.ng.common));
}(this, (function (exports,core,forms,Subject,operators,ReplaySubject,Subscription,common) { 'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0
THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.
See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */
var extendStatics = Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}









function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}
function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

var AfcInputComponent = /** @class */ (function () {
    function AfcInputComponent() {
        this.type = 'text';
        this._readonly = false;
    }
    Object.defineProperty(AfcInputComponent.prototype, "readonly", {
        get: function () {
            return this._readonly;
        },
        set: function (flag) {
            this._readonly = flag;
        },
        enumerable: true,
        configurable: true
    });
    AfcInputComponent.prototype.ngOnInit = function () {
        var err = this.formControl.validator && this.formControl.validator(new forms.FormControl());
        this.required = !!err && !!err['required'];
    };
    AfcInputComponent.prototype.writeValue = function (_) { };
    AfcInputComponent.prototype.registerOnChange = function (_) { };
    AfcInputComponent.prototype.registerOnTouched = function (_) { };
    return AfcInputComponent;
}());
AfcInputComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'afc-input',
                template: "\n    <label *ngIf=\"label\"><span *ngIf=\"required\">*&nbsp;</span>{{ label }}</label>\n    <afc-validate-message [control]=\"formControl\" [name]=\"label\"><ng-content></ng-content></afc-validate-message>\n    <input class=\"form-control\"\n      [type]=\"type\" [formControl]=\"formControl\" [readonly]=\"readonly\">\n  ",
                providers: [{
                        provide: forms.NG_VALUE_ACCESSOR,
                        useExisting: core.forwardRef(function () { return AfcInputComponent; }),
                        multi: true
                    }]
            },] },
];
AfcInputComponent.ctorParameters = function () { return []; };
AfcInputComponent.propDecorators = {
    "formControl": [{ type: core.Input },],
    "label": [{ type: core.Input },],
    "type": [{ type: core.Input },],
    "readonly": [{ type: core.Input },],
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
var AfcNumberComponent = /** @class */ (function () {
    function AfcNumberComponent(renderer, elm) {
        this.renderer = renderer;
        this.elm = elm;
        this.type = 'number';
        this.afterPointNum = 2;
        this.blur = new core.EventEmitter();
        this.innerFormControl = new forms.FormControl();
        this._readonly = false;
        this.onChangePropagate = function () { };
    }
    Object.defineProperty(AfcNumberComponent.prototype, "readonly", {
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
    Object.defineProperty(AfcNumberComponent.prototype, "formatedValue", {
        get: function () {
            if (this.type === 'percent') {
                return numberFormat(this.innerFormControl.value) + '%';
            }
            return numberFormat(this.innerFormControl.value);
        },
        enumerable: true,
        configurable: true
    });
    AfcNumberComponent.prototype.onKeyDown = function (key) {
        switch (key) {
            case 't':
                this.innerFormControl.patchValue(moveDigit(this.innerFormControl.value, 3));
                break;
            case 'm':
                this.innerFormControl.patchValue(moveDigit(this.innerFormControl.value, 6));
                break;
        }
    };
    AfcNumberComponent.prototype.ngOnInit = function () {
        var _this = this;
        var err = this.formControl.validator && this.formControl.validator(new forms.FormControl());
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
    AfcNumberComponent.prototype.ngAfterViewInit = function () {
        this.onBlur(true);
    };
    AfcNumberComponent.prototype.onBlur = function (noEmit) {
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
    AfcNumberComponent.prototype.onFocus = function () {
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
    AfcNumberComponent.prototype.writeValue = function (value) {
        if (this.type === 'percent') {
            value = moveDigit(value, this.afterPointNum);
        }
        this.innerFormControl.patchValue(value);
        this.renderer.setProperty(this.dummyInput, 'value', this.formatedValue);
    };
    AfcNumberComponent.prototype.registerOnChange = function (fn) {
        this.onChangePropagate = fn;
    };
    AfcNumberComponent.prototype.registerOnTouched = function (_) { };
    return AfcNumberComponent;
}());
AfcNumberComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'afc-number',
                template: "\n    <label *ngIf=\"label\"><span *ngIf=\"required\">*&nbsp;</span>{{ label }}</label>\n    <afc-validate-message [control]=\"formControl\" [name]=\"label\"><ng-content></ng-content></afc-validate-message>\n    <input class=\"form-control\"\n      (blur)=\"onBlur()\"\n      type=\"number\" [formControl]=\"innerFormControl\">\n    <input class=\"form-control\" (focus)=\"onFocus()\" [readonly]=\"readonly\">\n  ",
                providers: [{
                        provide: forms.NG_VALUE_ACCESSOR,
                        useExisting: core.forwardRef(function () { return AfcNumberComponent; }),
                        multi: true
                    }]
            },] },
];
AfcNumberComponent.ctorParameters = function () { return [
    { type: core.Renderer2, },
    { type: core.ElementRef, },
]; };
AfcNumberComponent.propDecorators = {
    "formControl": [{ type: core.Input },],
    "label": [{ type: core.Input },],
    "type": [{ type: core.Input },],
    "afterPointNum": [{ type: core.Input },],
    "readonly": [{ type: core.Input },],
    "blur": [{ type: core.Output },],
    "onKeyDown": [{ type: core.HostListener, args: ['keydown', ['$event.key'],] },],
};
var FilterService = /** @class */ (function () {
    function FilterService(ob, _target, _type) {
        var _this = this;
        this.ob = ob;
        this._target = _target;
        this._type = _type;
        this.action$ = new Subject.Subject();
        this._regExp = RegExp('.*');
        this._and = [];
        this._or = [];
        ob.subscribe(function (v) {
            _this._val = v;
            _this._regExp = new RegExp(v);
        });
        this._onChange = this.action$.pipe(operators.merge(ob));
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
        this._onChange = this._onChange.pipe(operators.merge(s.onChange));
        return this;
    };
    FilterService.prototype.or = function (s) {
        this._or.push(s);
        this._onChange = this._onChange.pipe(operators.merge(s.onChange));
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
var MULTI_IMPORT_SERVICES_MAP = new core.InjectionToken('MULTI_IMPORT_SERVICES_MAP');
var SelectorServiceInjector = /** @class */ (function () {
    function SelectorServiceInjector(injector, services) {
        this.injector = injector;
        this.services = services;
        this.providers = Array.from(this.services.map.values());
    }
    SelectorServiceInjector.prototype.get = function (name) {
        var _class = this.services.map.get(name);
        if (_class) {
            var injector = core.ReflectiveInjector.resolveAndCreate((this.providers), this.injector);
            return injector.get(_class);
        }
        throw new Error(name + " is not provided!");
    };
    return SelectorServiceInjector;
}());
SelectorServiceInjector.decorators = [
    { type: core.Injectable },
];
SelectorServiceInjector.ctorParameters = function () { return [
    { type: core.Injector, },
    { type: undefined, decorators: [{ type: core.Inject, args: [MULTI_IMPORT_SERVICES_MAP,] },] },
]; };
var ERROR_MESSAGE_FACTORY_SERVICE = new core.InjectionToken('ERROR_MESSAGE_FACTORY_SERVICE');
var NopeErrorMessageFactoryService = /** @class */ (function () {
    function NopeErrorMessageFactoryService() {
    }
    NopeErrorMessageFactoryService.prototype.create = function (error, name) {
        return [];
    };
    return NopeErrorMessageFactoryService;
}());
NopeErrorMessageFactoryService.decorators = [
    { type: core.Injectable },
];
NopeErrorMessageFactoryService.ctorParameters = function () { return []; };
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
        this.action$ = new ReplaySubject.ReplaySubject(1);
    }
    ArrayService.prototype.list = function () {
        return this.action$.pipe(operators.share());
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
var AfcSelectBase = /** @class */ (function () {
    function AfcSelectBase(services) {
        var _this = this;
        this.services = services;
        this.list = [];
        this.rejects = [];
        this.innerFormControl = new forms.FormControl();
        this.dataPrepared$ = new Subject.Subject();
        this.writeValue$ = new Subject.Subject();
        this.subscriptions = new Subscription.Subscription();
        this.initialized$ = new Subject.Subject();
        this.onChangeEventPrepared$ = new Subject.Subject();
        this.defaultValue = null;
        this.onChangePropagate = function () { };
        this.subscriptions.add(this.dataPrepared$.pipe(operators.filter(function (v) { return !!v; })).pipe(operators.combineLatest(this.initialized$.pipe(operators.filter(function (v) { return !!v; }))), operators.combineLatest(this.onChangeEventPrepared$.pipe(operators.filter(function (v) { return !!v; }))), operators.combineLatest(this.writeValue$)).subscribe(function (v) {
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
        this.subscriptions.add(this.dataPrepared$.pipe(operators.filter(function (v) { return !!v; })).pipe(operators.combineLatest(this.initialized$.pipe(operators.filter(function (v) { return !!v; }))), operators.combineLatest(this.onChangeEventPrepared$.pipe(operators.filter(function (v) { return !!v; }))), operators.combineLatest(this.innerFormControl.valueChanges)).subscribe(function (v) {
            if (_this.data && _this.valueType === 'object') {
                v[1] = _this.data.find(function (d) { return d.forSelectValue === v[1]; });
            }
            _this.value = v[1];
        }));
    }
    Object.defineProperty(AfcSelectBase.prototype, "value", {
        set: function (value) {
            this.onChangePropagate(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AfcSelectBase.prototype, "_required", {
        get: function () {
            var err = this.formControl.validator && this.formControl.validator(new forms.FormControl());
            this.required = !!err && !!err['required'];
            if (this.required) {
                this.innerFormControl.setValidators(forms.Validators.required);
            }
            else {
                this.innerFormControl.clearValidators();
            }
            return this.required;
        },
        enumerable: true,
        configurable: true
    });
    AfcSelectBase.prototype.ngOnInit = function () {
        var _this = this;
        this.id = '_AfcSelect_' + id.toString();
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
    AfcSelectBase.prototype.ngOnChanges = function (changes) {
        if (changes['sourceName'] && changes['sourceName'].currentValue !== changes['sourceName'].previousValue ||
            changes['list'] && changes['list'].currentValue.length !== changes['list'].previousValue.length ||
            changes['rejects'] && changes['rejects'].currentValue.length !== changes['rejects'].previousValue.length) {
            if (this._service) {
                this.query();
            }
        }
    };
    AfcSelectBase.prototype.ngOnDestroy = function () {
        this.subscriptions.unsubscribe();
    };
    AfcSelectBase.prototype.query = function () {
        this.dataPrepared$.next(false);
        var parsed = this._parse(this.sourceName);
        if ((parsed.name === 'list' || parsed.name === 'range') && this.list) {
            this._service.query(this.list);
        }
        else {
            this._service.query(parsed.query);
        }
    };
    AfcSelectBase.prototype.existsInSelector = function (val) {
        if (!val && val !== 0) {
            return false;
        }
        return this.data.some(function (item) { return item.forSelectValue === val; });
    };
    AfcSelectBase.prototype.observer = function () {
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
    AfcSelectBase.prototype._parse = function (sourceName) {
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
    AfcSelectBase.prototype.validateInnerFormValue = function () {
        return !(this._required && !this.innerFormControl.value && this.innerFormControl.value !== 0 ||
            !this.existsInSelector(this.innerFormControl.value) &&
                (!!this.innerFormControl.value || this.innerFormControl.value === 0));
    };
    AfcSelectBase.prototype.writeValue = function (value) {
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
    AfcSelectBase.prototype.registerOnChange = function (fn) {
        this.onChangePropagate = fn;
        this.onChangeEventPrepared$.next(true);
    };
    AfcSelectBase.prototype.registerOnTouched = function (_) { };
    AfcSelectBase.prototype.isEffectiveValue = function (value) {
        return !!value || value === 0;
    };
    return AfcSelectBase;
}());
var AfcCheckboxComponent = /** @class */ (function (_super) {
    __extends(AfcCheckboxComponent, _super);
    function AfcCheckboxComponent(services) {
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
    Object.defineProperty(AfcCheckboxComponent.prototype, "value", {
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
    AfcCheckboxComponent.prototype.ngOnInit = function () {
        var _this = this;
        _super.prototype.ngOnInit.call(this);
        if (this.filter) {
            this.subscriptions.add(this.dataPrepared$
                .pipe(operators.filter(function (v) { return !!v; }), operators.combineLatest(this.filter.onChange), operators.delay(0))
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
                .pipe(operators.filter(function (v) { return !!v; }))
                .subscribe(function (v) {
                _this.filteredData = _this.data.filter(function (_) { return true; });
            }));
        }
        if (this._detaPrepared) {
            this.dataPrepared$.next(true);
        }
    };
    AfcCheckboxComponent.prototype.onChange = function ($event, val) {
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
    AfcCheckboxComponent.prototype.allCheck = function () {
        var _this = this;
        this.value = __spread(this._value, this.filteredData.filter(function (d) { return _this._value.indexOf(d.forSelectValue) === -1; }).map(function (d) { return d.forSelectValue; }));
    };
    AfcCheckboxComponent.prototype.allClear = function () {
        var filteredDataArray = this.filteredData.map(function (d) { return d.forSelectValue; });
        this.value = this._value.filter(function (v) { return filteredDataArray.indexOf(v) === -1; });
    };
    AfcCheckboxComponent.prototype.existsInSelector = function (val) {
        var _this = this;
        var _val = (!val || val instanceof Array) ? val : [val];
        return !_val || !_val.length || _val.reduce(function (prev, curr) {
            return prev || _this.data.some(function (item) { return item.forSelectValue === curr; });
        }, false);
    };
    AfcCheckboxComponent.prototype.writeValue = function (val) {
        this._value = val;
        this.innerFormControl.patchValue(val);
    };
    return AfcCheckboxComponent;
}(AfcSelectBase));
AfcCheckboxComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'afc-checkbox',
                template: "\n    <p>{{ label }}</p>\n    <div *ngIf=\"!!filter\">\n      <div class=\"form-group col-md-12\">\n        <div class=\"col-md-2\">\n          <p class=\"fit\">\u8868\u793A\u4E2D\u306E\u9078\u629E\u80A2\u3059\u3079\u3066\u3092</p>\n          <button type=\"button\" class=\"btn btn-info btn-sm\" (click)=\"allCheck()\">\u9078\u629E</button>\n          <button type=\"button\" class=\"btn btn-warning btn-sm\" (click)=\"allClear()\">\u30AF\u30EA\u30A2</button>\n        </div>\n      </div>\n    </div>\n    <afc-validate-message [control]=\"formControl\" [name]=\"label\"><ng-content></ng-content></afc-validate-message>\n    <label class=\"checkbox-inline hidden\"></label>\n    <label htmlFor=\"{{ id }}_{{ item.forSelectValue }}\" *ngFor=\"let item of filteredData\"\n        class=\"checkbox-inline custom-checkbox nowrap margin-bottom\">\n      <input id=\"{{ id }}_{{ item.forSelectValue }}\" type=\"checkbox\" class=\"form-control\"\n        (change)=\"onChange($event, item.forSelectValue)\" [checked]=\"value.indexOf(item.forSelectValue) !== -1\">\n      <span [ngClass]=\"{'selected': value.indexOf(item.forSelectValue) !== -1}\"\n        [style.width]=\"width\" [innerHtml]=\"item.forSelectName\"></span>\n    </label>\n  ",
                styles: ["\n    span.selected {\n      text-decoration: underline;\n      text-decoration-style: double;\n    }\n  ", "\n    label.margin-bottom {\n      margin-bottom: 20px;\n    }\n  ", "\n    p.fit {\n      margin-bottom: 0;\n    }\n  "],
                providers: [{
                        provide: forms.NG_VALUE_ACCESSOR,
                        useExisting: core.forwardRef(function () { return AfcCheckboxComponent; }),
                        multi: true
                    },
                    SelectorServiceInjector
                ]
            },] },
];
AfcCheckboxComponent.ctorParameters = function () { return [
    { type: SelectorServiceInjector, },
]; };
AfcCheckboxComponent.propDecorators = {
    "formControl": [{ type: core.Input },],
    "sourceName": [{ type: core.Input },],
    "label": [{ type: core.Input },],
    "valueType": [{ type: core.Input },],
    "list": [{ type: core.Input },],
    "rejects": [{ type: core.Input },],
    "filter": [{ type: core.Input },],
};
var AfcRadioComponent = /** @class */ (function (_super) {
    __extends(AfcRadioComponent, _super);
    function AfcRadioComponent(services) {
        var _this = _super.call(this, services) || this;
        _this.valueType = 'number';
        _this.list = [];
        _this.rejects = [];
        return _this;
    }
    return AfcRadioComponent;
}(AfcSelectBase));
AfcRadioComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'afc-radio',
                template: "\n    <p *ngIf=\"!!label\"><span [hidden]=\"!required\">*&nbsp;</span>{{ label }}</p>\n    <afc-validate-message [control]=\"formControl\" [name]=\"label\"><ng-content></ng-content></afc-validate-message>\n    <label htmlFor=\"{{ id }}_{{ item.forSelectValue }}\" *ngFor=\"let item of data\" class=\"radio-inline custom-radio nowrap\">\n      <input id=\"{{ id }}_{{ item.forSelectValue }}\" type=\"radio\" class=\"form-control\" name=\"{{ id }}\"\n        [value]=\"item.forSelectValue\" [formControl]=\"innerFormControl\">\n      <span [innerHtml]=\"item.forSelectName\"></span>\n    </label>\n  ",
                providers: [{
                        provide: forms.NG_VALUE_ACCESSOR,
                        useExisting: core.forwardRef(function () { return AfcRadioComponent; }),
                        multi: true
                    },
                    SelectorServiceInjector
                ]
            },] },
];
AfcRadioComponent.ctorParameters = function () { return [
    { type: SelectorServiceInjector, },
]; };
AfcRadioComponent.propDecorators = {
    "formControl": [{ type: core.Input },],
    "sourceName": [{ type: core.Input },],
    "label": [{ type: core.Input },],
    "valueType": [{ type: core.Input },],
    "list": [{ type: core.Input },],
    "rejects": [{ type: core.Input },],
};
var AfcSelectComponent = /** @class */ (function (_super) {
    __extends(AfcSelectComponent, _super);
    function AfcSelectComponent(services) {
        var _this = _super.call(this, services) || this;
        _this.valueType = 'number';
        _this.list = [];
        _this.rejects = [];
        _this.selected = null;
        _this._readonly = false;
        _this.dataPrepared$.pipe(operators.filter(function (v) { return !!v; }), operators.combineLatest(_this.innerFormControl.valueChanges)).subscribe(function (v) {
            _this.selected = _this.data.find(function (d) { return d.forSelectValue === v[1]; });
        });
        return _this;
    }
    Object.defineProperty(AfcSelectComponent.prototype, "readonly", {
        get: function () {
            return this._readonly;
        },
        set: function (flag) {
            this._readonly = flag;
        },
        enumerable: true,
        configurable: true
    });
    return AfcSelectComponent;
}(AfcSelectBase));
AfcSelectComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'afc-select',
                template: "\n    <label *ngIf=\"label\" [htmlFor]=\"id\"><span [hidden]=\"!required\">*&nbsp;</span>{{ label }}</label>\n    <ng-container *ngIf=\"!readonly\">\n      <afc-validate-message [control]=\"formControl\" [name]=\"label\"><ng-content></ng-content></afc-validate-message>\n      <select [id]=\"id\" class=\"form-control\" [formControl]=\"innerFormControl\" [required]=\"required\">\n        <option *ngIf=\"!required\" [ngValue]=\"null\"></option>\n        <option *ngFor=\"let item of data\" [ngValue]=\"item.forSelectValue\" [innerHtml]=\"item.forSelectName\"></option>\n      </select>\n    </ng-container>\n    <ng-container *ngIf=\"readonly\">\n      <span class=\"form-control\" readonly [innerHtml]=\"selected?.forSelectName\"></span>\n    </ng-container>\n  ",
                styles: ["\n    span.selected {\n      text-decoration: underline;\n      text-decoration-style: double;\n    }\n  "],
                providers: [{
                        provide: forms.NG_VALUE_ACCESSOR,
                        useExisting: core.forwardRef(function () { return AfcSelectComponent; }),
                        multi: true
                    },
                    SelectorServiceInjector
                ]
            },] },
];
AfcSelectComponent.ctorParameters = function () { return [
    { type: SelectorServiceInjector, },
]; };
AfcSelectComponent.propDecorators = {
    "formControl": [{ type: core.Input },],
    "sourceName": [{ type: core.Input },],
    "label": [{ type: core.Input },],
    "valueType": [{ type: core.Input },],
    "list": [{ type: core.Input },],
    "rejects": [{ type: core.Input },],
    "readonly": [{ type: core.Input },],
};
var AfcSelect2Component = /** @class */ (function (_super) {
    __extends(AfcSelect2Component, _super);
    function AfcSelect2Component(service) {
        var _this = _super.call(this, service) || this;
        _this.valueType = 'number';
        _this.rejects = [];
        _this.placeholder = '';
        _this._readonly = false;
        _this.selected = null;
        _this._data = [];
        _this.valueTrigger$ = new Subject.Subject();
        _this.preparedElement$ = new Subject.Subject();
        _this.mySubscriptions = new Subscription.Subscription();
        _this.onChangePropagate = function () { };
        _this.mySubscriptions.add(_this.dataPrepared$.pipe(operators.combineLatest(_this.preparedElement$), operators.filter(function (v) { return !!v[0] && !!v[1]; }), operators.combineLatest(_this.valueTrigger$), operators.delay(0)).subscribe(function (v) {
            if (_this.element) {
                _this.element.val(v[1]).trigger('change').trigger('select2:select');
            }
            _this.selected = _this._data.find(function (d) { return d.forSelectValue === v[1]; });
        }));
        return _this;
    }
    Object.defineProperty(AfcSelect2Component.prototype, "readonly", {
        get: function () {
            return this._readonly;
        },
        set: function (flag) {
            this._readonly = flag;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AfcSelect2Component.prototype, "data", {
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
    AfcSelect2Component.prototype.ngAfterViewInit = function () {
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
    AfcSelect2Component.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
        this.mySubscriptions.unsubscribe();
        if (this.element) {
            this.element.off('select2:select');
        }
    };
    AfcSelect2Component.prototype.renderSelect2 = function () {
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
    return AfcSelect2Component;
}(AfcSelectBase));
AfcSelect2Component.decorators = [
    { type: core.Component, args: [{
                selector: 'afc-select2',
                template: "\n    <label><span [hidden]=\"!required\">*&nbsp;</span>{{ label }}</label>\n    <ng-container *ngIf=\"!readonly\">\n      <afc-validate-message [control]=\"formControl\" [name]=\"label\"><ng-content></ng-content></afc-validate-message>\n      <div>\n        <select #selector class=\"form-control\"></select>\n      </div>\n    </ng-container>\n    <ng-container *ngIf=\"readonly\">\n      <span class=\"form-control\" readonly [innerHtml]=\"selected?.forSelectName\"></span>\n    </ng-container>\n  ",
                providers: [{
                        provide: forms.NG_VALUE_ACCESSOR,
                        useExisting: core.forwardRef(function () { return AfcSelect2Component; }),
                        multi: true
                    },
                    SelectorServiceInjector
                ]
            },] },
];
AfcSelect2Component.ctorParameters = function () { return [
    { type: SelectorServiceInjector, },
]; };
AfcSelect2Component.propDecorators = {
    "formControl": [{ type: core.Input },],
    "sourceName": [{ type: core.Input },],
    "label": [{ type: core.Input },],
    "valueType": [{ type: core.Input },],
    "list": [{ type: core.Input },],
    "rejects": [{ type: core.Input },],
    "placeholder": [{ type: core.Input },],
    "readonly": [{ type: core.Input },],
    "selector": [{ type: core.ViewChild, args: ['selector',] },],
};
var AfcSingleCheckboxComponent = /** @class */ (function () {
    function AfcSingleCheckboxComponent() {
        this._readonly = false;
        this.required = false;
        this.subscription = new Subscription.Subscription();
        this.readonlyFormControl = new forms.FormControl();
    }
    Object.defineProperty(AfcSingleCheckboxComponent.prototype, "readonly", {
        get: function () {
            return this._readonly;
        },
        set: function (flag) {
            this._readonly = flag;
        },
        enumerable: true,
        configurable: true
    });
    AfcSingleCheckboxComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.readonlyFormControl.disable();
        this.trueValueLabel = this.trueValueLabel ? this.trueValueLabel : this.label;
        var err = this.formControl.validator && this.formControl.validator(new forms.FormControl());
        this.required = err && !!err['required'];
        this.subscription.add(this.formControl.valueChanges.pipe(operators.filter(function (v) { return (!v && v !== false); })).subscribe(function (_) {
            _this.onChangePropagate(false);
        }));
    };
    AfcSingleCheckboxComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    AfcSingleCheckboxComponent.prototype.writeValue = function (v) {
        this.readonlyFormControl.patchValue(v);
    };
    AfcSingleCheckboxComponent.prototype.registerOnChange = function (fn) {
        this.onChangePropagate = fn;
    };
    AfcSingleCheckboxComponent.prototype.registerOnTouched = function (_) { };
    return AfcSingleCheckboxComponent;
}());
AfcSingleCheckboxComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'afc-single-checkbox',
                template: "\n    <p *ngIf=\"!!label\"><span *ngIf=\"required\">*&nbsp;</span>{{ label }}</p>\n    <afc-validate-message [control]=\"formControl\" [name]=\"label\"><ng-content></ng-content></afc-validate-message>\n    <label class=\"checkbox-inline custom-checkbox nowrap\">\n      <input type=\"checkbox\" class=\"form-control\" *ngIf=\"!readonly\" [formControl]=\"formControl\">\n      <input type=\"checkbox\" class=\"form-control\" *ngIf=\"readonly\" [formControl]=\"readonlyFormControl\">\n      <span>{{ trueValueLabel }}</span>\n    </label>\n  ",
                providers: [{
                        provide: forms.NG_VALUE_ACCESSOR,
                        useExisting: core.forwardRef(function () { return AfcSingleCheckboxComponent; }),
                        multi: true
                    }]
            },] },
];
AfcSingleCheckboxComponent.ctorParameters = function () { return []; };
AfcSingleCheckboxComponent.propDecorators = {
    "formControl": [{ type: core.Input },],
    "label": [{ type: core.Input },],
    "trueValueLabel": [{ type: core.Input },],
    "readonly": [{ type: core.Input },],
};
var AfcTextareaComponent = /** @class */ (function () {
    function AfcTextareaComponent() {
    }
    AfcTextareaComponent.prototype.ngOnInit = function () {
        var err = this.formControl.validator && this.formControl.validator(new forms.FormControl());
        this.required = err && !!err['required'];
    };
    AfcTextareaComponent.prototype.writeValue = function (_) { };
    AfcTextareaComponent.prototype.registerOnChange = function (_) { };
    AfcTextareaComponent.prototype.registerOnTouched = function (_) { };
    return AfcTextareaComponent;
}());
AfcTextareaComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'afc-textarea',
                template: "\n    <label *ngIf=\"label\"><span *ngIf=\"required\">*&nbsp;</span>{{ label }}</label>\n    <afc-validate-message [control]=\"formControl\" [name]=\"label\"><ng-content></ng-content></afc-validate-message>\n    <textarea [formControl]=\"formControl\" class=\"form-control\"></textarea>\n  ",
                providers: [{
                        provide: forms.NG_VALUE_ACCESSOR,
                        useExisting: core.forwardRef(function () { return AfcTextareaComponent; }),
                        multi: true
                    }]
            },] },
];
AfcTextareaComponent.ctorParameters = function () { return []; };
AfcTextareaComponent.propDecorators = {
    "formControl": [{ type: core.Input },],
    "label": [{ type: core.Input },],
};
var AfcValidateMessageComponent = /** @class */ (function () {
    function AfcValidateMessageComponent(messageFactoryService) {
        this.messageFactoryService = messageFactoryService;
        this.name = '';
        this.subscription = new Subscription.Subscription();
        this.messages = [];
    }
    AfcValidateMessageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription.add(this.control.valueChanges.subscribe(function (v) {
            if (_this.control.errors) {
                _this.messages = _this.messageFactoryService.create(_this.control.errors, _this.name);
            }
        }));
        if (this.control.errors) {
            this.messages = this.messageFactoryService.create(this.control.errors, this.name);
        }
    };
    AfcValidateMessageComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    return AfcValidateMessageComponent;
}());
AfcValidateMessageComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'afc-validate-message',
                template: "\n    <div>\n      <span class=\"validation-errors\" *ngIf=\"control.touched && control.invalid\">\n        <ng-content></ng-content>\n        <p *ngFor=\"let m of messages\">{{ m }}</p>\n      </span>\n    </div>\n  ",
                styles: ["\n    div {\n      position: relative;\n    }\n  ", "\n    span.validation-errors {\n      position: absolute;\n      color: #ffffff;\n      bottom: 70%;\n      right: -20px;\n      padding: 7px;\n      background-color: #bd362f;\n      border-radius: 7px;\n      z-index: 10000;\n    }\n  ", "\n    span.validation-errors:before {\n      content: \"\";\n      position: absolute;\n      top: 100%;\n      left: 50%;\n      margin-left: -7px;\n      border: 7px solid transparent;\n      border-top: 7px solid #bd362f;\n      z-index: 10000;\n    }\n  ", "\n    p {\n      margin: 0;\n      padding: 0;\n    }\n  "]
            },] },
];
AfcValidateMessageComponent.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: core.Inject, args: [ERROR_MESSAGE_FACTORY_SERVICE,] },] },
]; };
AfcValidateMessageComponent.propDecorators = {
    "control": [{ type: core.Input },],
    "name": [{ type: core.Input },],
};
var COMPONENTS = [
    AfcInputComponent,
    AfcNumberComponent,
    AfcCheckboxComponent,
    AfcRadioComponent,
    AfcSelectComponent,
    AfcSelect2Component,
    AfcSingleCheckboxComponent,
    AfcTextareaComponent,
    AfcValidateMessageComponent,
];
var AngularFormComponentsModule = /** @class */ (function () {
    function AngularFormComponentsModule() {
    }
    return AngularFormComponentsModule;
}());
AngularFormComponentsModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [
                    common.CommonModule,
                    forms.FormsModule,
                    forms.ReactiveFormsModule,
                ],
                providers: [
                    NopeErrorMessageFactoryService,
                    {
                        provide: ERROR_MESSAGE_FACTORY_SERVICE,
                        useExisting: NopeErrorMessageFactoryService,
                    }
                ],
                declarations: __spread(COMPONENTS),
                exports: __spread(COMPONENTS)
            },] },
];

exports.AngularFormComponentsModule = AngularFormComponentsModule;
exports.AfcInputComponent = AfcInputComponent;
exports.AfcNumberComponent = AfcNumberComponent;
exports.AfcCheckboxComponent = AfcCheckboxComponent;
exports.AfcRadioComponent = AfcRadioComponent;
exports.AfcSelectComponent = AfcSelectComponent;
exports.AfcSelect2Component = AfcSelect2Component;
exports.AfcSingleCheckboxComponent = AfcSingleCheckboxComponent;
exports.AfcTextareaComponent = AfcTextareaComponent;
exports.AfcValidateMessageComponent = AfcValidateMessageComponent;
exports.FilterService = FilterService;
exports.Selectable = Selectable;
exports.MULTI_IMPORT_SERVICES_MAP = MULTI_IMPORT_SERVICES_MAP;
exports.SelectorServiceInjector = SelectorServiceInjector;
exports.ERROR_MESSAGE_FACTORY_SERVICE = ERROR_MESSAGE_FACTORY_SERVICE;
exports.NopeErrorMessageFactoryService = NopeErrorMessageFactoryService;
exports.ɵa = AfcSelectBase;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=angular-form-components.umd.js.map
