// lib/supabase.ts - VERSÃO SIMPLIFICADA PARA UMA BASE
import { createClient } from '@supabase/supabase-js';

// ===================================
// BASE ÚNICA - DASHBOARD MULTIPARK
// ===================================

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_DASHBOARD_URL || 'https://ioftqsvjqwjeprsckeym.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_DASHBOARD_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlvZnRxc3ZqcXdqZXByc2NrZXltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxNTYwNzQsImV4cCI6MjA2MjczMjA3NH0.TXDfhioMFVNxLhjKgpXAxnKCPOl5n8QWpOkX2eafbYw';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
});

// ===================================
// FUNÇÕES DE TESTE E OPERAÇÕES
// ===================================

export async function testConnection() {
  try {
    const { data, error } = await supabase
      .from('parques')
      .select('id_pk, nome_parque, cidade, capacidade_total')
      .limit(5);
    
    return { 
      success: !error, 
      data: data || [], 
      error: error?.message || null,
      recordCount: data?.length || 0
    };
  } catch (error: any) {
    return { 
      success: false, 
      data: [], 
      error: error.message,
      recordCount: 0
    };
  }
}

export async function getReservas(limit = 10) {
  try {
    const { data, error } = await supabase
      .from('reservas')
      .select('id_pk, license_plate, name_cliente, estado_reserva_atual, created_at_db')
      .order('created_at_db', { ascending: false })
      .limit(limit);
    
    return { 
      success: !error, 
      data: data || [], 
      error: error?.message || null 
    };
  } catch (error: any) {
    return { 
      success: false, 
      data: [], 
      error: error.message 
    };
  }
}

export async function getDashboardStats() {
  try {
    // Buscar dados em paralelo
    const [parquesResult, reservasResult] = await Promise.all([
      supabase.from('parques').select('id_pk, nome_parque, capacidade_total'),
      supabase.from('reservas').select('id_pk, estado_reserva_atual, created_at_db')
    ]);

    const parques = parquesResult.data || [];
    const reservas = reservasResult.data || [];

    // Calcular métricas
    const hoje = new Date().toISOString().split('T')[0];
    const reservasHoje = reservas.filter(r => 
      r.created_at_db?.startsWith(hoje)
    ).length;

    const capacidadeTotal = parques.reduce((sum, p) => 
      sum + (p.capacidade_total || 0), 0
    );

    return {
      success: true,
      stats: {
        totalParques: parques.length,
        capacidadeTotal,
        totalReservas: reservas.length,
        reservasHoje,
        ocupacaoAtual: Math.floor(Math.random() * 40) + 60, // Simulado
        receitaHoje: (Math.random() * 2000 + 500).toFixed(0)
      },
      data: {
        parques: parques.slice(0, 5),
        reservasRecentes: reservas.slice(0, 10)
      }
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
      stats: null,
      data: null
    };
  }
}