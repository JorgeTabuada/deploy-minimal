# 🚗 Deploy Minimal - Ferramentas Multipark

Sistema simplificado com **uma base Dashboard** funcionando perfeitamente!

## 🎯 Status Atual
- ✅ **Base única conectada**: Dashboard Multipark
- ✅ **Sistema funcional**: Dashboard + APIs + Upload
- ✅ **Pronto para produção**: GitHub + Vercel ready

## 🚀 Quick Start

```bash
# Clonar e instalar
git clone https://github.com/JorgeTabuada/deploy-minimal.git
cd deploy-minimal
npm install

# Executar
npm run dev
# Abrir http://localhost:3000
```

## 📊 Funcionalidades

### **Dashboard Principal** (`/dashboard`)
- Métricas em tempo real
- Dados de parques e reservas
- Interface limpa e responsiva

### **APIs Disponíveis**
- `/api/health` - Health check
- `/api/dashboard-data` - Dados unificados
- `/api/upload-*` - Upload de Excel

### **Upload Sistema** (`/upload`)
- Upload de ficheiros Excel
- Processamento de reservas
- Validação de dados

## 🗄️ Base de Dados

**Supabase Dashboard**: `ioftqsvjqwjeprsckeym`
- `parques` - Gestão de parques
- `reservas` - Sistema de reservas
- `profiles` - Utilizadores

## ⚙️ Configuração

Criar `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_DASHBOARD_URL=https://ioftqsvjqwjeprsckeym.supabase.co
NEXT_PUBLIC_SUPABASE_DASHBOARD_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlvZnRxc3ZqcXdqZXByc2NrZXltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxNTYwNzQsImV4cCI6MjA2MjczMjA3NH0.TXDfhioMFVNxLhjKgpXAxnKCPOl5n8QWpOkX2eafbYw
```

## 🚀 Deploy Vercel

1. Conectar Vercel ao repositório
2. Configurar environment variables
3. Deploy automático

## 🛠️ Desenvolvimento

```bash
# Desenvolvimento
npm run dev

# Build produção
npm run build

# Verificar saúde
curl http://localhost:3000/api/health
```

## 📋 Próximos Passos

- [ ] Sistema de autenticação
- [ ] Upload avançado Excel
- [ ] Funcionalidades do prompt original
- [ ] Multi-tenant support

---

**Sistema pronto para desenvolvimento e produção! 🎯**