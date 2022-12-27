"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const ThumbMiddleware_1 = __importDefault(require("../middleware/ThumbMiddleware"));
const index_1 = __importDefault(require("../index"));
describe('EndPoint Tests', () => {
    const request = (0, supertest_1.default)(index_1.default);
    it('gets the api GetThumb', async () => {
        const response = await request.get('/GetThumb?Imagename=fjord&width=300&heigh=200');
        expect(response.status).toBe(200);
    });
});
describe('Functionality Tests', () => {
    const image_name = 'palmtunnel';
    const width = 200;
    const heigh = 200;
    const thumbs_dir = 'thumbs';
    const full_dir = 'full';
    const image_extension = '.jpg';
    it('Expect to Process Thumb. Image when requesting Full Image with  width , heigh ', async () => {
        const result = await ThumbMiddleware_1.default.CreateTumb(image_name, width, heigh, image_extension, full_dir);
        expect(result).toBeDefined();
    });
    // it('Expect to throw Exception.  when requesting not existing Image ',async ()=>{
    //     const result=await thumb.CreateTumb('image_name', width, heigh, image_extension, full_dir)
    //     expect(
    //         async function (){
    //         await thumb.CreateTumb('image_name', width, heigh, image_extension, full_dir)}
    //         )
    //     .toThrowMatching( function(thrown) { return thrown.message == 'Error: ENOENT: no such file or directory'; } )
    //     })
});
