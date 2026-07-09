import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { errorHandler } from './middleware/errorHandler';
import { config } from './config/env';

// Import routes
import authRoutes from './routes/auth.routes';
import coursesRoutes from './routes/courses.routes';
import registrationsRoutes from './routes/registrations.routes';
import paymentsRoutes from './routes/payments.routes';
import consultationsRoutes from './routes/consultations.routes';
import studioRoutes from './routes/studio.routes';
import eventsRoutes from './routes/events.routes';
import contactRoutes from './routes/contact.routes';

const app = express();

// Swagger documentation setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Right Place Academy API',
      version: '1.0.0',
      description: 'Complete API for Right Place Academy educational platform',
      contact: {
        name: 'Right Place Academy',
      },
    },
    servers: [
      {
        url: `http://localhost:${config.port}`,
        description: 'Development server',
      },
      {
        url: 'https://api.rightplace.com',
        description: 'Production server',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv,
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', coursesRoutes);
app.use('/api/registrations', registrationsRoutes);
app.use('/api/payments', paymentsRoutes);
app.use('/api/consultations', consultationsRoutes);
app.use('/api/studio', studioRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/contact', contactRoutes);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString(),
  });
});

// Error handler middleware (must be last)
app.use(errorHandler);

export default app;
