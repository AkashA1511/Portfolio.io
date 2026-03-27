/* ═══════════════════════════════════════════════════
   CYBERSECURITY PORTFOLIO — JAVASCRIPT
   Hero typing, terminal, animations, matrix rain, etc.
   ═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    initTypingAnimation();
    initNavbar();
    initScrollReveal();
    initSkillBars();
    initCountUp();
    initFakeTerminal();
    initHackingFeed();
    initVisitorCounter();
    initMatrixRain();
    initContactForm();
});

/* ═══════════════════════════════════════════════════
   TYPING ANIMATION (HERO)
   ═══════════════════════════════════════════════════ */
function initTypingAnimation() {
    const phrases = [
        'Finding vulnerabilities...',
        'Exploiting misconfigurations...',
        'Securing applications...',
        'Bypassing authentication...',
        'Chaining attack vectors...',
        'Mapping attack surfaces...',
        'Crafting exploit payloads...',
    ];

    const typedEl = document.getElementById('typed-text');
    if (!typedEl) return;

    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let pauseTimer = 0;

    function tick() {
        const current = phrases[phraseIdx];

        if (!isDeleting) {
            typedEl.textContent = current.substring(0, charIdx + 1);
            charIdx++;

            if (charIdx === current.length) {
                pauseTimer = setTimeout(() => {
                    isDeleting = true;
                    tick();
                }, 2000);
                return;
            }
            setTimeout(tick, 60 + Math.random() * 40);
        } else {
            typedEl.textContent = current.substring(0, charIdx - 1);
            charIdx--;

            if (charIdx === 0) {
                isDeleting = false;
                phraseIdx = (phraseIdx + 1) % phrases.length;
                setTimeout(tick, 400);
                return;
            }
            setTimeout(tick, 30);
        }
    }

    setTimeout(tick, 800);
}

/* ═══════════════════════════════════════════════════
   NAVBAR — Scroll & Mobile Toggle
   ═══════════════════════════════════════════════════ */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const toggle = document.getElementById('nav-toggle');
    const links = document.getElementById('nav-links');

    // Scrolled class
    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile toggle
    if (toggle && links) {
        toggle.addEventListener('click', () => {
            links.classList.toggle('open');
            toggle.classList.toggle('active');
        });

        // Close on link click
        links.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                links.classList.remove('open');
                toggle.classList.remove('active');
            });
        });
    }
}

/* ═══════════════════════════════════════════════════
   SCROLL REVEAL (Intersection Observer)
   ═══════════════════════════════════════════════════ */
function initScrollReveal() {
    const items = document.querySelectorAll('.reveal-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, idx) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, idx * 80);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    items.forEach(item => observer.observe(item));
}

/* ═══════════════════════════════════════════════════
   SKILL BARS ANIMATION
   ═══════════════════════════════════════════════════ */
function initSkillBars() {
    const bars = document.querySelectorAll('.skill-fill');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetWidth = entry.target.getAttribute('data-width');
                entry.target.style.width = targetWidth + '%';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    bars.forEach(bar => observer.observe(bar));
}

/* ═══════════════════════════════════════════════════
   COUNT-UP ANIMATION
   ═══════════════════════════════════════════════════ */
function initCountUp() {
    const counters = document.querySelectorAll('[data-count]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(el => observer.observe(el));
}

function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'));
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        const current = Math.round(target * eased);

        if (target >= 1000) {
            el.textContent = current.toLocaleString();
        } else {
            el.textContent = current;
        }

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

/* ═══════════════════════════════════════════════════
   FAKE TERMINAL
   ═══════════════════════════════════════════════════ */
function initFakeTerminal() {
    const input = document.getElementById('terminal-input');
    const output = document.getElementById('terminal-output');
    if (!input || !output) return;

    const commands = {
        help: () => `<span class="terminal-green">Available commands:</span>
  whoami    - Who am I?
  skills    - My technical skills
  contact   - How to reach me
  projects  - My projects
  certs     - Certifications
  socials   - Social links
  clear     - Clear terminal
  matrix    - 🥚 ???
  sudo hire - Try it ;)`,

        whoami: () => `<span class="terminal-green">Akash Athare</span>
  Offensive Security Engineer | Bug Bounty Hunter
  Location: Pune, India
  Status: Available for hire
  "I break systems before attackers do."`,

        skills: () => `<span class="terminal-green">[Web Pentesting]</span> XSS, IDOR, SQLi, SSRF, CSRF, Auth Bypass
<span class="terminal-green">[Tools]</span> Burp Suite, Nmap, FFUF, Wireshark, Metasploit, Nuclei
<span class="terminal-green">[Web3]</span> Smart Contract Analysis, Honeypot Detection
<span class="terminal-green">[Recon]</span> Subdomain Enum, Attack Surface Mapping, Python Automation`,

        contact: () => `<span class="terminal-green">📧 Email:</span> akashworks151@gmail.com
<span class="terminal-green">💻 GitHub:</span> github.com/AkashA1511
<span class="terminal-green">🔗 LinkedIn:</span> linkedin.com/in/akasha151
<span class="terminal-green">🐦 Twitter:</span> @akasha151`,

        projects: () => `<span class="terminal-green">1. Reconix</span> — Automated Bug Bounty Recon Framework (Python/Bash)
<span class="terminal-green">2. Security Monitoring Suite</span> — Wazuh SIEM + Suricata IDS
<span class="terminal-green">3. Web3 Antivirus Bot</span> — Honeypot Detection (Acquired by AV firm)`,

        certs: () => `<span class="terminal-green">✓</span> CEH (Certified Ethical Hacker) — IIT Guwahati
<span class="terminal-green">✓</span> Ethical Hacking — AICTE / Palo Alto
<span class="terminal-green">✓</span> CNSP (Certified Network Security Practitioner)
<span class="terminal-green">✓</span> GATE 2024 — AIR 3054`,

        socials: () => `<span class="terminal-green">GitHub:</span> <a href="https://github.com/AkashA1511" target="_blank" style="color: var(--green)">AkashA1511</a>
<span class="terminal-green">Twitter:</span> <a href="https://twitter.com/akasha151" target="_blank" style="color: var(--green)">@akasha151</a>
<span class="terminal-green">LinkedIn:</span> <a href="https://linkedin.com/in/akasha151" target="_blank" style="color: var(--green)">akasha151</a>
<span class="terminal-green">TryHackMe:</span> Active Learner`,

        clear: () => {
            output.innerHTML = '';
            return null;
        },

        matrix: () => {
            triggerMatrixMode();
            return `<span class="terminal-green">🟢 ENTERING THE MATRIX...</span>
<span style="color: var(--red)">Wake up, Neo...</span>`;
        },

        'sudo hire': () => `<span class="terminal-green">
  ╔══════════════════════════════════════╗
  ║   ACCESS GRANTED!                    ║
  ║   Initiating hire protocol...        ║
  ║   Redirecting to contact section...  ║
  ╚══════════════════════════════════════╝
</span>`,
    };

    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const cmd = input.value.trim().toLowerCase();
            input.value = '';

            // Echo command
            addTerminalLine(`<span class="prompt">visitor@akash:~$</span> ${escapeHtml(cmd)}`);

            if (cmd === '') return;

            if (cmd === 'sudo hire') {
                const result = commands['sudo hire']();
                addTerminalLine(result);
                setTimeout(() => {
                    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
                }, 1500);
            } else if (commands[cmd]) {
                const result = commands[cmd]();
                if (result) addTerminalLine(result);
            } else {
                addTerminalLine(`<span style="color: var(--red)">Command not found: ${escapeHtml(cmd)}</span>
Type <span class="terminal-green">'help'</span> for available commands.`);
            }

            output.scrollTop = output.scrollHeight;
        }
    });

    function addTerminalLine(html) {
        const line = document.createElement('div');
        line.className = 'terminal-line';
        line.innerHTML = html;
        output.appendChild(line);
    }

    function escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }
}

