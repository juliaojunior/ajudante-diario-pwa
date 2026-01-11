# 🏥 Ajudante Diário - PWA

**Assistente diário para idosos** com gerenciamento de medicamentos e lista de compras.

## 🎨 Arquitetura

Este projeto foi desenvolvido seguindo rigorosamente o **Atomic Design System** de Brad Frost:

### Hierarquia de Componentes

```
Design Tokens (Tailwind Config)
    ↓
Átomos (Icon, Text, GlassContainer, Input)
    ↓
Moléculas (IconButton, Badge, TimeDisplay, CheckboxItem, CategoryHeader)
    ↓
Organismos (DashboardCard, Header, NavigationBar, ShoppingCategory)
    ↓
Templates (Layouts de página)
    ↓
Páginas (Dashboard, Medicamentos, Compras)
```

## 🚀 Tecnologias

- **Framework**: Next.js 16 (App Router)
- **Linguagem**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Persistência**: IndexedDB (idb-keyval)
- **PWA**: @ducanh2912/next-pwa
- **Icons**: Material Symbols (Google Fonts)
- **Fonts**: Lexend, Noto Sans

## 📦 Estrutura de Diretórios

```
ajudante-diario-pwa/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Layout raiz com gradiente
│   ├── page.tsx             # Dashboard
│   ├── medication/          # Rotas de medicamentos
│   │   ├── add/
│   │   ├── confirm/
│   │   └── list/
│   └── shopping/            # Rotas de compras
│       ├── page.tsx
│       └── add/
├── components/              # Atomic Design
│   ├── atoms/              # Elementos indivisíveis
│   ├── molecules/          # Grupos de átomos
│   ├── organisms/          # Componentes complexos
│   └── templates/          # Estruturas de página
├── lib/
│   ├── store.ts            # Zustand store
│   ├── types.ts            # TypeScript types
│   └── utils.ts            # Helper functions
├── public/
│   ├── manifest.json       # PWA manifest
│   └── icons/              # App icons
└── styles/
    └── globals.css         # Estilos globais
```

## 🎯 Funcionalidades

### 💊 Medicamentos
- Cadastro com foto da caixa
- Definição de horário
- Confirmação de doses tomadas
- Histórico de medicação
- Lista completa de medicamentos

### 🛒 Lista de Compras
- Categorização automática (Alimentos, Limpeza, Higiene, Farmácia, Casa)
- Seleção de emoji para cada item
- Checkbox customizado
- Persistência local

### 🚨 Emergência
- Botão de chamada rápida (190)

## 🎨 Design System

### Cores
- **Gradiente principal**: Roxo Lilás (#B794F6) → Quase Preto (#1A1A1A)
- **Glassmorphism**: Background translúcido com blur
- **Cores funcionais**: Azul (#0056D2), Amarelo (#F9A825), Vermelho (#D32F2F)

### Tipografia
- **Display**: Lexend (300-800)
- **Body**: Noto Sans (400-700)
- **Tamanhos**: 14px a 80px (escala responsiva)

### Acessibilidade
- Fontes grandes (mínimo 18px)
- Alto contraste (branco sobre escuro)
- Botões grandes (mínimo 56px)
- Espaçamento generoso
- Feedback visual imediato

## 🛠️ Instalação

```bash
# Instalar dependências
pnpm install

# Desenvolvimento
pnpm dev

# Build para produção
pnpm build

# Preview da build
pnpm start
```

## 🌐 Deploy na Vercel

1. Faça push do código para o GitHub
2. Conecte o repositório na Vercel
3. Configure as variáveis de ambiente (se necessário)
4. Deploy automático!

### Configurações Recomendadas na Vercel
- **Framework Preset**: Next.js
- **Build Command**: `pnpm build`
- **Output Directory**: `.next`
- **Install Command**: `pnpm install`

## 📱 PWA Features

- ✅ Instalável (Add to Home Screen)
- ✅ Offline-first (Service Worker)
- ✅ Cache de assets
- ✅ Manifest completo
- ✅ Icons para todas as plataformas
- ✅ Splash screens

## 🧪 Testando PWA Localmente

```bash
# Build de produção
pnpm build

# Servir build
pnpm start

# Abrir no navegador
# http://localhost:3000

# Testar instalação:
# Chrome DevTools > Application > Manifest
# Chrome DevTools > Application > Service Workers
```

## 📝 Notas de Desenvolvimento

### Atomic Design Principles

1. **Átomos**: Elementos puros, sem lógica de negócio
2. **Moléculas**: Combinações simples de átomos
3. **Organismos**: Componentes com lógica e estado
4. **Templates**: Estruturas de layout reutilizáveis
5. **Páginas**: Instâncias de templates com dados reais

### Estado e Persistência

- **Zustand**: State management global
- **IndexedDB**: Persistência local via idb-keyval
- **Auto-save**: Todas as ações salvam automaticamente

### Performance

- **Code splitting**: Automático via Next.js App Router
- **Image optimization**: Desabilitado para PWA offline
- **CSS-in-JS**: Tailwind CSS (zero runtime)
- **Bundle size**: Otimizado com tree-shaking

## 🐛 Troubleshooting

### PWA não instala
- Certifique-se de estar em HTTPS (ou localhost)
- Verifique o manifest.json no DevTools
- Confirme que o Service Worker está registrado

### IndexedDB não persiste
- Verifique permissões do navegador
- Limpe o cache e tente novamente
- Use modo anônimo para testar

### Imagens não aparecem
- Confirme que as imagens são Base64
- Verifique o tamanho máximo (2MB recomendado)
- Use JPEG para melhor compressão

## 📄 Licença

Este projeto foi desenvolvido como exemplo de PWA com Atomic Design.

## 👨‍💻 Autor

Desenvolvido por **Manus AI** em Janeiro de 2026.

---

**Versão**: 1.0.0  
**Status**: ✅ Pronto para produção
