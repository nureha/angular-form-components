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
Object.defineProperty(exports, "__esModule", { value: true });
var forms_1 = require("@angular/forms");
var ReplaySubject_1 = require("rxjs/ReplaySubject");
var Subscription_1 = require("rxjs/Subscription");
var Subject_1 = require("rxjs/Subject");
var operators_1 = require("rxjs/operators");
var services_1 = require("../../services");
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
}(services_1.Selectable));
var ArrayService = /** @class */ (function () {
    function ArrayService() {
        this.action$ = new ReplaySubject_1.ReplaySubject(1);
    }
    ArrayService.prototype.list = function () {
        return this.action$.pipe(operators_1.share());
    };
    ArrayService.prototype.query = function (list) {
        this.action$.next(list.map(function (l) {
            if (l instanceof services_1.Selectable) {
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
        /* @Input */ this.list = [];
        /* @Input */ this.rejects = [];
        // valueTypeに関わらずforSelectValueを保持する
        this.innerFormControl = new forms_1.FormControl();
        this.dataPrepared$ = new Subject_1.Subject();
        this.writeValue$ = new Subject_1.Subject();
        this.subscriptions = new Subscription_1.Subscription();
        this.initialized$ = new Subject_1.Subject();
        this.onChangeEventPrepared$ = new Subject_1.Subject();
        this.defaultValue = null;
        this.onChangePropagate = function () { };
        this.subscriptions.add(this.dataPrepared$.pipe(operators_1.filter(function (v) { return !!v; })).pipe(operators_1.combineLatest(this.initialized$.pipe(operators_1.filter(function (v) { return !!v; }))), operators_1.combineLatest(this.onChangeEventPrepared$.pipe(operators_1.filter(function (v) { return !!v; }))), operators_1.combineLatest(this.writeValue$)).subscribe(function (v) {
            var value = v[1];
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
        this.subscriptions.add(this.dataPrepared$.pipe(operators_1.filter(function (v) { return !!v; })).pipe(operators_1.combineLatest(this.initialized$.pipe(operators_1.filter(function (v) { return !!v; }))), operators_1.combineLatest(this.onChangeEventPrepared$.pipe(operators_1.filter(function (v) { return !!v; }))), operators_1.combineLatest(this.innerFormControl.valueChanges)).subscribe(function (v) {
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
            var err = this.formControl.validator && this.formControl.validator(new forms_1.FormControl());
            this.required = !!err && !!err['required'];
            if (this.required) {
                this.innerFormControl.setValidators(forms_1.Validators.required);
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
    // for ControlValueAccessor
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
exports.AfmSelectBase = AfmSelectBase;
//# sourceMappingURL=select-base.component.js.map