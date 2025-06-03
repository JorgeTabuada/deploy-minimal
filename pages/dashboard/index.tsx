import { useState, useEffect } from 'react';

interface DashboardData {
  stats: {
    totalParques: number;
    capacidadeTotal: number;
    totalReservas: number;
    reservasHoje: number;
    ocupacaoAtual: number;
    receitaHoje: string;
  };
  data: {
    parques: any[];
    reservasRecentes: any[];
  };
}

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/dashboard-data');
      const data = await response.json();
      
      if (data.success) {
        setDashboardData(data);
      } else {
        setError(data.error || 'Erro ao carregar dados');
      }
    } catch (err: any) {
      setError(err.message || 'Erro de rede');
    } finally {
      setLoading(false);
    }
  };

  const cardStyle = {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    marginBottom: '1.5rem'
  };

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
        <h1 style={{ color: '#2563eb' }}>🔄 Carregando Dashboard...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
        <div style={{ ...cardStyle, backgroundColor: '#fef2f2', border: '1px solid #fecaca' }}>
          <h1 style={{ color: '#dc2626' }}>❌ Erro no Dashboard</h1>
          <p>{error}</p>
          <button onClick={loadDashboardData} style={{ 
            backgroundColor: '#3b82f6', 
            color: 'white', 
            border: 'none', 
            padding: '0.5rem 1rem', 
            borderRadius: '4px' 
          }}>
            🔄 Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '2rem', 
      fontFamily: 'Arial, sans-serif', 
      backgroundColor: '#f0f2f5', 
      minHeight: '100vh' 
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <header style={cardStyle}>
          <h1 style={{ color: '#2563eb', fontSize: '2.5rem', margin: '0 0 0.5rem 0' }}>
            🚗 Dashboard Multipark
          </h1>
          <p style={{ color: '#6b7280', fontSize: '1.1rem', margin: 0 }}>
            Sistema de gestão operacional - Base Dashboard
          </p>
          
          <div style={{ marginTop: '1rem' }}>
            <span style={{ 
              padding: '0.25rem 0.75rem', 
              borderRadius: '9999px', 
              backgroundColor: '#dcfce7',
              color: '#166534',
              fontSize: '0.875rem',
              fontWeight: 'bold'
            }}>
              ✅ Base Dashboard Online
            </span>
          </div>
        </header>

        {/* Métricas principais */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '1.5rem' 
        }}>
          <div style={cardStyle}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#059669' }}>🏢 Total Parques</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0, color: '#059669' }}>
              {dashboardData?.stats.totalParques || 0}
            </p>
          </div>
          
          <div style={cardStyle}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#dc2626' }}>🚗 Capacidade Total</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0, color: '#dc2626' }}>
              {dashboardData?.stats.capacidadeTotal || 0}
            </p>
          </div>
          
          <div style={cardStyle}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#7c3aed' }}>📋 Reservas Hoje</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0, color: '#7c3aed' }}>
              {dashboardData?.stats.reservasHoje || 0}
            </p>
          </div>
          
          <div style={cardStyle}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#f59e0b' }}>💰 Receita Hoje</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0, color: '#f59e0b' }}>
              €{dashboardData?.stats.receitaHoje || '0'}
            </p>
          </div>

          <div style={cardStyle}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#06b6d4' }}>📊 Ocupação Atual</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0, color: '#06b6d4' }}>
              {dashboardData?.stats.ocupacaoAtual || 0}%
            </p>
          </div>

          <div style={cardStyle}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#8b5cf6' }}>📈 Total Reservas</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0, color: '#8b5cf6' }}>
              {dashboardData?.stats.totalReservas || 0}
            </p>
          </div>
        </div>

        {/* Dados */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          {/* Parques */}
          <div style={cardStyle}>
            <h2 style={{ margin: '0 0 1rem 0', color: '#374151' }}>🏢 Parques Disponíveis</h2>
            {dashboardData?.data.parques.length ? (
              dashboardData.data.parques.map((parque, index) => (
                <div key={index} style={{ 
                  padding: '0.75rem', 
                  borderBottom: '1px solid #f3f4f6',
                  display: 'flex',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <div style={{ fontWeight: 'bold' }}>{parque.nome_parque}</div>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>{parque.cidade}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 'bold', color: '#059669' }}>
                      {parque.capacidade_total || 'N/A'}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>lugares</div>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ color: '#6b7280', textAlign: 'center' }}>Sem dados de parques</p>
            )}
          </div>

          {/* Reservas Recentes */}
          <div style={cardStyle}>
            <h2 style={{ margin: '0 0 1rem 0', color: '#374151' }}>📋 Reservas Recentes</h2>
            {dashboardData?.data.reservasRecentes.length ? (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                      <th style={{ padding: '0.5rem', textAlign: 'left' }}>Matrícula</th>
                      <th style={{ padding: '0.5rem', textAlign: 'left' }}>Cliente</th>
                      <th style={{ padding: '0.5rem', textAlign: 'left' }}>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardData.data.reservasRecentes.slice(0, 5).map((reserva, index) => (
                      <tr key={index} style={{ borderBottom: '1px solid #f3f4f6' }}>
                        <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>
                          {reserva.license_plate || 'N/A'}
                        </td>
                        <td style={{ padding: '0.5rem' }}>
                          {reserva.name_cliente || 'N/A'}
                        </td>
                        <td style={{ padding: '0.5rem' }}>
                          <span style={{
                            padding: '0.25rem 0.5rem',
                            borderRadius: '9999px',
                            fontSize: '0.75rem',
                            backgroundColor: '#fef3c7',
                            color: '#92400e'
                          }}>
                            {reserva.estado_reserva_atual || 'Pendente'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p style={{ color: '#6b7280', textAlign: 'center' }}>Sem dados de reservas</p>
            )}
          </div>
        </div>

        {/* Links de navegação */}
        <div style={cardStyle}>
          <h3 style={{ margin: '0 0 1rem 0' }}>🔗 Navegação</h3>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="/" style={{ 
              backgroundColor: '#3b82f6', 
              color: 'white', 
              padding: '0.5rem 1rem', 
              textDecoration: 'none', 
              borderRadius: '4px',
              fontWeight: 'bold'
            }}>
              🏠 Home
            </a>
            <a href="/api/dashboard-data" style={{ 
              backgroundColor: '#7c3aed', 
              color: 'white', 
              padding: '0.5rem 1rem', 
              textDecoration: 'none', 
              borderRadius: '4px',
              fontWeight: 'bold'
            }}>
              🔗 API Raw
            </a>
            <button onClick={loadDashboardData} style={{ 
              backgroundColor: '#f59e0b', 
              color: 'white', 
              border: 'none',
              padding: '0.5rem 1rem', 
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}>
              🔄 Refresh
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}