// pages/api/dashboard-data.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getDashboardStats } from '../../lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    const result = await getDashboardStats();
    
    const response = {
      timestamp: new Date().toISOString(),
      database: 'Dashboard Multipark',
      projectId: 'ioftqsvjqwjeprsckeym',
      ...result
    };

    const statusCode = result.success ? 200 : 500;
    return res.status(statusCode).json(response);

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
}