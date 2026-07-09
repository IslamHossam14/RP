import dotenv from 'dotenv';

dotenv.config();

export const config = {
  // Server
  port: process.env.PORT || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',

  // Database
  databaseUrl: process.env.DATABASE_URL || 'postgresql://localhost:5432/right_place_db',

  // JWT
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  jwtExpiry: process.env.JWT_EXPIRY || '7d',
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || 'your-refresh-secret-key',
  refreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRY || '30d',

  // File Upload
  maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '10485760'),
  uploadDir: process.env.UPLOAD_DIR || 'uploads',

  // Admin
  adminEmail: process.env.ADMIN_EMAIL || 'admin@rightplace.com',
  adminPassword: process.env.ADMIN_PASSWORD || 'AdminPassword123',
};
