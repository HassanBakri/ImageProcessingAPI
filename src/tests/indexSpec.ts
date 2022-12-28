import supertest from 'supertest';
import thumb from '../middleware/ThumbMiddleware';
import app from '../index';
import fs from 'fs';
import path from 'path';
//import {} from 'jasmine';
describe('EndPoint Tests', () => {
  const thumbs_dir = 'thumbs';
  const fname = 'fjord_300_200.jpg';
  beforeEach(function () {
    const targetimagename = path.resolve('./', thumbs_dir, fname);

    try {
      fs.unlink(targetimagename, () => {
        console.log(`${targetimagename} was deleted`);
      });
    } catch (error) {
      console.log(error);
      if ((error as NodeJS.ErrnoException).code == 'ENOENT') {
        console.log('thumb Not Found');
      } else {
        //throw error
      }
    }
  });
  const request = supertest(app);
  it('gets the api GetThumb', async () => {
    const response = await request.get('/GetThumb?imagename=fjord&width=300&heigh=200');
    expect(response.status).toBe(200);
  });
});
describe('Functionality Tests', () => {
  const image_name: string = 'palmtunnel';
  const width: number = 200;
  const heigh: number = 200;
  const thumbs_dir = 'thumbs';
  const full_dir = 'full';
  const image_extension = '.jpg';
  beforeEach(function () {
    const fname = `palmtunnel_${width}_${heigh}${image_extension}`;
    const targetimagename = path.resolve('./', thumbs_dir, fname);
    try {
      fs.unlink(targetimagename, () => {
        console.log(`${targetimagename} was deleted`);
      });
    } catch (error) {
      console.log(error);
      if ((error as NodeJS.ErrnoException).code == 'ENOENT') {
        console.log('thumb Not Found');
      } else {
        //throw error
      }
    }
  });
  it('Expect to Process Thumb. Image when requesting Full Image with  width , heigh ', async () => {
    const result = await thumb.CreateTumb(image_name, width, heigh, image_extension, full_dir, thumbs_dir);
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
