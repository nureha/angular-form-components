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
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:no-unused-variable */
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var Observable_1 = require("rxjs/Observable");
var Subject_1 = require("rxjs/Subject");
require("rxjs/add/observable/from");
require("rxjs/add/observable/timer");
var operators_1 = require("rxjs/operators");
var select_component_1 = require("./select.component");
var checkbox_component_1 = require("./checkbox.component");
var validate_message_component_1 = require("../validate-message/validate-message.component");
var services_1 = require("../../services");
var SelectableConstruct = /** @class */ (function (_super) {
    __extends(SelectableConstruct, _super);
    function SelectableConstruct(data) {
        var _this = _super.call(this) || this;
        _this.name = data.name;
        _this.value = data.value;
        _this.default = data.default;
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
            return this.name;
        },
        enumerable: true,
        configurable: true
    });
    return SelectableConstruct;
}(services_1.Selectable));
var ServiceStab = /** @class */ (function () {
    function ServiceStab() {
        this.action$ = new Subject_1.Subject();
    }
    ServiceStab.prototype.query = function (condition) {
        var _this = this;
        condition = condition || {};
        var delay = parseInt(condition['delay'] || 0, 10);
        var subscription = Observable_1.Observable.timer(delay).subscribe(function () {
            _this.action$.next(_this.data);
            setTimeout(function () { return subscription.unsubscribe(); });
        });
    };
    ServiceStab.prototype.list = function () {
        return this.action$.pipe(operators_1.share());
    };
    return ServiceStab;
}());
var FruitService = /** @class */ (function (_super) {
    __extends(FruitService, _super);
    function FruitService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = [{
                name: 'apple',
                value: 1,
                default: false
            }, {
                name: 'orange',
                value: 2,
                default: true
            }, {
                name: 'banana',
                value: 3,
                default: false
            }].map(function (d) { return new SelectableConstruct(d); });
        return _this;
    }
    return FruitService;
}(ServiceStab));
var ColorService = /** @class */ (function (_super) {
    __extends(ColorService, _super);
    function ColorService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = [{
                name: 'blue',
                value: 1,
                default: false
            }, {
                name: 'red',
                value: 2,
                default: true
            }, {
                name: 'yellow',
                value: 3,
                default: false
            }].map(function (d) { return new SelectableConstruct(d); });
        return _this;
    }
    return ColorService;
}(ServiceStab));
var _map = new Map();
_map.set('fruit', FruitService);
_map.set('color', ColorService);
var OnlyAfmSelectComponent = /** @class */ (function () {
    function OnlyAfmSelectComponent() {
    }
    OnlyAfmSelectComponent = __decorate([
        core_1.Component({
            selector: 'only-afm-select-component',
            template: "<afm-select *ngIf=\"formControl\"\n    [formControl]=\"formControl\" [sourceName]=\"sourceName\"\n  ></afm-select>\n  <afm-checkbox *ngIf=\"formControl2\"\n    [formControl]=\"formControl2\" [sourceName]=\"sourceName2\"\n  ></afm-checkbox>"
        })
    ], OnlyAfmSelectComponent);
    return OnlyAfmSelectComponent;
}());
describe('AfmSelectComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                OnlyAfmSelectComponent,
                select_component_1.AfmSelectComponent,
                checkbox_component_1.AfmCheckboxComponent,
                validate_message_component_1.AfmValidateMessageComponent,
            ],
            imports: [forms_1.ReactiveFormsModule, forms_1.FormsModule],
            providers: [
                services_1.SelectorServiceInjector,
                {
                    provide: services_1.MULTI_IMPORT_SERVICES_MAP,
                    useValue: {
                        map: _map
                    }
                }
            ]
        })
            .compileComponents();
    }));
    it('should set default value for required form', testing_1.fakeAsync(function () {
        fixture = testing_1.TestBed.createComponent(OnlyAfmSelectComponent);
        component = fixture.componentInstance;
        component.formControl = new forms_1.FormControl(null, forms_1.Validators.required);
        component.sourceName = 'fruit';
        // 上記変更を反映
        fixture.detectChanges();
        // service の query 待ち
        testing_1.tick(1);
        // 内部の値の変更を反映
        fixture.detectChanges();
        expect(component.formControl.value).toEqual(2);
        expect(fixture.debugElement.query(platform_browser_1.By.css('option:checked')).nativeElement.textContent).toBe('orange');
    }));
    it('should keep value which set before loading data', testing_1.fakeAsync(function () {
        fixture = testing_1.TestBed.createComponent(OnlyAfmSelectComponent);
        component = fixture.componentInstance;
        component.formControl = new forms_1.FormControl(1, forms_1.Validators.required);
        component.sourceName = 'fruit:delay=1000';
        // 上記変更を反映
        fixture.detectChanges();
        // service の query 待ち
        testing_1.tick(1500);
        // 内部の値の変更を反映
        fixture.detectChanges();
        expect(component.formControl.value).toEqual(1);
        expect(fixture.debugElement.query(platform_browser_1.By.css('option:checked')).nativeElement.textContent).toBe('apple');
    }));
    it('should have own each service', testing_1.fakeAsync(function () {
        fixture = testing_1.TestBed.createComponent(OnlyAfmSelectComponent);
        component = fixture.componentInstance;
        component.formControl = new forms_1.FormControl(1, forms_1.Validators.required);
        component.sourceName = 'color';
        component.formControl2 = new forms_1.FormControl([1, 2]);
        component.sourceName2 = 'fruit:delay=1000';
        // 上記変更を反映
        fixture.detectChanges();
        // service の query 待ち
        testing_1.tick(1);
        // 内部の値の変更を反映
        fixture.detectChanges();
        expect(fixture.debugElement.queryAll(platform_browser_1.By.css('option')).length).toBe(3);
        expect(fixture.debugElement.queryAll(platform_browser_1.By.css('[type="checkbox"]')).length).toBe(0);
        testing_1.tick(1500);
        fixture.detectChanges();
        expect(fixture.debugElement.queryAll(platform_browser_1.By.css('option')).length).toBe(3);
        expect(fixture.debugElement.queryAll(platform_browser_1.By.css('[type="checkbox"]')).length).toBe(3);
    }));
    it('should be checked values', testing_1.fakeAsync(function () {
        fixture = testing_1.TestBed.createComponent(OnlyAfmSelectComponent);
        component = fixture.componentInstance;
        component.formControl2 = new forms_1.FormControl([1, 3]);
        component.sourceName2 = 'fruit';
        // 上記変更を反映
        fixture.detectChanges();
        // service の query 待ち
        testing_1.tick(1);
        // 内部の値の変更を反映
        fixture.detectChanges();
        var checkedInput = fixture.debugElement.queryAll(platform_browser_1.By.css('[type="checkbox"]:checked + span'));
        expect(checkedInput.length).toBe(2);
        expect(checkedInput[0].nativeElement.textContent).toContain('apple');
        expect(checkedInput[1].nativeElement.textContent).toContain('banana');
    }));
});
//# sourceMappingURL=select.component.spec.js.map