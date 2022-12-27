import supertest from 'supertest';
import thumb from '../middleware/ThumbMiddleware';
import app from '../index';

describe('EndPoint Tests', () => {
  const request = supertest(app);
  it('gets the api GetThumb', async () => {
    const response = await request.get('/GetThumb?Imagename=fjord&width=300&heigh=200');
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
  it('Expect to Process Thumb. Image when requesting Full Image with  width , heigh ', async () => {
    const result = await thumb.CreateTumb(image_name, width, heigh, image_extension, full_dir);
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
