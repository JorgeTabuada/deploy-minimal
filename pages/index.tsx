export default function HomePage() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ textAlign: 'center', color: 'white', maxWidth: '500px' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🚗</div>
        <h1 style={{ fontSize: '3rem', margin: '0 0 1rem 0', fontWeight: 'bold' }}>
          Deploy Minimal
        </h1>
        <p style={{ fontSize: '1.25rem', marginBottom: '2rem', opacity: 0.9 }}>
          Sistema Multipark simplificado
        </p>
        
        {/* Links de navegação */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
          <a 
            href="/dashboard"
            style={{ 
              display: 'block', 
              padding: '1rem 2rem', 
              backgroundColor: 'rgba(255,255,255,0.3)', 
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              backdropFilter: 'blur(10px)',
              minWidth: '250px',
              fontWeight: 'bold',
              border: '2px solid rgba(255,255,255,0.5)'
            }}
          >
            📊 DASHBOARD PRINCIPAL
          </a>
          
          <a 
            href="/upload"
            style={{ 
              display: 'block', 
              padding: '1rem 2rem', 
              backgroundColor: 'rgba(255,255,255,0.2)', 
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              backdropFilter: 'blur(10px)',
              minWidth: '250px',
              fontWeight: 'bold'
            }}
          >
            📤 Upload Excel
          </a>
          
          <a 
            href="/test-api"
            style={{ 
              display: 'block', 
              padding: '1rem 2rem', 
              backgroundColor: 'rgba(255,255,255,0.2)', 
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              backdropFilter: 'blur(10px)',
              minWidth: '250px',
              fontWeight: 'bold'
            }}
          >
            🧪 Teste APIs
          </a>
          
          <a 
            href="/api/health"
            style={{ 
              display: 'block', 
              padding: '1rem 2rem', 
              backgroundColor: 'rgba(255,255,255,0.2)', 
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              backdropFilter: 'blur(10px)',
              minWidth: '250px',
              fontWeight: 'bold'
            }}
          >
            🏥 Health Check
          </a>
        </div>
        
        <div style={{ marginTop: '2rem', fontSize: '0.9rem', opacity: 0.8 }}>
          ✅ Sistema online | 🗄️ Base Dashboard conectada | 🚀 Pronto para GitHub
        </div>
      </div>
    </div>
  );
}