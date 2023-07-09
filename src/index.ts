import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = 3003;

app.use(cors());
app.use(express.json());

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong yes!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
