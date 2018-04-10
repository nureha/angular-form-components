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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
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
exports.Selectable = Selectable;
exports.MULTI_IMPORT_SERVICES_MAP = new core_1.InjectionToken('MULTI_IMPORT_SERVICES_MAP');
var SelectorServiceInjector = /** @class */ (function () {
    function SelectorServiceInjector(injector, services) {
        this.injector = injector;
        this.services = services;
        this.providers = Array.from(this.services.map.values());
    }
    SelectorServiceInjector.prototype.get = function (name) {
        var _class = this.services.map.get(name);
        if (_class) {
            var injector = core_1.ReflectiveInjector.resolveAndCreate(this.providers, this.injector);
            return injector.get(_class);
        }
        throw new Error(name + " is not provided!");
    };
    SelectorServiceInjector = __decorate([
        core_1.Injectable(),
        __param(1, core_1.Inject(exports.MULTI_IMPORT_SERVICES_MAP)),
        __metadata("design:paramtypes", [core_1.Injector, Object])
    ], SelectorServiceInjector);
    return SelectorServiceInjector;
}());
exports.SelectorServiceInjector = SelectorServiceInjector;
//# sourceMappingURL=selector-service-injector.js.map