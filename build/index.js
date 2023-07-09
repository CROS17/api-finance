"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = 3003;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/ping', (req, res) => {
    res.send('Pong yes!');
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
