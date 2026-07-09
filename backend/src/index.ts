import app from './app';
import { config } from './config/env';
import prisma from './config/database';

const PORT = config.port as number;

const startServer = async () => {
  try {
    // Test database connection
    await prisma.$queryRaw`SELECT 1`;
    console.log('✓ Database connected successfully');

    // Start server
    app.listen(PORT, () => {
      console.log(`
╔═══════════════════════════════════════╗
║   Right Place Academy API Server      ║
╠═══════════════════════════════════════╣
║  Server started successfully!          ║
║  Port: ${PORT}                          ║
║  Environment: ${config.nodeEnv}           ║
║  API Docs: http://localhost:${PORT}/api-docs ║
╚═══════════════════════════════════════╝
      `);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('\nShutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\nShutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});
