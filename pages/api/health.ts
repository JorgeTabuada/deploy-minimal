import { NextApiRequest, NextApiResponse } from 'next';
import { testConnection } from '../../lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const dbTest = await testConnection();
    
    const response = {
      status: 'OK',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      database: {
        connected: dbTest.success,
        recordCount: dbTest.recordCount,
        error: dbTest.error
      },
      version: '1.0.0'
    };

    const statusCode = dbTest.success ? 200 : 500;
    return res.status(statusCode).json(response);

  } catch (error: any) {
    return res.status(500).json({
      status: 'ERROR',
      timestamp: new Date().toISOString(),
      error: error.message
    });
  }
}