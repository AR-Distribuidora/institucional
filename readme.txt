# AR Distribuidora - Website MVP

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## 📋 Sobre o Projeto

MVP completo de e-commerce para a **AR Distribuidora**, empresa especializada em segurança eletrônica. O site foi desenvolvido com foco em conversão, UX otimizada e estratégias de growth hacking baseadas no plano de negócios da empresa.

### 🚀 Características Principais

- **Design Responsivo**: Otimizado para desktop, tablet e mobile
- **Performance**: Carregamento rápido e otimização SEO
- **Conversão**: Focado em vendas e geração de leads
- **B2B + B2C**: Atende tanto consumidores finais quanto instaladores
- **Redirecionamento Inteligente**: Produtos redirecionam para Shopee
- **Content Marketing**: Blog integrado para educação do cliente

## 🏗️ Estrutura do Projeto

```
ar-distribuidora/
├── index.html              # Página inicial
├── produtos.html           # Catálogo de produtos
├── conteudo.html          # Blog/Central de conteúdo
├── instaladores.html      # Programa de parcerias B2B
├── contato.html           # Formulário de contato
├── style.css              # Estilos principais
├── script.js              # JavaScript funcional
├── README.md              # Documentação
└── images/                # Pasta de imagens
    ├── logo.png
    ├── hero-security-system.jpg
    ├── kit-4-cameras.jpg
    ├── kit-8-cameras.jpg
    ├── kit-16-cameras.jpg
    ├── camera-individual.jpg
    ├── dvr-4-canais.jpg
    ├── dvr-8-canais.jpg
    ├── kit-cabos.jpg
    ├── fonte-alimentacao.jpg
    ├── featured-guide.jpg
    ├── instalacao-passo-a-passo.jpg
    ├── comparativo-cameras.jpg
    ├── posicionamento-cameras.jpg
    ├── video-configuracao-app.jpg
    ├── manutencao-sistema.jpg
    ├── configuracao-dvr.jpg
    ├── dvr-vs-nvr.jpg
    ├── seguranca-residencial.jpg
    ├── video-instalacao-camera.jpg
    ├── instalador-profissional.jpg
    ├── benefits-illustration.jpg
    ├── customer-1.jpg
    ├── customer-2.jpg
    ├── customer-3.jpg
    ├── partner-1.jpg
    ├── partner-2.jpg
    └── partner-3.jpg
```

## 📱 Páginas Implementadas

### 1. **Página Inicial** (index.html)
- Hero section com proposta de valor
- Produtos em destaque
- Seção "Como Funciona"
- Benefícios da AR Distribuidora
- Depoimentos de clientes
- CTA para conversão

### 2. **Produtos** (produtos.html)
- Catálogo completo de produtos
- Sistema de filtros avançado
- Visualização rápida (modal)
- Redirecionamento para Shopee
- Sistema de favoritos
- Comparação de produtos

### 3. **Conteúdo** (conteudo.html)
- Blog educativo
- Categorização por tipo de conteúdo
- Sistema de busca
- Artigos em modal
- Vídeos tutoriais
- Newsletter

### 4. **Para Instaladores** (instaladores.html)
- Programa de parcerias B2B
- Níveis de parceria (Bronze, Silver, Gold)
- Histórias de sucesso
- Formulário de cadastro
- FAQ específico

### 5. **Contato** (contato.html)
- Múltiplos canais de contato
- Formulário inteligente
- FAQ geral
- Integração WhatsApp
- Informações da empresa

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Design system completo
- **JavaScript ES6+**: Funcionalidades interativas
- **Font Awesome**: Ícones
- **Google Fonts**: Tipografia (Inter)

## 🎨 Design System

### Cores
- **Primary**: #2196f3 (Electric Blue)
- **Secondary**: #1a237e (Navy)
- **Success**: #4caf50
- **Warning**: #ff9800
- **Error**: #f44336
- **Light**: #f5f5f5
- **Dark**: #333333

### Tipografia
- **Font Family**: Inter, -apple-system, BlinkMacSystemFont
- **Headings**: 600 weight
- **Body**: 400 weight

## ⚡ Funcionalidades Implementadas

### 🔍 Sistema de Filtros
- Filtro por categoria
- Filtro por preço
- Filtro por número de câmeras
- Ordenação por relevância/preço

### 📱 Responsividade
- Breakpoints: 1024px, 768px, 480px
- Mobile-first approach
- Menu hamburger para mobile

### 🛒 E-commerce Features
- Redirecionamento para Shopee
- Sistema de favoritos (localStorage)
- Cálculo automático de descontos
- Quick view modal

### 📝 Content Management
- Sistema de artigos modular
- Categorização automática
- Search functionality
- Social sharing

