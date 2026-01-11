# 🚀 Guia de Deploy na Vercel

## Passo a Passo

### 1. Acesse a Vercel
Vá para [vercel.com](https://vercel.com) e faça login com sua conta do GitHub.

### 2. Importe o Repositório
1. Clique em **"Add New Project"**
2. Selecione **"Import Git Repository"**
3. Busque por `ajudante-diario-pwa`
4. Clique em **"Import"**

### 3. Configure o Projeto

#### Framework Preset
- **Framework**: Next.js (detectado automaticamente)

#### Build & Output Settings
- **Build Command**: `pnpm build` (detectado automaticamente)
- **Output Directory**: `.next` (detectado automaticamente)
- **Install Command**: `pnpm install` (detectado automaticamente)

#### Root Directory
- Deixe como `.` (raiz do projeto)

### 4. Variáveis de Ambiente
Não há variáveis de ambiente necessárias para este projeto, pois usa apenas IndexedDB local.

### 5. Deploy
Clique em **"Deploy"** e aguarde alguns minutos.

---

## ✅ Após o Deploy

### Verificar PWA
1. Abra o site no navegador
2. Pressione `F12` para abrir DevTools
3. Vá em **Application** > **Manifest**
4. Confirme que o manifest está carregado
5. Vá em **Application** > **Service Workers**
6. Confirme que o SW está registrado

### Testar Instalação
1. No Chrome/Edge, clique no ícone de instalação na barra de endereço
2. Clique em **"Instalar"**
3. O app será adicionado à tela inicial

### Testar Offline
1. Abra o app instalado
2. Desligue a internet
3. Navegue pelas páginas
4. Confirme que funciona offline

---

## 🔧 Configurações Avançadas

### Custom Domain
1. Vá em **Settings** > **Domains**
2. Adicione seu domínio personalizado
3. Configure os DNS conforme instruções

### Environment Variables (Futuro)
Se precisar adicionar variáveis de ambiente:
1. Vá em **Settings** > **Environment Variables**
2. Adicione as variáveis necessárias
3. Redeploy o projeto

### Analytics
A Vercel oferece analytics gratuito:
1. Vá em **Analytics**
2. Ative o Vercel Analytics
3. Adicione o script no projeto (se necessário)

---

## 📱 URLs do Projeto

- **Repositório GitHub**: https://github.com/juliaojunior/ajudante-diario-pwa
- **Deploy Vercel**: https://ajudante-diario-pwa.vercel.app (após deploy)

---

## 🐛 Troubleshooting

### Build falha
- Verifique os logs de build na Vercel
- Confirme que o `pnpm build` funciona localmente
- Verifique se todas as dependências estão no `package.json`

### PWA não instala
- Confirme que está em HTTPS (Vercel usa HTTPS por padrão)
- Verifique o manifest.json no DevTools
- Confirme que os ícones existem em `/public/icons/`

### Service Worker não registra
- Limpe o cache do navegador
- Force um hard refresh (Ctrl+Shift+R)
- Verifique os logs do console

---

## 📊 Performance

### Lighthouse Score Esperado
- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 90+
- **SEO**: 90+
- **PWA**: 100

### Otimizações Aplicadas
- ✅ Code splitting automático (Next.js)
- ✅ Image optimization desabilitado (para PWA offline)
- ✅ CSS-in-JS com Tailwind (zero runtime)
- ✅ Service Worker com cache strategies
- ✅ Lazy loading de componentes

---

## 🔄 Continuous Deployment

A Vercel faz deploy automático quando você:
1. Faz push para a branch `main`
2. Cria um Pull Request (preview deploy)
3. Merge de PR (deploy de produção)

Para desabilitar auto-deploy:
1. Vá em **Settings** > **Git**
2. Configure as branches de deploy

---

## 📞 Suporte

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **PWA Docs**: https://web.dev/progressive-web-apps/

---

**Desenvolvido por Manus AI**  
Janeiro 2026
