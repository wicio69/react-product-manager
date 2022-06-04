import express, { Request, Response } from 'express';

const app = express();

// dotenv.config();
app.get('/', (req: Request, res: Response) => {});

app.listen(process.env.PORT, () => {
  console.log(`Listening on ${process.env.PORT}`);
});
