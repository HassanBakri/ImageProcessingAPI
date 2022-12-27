import express from 'express';
import thumber from './middleware/ThumbMiddleware';

const port = 3000;
const app = express();
app.set('title', 'Image Processing API');

app.get('/GetThumb', thumber.ThumbMiddleware);

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

export default app;
