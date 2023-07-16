"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserService {
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.default.findByPk(id);
        });
    }
    createUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { password } = userData;
            const hashedPassword = password ? yield bcrypt_1.default.hash(password, 10) : undefined;
            return yield user_model_1.default.create(Object.assign(Object.assign({}, userData), { password: hashedPassword }));
        });
    }
    updateUser(id, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { password } = userData;
            if (password) {
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                userData = Object.assign(Object.assign({}, userData), { password: hashedPassword });
            }
            const [updatedUsers] = yield user_model_1.default.update(userData, { where: { id } });
            return updatedUsers;
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.default.destroy({ where: { id } });
        });
    }
}
exports.default = UserService;
