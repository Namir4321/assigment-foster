import express from 'express';
import cors from 'cors';
import authRoutes from './modules/auth/auth.routes.js';
import enquiryRoutes from './modules/enquiries/enquiry.routes.js';
import errorMiddleware from './middlewares/error.middleware.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is running.' });
});

app.use('/api/auth', authRoutes);
app.use('/api/enquiries', enquiryRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found.`,
  });
});

app.use(errorMiddleware);

export default app;
