/**
 * Tekko Chat Widget — Vanilla JS embed
 *
 * Embed på din hjemmeside:
 * <script src="https://tekup-chatbot-widget.pages.dev/tekko-widget.js"></script>
 * <script>TekkoWidget.init({ apiUrl: "https://chat.tekup.dk" })</script>
 */

(function () {
  'use strict';

  // ─── Styles ──────────────────────────────────────────────────────────
  const styles = `
    #tekko-widget-button {
      position: fixed; bottom: 20px; right: 20px; z-index: 999999;
      width: 56px; height: 56px; border-radius: 50%;
      background: #10b981; border: none; cursor: pointer;
      box-shadow: 0 4px 20px rgba(16, 185, 129, 0.4);
      display: flex; align-items: center; justify-content: center;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    #tekko-widget-button:hover { transform: scale(1.1); box-shadow: 0 6px 24px rgba(16, 185, 129, 0.5); }
    #tekko-widget-button .tekko-widget-avatar { width: 34px; height: 34px; object-fit: contain; position: relative; z-index: 1; }
    #tekko-widget-button .tekko-widget-fallback {
      width: 34px; height: 34px; border-radius: 50%; background: #111827; color: #22d3ee;
      display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 800;
      position: relative; z-index: 1;
    }
    #tekko-widget-button .pulse {
      position: absolute; width: 100%; height: 100%; border-radius: 50%;
      background: #10b981; opacity: 0.3; animation: tekko-pulse 2s infinite;
    }
    @keyframes tekko-pulse {
      0% { transform: scale(1); opacity: 0.3; }
      70% { transform: scale(1.4); opacity: 0; }
      100% { transform: scale(1.4); opacity: 0; }
    }
    #tekko-widget-window {
      position: fixed; bottom: 90px; right: 20px; z-index: 999999;
      width: 360px; height: 520px; max-height: calc(100vh - 120px);
      background: #18181b; border: 1px solid #27272a; border-radius: 16px;
      box-shadow: 0 8px 40px rgba(0,0,0,0.5);
      display: none; flex-direction: column; overflow: hidden;
      animation: tekko-slide-up 0.3s ease-out;
    }
    @keyframes tekko-slide-up {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    #tekko-widget-window.open { display: flex; }
    .tekko-header {
      background: #10b981; padding: 14px 16px; display: flex;
      align-items: center; gap: 10px; flex-shrink: 0;
    }
    .tekko-header-avatar { width: 32px; height: 32px; border-radius: 50%; object-fit: contain; background: rgba(255,255,255,0.12); }
    .tekko-header-text { flex: 1; }
    .tekko-header-title { color: #fff; font-weight: 600; font-size: 14px; }
    .tekko-header-sub { color: rgba(255,255,255,0.8); font-size: 11px; }
    .tekko-close-btn {
      background: none; border: none; color: white; cursor: pointer;
      padding: 4px; opacity: 0.7; transition: opacity 0.2s;
    }
    .tekko-close-btn:hover { opacity: 1; }
    .tekko-messages {
      flex: 1; overflow-y: auto; padding: 12px 16px;
      display: flex; flex-direction: column; gap: 8px;
    }
    .tekko-msg {
      max-width: 85%; padding: 8px 12px; border-radius: 12px;
      font-size: 13px; line-height: 1.4; word-wrap: break-word;
    }
    .tekko-msg-user {
      align-self: flex-end; background: #10b981; color: #fff;
      border-bottom-right-radius: 4px;
    }
    .tekko-msg-bot {
      align-self: flex-start; background: #1f1f23; color: #e4e4e7;
      border-bottom-left-radius: 4px;
    }
    .tekko-msg-thinking {
      align-self: flex-start; background: #1f1f23; color: #71717a;
      font-style: italic; font-size: 12px;
    }
    .tekko-input-area {
      display: flex; gap: 8px; padding: 10px 12px;
      border-top: 1px solid #27272a; flex-shrink: 0;
    }
    .tekko-input {
      flex: 1; background: #1f1f23; border: 1px solid #27272a;
      border-radius: 8px; padding: 8px 12px; color: #e4e4e7;
      font-size: 13px; outline: none;
    }
    .tekko-input:focus { border-color: #10b981; }
    .tekko-send {
      background: #10b981; border: none; border-radius: 8px;
      width: 36px; height: 36px; cursor: pointer; display: flex;
      align-items: center; justify-content: center;
    }
    .tekko-send:disabled { opacity: 0.4; cursor: default; }
    .tekko-send svg { width: 16px; height: 16px; fill: white; }
  `;

  const TEKKO_IDLE_SOURCES = [
    '/tekko/tekko-idle.webp',
    '/tekko/tekko-idle.png',
    '/tekko/tekko-idle.svg',
  ];
  const CLOSE_ICON = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
  const SEND_ICON = `<svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>`;

  // ─── State ───────────────────────────────────────────────────────────
  let config = {};
  let messages = [];
  let isOpen = false;
  let isSending = false;
  let sessionId = 'tekko-' + Math.random().toString(36).slice(2, 8);

  // ─── DOM helpers ─────────────────────────────────────────────────────
  function createElement(html) {
    const d = document.createElement('div');
    d.innerHTML = html;
    return d.firstElementChild;
  }

  function escapeHtml(text) {
    const d = document.createElement('div');
    d.textContent = text;
    return d.innerHTML;
  }

  function createTekkoImage(className) {
    const img = document.createElement('img');
    img.className = className;
    img.alt = 'Tekko';
    img.loading = 'lazy';
    let sourceIndex = 0;
    img.src = TEKKO_IDLE_SOURCES[sourceIndex];
    img.onerror = function () {
      sourceIndex += 1;
      if (sourceIndex < TEKKO_IDLE_SOURCES.length) {
        img.src = TEKKO_IDLE_SOURCES[sourceIndex];
        return;
      }
      const fallback = document.createElement('div');
      fallback.className = className.includes('header') ? 'tekko-header-avatar tekko-widget-fallback' : 'tekko-widget-fallback';
      fallback.textContent = 'TK';
      img.replaceWith(fallback);
    };
    return img;
  }

  // ─── Build UI ────────────────────────────────────────────────────────
  function buildWidget() {
    const styleTag = document.createElement('style');
    styleTag.textContent = styles;
    document.head.appendChild(styleTag);

    const btn = createElement(`
      <button id="tekko-widget-button" aria-label="Åbn chat">
        <div class="pulse"></div>
      </button>
    `);
    btn.appendChild(createTekkoImage('tekko-widget-avatar'));

    const win = createElement(`
      <div id="tekko-widget-window">
        <div class="tekko-header">
          <div class="tekko-header-avatar-slot"></div>
          <div class="tekko-header-text">
            <div class="tekko-header-title">Tekup Chatbot</div>
            <div class="tekko-header-sub">${config.subtitle || 'Spørg om vores løsninger'}</div>
          </div>
          <button class="tekko-close-btn" aria-label="Luk">${CLOSE_ICON}</button>
        </div>
        <div class="tekko-messages">
          <div class="tekko-msg tekko-msg-bot">${escapeHtml(config.greeting || 'Hej! 👋 Hvordan kan jeg hjælpe dig i dag?')}</div>
        </div>
        <div class="tekko-input-area">
          <input class="tekko-input" type="text" placeholder="Skriv din besked..." />
          <button class="tekko-send" disabled>${SEND_ICON}</button>
        </div>
      </div>
    `);
    win.querySelector('.tekko-header-avatar-slot').appendChild(createTekkoImage('tekko-header-avatar'));

    document.body.appendChild(btn);
    document.body.appendChild(win);

    btn.addEventListener('click', () => toggle());
    win.querySelector('.tekko-close-btn').addEventListener('click', () => toggle());

    const input = win.querySelector('.tekko-input');
    const sendBtn = win.querySelector('.tekko-send');
    const messagesEl = win.querySelector('.tekko-messages');

    input.addEventListener('input', () => {
      sendBtn.disabled = !input.value.trim() || isSending;
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });

    sendBtn.addEventListener('click', sendMessage);

    async function sendMessage() {
      const text = input.value.trim();
      if (!text || isSending) return;
      input.value = '';
      sendBtn.disabled = true;
      addMessage(text, 'user');
      isSending = true;

      const thinkingEl = document.createElement('div');
      thinkingEl.className = 'tekko-msg tekko-msg-thinking';
      thinkingEl.textContent = 'Tekko tænker...';
      messagesEl.appendChild(thinkingEl);
      messagesEl.scrollTop = messagesEl.scrollHeight;

      try {
        const resp = await fetch(`${config.apiUrl}/api/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: text, session_id: sessionId }),
        });
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const data = await resp.json();
        thinkingEl.remove();
        addMessage(data.reply || 'Beklager, jeg kunne ikke generere et svar.', 'bot');
      } catch (err) {
        thinkingEl.remove();
        addMessage('Beklager, der opstod en teknisk fejl. Prøv venligst igen.', 'bot');
      } finally {
        isSending = false;
        sendBtn.disabled = !input.value.trim();
      }
    }

    function addMessage(text, role) {
      const el = document.createElement('div');
      el.className = `tekko-msg tekko-msg-${role}`;
      el.textContent = text;
      messagesEl.appendChild(el);
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function toggle() {
      isOpen = !isOpen;
      win.classList.toggle('open', isOpen);
      if (isOpen) input.focus();
    }
  }

  // ─── Init ────────────────────────────────────────────────────────────
  window.TekkoWidget = {
    init: function (opts = {}) {
      config = {
        apiUrl: opts.apiUrl || 'https://chat.tekup.dk',
        greeting: opts.greeting || 'Hej! 👋 Hvordan kan jeg hjælpe dig i dag?',
        subtitle: opts.subtitle || 'Spørg om vores løsninger',
        primaryColor: opts.primaryColor || '#10b981',
        position: opts.position || 'bottom-right',
      };
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', buildWidget);
      } else {
        buildWidget();
      }
    }
  };
})();
