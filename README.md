# Protótipo — Site de Advocacia

Site estático (HTML/CSS/JS puro, sem build) feito como protótipo pra mostrar
o estilo/visual antes de fechar o conteúdo de verdade.

## Como ver localmente

Só abrir o `index.html` no navegador, ou rodar um servidor local:

```bash
# com Python
python -m http.server 8000

# ou com Node (npx)
npx serve .
```

## O que precisa ser trocado antes de virar site "de verdade"

- [ ] Nome completo do advogado(a) (hero, sobre, rodapé)
- [ ] Foto(s) — hoje são placeholders (`index.html`, seções `.photo-placeholder`)
- [ ] Área(s) de atuação reais (seção `#areas`)
- [ ] Número da OAB/UF
- [ ] Telefone, e-mail, endereço/atendimento online (seção `#contato`)
- [ ] Links de redes sociais (Instagram, LinkedIn, WhatsApp)
- [ ] Depoimentos reais (seção `#depoimentos`) — os atuais são fictícios
- [ ] Conectar o formulário de contato a algo real (ex: Formspree, EmailJS, ou
      backend próprio) — hoje ele só mostra uma notificação e não envia nada
- [ ] Remover o banner amarelo "🚧 protótipo" no topo do `index.html`

## Estrutura

```
index.html      → estrutura da página
css/style.css   → estilos, cores, animações
js/script.js    → interações (menu, scroll reveal, slider, formulário)
```

## Paleta usada

Azul-marinho (`#0f1b2d`) + dourado (`#b8974e`) sobre fundo off-white
(`#faf8f4`) — combinação clássica de escritórios de advocacia, com toques
modernos (blobs animados, glassmorphism no header, scroll reveal, cards com
hover). Fontes: Playfair Display (títulos) + Inter (corpo), via Google Fonts.
