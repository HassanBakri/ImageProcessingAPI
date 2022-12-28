"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const ThumbMiddleware_1 = __importDefault(require("../middleware/ThumbMiddleware"));
const index_1 = __importDefault(require("../index"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
//import {} from 'jasmine';
describe('EndPoint Tests', () => {
    const thumbs_dir = 'thumbs';
    const fname = 'fjord_300_200.jpg';
    beforeEach(function () {
        const targetimagename = path_1.default.resolve('./', thumbs_dir, fname);
        try {
            fs_1.default.unlink(targetimagename, () => {
                console.log(`${targetimagename} was deleted`);
            });
        }
        catch (error) {
            console.log(error);
            if (error.code == 'ENOENT') {
                console.log('thumb Not Found');
            }
            else {
                //throw error
            }
        }
    });
    const request = (0, supertest_1.default)(index_1.default);
    it('gets the api GetThumb', async () => {
        const response = await request.get('/GetThumb?imagename=fjord&width=300&heigh=200');
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
    beforeEach(function () {
        const fname = `palmtunnel_${width}_${heigh}${image_extension}`;
        const targetimagename = path_1.default.resolve('./', thumbs_dir, fname);
        try {
            fs_1.default.unlink(targetimagename, () => {
                console.log(`${targetimagename} was deleted`);
            });
        }
        catch (error) {
            console.log(error);
            if (error.code == 'ENOENT') {
                console.log('thumb Not Found');
            }
            else {
                //throw error
            }
        }
    });
    it('Expect to Process Thumb. Image when requesting Full Image with  width , heigh ', async () => {
        const result = await ThumbMiddleware_1.default.CreateTumb(image_name, width, heigh, image_extension, full_dir, thumbs_dir);
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
