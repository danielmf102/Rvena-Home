/* ==========================================
   CONFIGURAÇÕES DA RAVENA HOME
   Edite os valores abaixo para personalizar a página.
========================================== */

// Cole aqui o link do seu grupo VIP do WhatsApp
// Exemplo: "https://chat.whatsapp.com/XXXXXXXXXXXXXXXXXXXXXX"
const WHATSAPP_GROUP_URL = "COLE_SEU_LINK_AQUI";

// Cole aqui o ID do seu Meta Pixel (deixe vazio para não ativar o rastreamento)
const META_PIXEL_ID = "";

// Porcentagem exibida na barra de crescimento do grupo (0 a 100)
const GROUP_PERCENTAGE = 85;

// Mensagem exibida abaixo da barra de crescimento
const GROUP_MESSAGE = "Novos membros entrando todos os dias";

// Mensagens de prova social exibidas na notificação flutuante (apenas demonstrativas)
const SOCIAL_PROOF_MESSAGES = [
  "Mariana acabou de entrar no grupo",
  "Camila acabou de entrar no grupo",
  "Fernanda acabou de entrar no grupo",
  "Juliana acabou de entrar no grupo"
];

/* ==========================================
   META PIXEL — INICIALIZAÇÃO
   Não é necessário editar esta parte.
========================================== */
function initMetaPixel() {
  if (!META_PIXEL_ID) return;

  /* eslint-disable */
  !function(f,b,e,v,n,t,s){
    if(f.fbq) return;
    n = f.fbq = function(){ n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
    if(!f._fbq) f._fbq = n;
    n.push = n; n.loaded = !0; n.version = '2.0';
    n.queue = []; t = b.createElement(e); t.async = !0;
    t.src = v; s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  /* eslint-enable */

  window.fbq('init', META_PIXEL_ID);
  window.fbq('track', 'PageView');
}

function trackLead() {
  if (META_PIXEL_ID && window.fbq) {
    window.fbq('track', 'Lead');
  }
}

/* ==========================================
   BOTÃO WHATSAPP — REDIRECIONAMENTO + LEAD
========================================== */
function goToWhatsAppGroup(event) {
  event.preventDefault();
  trackLead();

  // Pequeno atraso para garantir que o evento Lead seja registrado antes do redirecionamento
  window.setTimeout(function () {
    window.open(WHATSAPP_GROUP_URL, '_blank', 'noopener,noreferrer');
  }, 120);
}

function setupWhatsAppButtons() {
  const buttons = [
    document.getElementById('cta-whatsapp'),
    document.getElementById('cta-whatsapp-secondary')
  ];

  buttons.forEach(function (btn) {
    if (!btn) return;
    btn.setAttribute('href', WHATSAPP_GROUP_URL);
    btn.addEventListener('click', goToWhatsAppGroup);
  });
}

/* ==========================================
   INDICADOR DE GRUPO — BARRA DE PROGRESSO
========================================== */
function setupGroupIndicator() {
  const fill = document.getElementById('group-fill');
  const label = document.getElementById('group-percentage-label');
  const message = document.getElementById('group-message');

  const clamped = Math.max(0, Math.min(100, GROUP_PERCENTAGE));

  if (message) message.textContent = GROUP_MESSAGE;
  if (label) label.textContent = clamped + '%';

  if (fill) {
    // Pequeno atraso para permitir a animação de preenchimento
    window.requestAnimationFrame(function () {
      window.setTimeout(function () {
        fill.style.width = clamped + '%';
      }, 300);
    });
  }
}

/* ==========================================
   NOTIFICAÇÃO SOCIAL FLUTUANTE
========================================== */
function setupSocialProof() {
  const container = document.getElementById('social-proof');
  const textEl = document.getElementById('social-proof-text');
  if (!container || !textEl || SOCIAL_PROOF_MESSAGES.length === 0) return;

  let index = 0;

  function showNext() {
    textEl.textContent = SOCIAL_PROOF_MESSAGES[index % SOCIAL_PROOF_MESSAGES.length];
    container.classList.add('is-visible');

    window.setTimeout(function () {
      container.classList.remove('is-visible');
    }, 4200);

    index += 1;
  }

  // Primeira notificação após alguns segundos na página
  window.setTimeout(showNext, 3500);

  // Repete periodicamente
  window.setInterval(showNext, 9000);
}

/* ==========================================
   RODAPÉ — ANO ATUAL
========================================== */
function setupFooterYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/* ==========================================
   INICIALIZAÇÃO
========================================== */
document.addEventListener('DOMContentLoaded', function () {
  initMetaPixel();
  setupWhatsAppButtons();
  setupGroupIndicator();
  setupSocialProof();
  setupFooterYear();
});
