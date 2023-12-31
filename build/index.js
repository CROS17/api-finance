"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*toda configuracion es un folder aparte*/
/*import Server from './settings/server';
const server = new Server();
server.listen();*/
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const app = (0, express_1.default)();
const PORT = 3003;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/ping', (req, res) => {
    res.send('Pong yesss!s sd a');
});
app.use('/users', user_route_1.default);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
