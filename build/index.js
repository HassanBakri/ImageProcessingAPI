"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ThumbMiddleware_1 = __importDefault(require("./middleware/ThumbMiddleware"));
const port = 3000;
const app = (0, express_1.default)();
app.set('title', 'Image Processing API');
app.get('/GetThumb', ThumbMiddleware_1.default.ThumbMiddleware);
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
exports.default = app;
