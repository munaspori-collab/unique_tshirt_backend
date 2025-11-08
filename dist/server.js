"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongo_1 = require("./db/mongo");
const products_1 = __importDefault(require("./routes/products"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || '*';
app.use((0, cors_1.default)({ origin: FRONTEND_ORIGIN, credentials: true }));
app.use((0, morgan_1.default)('dev'));
// Health check
app.get('/health', (_req, res) => {
    res.json({ ok: true, status: 'healthy' });
});
// API routes
app.use('/api/products', products_1.default);
// Root
app.get('/', (_req, res) => {
    res.send('Unique T-shirts Backend API');
});
const PORT = Number(process.env.PORT) || 8080;
(async () => {
    await (0, mongo_1.connectMongo)();
    app.listen(PORT, () => {
        console.log(`[Server] Listening on port ${PORT}`);
    });
})();