### 🤝 Lead Generation
- Formulários otimizados
- Newsletter subscription
- Partnership program
- WhatsApp integration

## 🚀 Como Implementar

### 1. **Preparação dos Arquivos**

Faça o download de todos os arquivos (HTML, CSS, JS) e crie a estrutura de pastas conforme indicado acima.

### 2. **Configuração de Imagens**

Crie a pasta `images/` e adicione todas as imagens necessárias. Use as dimensões recomendadas:

- **Logo**: 200x50px (PNG transparente)
- **Hero Images**: 800x600px
- **Product Images**: 400x400px
- **Content Images**: 600x400px
- **Testimonial Images**: 100x100px (circular)

### 3. **Personalização**

#### Links para Shopee
Edite o arquivo `script.js` na seção `productData` e atualize os URLs:

```javascript
shopeeUrl: 'https://shopee.com.br/seu-produto-real'
```

#### Informações de Contato
Atualize os contatos em todos os arquivos HTML:

```html
<a href="https://wa.me/5511999999999">WhatsApp</a>
<a href="tel:+551199999999">Telefone</a>
<a href="mailto:contato@ardistribuidora.com.br">Email</a>
```

#### Social Media
Adicione os links reais das redes sociais no footer:

```html
<a href="https://facebook.com/ardistribuidora">Facebook</a>
<a href="https://instagram.com/ardistribuidora">Instagram</a>
```

### 4. **SEO e Analytics**

Adicione no `<head>` de cada página:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>

<!-- Facebook Pixel -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'YOUR_PIXEL_ID');
fbq('track', 'PageView');
</script>
```

### 5. **Hospedagem**

O site é estático e pode ser hospedado em:

- **Vercel** (Recomendado)
- **Netlify** 
- **GitHub Pages**
- **AWS S3 + CloudFront**
- **Firebase Hosting**

#### Deploy no Vercel:

```bash
npm i -g vercel
vercel --prod
```

## 📈 Otimizações de Conversão

### 1. **CTA Optimization**
- Botões com cores contrastantes
- Texto action-oriented
- Posicionamento estratégico

### 2. **Social Proof**
- Depoimentos reais de clientes
- Números de vendas
- Badges de confiança

### 3. **Urgência e Escassez**
- Ofertas limitadas
- Contadores regressivos
- Estoque limitado

### 4. **Processo de Compra Simplificado**
- Redirecionamento direto para Shopee
- WhatsApp para dúvidas rápidas
- Formulários mínimos

## 📊 Métricas Recomendadas

### KPIs Principais
- **Taxa de Conversão**: % visitantes → cliques para Shopee
- **CAC**: Custo de aquisição de cliente
- **Bounce Rate**: Taxa de rejeição
- **Session Duration**: Tempo na página

### Eventos para Tracking
- Cliques em produtos
- Downloads de conteúdo
- Envio de formulários
- Cliques no WhatsApp

## 🔧 Manutenção

### Atualizações Regulares
- [ ] Preços e promoções
- [ ] Novos produtos
- [ ] Conteúdo do blog
- [ ] Depoimentos

### Melhorias Progressivas
- [ ] A/B testing dos CTAs
- [ ] Otimização de imagens
- [ ] Melhoria do Google PageSpeed
- [ ] Implementação de PWA

## 🚀 Próximos Passos

### Fase 2 - Funcionalidades Avançadas
- [ ] Sistema de login/cadastro
- [ ] Carrinho de compras próprio
- [ ] Integração com ERP
- [ ] Chat online automatizado

### Fase 3 - Expansão
- [ ] Área do cliente
- [ ] Sistema de afiliados
- [ ] Marketplace próprio
- [ ] App móvel

## 📞 Suporte

Para suporte técnico ou dúvidas sobre implementação:

- **Email**: dev@ardistribuidora.com.br
- **WhatsApp**: (11) 9 9999-9999
- **Documentação**: [link-para-docs]

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

**Desenvolvido com ❤️ para democratizar a segurança eletrônica no Brasil**

## 🎯 Checklist de Go-Live

- [ ] Todas as imagens adicionadas
- [ ] Links de contato atualizados
- [ ] URLs do Shopee configurados
- [ ] Google Analytics instalado
- [ ] Facebook Pixel configurado
- [ ] SSL certificado instalado
- [ ] Site testado em todos os dispositivos
- [ ] Formulários testados
- [ ] Redirects funcionando
- [ ] SEO básico implementado

---

### 📱 Contato do Desenvolvedor

Dúvidas sobre o projeto? Entre em contato!

- **GitHub**: [@ardistribuidora](https://github.com/ardistribuidora)
- **Email**: dev@ardistribuidora.com.br

**Ready to launch? 🚀 Vamos democratizar a segurança eletrônica!**