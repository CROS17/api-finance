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
exports.deleteUser = exports.updateUser = exports.createUser = exports.getByIdUser = void 0;
const http_response_1 = require("../settings/http-response");
const user_service_1 = __importDefault(require("../services/user.service"));
const userService = new user_service_1.default();
const getByIdUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authorId = Number(req.params.id);
    try {
        const user = yield userService.getUserById(authorId);
        if (user) {
            res.status(http_response_1.HTTP_RESPONSE.OK).json(user);
        }
        else {
            res.status(http_response_1.HTTP_RESPONSE.NOT_FOUND).json({ message: 'User not found' });
        }
    }
    catch (error) {
        res.status(http_response_1.HTTP_RESPONSE.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
});
exports.getByIdUser = getByIdUser;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const author = req.body;
        const data = yield userService.createUser(author);
        res.status(http_response_1.HTTP_RESPONSE.CREATED).json({ data: data });
    }
    catch (error) {
        res.status(http_response_1.HTTP_RESPONSE.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorId = Number(req.params.id);
        const author = req.body;
        const data = yield userService.updateUser(authorId, author);
        res.status(http_response_1.HTTP_RESPONSE.OK).json({ data: data });
    }
    catch (error) {
        res.status(http_response_1.HTTP_RESPONSE.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorId = Number(req.params.id);
        const deletedRows = yield userService.deleteUser(authorId);
        if (deletedRows === 0) {
            res.status(http_response_1.HTTP_RESPONSE.NOT_FOUND).json({ message: 'User not found' });
        }
        else {
            res.status(http_response_1.HTTP_RESPONSE.OK).json({ message: 'User deleted successfully' });
        }
    }
    catch (error) {
        res.status(http_response_1.HTTP_RESPONSE.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
});
exports.deleteUser = deleteUser;
