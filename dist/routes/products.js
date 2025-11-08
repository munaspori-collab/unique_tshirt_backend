"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Product_1 = require("../models/Product");
const router = (0, express_1.Router)();
// GET /api/products
router.get('/', async (_req, res) => {
    try {
        const products = await Product_1.Product.find().limit(50).lean();
        res.json({ ok: true, data: products });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ ok: false, error: 'Internal Server Error' });
    }
});
// GET /api/products/:slug
router.get('/:slug', async (req, res) => {
    try {
        const p = await Product_1.Product.findOne({ slug: req.params.slug }).lean();
        if (!p)
            return res.status(404).json({ ok: false, error: 'Not Found' });
        res.json({ ok: true, data: p });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ ok: false, error: 'Internal Server Error' });
    }
});
exports.default = router;
