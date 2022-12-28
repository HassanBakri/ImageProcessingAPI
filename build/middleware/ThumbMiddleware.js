"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const sharp_1 = __importDefault(require("sharp"));
async function CreateTumb(filename, width, heigh, ext, from, to) {
    const srcpath = path_1.default.resolve('./', from, filename + ext);
    let result = Buffer.from('');
    console.log(`Src Image Path is${srcpath}`);
    try {
        result = fs_1.default.readFileSync(srcpath);
    }
    catch (error) {
        if (error.code == 'ENOENT') {
            console.log('the requested file is not Exist at CreateTumb');
            throw error;
        }
    }
    const sh = await (0, sharp_1.default)(result).resize(width, heigh).toBuffer();
    console.log('Sending the thumb after being Created');
    //res.type('png');
    //res.send(newthumb);
    const thumbname = filename + '_' + width + '_' + heigh + ext;
    const thumbpath = path_1.default.resolve('./', to, thumbname);
    const fd = fs_1.default.openSync(thumbpath, 'a+');
    fs_1.default.write(fd, sh, (err) => {
        if (err)
            throw err;
    });
    fs_1.default.close(fd, (err) => {
        console.log(err);
        if (err != null)
            console.log('Error while closing orignal file : ' + err);
    });
    return sh;
}
const ThumbMiddleware = async (req, res, next) => {
    const image_name = req.query.imagename;
    const width = parseInt(req.query.width);
    const heigh = parseInt(req.query.heigh);
    const thumbs_dir = 'thumbs';
    const full_dir = 'full';
    const image_extension = '.jpg';
    //1- check if the image already exist
    //1.1- check if the thumb is already exist
    //1.1.1- return the thumb
    //1.2- create the thumb and return it
    //2.return the placeholer on the requested width and height
    const filename = image_name + '_' + width + '_' + heigh + image_extension;
    const thumbpath = path_1.default.resolve('./', thumbs_dir, filename);
    console.log('Requesting Thumb file :' + thumbpath);
    try {
        res.type('png');
        const result = fs_1.default.readFileSync(thumbpath, { flag: 'r' });
        console.log('File Length :' + result.length);
        res.send(result);
        next();
        return;
    }
    catch (err) {
        console.log('Entring Catch Block');
        console.log(err);
        if (err.code == 'ENOENT') {
            console.log('File Not Found thumb must be created');
            //next();
        }
        else {
            //throw err;
            res.status(500).send(err);
            next();
            //Exception Must Be Logged in Order to discover the issue
        }
    }
    let newthumb = Buffer.from('');
    try {
        newthumb = await CreateTumb(image_name, width, heigh, image_extension, full_dir, thumbs_dir);
        console.log('Sending the thumb after being Created');
        res.type('png');
        res.send(newthumb);
        //const fd = fs.openSync(thumbpath, 'a+');
        //fs.write(fd, newthumb, (err) => {
        //  if (err) throw err;
        //});
        //fs.close(fd, (err) => {
        //  console.log(err);
        //  if (err != null) console.log('Error while closing orignal file : ' + err);
        // });
    }
    catch (error) {
        if (error.code == 'ENOENT') {
            console.log(error);
            console.log('File Not Found thumb must be created');
            console.log('the orignal iamge not found , its either requested the wrong name or used to get place holder wich must be avoided becues it have bad impact on performace since it cuse 2 disk access miss wich they can be avoided by calling the placeholder endpoint ');
            res.setHeader('Content-Type', 'text/html');
            res.status(404).send('The Requested Image is Not Exist');
            next();
        }
        else {
            console.log('Fatal Error pls check');
            console.log(error);
            res.status(500).send(error);
            //res.sendStatus(500);
            //Exception Must Be Logged in Order to discover the issue
            next();
        }
    }
    next();
};
exports.default = { ThumbMiddleware, CreateTumb };
