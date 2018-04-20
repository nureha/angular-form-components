import { Component, Input, forwardRef, Output, EventEmitter, Renderer2, ElementRef, HostListener, Injectable, Injector, InjectionToken, ReflectiveInjector, Inject, ViewChild, NgModule } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { merge, combineLatest, share, filter, delay } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subscription } from 'rxjs/Subscription';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AfcInputComponent {
    constructor() {
        this.type = 'text';
        this._readonly = false;
    }
    /**
     * @param {?} flag
     * @return {?}
     */
    set readonly(flag) {
        this._readonly = flag;
    }
    /**
     * @return {?}
     */
    get readonly() {
        return this._readonly;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        const /** @type {?} */ err = this.formControl.validator && this.formControl.validator(new FormControl());
        this.required = !!err && !!err['required'];
    }
    /**
     * @param {?} _
     * @return {?}
     */
    writeValue(_) { }
    /**
     * @param {?} _
     * @return {?}
     */
    registerOnChange(_) { }
    /**
     * @param {?} _
     * @return {?}
     */
    registerOnTouched(_) { }
}
AfcInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'afc-input',
                template: `
    <label *ngIf="label"><span *ngIf="required">*&nbsp;</span>{{ label }}</label>
    <afc-validate-message [control]="formControl" [name]="label"><ng-content></ng-content></afc-validate-message>
    <input class="form-control"
      [type]="type" [formControl]="formControl" [readonly]="readonly">
  `,
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => AfcInputComponent),
                        multi: true
                    }]
            },] },
];
/** @nocollapse */
AfcInputComponent.ctorParameters = () => [];
AfcInputComponent.propDecorators = {
    "formControl": [{ type: Input },],
    "label": [{ type: Input },],
    "type": [{ type: Input },],
    "readonly": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @param {?} decimal
 * @param {?} moves
 * @return {?}
 */
function moveDigit(decimal, moves) {
    const /** @type {?} */ nums = (decimal || 0).toString().split('.');
    let /** @type {?} */ prefix = '';
    if (/^-/.test(nums[0])) {
        prefix = '-';
        nums[0] = nums[0].substring(1);
    }
    // 小数が 0.0e-00 形式だった場合
    if (nums[1] && /e-/.test(nums[1])) {
        const /** @type {?} */ _nums1 = nums[1].split('e-');
        nums[1] = '0.';
        for (let /** @type {?} */ i = 1; i < parseInt(_nums1[1], 10); ++i) {
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
        let /** @type {?} */ base = '0.';
        if (nums[0] === '0') {
            for (let /** @type {?} */ i = 0; i > moves; --i) {
                base += '0';
            }
            return parseFloat(prefix + base + nums[1]);
        }
        // 計算結果が1より小さくなる場合
        if (nums[0].length <= -moves) {
            for (let /** @type {?} */ i = 0; i > (moves + nums[0].length); --i) {
                base += '0';
            }
            return parseFloat(prefix + base + nums[0] + nums[1]);
        }
        // それ以外の場合
        return parseFloat(prefix + nums[0].substr(0, nums[0].length + moves) + '.' + nums[0].substr(nums[0].length + moves, -moves) + nums[1]);
    }
}
/**
 * @param {?} num
 * @param {?=} underPoint
 * @return {?}
 */
function numberFormat(num, underPoint = -1) {
    if (typeof num === 'object') {
        return '';
    }
    if (underPoint > -1) {
        num = moveDigit(Math.round(moveDigit(num, underPoint)), -underPoint);
    }
    return num.toString().split('.').map((str, index) => {
        return index > 0 ? str : str.split('').reverse()
            .map((s, i) => s += i && (i % 3 === 0) && s !== '-' ? ',' : '')
            .reverse().join('');
    }).join('.');
}
class AfcNumberComponent {
    /**
     * @param {?} renderer
     * @param {?} elm
     */
    constructor(renderer, elm) {
        this.renderer = renderer;
        this.elm = elm;
        this.type = 'number';
        this.afterPointNum = 2;
        this.blur = new EventEmitter();
        this.innerFormControl = new FormControl();
        this._readonly = false;
        this.onChangePropagate = () => { };
    }
    /**
     * @param {?} flag
     * @return {?}
     */
    set readonly(flag) {
        this._readonly = flag;
        this.onBlur(true);
    }
    /**
     * @return {?}
     */
    get readonly() {
        return this._readonly;
    }
    /**
     * @return {?}
     */
    get formatedValue() {
        if (this.type === 'percent') {
            return numberFormat(this.innerFormControl.value) + '%';
        }
        return numberFormat(this.innerFormControl.value);
    }
    /**
     * @param {?} key
     * @return {?}
     */
    onKeyDown(key) {
        switch (key) {
            case 't':
                this.innerFormControl.patchValue(moveDigit(this.innerFormControl.value, 3));
                break;
            case 'm':
                this.innerFormControl.patchValue(moveDigit(this.innerFormControl.value, 6));
                break;
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        const /** @type {?} */ err = this.formControl.validator && this.formControl.validator(new FormControl());
        this.required = !!err && !!err['required'];
        this.innerFormControl.setValidators(this.formControl.validator);
        const /** @type {?} */ inputs = Array.prototype.filter.call(this.elm.nativeElement.childNodes, c => c.nodeName === 'INPUT');
        this.realInput = inputs[0];
        this.dummyInput = inputs[1];
        this.innerFormControl.valueChanges.subscribe(v => {
            if (this.type === 'percent') {
                v = moveDigit(v, -this.afterPointNum);
            }
            if (v !== this.formControl.value) {
                this.onChangePropagate(v);
            }
        });
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.onBlur(true);
    }
    /**
     * @param {?=} noEmit
     * @return {?}
     */
    onBlur(noEmit = false) {
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
    }
    /**
     * @return {?}
     */
    onFocus() {
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
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (this.type === 'percent') {
            value = moveDigit(value, this.afterPointNum);
        }
        this.innerFormControl.patchValue(value);
        this.renderer.setProperty(this.dummyInput, 'value', this.formatedValue);
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChangePropagate = fn;
    }
    /**
     * @param {?} _
     * @return {?}
     */
    registerOnTouched(_) { }
}
AfcNumberComponent.decorators = [
    { type: Component, args: [{
                selector: 'afc-number',
                template: `
    <label *ngIf="label"><span *ngIf="required">*&nbsp;</span>{{ label }}</label>
    <afc-validate-message [control]="formControl" [name]="label"><ng-content></ng-content></afc-validate-message>
    <input class="form-control"
      (blur)="onBlur()"
      type="number" [formControl]="innerFormControl">
    <input class="form-control" (focus)="onFocus()" [readonly]="readonly">
  `,
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => AfcNumberComponent),
                        multi: true
                    }]
            },] },
];
/** @nocollapse */
AfcNumberComponent.ctorParameters = () => [
    { type: Renderer2, },
    { type: ElementRef, },
];
AfcNumberComponent.propDecorators = {
    "formControl": [{ type: Input },],
    "label": [{ type: Input },],
    "type": [{ type: Input },],
    "afterPointNum": [{ type: Input },],
    "readonly": [{ type: Input },],
    "blur": [{ type: Output },],
    "onKeyDown": [{ type: HostListener, args: ['keydown', ['$event.key'],] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class FilterService {
    /**
     * @param {?} ob
     * @param {?} _target
     * @param {?} _type
     */
    constructor(ob, _target, _type) {
        this.ob = ob;
        this._target = _target;
        this._type = _type;
        this.action$ = new Subject();
        this._regExp = RegExp('.*');
        this._and = [];
        this._or = [];
        ob.subscribe(v => {
            this._val = v;
            this._regExp = new RegExp(v);
        });
        this._onChange = this.action$.pipe(merge(ob));
    }
    /**
     * @return {?}
     */
    get onChange() {
        return this._onChange;
    }
    /**
     * @param {?} form
     * @param {?} target
     * @return {?}
     */
    static match(form, target) {
        return new FilterService(form.valueChanges, target, '~');
    }
    /**
     * @param {?} form
     * @param {?} target
     * @return {?}
     */
    static equal(form, target) {
        return new FilterService(form.valueChanges, target, '=');
    }
    /**
     * @param {?} form
     * @param {?} target
     * @return {?}
     */
    static graterThan(form, target) {
        return new FilterService(form.valueChanges, target, '>');
    }
    /**
     * @param {?} form
     * @param {?} target
     * @return {?}
     */
    static over(form, target) {
        return new FilterService(form.valueChanges, target, '>=');
    }
    /**
     * @param {?} form
     * @param {?} target
     * @return {?}
     */
    static lessThan(form, target) {
        return new FilterService(form.valueChanges, target, '<');
    }
    /**
     * @param {?} form
     * @param {?} target
     * @return {?}
     */
    static under(form, target) {
        return new FilterService(form.valueChanges, target, '<=');
    }
    /**
     * @param {?} item
     * @return {?}
     */
    check(item) {
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
    }
    /**
     * @param {?} item
     * @return {?}
     */
    checkAll(item) {
        return (this._or.length > 0 && this._or.some(s => s.checkAll(item))) ||
            this.check(item) &&
                !this._and.some(s => !s.checkAll(item));
    }
    /**
     * @return {?}
     */
    trigger() {
        this.action$.next(true);
    }
    /**
     * @template T
     * @param {?} list
     * @return {?}
     */
    filter(list) {
        return list.filter(l => this.checkAll(l));
    }
    /**
     * @param {?} s
     * @return {?}
     */
    and(s) {
        this._and.push(s);
        this._onChange = this._onChange.pipe(merge(s.onChange));
        return this;
    }
    /**
     * @param {?} s
     * @return {?}
     */
    or(s) {
        this._or.push(s);
        this._onChange = this._onChange.pipe(merge(s.onChange));
        return this;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @record
 */

/**
 * @abstract
 */
class Selectable {
    /**
     * @return {?}
     */
    get forSelectName() { throw new Error('unimplemented'); }
    /**
     * @return {?}
     */
    get forSelectValue() { throw new Error('unimplemented'); }
    /**
     * @return {?}
     */
    get forSelectDefault() {
        return false;
    }
    /**
     * @return {?}
     */
    get forSelectOrder() { throw new Error('unimplemented'); }
}
/**
 * @record
 */

/**
 * @record
 */

const MULTI_IMPORT_SERVICES_MAP = new InjectionToken('MULTI_IMPORT_SERVICES_MAP');
class SelectorServiceInjector {
    /**
     * @param {?} injector
     * @param {?} services
     */
    constructor(injector, services) {
        this.injector = injector;
        this.services = services;
        this.providers = Array.from(this.services.map.values());
    }
    /**
     * @param {?} name
     * @return {?}
     */
    get(name) {
        const /** @type {?} */ _class = this.services.map.get(name);
        if (_class) {
            const /** @type {?} */ injector = ReflectiveInjector.resolveAndCreate(/** @type {?} */ (this.providers), this.injector);
            return injector.get(_class);
        }
        throw new Error(`${name} is not provided!`);
    }
}
SelectorServiceInjector.decorators = [
    { type: Injectable },
];
/** @nocollapse */
SelectorServiceInjector.ctorParameters = () => [
    { type: Injector, },
    { type: undefined, decorators: [{ type: Inject, args: [MULTI_IMPORT_SERVICES_MAP,] },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @record
 */

const ERROR_MESSAGE_FACTORY_SERVICE = new InjectionToken('ERROR_MESSAGE_FACTORY_SERVICE');
class NopeErrorMessageFactoryService {
    constructor() { }
    /**
     * @param {?} error
     * @param {?} name
     * @return {?}
     */
    create(error, name) {
        return [];
    }
}
NopeErrorMessageFactoryService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
NopeErrorMessageFactoryService.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SelectableConstruct extends Selectable {
    /**
     * @return {?}
     */
    get forSelectName() {
        return this.name;
    }
    /**
     * @return {?}
     */
    get forSelectValue() {
        return this.value;
    }
    /**
     * @return {?}
     */
    get forSelectDefault() {
        return this.default;
    }
    /**
     * @return {?}
     */
    get forSelectOrder() {
        return this.sort;
    }
    /**
     * @param {?} data
     */
    constructor(data) {
        super();
        this.name = data.name;
        this.value = data.value;
        this.default = data.default;
        this.sort = data.sort !== undefined ? data.sort : data.name;
    }
}
class ArrayService {
    constructor() {
        this.action$ = new ReplaySubject(1);
    }
    /**
     * @return {?}
     */
    list() {
        return this.action$.pipe(share());
    }
    /**
     * @param {?} list
     * @return {?}
     */
    query(list) {
        this.action$.next(list.map(l => {
            if (l instanceof Selectable) {
                return l;
            }
            return new SelectableConstruct(l);
        }));
    }
}
let id = 0;
class AfcSelectBase {
    /**
     * @param {?} services
     */
    constructor(services) {
        this.services = services;
        /* @Input */ this.list = [];
        /* @Input */ this.rejects = [];
        this.innerFormControl = new FormControl();
        this.dataPrepared$ = new Subject();
        this.writeValue$ = new Subject();
        this.subscriptions = new Subscription();
        this.initialized$ = new Subject();
        this.onChangeEventPrepared$ = new Subject();
        this.defaultValue = null;
        this.onChangePropagate = () => { };
        this.subscriptions.add(this.dataPrepared$.pipe(filter(v => !!v)).pipe(combineLatest(this.initialized$.pipe(filter(v => !!v))), combineLatest(this.onChangeEventPrepared$.pipe(filter(v => !!v))), combineLatest(this.writeValue$)).subscribe(v => {
            let /** @type {?} */ value = /** @type {?} */ (v[1]);
            if (value || value === 0) {
                if (typeof value === 'object' && value.forSelectValue) {
                    value = value.forSelectValue;
                }
                this.innerFormControl.patchValue(value);
                if (!this.validateInnerFormValue()) {
                    this.innerFormControl.patchValue(!this.defaultValue ? this.defaultValue : this.defaultValue.forSelectValue);
                }
            }
            else if (this.innerFormControl.value || this.innerFormControl.value === 0) {
                this.value = this.innerFormControl.value;
            }
        }));
        this.subscriptions.add(this.dataPrepared$.pipe(filter(v => !!v)).pipe(combineLatest(this.initialized$.pipe(filter(v => !!v))), combineLatest(this.onChangeEventPrepared$.pipe(filter(v => !!v))), combineLatest(this.innerFormControl.valueChanges)).subscribe(v => {
            if (this.data && this.valueType === 'object') {
                v[1] = this.data.find(d => d.forSelectValue === v[1]);
            }
            this.value = v[1];
        }));
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set value(value) {
        this.onChangePropagate(value);
    }
    /**
     * @return {?}
     */
    get _required() {
        const /** @type {?} */ err = this.formControl.validator && this.formControl.validator(new FormControl());
        this.required = !!err && !!err['required'];
        if (this.required) {
            this.innerFormControl.setValidators(Validators.required);
        }
        else {
            this.innerFormControl.clearValidators();
        }
        return this.required;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.id = '_AfcSelect_' + id.toString();
        id++;
        this.required = this._required;
        this.subscriptions.add(this.observer().subscribe(d => {
            d.sort((a, b) => {
                if (a.forSelectOrder > b.forSelectOrder) {
                    return 1;
                }
                else if (a.forSelectOrder < b.forSelectOrder) {
                    return -1;
                }
                return 0;
            });
            this.defaultValue = null;
            this.data = d.filter(item => {
                return this.rejects.length === 0 || this.rejects.indexOf(item.forSelectValue) === -1;
            }).map(item => {
                if (item.forSelectDefault || this.defaultValue === null) {
                    this.defaultValue = item;
                }
                return item;
            });
            this.dataPrepared$.next(true);
            if (!this.validateInnerFormValue()) {
                if (this._required) {
                    this.writeValue$.next(!this.defaultValue ? this.defaultValue : this.defaultValue.forSelectValue);
                }
                else {
                    this.value = null;
                }
            }
        }));
        this.query();
        this.initialized$.next(true);
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes['sourceName'] && changes['sourceName'].currentValue !== changes['sourceName'].previousValue ||
            changes['list'] && changes['list'].currentValue.length !== changes['list'].previousValue.length ||
            changes['rejects'] && changes['rejects'].currentValue.length !== changes['rejects'].previousValue.length) {
            if (this._service) {
                this.query();
            }
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
    /**
     * @return {?}
     */
    query() {
        this.dataPrepared$.next(false);
        const /** @type {?} */ parsed = this._parse(this.sourceName);
        if ((parsed.name === 'list' || parsed.name === 'range') && this.list) {
            this._service.query(this.list);
        }
        else {
            this._service.query(parsed.query);
        }
    }
    /**
     * @param {?} val
     * @return {?}
     */
    existsInSelector(val) {
        if (!val && val !== 0) {
            return false;
        }
        return this.data.some(item => item.forSelectValue === val);
    }
    /**
     * @return {?}
     */
    observer() {
        if (!this._service) {
            const /** @type {?} */ parsed = this._parse(this.sourceName);
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
                for (let /** @type {?} */ i = parsed.query['from']; i <= parsed.query['to']; i += parsed.query['step']) {
                    this.list.push({
                        name: i.toString() + parsed.query['unit'],
                        value: i,
                        default: i === parsed.query['default'],
                    });
                }
                this._service = new ArrayService();
            }
            else {
                const /** @type {?} */ dataSource = this.services.get(parsed.name);
                if (!dataSource) {
                    throw Error('not exists service: ' + parsed.name);
                }
                this._service = dataSource;
            }
        }
        return this._service.list();
    }
    /**
     * @param {?} sourceName
     * @return {?}
     */
    _parse(sourceName) {
        const /** @type {?} */ exploded = sourceName.split(':');
        const /** @type {?} */ query = {};
        if (exploded[1]) {
            exploded[1].split('&').forEach(keyValue => {
                const /** @type {?} */ kv = keyValue.split('=');
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
    }
    /**
     * @return {?}
     */
    validateInnerFormValue() {
        return !(this._required && !this.innerFormControl.value && this.innerFormControl.value !== 0 ||
            !this.existsInSelector(this.innerFormControl.value) &&
                (!!this.innerFormControl.value || this.innerFormControl.value === 0));
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
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
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChangePropagate = fn;
        this.onChangeEventPrepared$.next(true);
    }
    /**
     * @param {?} _
     * @return {?}
     */
    registerOnTouched(_) { }
    /**
     * @param {?} value
     * @return {?}
     */
    isEffectiveValue(value) {
        return !!value || value === 0;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AfcCheckboxComponent extends AfcSelectBase {
    /**
     * @param {?} services
     */
    constructor(services) {
        super(services);
        this.valueType = 'number';
        this.list = [];
        this.rejects = [];
        this.filteredData = [];
        this.width = '';
        this.selectedNames = [];
        this._detaPrepared = false;
        this.dataPrepared$.subscribe(v => this._detaPrepared = !!v);
    }
    /**
     * @return {?}
     */
    get value() {
        return this._value instanceof Array ? this._value : [this._value];
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set value(value) {
        this._value = value instanceof Array ? value : value !== null ? [value] : [];
        this.onChangePropagate(this.value);
        this.selectedNames = this.data.filter(l => this._value.indexOf(l.forSelectValue) !== -1).map(l => l.forSelectName);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        if (this.filter) {
            this.subscriptions.add(this.dataPrepared$
                .pipe(filter(v => !!v), combineLatest(this.filter.onChange), delay(0))
                .subscribe(v => {
                this.filteredData = this.filter.filter(this.data);
                // FIXME for magic number
                if (this.filteredData.length > 9) {
                    this.width = (this.filteredData.reduce((prev, d) => {
                        // 実際の文字数より多い数が返る可能性があるが厳密な数値は必要ではないし、長い分には問題ない
                        return prev < d.forSelectName.length ? d.forSelectName.length : prev;
                    }, 0) * 15).toString() + 'px';
                }
            }));
            this.filter.trigger();
        }
        else {
            this.subscriptions.add(this.dataPrepared$
                .pipe(filter(v => !!v))
                .subscribe(v => {
                this.filteredData = this.data.filter(_ => true);
            }));
        }
        // HACK: キャッシュから読む場合など↑でsubscribeする前にnextされてしまってる場合への対処
        if (this._detaPrepared) {
            this.dataPrepared$.next(true);
        }
    }
    /**
     * @param {?} $event
     * @param {?} val
     * @return {?}
     */
    onChange($event, val) {
        if ($event.target.checked) {
            if (this.valueType === 'object') {
                val = this.data.find(l => l.forSelectValue === val);
            }
            this.value = [
                ...this.value.filter(v => !!v),
                val
            ];
        }
        else {
            if (this.valueType === 'object') {
                this.value = this.value.filter(v => !!v && v.value !== val);
            }
            else {
                this.value = this.value.filter(v => v !== val);
            }
        }
    }
    /**
     * @return {?}
     */
    allCheck() {
        this.value = [
            ...this._value,
            ...this.filteredData.filter(d => this._value.indexOf(d.forSelectValue) === -1).map(d => d.forSelectValue)
        ];
    }
    /**
     * @return {?}
     */
    allClear() {
        const /** @type {?} */ filteredDataArray = this.filteredData.map(d => d.forSelectValue);
        this.value = this._value.filter(v => filteredDataArray.indexOf(v) === -1);
    }
    /**
     * @param {?} val
     * @return {?}
     */
    existsInSelector(val) {
        const /** @type {?} */ _val = (!val || val instanceof Array) ? val : [val];
        return !_val || !_val.length || _val.reduce((prev, curr) => {
            return prev || this.data.some(item => item.forSelectValue === curr);
        }, false);
    }
    /**
     * @param {?} val
     * @return {?}
     */
    writeValue(val) {
        this._value = val;
        this.innerFormControl.patchValue(val);
    }
}
AfcCheckboxComponent.decorators = [
    { type: Component, args: [{
                selector: 'afc-checkbox',
                template: `
    <p>{{ label }}</p>
    <div *ngIf="!!filter">
      <div class="form-group col-md-12">
        <div class="col-md-2">
          <p class="fit">表示中の選択肢すべてを</p>
          <button type="button" class="btn btn-info btn-sm" (click)="allCheck()">選択</button>
          <button type="button" class="btn btn-warning btn-sm" (click)="allClear()">クリア</button>
        </div>
      </div>
    </div>
    <afc-validate-message [control]="formControl" [name]="label"><ng-content></ng-content></afc-validate-message>
    <label class="checkbox-inline hidden"></label>
    <label htmlFor="{{ id }}_{{ item.forSelectValue }}" *ngFor="let item of filteredData"
        class="checkbox-inline custom-checkbox nowrap margin-bottom">
      <input id="{{ id }}_{{ item.forSelectValue }}" type="checkbox" class="form-control"
        (change)="onChange($event, item.forSelectValue)" [checked]="value.indexOf(item.forSelectValue) !== -1">
      <span [ngClass]="{'selected': value.indexOf(item.forSelectValue) !== -1}"
        [style.width]="width" [innerHtml]="item.forSelectName"></span>
    </label>
  `,
                styles: [`
    span.selected {
      text-decoration: underline;
      text-decoration-style: double;
    }
  `, `
    label.margin-bottom {
      margin-bottom: 20px;
    }
  `, `
    p.fit {
      margin-bottom: 0;
    }
  `],
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => AfcCheckboxComponent),
                        multi: true
                    },
                    SelectorServiceInjector
                ]
            },] },
];
/** @nocollapse */
AfcCheckboxComponent.ctorParameters = () => [
    { type: SelectorServiceInjector, },
];
AfcCheckboxComponent.propDecorators = {
    "formControl": [{ type: Input },],
    "sourceName": [{ type: Input },],
    "label": [{ type: Input },],
    "valueType": [{ type: Input },],
    "list": [{ type: Input },],
    "rejects": [{ type: Input },],
    "filter": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AfcRadioComponent extends AfcSelectBase {
    /**
     * @param {?} services
     */
    constructor(services) {
        super(services);
        this.valueType = 'number';
        this.list = [];
        this.rejects = [];
    }
}
AfcRadioComponent.decorators = [
    { type: Component, args: [{
                selector: 'afc-radio',
                template: `
    <p *ngIf="!!label"><span [hidden]="!required">*&nbsp;</span>{{ label }}</p>
    <afc-validate-message [control]="formControl" [name]="label"><ng-content></ng-content></afc-validate-message>
    <label htmlFor="{{ id }}_{{ item.forSelectValue }}" *ngFor="let item of data" class="radio-inline custom-radio nowrap">
      <input id="{{ id }}_{{ item.forSelectValue }}" type="radio" class="form-control" name="{{ id }}"
        [value]="item.forSelectValue" [formControl]="innerFormControl">
      <span [innerHtml]="item.forSelectName"></span>
    </label>
  `,
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => AfcRadioComponent),
                        multi: true
                    },
                    SelectorServiceInjector
                ]
            },] },
];
/** @nocollapse */
AfcRadioComponent.ctorParameters = () => [
    { type: SelectorServiceInjector, },
];
AfcRadioComponent.propDecorators = {
    "formControl": [{ type: Input },],
    "sourceName": [{ type: Input },],
    "label": [{ type: Input },],
    "valueType": [{ type: Input },],
    "list": [{ type: Input },],
    "rejects": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AfcSelectComponent extends AfcSelectBase {
    /**
     * @param {?} services
     */
    constructor(services) {
        super(services);
        this.valueType = 'number';
        this.list = [];
        this.rejects = [];
        this.selected = null;
        this._readonly = false;
        this.dataPrepared$.pipe(filter(v => !!v), combineLatest(this.innerFormControl.valueChanges)).subscribe(v => {
            this.selected = this.data.find(d => d.forSelectValue === v[1]);
        });
    }
    /**
     * @param {?} flag
     * @return {?}
     */
    set readonly(flag) {
        this._readonly = flag;
    }
    /**
     * @return {?}
     */
    get readonly() {
        return this._readonly;
    }
}
AfcSelectComponent.decorators = [
    { type: Component, args: [{
                selector: 'afc-select',
                template: `
    <label *ngIf="label" [htmlFor]="id"><span [hidden]="!required">*&nbsp;</span>{{ label }}</label>
    <ng-container *ngIf="!readonly">
      <afc-validate-message [control]="formControl" [name]="label"><ng-content></ng-content></afc-validate-message>
      <select [id]="id" class="form-control" [formControl]="innerFormControl" [required]="required">
        <option *ngIf="!required" [ngValue]="null"></option>
        <option *ngFor="let item of data" [ngValue]="item.forSelectValue" [innerHtml]="item.forSelectName"></option>
      </select>
    </ng-container>
    <ng-container *ngIf="readonly">
      <span class="form-control" readonly [innerHtml]="selected?.forSelectName"></span>
    </ng-container>
  `,
                styles: [`
    span.selected {
      text-decoration: underline;
      text-decoration-style: double;
    }
  `],
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => AfcSelectComponent),
                        multi: true
                    },
                    SelectorServiceInjector
                ]
            },] },
];
/** @nocollapse */
AfcSelectComponent.ctorParameters = () => [
    { type: SelectorServiceInjector, },
];
AfcSelectComponent.propDecorators = {
    "formControl": [{ type: Input },],
    "sourceName": [{ type: Input },],
    "label": [{ type: Input },],
    "valueType": [{ type: Input },],
    "list": [{ type: Input },],
    "rejects": [{ type: Input },],
    "readonly": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AfcSelect2Component extends AfcSelectBase {
    /**
     * @param {?} service
     */
    constructor(service) {
        super(service);
        this.valueType = 'number';
        this.rejects = [];
        this.placeholder = '';
        this._readonly = false;
        this.selected = null;
        this._data = [];
        this.valueTrigger$ = new Subject();
        this.preparedElement$ = new Subject();
        this.mySubscriptions = new Subscription();
        this.onChangePropagate = () => { };
        this.mySubscriptions.add(this.dataPrepared$.pipe(combineLatest(this.preparedElement$), filter(v => !!v[0] && !!v[1]), combineLatest(this.valueTrigger$), delay(0)).subscribe(v => {
            if (this.element) {
                this.element.val(v[1]).trigger('change').trigger('select2:select');
            }
            this.selected = this._data.find(d => d.forSelectValue === v[1]);
        }));
    }
    /**
     * @param {?} flag
     * @return {?}
     */
    set readonly(flag) {
        this._readonly = flag;
    }
    /**
     * @return {?}
     */
    get readonly() {
        return this._readonly;
    }
    /**
     * @param {?} data
     * @return {?}
     */
    set data(data) {
        this._data = data;
        this.renderSelect2();
    }
    /**
     * @return {?}
     */
    get data() {
        return this._data;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        if (this.selector) {
            this.element = jQuery(this.selector.nativeElement);
            this.renderSelect2();
            this.element.on('select2:select', () => {
                let /** @type {?} */ val = this.selector.nativeElement.value;
                // FIXME 文字列だけど数字だけの値を扱うこともあるかもしれない・・・
                if (/^[0-9]+$/.test(val)) {
                    val = parseInt(val, 10);
                }
                if (this._value !== val) {
                    if (this.valueType === 'object') {
                        val = this.data.find(l => l.forSelectValue === val);
                    }
                    this._value = val;
                    this.onChangePropagate(val);
                }
            });
        }
        this.preparedElement$.next(true);
        // default値設定のときだけ
        this.mySubscriptions.add(this.innerFormControl.valueChanges.subscribe(v => {
            this.valueTrigger$.next(v);
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        super.ngOnDestroy();
        this.mySubscriptions.unsubscribe();
        if (this.element) {
            this.element.off('select2:select');
        }
    }
    /**
     * @return {?}
     */
    renderSelect2() {
        if (!this.element) {
            return;
        }
        if (this.element.hasClass('select2-hidden-accessible') === true) {
            this.element.select2('destroy');
            this.element.html('');
        }
        this.element.select2({
            data: this._data.map(d => {
                return { id: d.forSelectValue, text: d.forSelectName };
            }),
            theme: 'bootstrap',
            placeholder: this.placeholder,
            allowClear: !this._required
        });
        this.valueTrigger$.next(this.formControl.value);
    }
}
AfcSelect2Component.decorators = [
    { type: Component, args: [{
                selector: 'afc-select2',
                template: `
    <label><span [hidden]="!required">*&nbsp;</span>{{ label }}</label>
    <ng-container *ngIf="!readonly">
      <afc-validate-message [control]="formControl" [name]="label"><ng-content></ng-content></afc-validate-message>
      <div>
        <select #selector class="form-control"></select>
      </div>
    </ng-container>
    <ng-container *ngIf="readonly">
      <span class="form-control" readonly [innerHtml]="selected?.forSelectName"></span>
    </ng-container>
  `,
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => AfcSelect2Component),
                        multi: true
                    },
                    SelectorServiceInjector
                ]
            },] },
];
/** @nocollapse */
AfcSelect2Component.ctorParameters = () => [
    { type: SelectorServiceInjector, },
];
AfcSelect2Component.propDecorators = {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AfcSingleCheckboxComponent {
    constructor() {
        this._readonly = false;
        this.required = false;
        this.subscription = new Subscription();
        this.readonlyFormControl = new FormControl();
    }
    /**
     * @param {?} flag
     * @return {?}
     */
    set readonly(flag) {
        this._readonly = flag;
    }
    /**
     * @return {?}
     */
    get readonly() {
        return this._readonly;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.readonlyFormControl.disable();
        this.trueValueLabel = this.trueValueLabel ? this.trueValueLabel : this.label;
        const /** @type {?} */ err = this.formControl.validator && this.formControl.validator(new FormControl());
        this.required = err && !!err['required'];
        this.subscription.add(this.formControl.valueChanges.pipe(filter(v => (!v && v !== false))).subscribe(_ => {
            this.onChangePropagate(false);
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    /**
     * @param {?} v
     * @return {?}
     */
    writeValue(v) {
        this.readonlyFormControl.patchValue(v);
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChangePropagate = fn;
    }
    /**
     * @param {?} _
     * @return {?}
     */
    registerOnTouched(_) { }
}
AfcSingleCheckboxComponent.decorators = [
    { type: Component, args: [{
                selector: 'afc-single-checkbox',
                template: `
    <p *ngIf="!!label"><span *ngIf="required">*&nbsp;</span>{{ label }}</p>
    <afc-validate-message [control]="formControl" [name]="label"><ng-content></ng-content></afc-validate-message>
    <label class="checkbox-inline custom-checkbox nowrap">
      <input type="checkbox" class="form-control" *ngIf="!readonly" [formControl]="formControl">
      <input type="checkbox" class="form-control" *ngIf="readonly" [formControl]="readonlyFormControl">
      <span>{{ trueValueLabel }}</span>
    </label>
  `,
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => AfcSingleCheckboxComponent),
                        multi: true
                    }]
            },] },
];
/** @nocollapse */
AfcSingleCheckboxComponent.ctorParameters = () => [];
AfcSingleCheckboxComponent.propDecorators = {
    "formControl": [{ type: Input },],
    "label": [{ type: Input },],
    "trueValueLabel": [{ type: Input },],
    "readonly": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AfcTextareaComponent {
    constructor() { }
    /**
     * @return {?}
     */
    ngOnInit() {
        const /** @type {?} */ err = this.formControl.validator && this.formControl.validator(new FormControl());
        this.required = err && !!err['required'];
    }
    /**
     * @param {?} _
     * @return {?}
     */
    writeValue(_) { }
    /**
     * @param {?} _
     * @return {?}
     */
    registerOnChange(_) { }
    /**
     * @param {?} _
     * @return {?}
     */
    registerOnTouched(_) { }
}
AfcTextareaComponent.decorators = [
    { type: Component, args: [{
                selector: 'afc-textarea',
                template: `
    <label *ngIf="label"><span *ngIf="required">*&nbsp;</span>{{ label }}</label>
    <afc-validate-message [control]="formControl" [name]="label"><ng-content></ng-content></afc-validate-message>
    <textarea [formControl]="formControl" class="form-control"></textarea>
  `,
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => AfcTextareaComponent),
                        multi: true
                    }]
            },] },
];
/** @nocollapse */
AfcTextareaComponent.ctorParameters = () => [];
AfcTextareaComponent.propDecorators = {
    "formControl": [{ type: Input },],
    "label": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AfcValidateMessageComponent {
    /**
     * @param {?} messageFactoryService
     */
    constructor(messageFactoryService) {
        this.messageFactoryService = messageFactoryService;
        this.name = '';
        this.subscription = new Subscription();
        this.messages = [];
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.subscription.add(this.control.valueChanges.subscribe(v => {
            if (this.control.errors) {
                this.messages = this.messageFactoryService.create(this.control.errors, this.name);
            }
        }));
        if (this.control.errors) {
            this.messages = this.messageFactoryService.create(this.control.errors, this.name);
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
AfcValidateMessageComponent.decorators = [
    { type: Component, args: [{
                selector: 'afc-validate-message',
                template: `
    <div>
      <span class="validation-errors" *ngIf="control.touched && control.invalid">
        <ng-content></ng-content>
        <p *ngFor="let m of messages">{{ m }}</p>
      </span>
    </div>
  `,
                styles: [`
    div {
      position: relative;
    }
  `, `
    span.validation-errors {
      position: absolute;
      color: #ffffff;
      bottom: 70%;
      right: -20px;
      padding: 7px;
      background-color: #bd362f;
      border-radius: 7px;
      z-index: 10000;
    }
  `, `
    span.validation-errors:before {
      content: "";
      position: absolute;
      top: 100%;
      left: 50%;
      margin-left: -7px;
      border: 7px solid transparent;
      border-top: 7px solid #bd362f;
      z-index: 10000;
    }
  `, `
    p {
      margin: 0;
      padding: 0;
    }
  `]
            },] },
];
/** @nocollapse */
AfcValidateMessageComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [ERROR_MESSAGE_FACTORY_SERVICE,] },] },
];
AfcValidateMessageComponent.propDecorators = {
    "control": [{ type: Input },],
    "name": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const COMPONENTS = [
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
class AngularFormComponentsModule {
}
AngularFormComponentsModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                ],
                providers: [
                    NopeErrorMessageFactoryService,
                    {
                        provide: ERROR_MESSAGE_FACTORY_SERVICE,
                        useExisting: NopeErrorMessageFactoryService,
                    }
                ],
                declarations: [...COMPONENTS],
                exports: [...COMPONENTS]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

export { AngularFormComponentsModule, AfcInputComponent, AfcNumberComponent, AfcCheckboxComponent, AfcRadioComponent, AfcSelectComponent, AfcSelect2Component, AfcSingleCheckboxComponent, AfcTextareaComponent, AfcValidateMessageComponent, FilterService, Selectable, MULTI_IMPORT_SERVICES_MAP, SelectorServiceInjector, ERROR_MESSAGE_FACTORY_SERVICE, NopeErrorMessageFactoryService, AfcSelectBase as ɵa };
//# sourceMappingURL=angular-form-components.js.map
