"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:no-unused-variable */
var testing_1 = require("@angular/core/testing");
var forms_1 = require("@angular/forms");
var filter_service_1 = require("./filter.service");
var DummyItem = /** @class */ (function () {
    function DummyItem(id, name) {
        this.id = id;
        this.name = name;
    }
    return DummyItem;
}());
exports.DummyItem = DummyItem;
describe('FilterService', function () {
    var list = [
        new DummyItem(1, 'apple'),
        new DummyItem(2, 'orange'),
        new DummyItem(3, 'banana'),
        new DummyItem(4, 'pine apple'),
        new DummyItem(5, 'みかん'),
        new DummyItem(6, 'もも'),
    ];
    var firstForm = new forms_1.FormControl();
    var secondForm = new forms_1.FormControl();
    var thirdForm = new forms_1.FormControl();
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [
                filter_service_1.FilterService
            ],
        });
        firstForm.setValue(null);
        secondForm.setValue(null);
    });
    it('should be filtered by match', (function () { return __awaiter(_this, void 0, void 0, function () {
        var filter, filteredList;
        return __generator(this, function (_a) {
            filter = filter_service_1.FilterService.match(firstForm, 'name');
            firstForm.setValue('apple');
            filteredList = filter.filter(list);
            expect(filteredList.length).toEqual(2);
            return [2 /*return*/];
        });
    }); }));
    it('should be filtered by equal', (function () { return __awaiter(_this, void 0, void 0, function () {
        var filter, filteredList;
        return __generator(this, function (_a) {
            filter = filter_service_1.FilterService.equal(firstForm, 'name');
            firstForm.setValue('apple');
            filteredList = filter.filter(list);
            expect(filteredList.length).toEqual(1);
            return [2 /*return*/];
        });
    }); }));
    it('should be filtered by graterThan', (function () { return __awaiter(_this, void 0, void 0, function () {
        var filter, filteredList;
        return __generator(this, function (_a) {
            filter = filter_service_1.FilterService.graterThan(firstForm, 'id');
            firstForm.setValue(4);
            filteredList = filter.filter(list);
            expect(filteredList.length).toEqual(2);
            return [2 /*return*/];
        });
    }); }));
    it('should be filtered by over', (function () { return __awaiter(_this, void 0, void 0, function () {
        var filter, filteredList;
        return __generator(this, function (_a) {
            filter = filter_service_1.FilterService.over(firstForm, 'id');
            firstForm.setValue(4);
            filteredList = filter.filter(list);
            expect(filteredList.length).toEqual(3);
            return [2 /*return*/];
        });
    }); }));
    it('should be filtered by lessThan', (function () { return __awaiter(_this, void 0, void 0, function () {
        var filter, filteredList;
        return __generator(this, function (_a) {
            filter = filter_service_1.FilterService.lessThan(firstForm, 'id');
            firstForm.setValue(1);
            filteredList = filter.filter(list);
            expect(filteredList.length).toEqual(0);
            return [2 /*return*/];
        });
    }); }));
    it('should be filtered only by under', (function () { return __awaiter(_this, void 0, void 0, function () {
        var filter, filteredList;
        return __generator(this, function (_a) {
            filter = filter_service_1.FilterService.under(firstForm, 'id');
            firstForm.setValue(1);
            filteredList = filter.filter(list);
            expect(filteredList.length).toEqual(1);
            return [2 /*return*/];
        });
    }); }));
    it('should be filtered by match and over', (function () { return __awaiter(_this, void 0, void 0, function () {
        var filter, filteredList;
        return __generator(this, function (_a) {
            filter = filter_service_1.FilterService.match(firstForm, 'name').and(filter_service_1.FilterService.over(secondForm, 'id'));
            firstForm.setValue('apple');
            secondForm.setValue(2);
            filteredList = filter.filter(list);
            expect(filteredList.length).toEqual(1);
            return [2 /*return*/];
        });
    }); }));
    it('should be filtered by equal or over', (function () { return __awaiter(_this, void 0, void 0, function () {
        var filter, filteredList;
        return __generator(this, function (_a) {
            filter = filter_service_1.FilterService.equal(firstForm, 'name').or(filter_service_1.FilterService.over(secondForm, 'id'));
            firstForm.setValue('apple');
            secondForm.setValue(3);
            filteredList = filter.filter(list);
            expect(filteredList.length).toEqual(5);
            return [2 /*return*/];
        });
    }); }));
    it('should be filtered by equal or (equal and match)', (function () { return __awaiter(_this, void 0, void 0, function () {
        var filter, filteredList;
        return __generator(this, function (_a) {
            filter = filter_service_1.FilterService.equal(firstForm, 'id')
                .or(filter_service_1.FilterService.over(secondForm, 'id')
                .and(filter_service_1.FilterService.match(thirdForm, 'name')));
            firstForm.setValue(2);
            secondForm.setValue(3);
            thirdForm.setValue('apple');
            filteredList = filter.filter(list);
            expect(filteredList.length).toEqual(2);
            return [2 /*return*/];
        });
    }); }));
});
//# sourceMappingURL=filter.service.spec.js.map