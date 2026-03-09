# 📋 BibiFood - Sistema de Gestão para Restaurantes v2.0.6

**Data:** 8 de Março de 2026 | **Status:** ✅ **PRODUÇÃO PRONTO** | **Última Build:** v2.0.6

---

## 📑 Índice

1. [Visão Geral](#visão-geral)
2. [Arquitetura do Sistema](#arquitetura-do-sistema)
3. [Stack Tecnológico](#stack-tecnológico)
4. [Estrutura de Pastas](#estrutura-de-pastas)
5. [Funcionalidades Principais](#funcionalidades-principais)
6. [Fluxos Críticos](#fluxos-críticos)
7. [Configuração e Setup](#configuração-e-setup)
8. [Build e Deployment](#build-e-deployment)
9. [Testes e Validação](#testes-e-validação)
10. [Operações e Suporte](#operações-e-suporte)
11. [Segurança](#segurança)
12. [Troubleshooting](#troubleshooting)

---

## 🎯 Visão Geral

**BibiFood** é um **aplicativo desktop híbrido nativo para Windows** que oferece gestão completa de restaurantes com:

✔️ **Interface Responsiva** - Otimizada para tablets, PDAs e computadores  
✔️ **Offline-First** - Funciona sem internet com sincronização automática  
✔️ **Auto-Atualização** - Sistema de atualização seguro via GitHub Releases  
✔️ **Múltiplos Perfis** - Admin, Garçom, Cozinha, Caixa  
✔️ **Licenciamento Próprio** - Chaves temporárias com ativação integrada  
✔️ **Backup/Restore** - Exportação e restauração de dados completos  

**Usuários Principais:**
- 👨‍💼 **Admin** - Configurações, usuários, relatórios
- 🔧 **Caixa** - Gerenciamento de pagamentos e vendas  
- 👨‍🍳 **Cozinha** - Visualização e preparação de pedidos
- 👨‍💼 **Garçom** - Atendimento e abertura de mesas

---

## 🏗️ Arquitetura do Sistema

### Arquitetura em 3 Camadas

```
┌─────────────────────────────────────────────────────┐
│                  FRONTEND (React)                    │
│    - UI Responsiva com TailwindCSS                  │
│    - Estado Local com Context API + Dexie (IndexedDB) │
│    - Validação com Zod                              │
│    - Criptografia Client-Side (bcryptjs, crypto-js) │
└──────────────┬──────────────────────────────────────┘
               │ WebView Bridge (window.pywebview.api)
┌──────────────▼──────────────────────────────────────┐
│              BACKEND (FastAPI + Python)              │
│    - API REST em http://localhost:8000              │
│    - SQLite para persistência local                 │
│    - Gerenciamento de processos background          │
│    - Sistema de atualização automática              │
│    - Ativação e licenciamento                       │
└──────────────┬──────────────────────────────────────┘
               │ Subprocess spawning com env sanitização
┌──────────────▼──────────────────────────────────────┐
│         DESKTOP ENVIRONMENT (PyWebView)              │
│    - Janela nativa Windows .exe                      │
│    - Acesso a disco, processos, sistema              │
│    - PyInstaller para empacotamento                 │
│    - Inno Setup para instalador                     │
└─────────────────────────────────────────────────────┘
```

### Fluxo de Dados

1. **User Action** → React Component
2. **State Update** → Context API + IndexedDB (Dexie)
3. **Sync to Backend** → Fetch `/api/*` endpoints
4. **Backend Processing** → FastAPI routes + SQLite
5. **Response** → JSON over HTTP
6. **UI Re-render** → React state update
7. **Update Check** → Auto-update manager polls GitHub

---

## 💾 Stack Tecnológico

### Frontend (React 19)

```json
{
  "core": {
    "react": "19.2.0",
    "typescript": "5.8.2",
    "vite": "6.2.0"
  },
  "routing": {
    "react-router-dom": "6.30.3"
  },
  "state": {
    "context-api": "built-in",
    "dexie": "4.3.0"
  },
  "ui": {
    "tailwindcss": "latest",
    "lucide-react": "0.554.0"
  },
  "validation": {
    "zod": "4.3.6"
  },
  "security": {
    "bcryptjs": "3.0.3",
    "crypto-js": "4.2.0"
  },
  "testing": {
    "@playwright/test": "1.55.0"
  }
}
```

### Backend (Python 3.13)

```python
{
    "core": ["FastAPI", "Uvicorn[standard]"],
    "desktop": ["PyWebView"],
    "database": ["SQLite"],
    "security": ["Passlib[bcrypt]", "Cryptography"],
    "http": ["Requests"],
    "system": ["WMI", "PySide6"],
    "build": ["PyInstaller"],
    "config": ["python-dotenv"]
}
```

### Build & Deployment

| Ferramenta | Versão | Propósito |
|-----------|--------|-----------|
| **Node.js** | 20.x | Build frontend, CI/CD |
| **npm** | 10.x | Gerenciador de pacotes JS |
| **PyInstaller** | 6.x | Compilar Python → .exe |
| **Inno Setup** | 6.x | Criar instalador Windows |
| **GitHub Actions** | latest | CI/CD automation |

---

## 📁 Estrutura de Pastas

```
Sistema-Restaurante/
├── 📄 package.json                    # npm scripts e dependências
├── 📄 tsconfig.json                   # TypeScript config
├── 📄 vite.config.ts                  # Vite build config
├── 📄 eslint.config.js                # Linting rules
├── 📄 playwright.config.js            # E2E test config
├── 📄 index.html                      # Entry HTML
├── 📄 index.tsx                       # React root
├── 📄 App.tsx                         # App shell com routing
├── 📄 version.ts                      # Frontend version (2.0.6)
├── 📄 types.ts                        # TypeScript type definitions
├── 📄 db.json                         # Mock data seed
├── 📄 server.js                       # Express mock API server
│
├── 📂 src/
│   ├── 📂 components/
│   │   ├── Layout.tsx                 # Header/Footer shell
│   │   ├── LoginScreen.tsx            # PIN/Senha login com IP detection
│   │   ├── ErrorBoundary.tsx          # Error recovery
│   │   ├── UpdateManager.tsx          # Update UI notifications
│   │   ├── ConfirmModal.tsx           # Dialog reutilizável
│   │   ├── TableGrid.tsx              # Mesas layout
│   │   ├── DeliveryMap.tsx            # Mapa de entregas
│   │   ├── UpdateAvailableModal.tsx  # Update prompt
│   │   └── admin/
│   │       ├── Dashboard.tsx          # Painel principal
│   │       ├── UsersTab.tsx           # CRUD de usuários
│   │       ├── ProductsTab.tsx        # CRUD de produtos
│   │       ├── SettingsTab.tsx        # Configurações + Backup/Restore
│   │       └── ReportsTab.tsx         # Relatórios de vendas
│   ├── 📂 pages/
│   │   ├── AdminDashboard.tsx         # Painel Admin
│   │   ├── WaiterDashboard.tsx        # Painel Garçom (mesas)
│   │   ├── KitchenDisplay.tsx         # Display de cozinha
│   │   ├── OrderDetails.tsx           # Detalhes do pedido
│   │   └── CashierDashboard.tsx       # Gerenciamento de caixa
│   ├── 📂 context/
│   │   ├── AppContext.tsx             # Estado global (user, orders, etc)
│   │   └── ToastContext.tsx           # Notificações toast
│   ├── 📂 services/
│   │   ├── api.ts                     # Base HTTP client
│   │   ├── database.ts                # Dexie + sync logic
│   │   └── security.ts                # Criptografia
│   ├── 📂 utils/
│   │   ├── validation.ts              # Zod schemas
│   │   ├── formatting.ts              # Formatação de dados
│   │   └── helpers.ts                 # Utilitários
│   └── 📂 assets/
│       ├── brand/                     # Logo, ícones
│       └── fonts/                     # Fontes customizadas
│
├── 📂 desktop/
│   ├── launcher.py                    # Ponto de entrada (abre janela)
│   ├── backend.py                     # API FastAPI principal + endpoints
│   ├── version.py                     # Backend version (2.0.6)
│   ├── activation_manager.py          # Gerenciador de ativação
│   ├── update_manager.py              # Checker de atualizações (GitHub)
│   ├── process_manager.py             # Gerenciador de processos bg
│   ├── auth_client.py                 # Autenticação com servidor remoto
│   ├── build_exe.py                   # Build script PyInstaller
│   ├── requirements.txt                # pip dependencies
│   ├── BibiFood.spec                  # PyInstaller manifest
│   └── utils/
│       ├── config.py                  # Config file handling
│       └── logger.py                  # Logging setup
│
├── 📂 scripts/
│   ├── check-version-sync.mjs         # Valida versões alinhadas
│   ├── check-release-readiness.mjs    # Valida docs e testes
│   ├── check-client-readiness.mjs     # Gate consolidado (VERSION+RELEASE+TYPE+LINT+E2E)
│   ├── build-desktop.sh               # Build binário desktop
│   ├── run_update.ps1                 # PowerShell update runner
│   └── test_*.py                      # Testes diversos
│
├── 📂 installer/
│   ├── BibiFood.iss                   # Inno Setup script
│   └── Output/                        # Build output (instalador .exe)
│
├── 📂 tests/
│   └── e2e/
│       ├── critical-flow.spec.js      # E2E: Garçom abre mesa e adiciona produto
│       ├── authorization-guard.spec.js # E2E: Garçom não acessa admin/kitchen
│       ├── network-reconnect.spec.js  # E2E: Recovery após falha de rede
│       └── payment-close-flow.spec.js # E2E: Admin registra pagamento
│
├── 📂 docs/
│   ├── overview.md                    # Arquitetura de alto nível
│   ├── operations.md                  # Operações diárias
│   ├── database.md                    # Schema de dados
│   ├── deployment-guide.md            # Deploy em produção
│   ├── RELEASE_CHECKLIST.md           # ✅ Pré-release
│   ├── OPERATIONS_RUNBOOK.md          # ✅ Procedimentos de suporte
│   ├── DISASTER_RECOVERY_TEST.md      # ✅ Backup/restore validation
│   ├── AUTO-UPDATE-GUIDE.md           # Sistema de auto-update
│   ├── SECURITY.md                    # Segurança
│   └── GITHUB-TOKEN-SETUP.md          # GitHub API config
│
├── 📂 .github/
│   ├── workflows/
│   │   └── main.yml                   # CI/CD pipeline (build → test → deploy)
│   └── instructions/
│       └── Instruções.instructions.md # Dev guidelines
│
├── 📂 Backups/                        # Backups antigos
│   └── Releases/                      # Versões antigas
│
├── 📂 Banco de dados/                 # Dados persistentes do SQLite
│
└── .gitignore, LICENSE, README.md

```

---

## 🎯 Funcionalidades Principais

### 1️⃣ Autenticação e Perfis

| Perfil | Acesso | Ações |
|--------|--------|-------|
| **ADMIN** | Tudo | Gerenciar usuários, produtos, configurações, relatórios |
| **CAIXA** | Pagamentos, relatórios | Registrar pagamentos, fechar contas, vendas por período |
| **COZINHA** | Pedidos apenas | Visualizar e atualizar status de preparo |
| **GARCOM** | Mesas, pedidos | Abrir mesas, adicionar produtos, enviar cozinha |

**Métodos de Autenticação:**
- 🔐 Username + Senha (Admin)
- 🔢 PIN 4 dígitos (Garçom, Cozinha, Caixa)
- 🔒 Sessões criptografadas (localStorage + sessionStorage)

### 2️⃣ Gestão de Mesas

- ➕ Abrir nova mesa
- 📝 Listar mesas com status (LIVRE/OCUPADA)
- 🔄 Transferir itens entre mesas
- 🧬 Fechar mesa após pagamento

**Estados de Mesa:** `LIVRE` → `OCUPADA` → `LIVRE`

### 3️⃣ Gestão de Pedidos

**Tipos:**
- 🍽️ **Pedido de Mesa** - Cliente direto
- 🚚 **Delivery** - Com endereço e contato
- 📞 **Takeout** - Cliente retira

**Fluxo:**
```
Criar → Aberto → Enviado Cozinha → Aguardando Pagamento → Pago → Fechado/Cancelado
                    ↓
               (Cozinha prepara)
```

**Conflito Otimista:**
- Campo `updatedAt` rastreia modificações
- Se 2 dispositivos editam ao mesmo tempo → erro HTTP 409 (Conflict)
- Cliente sincroniza versão remota e retry automático

### 4️⃣ Gerenciamento de Produtos

- 📦 CRUD completo de produtos
- 🏷️ Categorias com suporte a "Half-Half"
- 💰 Preço base + modificadores opcionais
- 🖨️ Destino de impressora (COZINHA/CAIXA)

### 5️⃣ Sistema de Pagamentos

- 💳 Dinheiro, débito, crédito
- 📊 Pagamentos parciais por item
- 📈 Relatórios de caixa por período
- 🔐 Validação de saldo em caixa

### 6️⃣ Backup e Restauração

**Exportação:**
```
Admin > Ajustes > Backup Dados → JSON file
```

**Restauração:**
```
Admin > Ajustes > Restaurar Backup → Selecionar JSON
```

**Dados Inclusos:**
- Usuários
- Produtos + Categorias
- Mesas
- Pedidos
- Sessões de caixa
- Configurações

### 7️⃣ Auto-Atualização

**Fluxo:**
1. Backend coleta versão do GitHub Releases
2. Valida hash SHA-256 obrigatório
3. Download no background
4. Prompts usuário para restart
5. `run_update.ps1` (PowerShell) executa instalador
6. Limpa variáveis PyInstaller
7. Restart automático

**Segurança:**
- ✅ Hash obrigatório (rejeita sem hash)
- ✅ Ambiente sanitizado antes de spawn
- ✅ Retry logic para restart
- ✅ Logging de todas as etapas

### 8️⃣ Detecção de IP de Rede

**Fluxo do LoginScreen:**
1. Tenta `GET /api/network-info` (3 tentativas com backoff)
2. Se falha, usa IP salvo em localStorage
3. Se nenhum IP válido, user configura manualmente em Admin
4. Detecta e valida IPv4 válido (não loopback)
5. Cache persiste em localStorage para próxima inicialização

---

## 🔁 Fluxos Críticos

### 🔐 Fluxo 1: Login de Garçom (E2E: critical-flow.spec.js)

```
[Tela de Login]
  ↓ Clica em "Joao Garcom"
[Modal PIN] {Joao, PIN=1234}
  ↓ Entra PIN 1234
[Dashboard Garçom]
  ↓ Clica mesa 1 (LIVRE)
[Modal Abrir Mesa]
  ↓ Confirma
[Detalhes Pedido] {Novo vazio}
  ↓ Clica "Adicionar"
[Wizard de Produto]
  ↓ Seleciona "Produto Teste" (R$25)
  ↓ Completa wizard (confirmações/sabores)
[Detalhes Pedido] {Item pendente}
  ↓ Clica "Enviar Cozinha"
[Status: Enviado]
```

**Validações:**
- ✅ PIN correto → login success
- ✅ Usuário inativo → bloqueia login
- ✅ Mesa vazia → abre OK
- ✅ Adiciona item → status muda para "Pendente"
- ✅ Envia cozinha → status "Enviado", Kitchen Display mostra

### 🔒 Fluxo 2: Barreira de Autorização (E2E: authorization-guard.spec.js)

```
[Garçom Logado @ /waiter]
  ↓ Tenta navegar para /#/admin
[Redirect] → /#/waiter (bloqueado)
  ↓ Tenta navegar para /#/kitchen
[Redirect] → /#/waiter (bloqueado)
```

**Validações:**
- ✅ Route guard redireciona role inválido
- ✅ Menu não exibe links inacessíveis
- ✅ Deep link attempt é bloqueado

### 🌐 Fluxo 3: Recuperação de Rede (E2E: network-reconnect.spec.js)

```
[LoginScreen com API falha 3x]
  ↓ Retry 1: 503 Service Unavailable
  ↓ Retry 2: 503 Service Unavailable
  ↓ Retry 3: 200 OK {ip: 192.168.10.55}
[Sucesso] → IP atualizado e cacheado
  ↓ Próxima inicialização usa cache caso falha
```

**Validações:**
- ✅ Retry automático com backoff exponencial
- ✅ Fallback para cache de localStorage
- ✅ User hint informativo

### 💳 Fluxo 4: Pagamento e Fechamento (E2E: payment-close-flow.spec.js)

```
[Pedido Open com Item]
  ↓ Clica "Enviar Cozinha"
[Status: Enviado]
  ↓ Admin clica "Pagamento"
[Modal Pagamento]
  ↓ Seleciona "Restante" (valor total)
  ↓ Confirma
[Sucesso] → Mesa liberada, pedido fechado
  ↓ Mesa garçom volta status LIVRE
```

**Validações:**
- ✅ Pagamento parcial suportado
- ✅ Saldo de caixa atualizado
- ✅ Mesa liberada automaticamente
- ✅ Histórico mantido como pago

---

## 🚀 Configuração e Setup

### Pré-requisitos

- **Windows 10 ou superior** (x64)
- **Node.js 20.x** (frontend build)
- **Python 3.13.x** com **.venv**
- **Git** (controle de versão)

### Setup de Desenvolvimento

#### 1. Clone o Repositório

```bash
git clone https://github.com/Fenixposts2/Sistema-Restaurante.git
cd Sistema-Restaurante
```

#### 2. Setup Frontend (Node.js)

```bash
# Instalar dependências npm
npm install

# (Opcional) Setup Playwright browsers para testes E2E
npx playwright install --with-deps chromium
```

#### 3. Setup Backend (Python)

```bash
# Criar virtual environment
python -m venv .venv

# Ativar ambiente (Windows)
.venv\Scripts\Activate.ps1

# Instalar dependências
pip install -r desktop/requirements.txt
```

#### 4. Configuração de Variáveis

Criar arquivo `.env` na raiz:

```env
# Backend
API_PORT=8000
GITHUB_TOKEN=ghp_xxxxxxxxxxxxx (para check de updates)

# Licenciamento (opcional)
LICENSE_REQUIRED=false

# Log
LOG_LEVEL=INFO
```

#### 5. Iniciar Ambiente de Desenvolvimento

**Terminal 1 - Frontend:**
```bash
npm run dev
# Vite abre em http://localhost:5173
```

**Terminal 2 - Backend:**
```bash
# Ativar .venv primeiro
python desktop/launcher.py
# PyWebView abre janela desktop
```

**Terminal 3 - Mock API (opcional):**
```bash
npm run server
# Express mock em http://localhost:3001
```

### Configurações Importantes

#### Arquivo: `desktop/internal_config.py`
- Define porta da API, diretórios, logging
- Customizar se necessário

#### Arquivo: `.github/instructions/Instruções.instructions.md`
- Regras de arquitetura estritas
- **Leia antes de modificar código**

---

## 🔨 Build e Deployment

### Build Frontend

```bash
npm run build
# Output: dist/
```

### Build Desktop (.exe)

```bash
# Ativar Python venv
.venv\Scripts\Activate.ps1

# Build usando PyInstaller
python desktop/build_exe.py
# Output: desktop/dist/BibiFood.exe
```

### Criar Instalador

```bash
# Editar versão em installer/BibiFood.iss para match version.ts

# Compilar com Inno Setup (GUI)
1. Abrir "installer/BibiFood.iss" no Inno Setup
2. Build → Compile
3. Output em: installer/Output/BibiFood-Setup-v2.0.6.exe

# OU via linha de comando
"C:\Program Files (x86)\Inno Setup 6\ISCC.exe" installer/BibiFood.iss
```

### Gerar Hash para Release

```bash
# Windows PowerShell
$file = "installer/Output/BibiFood-Setup-v2.0.6.exe"
(Get-FileHash -Path $file -Algorithm SHA256).Hash

# Saída esperada:
# 5CD79F4B8F0176A9304E90C1622F4F96269A15D4C8C2580E046F44B4E0427FD8
```

### Deploy no GitHub Releases

1. **Criar Release:**
   - Ir para GitHub: Settings → Releases → New Release
   - Tag version: `v2.0.6`
   - Release title: `BibiFood v2.0.6 Stable`
   
2. **Release Body (Markdown):**
   ```markdown
   # BibiFood v2.0.6 Stable
   
   ## Updates
   - Corrige DLL loading na atualização automática
   - Adiciona validação de hash obrigatória
   - Melhora detecção de IP de rede com retry
   - Suporta Backup/Restore completo
   
   ## Hash
   ```
   SHA256: 5CD79F4B8F0176A9304E90C1622F4F96269A15D4C8C2580E046F44B4E0427FD8
   ```
   
   ## Installation
   1. Download `BibiFood-Setup-v2.0.6.exe` abaixo
   2. Execute instalador (clique duplo)
   3. Siga prompts
   4. App abrirá automaticamente
   ```

3. **Upload Binário:**
   - Drag & drop `BibiFood-Setup-v2.0.6.exe` para assets
   - Publish Release

4. **Validar:**
   - Users download instalador
   - Auto-update manager detecta nova versão
   - Valida hash (obrigatório)
   - Faz download background
   - Prompts restart
   - `run_update.ps1` executa instalador
   - App restart automático

---

## ✅ Testes e Validação

### Validação Consolidada (Check Client Readiness)

**Comando:** `npm run check:client-readiness`

Executa **sequencialmente:**

1. ✅ **Version Sync** (`check:version-sync`)
   - Valida `package.json` = `version.ts` = `desktop/version.py` = `installer/BibiFood.iss`
   - Saída: "Version sync OK: 2.0.6"

2. ✅ **Release Readiness** (`check:release-readiness`)
   - Valida presença de:
     - `.github/workflows/main.yml`
     - `scripts/check-version-sync.mjs`
     - `tests/e2e/critical-flow.spec.js`
     - `docs/RELEASE_CHECKLIST.md`
   - Saída: "Release readiness OK: required docs, checks and critical E2E specs are present."

3. ✅ **Type Check** (`type-check`)
   - TypeScript sem emitir código: `tsc --noEmit`
   - Saída: sem output = sucesso

4. ✅ **Lint** (`lint`)
   - ESLint all files
   - Warnings desabilitadas para non-critical
   - Saída: sem output = sucesso

5. ✅ **Critical E2E** (`test:e2e:critical`)
   - Playwright chromium 4 testes críticos
   - `--workers=1` (sequencial para estabilidade)
   - Saída: "✓ 4 passed (20.0s)"

**Total Time:** ~20 segundos

**Saída Final:**
```
Client readiness OK: all critical checks passed.
```

### Testes E2E Individuais

```bash
# Todos os testes
npm run test:e2e:critical

# Teste específico
npx playwright test tests/e2e/critical-flow.spec.js --project=chromium

# Com modo debug
npx playwright test --debug
```

### Testes Manuais (QA)

#### Checklist: Operações Básicas

- [ ] App inicia
- [ ] Login PIN 1234 (garçom) funciona
- [ ] Abre mesa
- [ ] Adiciona produto
- [ ] Envia cozinha (status muda)
- [ ] Registra pagamento (mesa fica LIVRE)
- [ ] Admin login funciona
- [ ] Backup/Restore funciona
- [ ] Update checker funciona (quando há release)

#### Checklist: Rede e Sincronização

- [ ] Detecta IP automaticamente (first load)
- [ ] Usa IP cacheado se rede falha (next load)
- [ ] Sincroniza com servidor remoto (se disponível)
- [ ] Funciona offline (sem servidor)
- [ ] Resolve conflitos de pedidos (updatedAt check)

---

## 📞 Operações e Suporte

### Pré-Release (RELEASE_CHECKLIST.md)

✅ **Fazer antes de publicar cada release:**

1. **Version Freeze:**
   ```bash
   npm run check:version-sync
   # Confirma: package.json = version.ts = desktop/version.py = installer/BibiFood.iss
   ```

2. **Quality Gate:**
   ```bash
   npm run lint
   npm run type-check
   npm run test:e2e:critical
   # Todos devem passar
   ```

3. **Backup Safety:**
   - Exportar backup completo
   - Testar restore em máquina limpa
   - Validar fluxos críticos pós-restore

4. **Build & Hash:**
   - Build .exe + instalador
   - Gerar SHA-256 hash
   - Guardar em release notes

5. **Deployment Strategy:**
   - Release em **beta** channel primeiro
   - Monitor por 1 ciclo de negócio completo
   - Só promover para **stable** após validação

### Runbook de Operações (OPERATIONS_RUNBOOK.md)

#### Backup Diário

```bash
# No Admin Dashboard
1. Clica "Ajustes" tab
2. Clica "Backup Dados"
3. Salva arquivo JSON em local seguro
```

#### Restaurar de Backup

```bash
# No Admin Dashboard
1. Clica "Ajustes" tab
2. Clica "Restaurar Backup"
3. Seleciona arquivo JSON
4. Confirma
5. Sistema refaz dados completamente
```

#### Rollback de Versão

```bash
# Se nova versão causa problemas:
1. Acessa GitHub Releases
2. Download versão estável anterior
3. Execute instalador de versão anterior
4. App restart automático
5. Restaura backup de antes da update
```

#### Disaster Recovery Drill (DISASTER_RECOVERY_TEST.md)

Executar mensalmente:

1. **Backup:** Exporta dados completos
2. **Simula Desastre:** Remove database local
3. **Restaura:** Carrega backup JSON
4. **Valida:** Testa login, abre mesa, adiciona item, paga
5. **Evidência:** Captura screenshot/vídeo

### Contato de Suporte

À definir pelo cliente. Manter registro de:
- Problemas reportados
- Versões afetadas
- Rodadas de update
- Dados de incidents

---

## 🔐 Segurança

### Proteção de Dados

| Dado | Proteção | Localização |
|------|----------|-------------|
| Senhas | bcrypt (Passlib) | SQLite backend |
| PINs | Texto plano (proposital) | SQLite + Dexie |
| Sessions | Criptografadas (crypto-js) | localStorage + sessionStorage |
| Data Transfer | HTTPS (em produção) | HTTP localhost (dev) |

### Autenticação e Autorização

- ✅ PIN 4 dígitos para garçom/cozinha
- ✅ Senha 6+ chars para admin
- ✅ Inativação de usuários (`active: false`)
- ✅ Role-based access control (RBAC)
- ✅ Route guards em todas as pages

### Atualização Segura

- ✅ SHA-256 hash **obrigatório**
- ✅ Rejeita update sem hash
- ✅ Ambiente sanitizado (sem _MEIPASS2, PYTHONHOME, etc)
- ✅ Logging de todas as etapas
- ✅ Retry automático com backoff

### Licenciamento

- 📄 Sistema próprio de chaves
- ⏰ Validade temporal
- 🔒 Criptografia local
- 📞 Ativação online (opcional)

### Dados de Cliente

- 💾 Offline-first (privacy first)
- 📤 Sincronização opcional com servidor remoto
- 🔐 Criptografia end-to-end (opcional)
- ⚠️ Sempre pedir permissão explícita

---

## 🛠️ Troubleshooting

### Problema: App não inicia

**Causas:**
1. PyWebView não encontrado
2. Porta 8000 em uso
3. .venv não ativado

**Solução:**
```bash
# Verificar porta
netstat -ano | findstr :8000

# Ativar .venv
.venv\Scripts\Activate.ps1

# Reinstalar requirements
pip install --force-reinstall -r desktop/requirements.txt

# Iniciar com log detalhado
python -c "import logging; logging.basicConfig(level=logging.DEBUG)" && python desktop/launcher.py
```

### Problema: Update falha com "python313.dll"

**Causa:** Variáveis PyInstaller herdadas (_MEIPASS2)

**Status:** ✅ CORRIGIDO em v2.0.6
- Backend sanitiza env antes de spawn (backend.py:700)
- PowerShell limpa vars antes de restart (run_update.ps1:125)

**Se ainda ocorrer:**
```bash
# Manual cleanup
set _MEIPASS2=
set PYTHONHOME=
set PYTHONPATH=
set PYTHONEXECUTABLE=

# Retry update
```

### Problema: Conflito de pedido (CONFLICT 409)

**Causa:** 2 dispositivos editam pedido simultaneamente

**Esperado:** Erro 409 com versão remota retornada

**Cliente faz:**
1. Detecta mensagem "Pedido atualizado em outro dispositivo"
2. LocalStorage sincroniza com remoto
3. User reabre pedido
4. Retry manual

**Dev fix:** Campo `updatedAt` com valor timestamp

### Problema: Testes E2E falham aleatoriamente

**Causas:**
1. Vite + Express não iniciam em paralelo
2. `/api/*` endpoints ECONNREFUSED
3. Browser context não pronto

**Solução:** Playwright config atualizado (v2.0.6)
```javascript
webServer: {
  command: 'npx concurrently --kill-others "npm run dev -- --host 127.0.0.1 --port 4173" "npm run server"',
  // Vite + Express iniciam juntos
}
```

### Problema: IP não detecta em rede local

**Debug:**
```bash
# Verificar se /api/network-info responde
curl http://localhost:8000/api/network-info

# Se 500, verificar logs de backend
python desktop/launcher.py  # Ver stderr
```

**Fallback:** User configura manualmente em Admin > Ajustes

### Problema: Lint/ESLint passado mas build falha

**Debug:**
```bash
npm run lint  # Checar diretamente
npm run type-check  # TypeScript

# Se passar mas CI falha, limpar cache
npm cache clean --force
rm -r dist node_modules
npm install
npm run build
```

### Problema: Backup/Restore corrompido

**Prevenção:**
1. Validar JSON antes de restaurar
2. Fazer backup antes de restaurar
3. Testar em dev primeiro

**Recovery:**
```bash
# Restaurar backup anterior
Admin > Ajustes > Restaurar Backup > Selecionar arquivo anterior
```

---

## 📊 Versionamento

### Semantic Versioning: `X.Y.Z`

| Incremento | Significado | Exemplo |
|-----------|-------------|---------|
| **X** (Major) | Breaking changes | 1.0.0 → 2.0.0 (nova arquitetura) |
| **Y** (Minor) | Features compatíveis | 2.0.0 → 2.1.0 (novo relatório) |
| **Z** (Patch) | Bug fixes | 2.0.6 → 2.0.7 (corrige IP detection) |

### Single Source of Truth

**Versão atual: 2.0.6**

Sincronizados:
- ✅ `package.json` → "version": "2.0.6"
- ✅ `version.ts` → export const APP_VERSION = "2.0.6"
- ✅ `desktop/version.py` → VERSION = "2.0.6"
- ✅ `installer/BibiFood.iss` → #define AppVersion "2.0.6"

Validação: `npm run check:version-sync`

---

## 📈 Roadmap e Futuro

### v2.0.6 Features (Current)
✅ Correção de DLL loading  
✅ Validação de hash obrigatória  
✅ Backup/Restore completo  
✅ Retry de rede com cache  
✅ Detecção de conflitos otimista  

### v2.1.0 (Planejado)
- [ ] Relatórios avançados (PDF export)
- [ ] Integração com impressoras matriciais
- [ ] Cupom fiscal (NFCE)
- [ ] Dashboard de performance em tempo real
- [ ] Suporte a múltiplas filiais (cloud sync)

### v3.0.0 (Futuro)
- [ ] Web version (React Native / Progressive Web App)
- [ ] Integração com foodtech (iFood, Uber Eats)
- [ ] BI analytics
- [ ] Loyalty program
- [ ] Mobile app nativo (React Native)

---

## 📚 Referências e Recursos

### Documentação Técnica
- [docs/overview.md](docs/overview.md) - Arquitetura de alto nível
- [docs/SECURITY.md](docs/SECURITY.md) - Políticas de segurança
- [docs/AUTO-UPDATE-GUIDE.md](docs/AUTO-UPDATE-GUIDE.md) - Sistema de update
- [.github/instructions/Instruções.instructions.md](.github/instructions/Instruções.instructions.md) - Regras de dev

### Checklists de Operação
- [docs/RELEASE_CHECKLIST.md](docs/RELEASE_CHECKLIST.md) - Pré-release
- [docs/OPERATIONS_RUNBOOK.md](docs/OPERATIONS_RUNBOOK.md) - Procedimentos diários
- [docs/DISASTER_RECOVERY_TEST.md](docs/DISASTER_RECOVERY_TEST.md) - Disaster recovery

### Dependências Principais
- React 19 - UI framework
- FastAPI - REST API
- PyWebView - Desktop window
- Playwright - E2E testing
- Dexie - Local IndexedDB

---

## 🎓 Guia Rápido para Novos Devs

### 1. Clonar e Setup (15 min)
```bash
git clone https://github.com/Fenixposts2/Sistema-Restaurante.git
cd Sistema-Restaurante
npm install
python -m venv .venv && .venv\Scripts\Activate.ps1
pip install -r desktop/requirements.txt
```

### 2. Iniciar Ambiente (Terminals 1-2)
```bash
# Terminal 1
npm run dev          # Vite @ localhost:5173

# Terminal 2
python desktop/launcher.py  # PyWebView desktop
```

### 3. Validar Setup
```bash
npm run check:client-readiness   # Tudo OK?
```

### 4. Exemplos de Código

**Chamar API Backend:**
```typescript
const response = await fetch('/api/network-info');
const data = await response.json();
```

**Usar Dexie (localStorage local):**
```typescript
import { db } from './services/database';
const order = await db.orders.get('order-id');
```

**Componente React com State:**
```tsx
const [formData, setFormData] = useState({ username: '' });
return <input onChange={(e) => setFormData({ username: e.target.value })} />;
```

### 5. Submeter PR

1. Feature branch: `git checkout -b feature/xyz`
2. Commit com mensagem clara: `git commit -m "feat: adiciona xyz"`
3. Push: `git push origin feature/xyz`
4. GitHub: New PR → descrever mudanças
5. CI passa? → merge

---

## 📝 Licença

**Proprietary Software** - Uso interno apenas

Copyright © 2025 BibiFood. Todos os direitos reservados.

---

## ✉️ Contato

**Email Support:** [a definir]  
**GitHub Issues:** [a definir]  
**Status Page:** [a definir]  

---

**Última Atualização:** 8 de Março de 2026  
**Status:** ✅ Production Ready  
**Versão:** 2.0.6 Stable