/* ═══════════════════════════════════════════════════
   MATRIX MODE (Easter Egg)
   ═══════════════════════════════════════════════════ */
function triggerMatrixMode() {
    const canvas = document.getElementById('matrix-rain');
    if (!canvas) return;

    // Boost opacity temporarily
    canvas.style.opacity = '0.15';
    canvas.style.transition = 'opacity 2s';

    setTimeout(() => {
        canvas.style.opacity = '0.04';
    }, 8000);
}

/* ═══════════════════════════════════════════════════
   MATRIX RAIN (Background)
   ═══════════════════════════════════════════════════ */
function initMatrixRain() {
    const canvas = document.getElementById('matrix-rain');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*(){}[]|;:<>/?~';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    function draw() {
        ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#00ff9f';
        ctx.font = fontSize + 'px JetBrains Mono, monospace';

        for (let i = 0; i < drops.length; i++) {
            const char = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(char, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(draw, 50);
}

/* ═══════════════════════════════════════════════════
   LIVE HACKING FEED
   ═══════════════════════════════════════════════════ */
function initHackingFeed() {
    const feedContent = document.getElementById('feed-content');
    if (!feedContent) return;

    const feedMessages = [
        'Scanning port 443 on target...',
        'XSS payload injected successfully',
        'Subdomain takeover detected: staging.example.com',
        'SQLi attempt → response: 200 OK, 3 rows',
        'Brute force SSH blocked: 5 attempts',
        'IDOR found: /api/v2/users/{id}/profile',
        'JWT token forged with HS256 → access granted',
        'Nuclei scan: 14 templates matched',
        'Recon complete: 87 live hosts found',
        'WAF bypass: CloudFlare → 403 ⟹ 200',
        'SSRF detected: internal metadata endpoint',
        'File upload bypass: .php → .pHp5 accepted',
        'CORS misconfiguration: origin reflected',
        'Open redirect → token theft chain confirmed',
        'Admin panel found: /wp-login-backup.php',
        'API rate limit bypass via X-Forwarded-For',
        'GraphQL introspection enabled: schema leaked',
        'Privilege escalation: user → admin in 2 steps',
    ];

    let idx = 0;

    function updateFeed() {
        feedContent.style.opacity = '0';
        setTimeout(() => {
            feedContent.textContent = feedMessages[idx];
            feedContent.style.opacity = '1';
            feedContent.style.transition = 'opacity 0.3s';
            idx = (idx + 1) % feedMessages.length;
        }, 300);
    }

    updateFeed();
    setInterval(updateFeed, 3500);
}

/* ═══════════════════════════════════════════════════
   VISITOR COUNTER (localStorage based)
   ═══════════════════════════════════════════════════ */
function initVisitorCounter() {
    const counterEl = document.getElementById('counter-num');
    if (!counterEl) return;

    let count = parseInt(localStorage.getItem('visitorCount') || '1337');
    count++;
    localStorage.setItem('visitorCount', count.toString());

    // Format with leading zeros hacker-style
    counterEl.textContent = count.toString().padStart(4, '0');
}

/* ═══════════════════════════════════════════════════
   CONTACT FORM (Frontend only)
   ═══════════════════════════════════════════════════ */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const btn = form.querySelector('.form-submit');
        const originalText = btn.innerHTML;

        btn.innerHTML = '<span class="btn-icon">✓</span> Message Sent!';
        btn.style.background = '#00cc7f';
        btn.disabled = true;

        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            btn.disabled = false;
            form.reset();
        }, 3000);
    });
}
