import express from 'express';
import cors from 'cors';
import { gatewayRouter } from './routes/gateway.routes';
import { logger } from './middleware/logger';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(logger);

app.use('/api', gatewayRouter);

app.listen(PORT, () => {
    console.log(`API Gateway running on http://localhost:${PORT}`);
});
