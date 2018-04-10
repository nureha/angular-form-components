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
var Observable_1 = require("rxjs/Observable");
var Subject_1 = require("rxjs/Subject");
var operators_1 = require("rxjs/operators");
var FilterService = /** @class */ (function () {
    function FilterService(ob, _target, _type) {
        var _this = this;
        this.ob = ob;
        this._target = _target;
        this._type = _type;
        this.action$ = new Subject_1.Subject();
        this._regExp = RegExp('.*');
        this._and = [];
        this._or = [];
        ob.subscribe(function (v) {
            _this._val = v;
            _this._regExp = new RegExp(v);
        });
        this._onChange = this.action$.pipe(operators_1.merge(ob));
    }
    FilterService_1 = FilterService;
    Object.defineProperty(FilterService.prototype, "onChange", {
        get: function () {
            return this._onChange;
        },
        enumerable: true,
        configurable: true
    });
    FilterService.match = function (form, target) {
        return new FilterService_1(form.valueChanges, target, '~');
    };
    FilterService.equal = function (form, target) {
        return new FilterService_1(form.valueChanges, target, '=');
    };
    FilterService.graterThan = function (form, target) {
        return new FilterService_1(form.valueChanges, target, '>');
    };
    FilterService.over = function (form, target) {
        return new FilterService_1(form.valueChanges, target, '>=');
    };
    FilterService.lessThan = function (form, target) {
        return new FilterService_1(form.valueChanges, target, '<');
    };
    FilterService.under = function (form, target) {
        return new FilterService_1(form.valueChanges, target, '<=');
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
        this._onChange = this._onChange.pipe(operators_1.merge(s.onChange));
        return this;
    };
    FilterService.prototype.or = function (s) {
        this._or.push(s);
        this._onChange = this._onChange.pipe(operators_1.merge(s.onChange));
        return this;
    };
    FilterService = FilterService_1 = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [Observable_1.Observable, String, String])
    ], FilterService);
    return FilterService;
    var FilterService_1;
}());
exports.FilterService = FilterService;
//# sourceMappingURL=filter.service.js.map