// Horror Login Effects - Mysterious & Creepy

document.addEventListener('DOMContentLoaded', () => {
  // Canvas fog effect
  const canvas = document.getElementById('fogCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  let fogParticles = [];
  
  function initFog() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
    for (let i = 0; i < 100; i++) {
      fogParticles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 50 + 20,
        opacity: Math.random() * 0.1
      });
    }
  }
  
  function animateFog() {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    fogParticles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(139, 0, 0, ${p.opacity})`;
      ctx.fill();
    });
    requestAnimationFrame(animateFog);
  }
  
  initFog();
  animateFog();
  
  // Resize canvas
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
  
  // Creepy particles
  const particlesContainer = document.getElementById('particles');
  function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 20 + 10) + 's';
    particle.style.width = particle.style.height = Math.random() * 4 + 1 + 'px';
    particlesContainer.appendChild(particle);
    
    setTimeout(() => particle.remove(), 30000);
  }
  
  setInterval(createParticle, 300);
  
  // Input effects
  const inputs = document.querySelectorAll('input');
  const passwordInput = document.getElementById('password');
  
  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.parentElement.parentElement.classList.add('focused');
      createBloodDrip(input);
    });
    
    input.addEventListener('blur', () => {
      input.parentElement.parentElement.classList.remove('focused');
    });
  });
  
  // Password typing horror effect
  passwordInput.addEventListener('input', () => {
    const valueLength = passwordInput.value.length;
    const card = document.querySelector('.login-card');
    
    // Red glow intensity based on typing
    const glowIntensity = Math.min(valueLength * 0.2, 1);
    card.style.boxShadow = `var(--shadow-deep), 0 0 ${30 + glowIntensity * 20}px var(--blood-red)`;
    
    // Screen flicker effect
    if (valueLength > 0) {
      document.body.classList.add('flicker');
      setTimeout(() => document.body.classList.remove('flicker'), 100);
    }
  });
  
  // Form submission
  const form = document.getElementById('loginForm');
  const overlay = document.getElementById('successOverlay');
  const closeBtn = document.querySelector('.close-btn');
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username === 'admin' && password === '666') {
      // Success - enter horror
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      
      // Intense blood rain
      createBloodRain();
    } else {
      // Wrong password - scary shake
      form.classList.add('shake');
      setTimeout(() => form.classList.remove('shake'), 800);
      
      // Red screen flash
      document.body.classList.add('blood-flash');
      setTimeout(() => document.body.classList.remove('blood-flash'), 200);
    }
  });
  
  closeBtn.addEventListener('click', () => {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    location.reload();
  });
  
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
      location.reload();
    }
  });
  
  // Helper functions
  function createBloodDrip(element) {
    const drip = document.createElement('div');
    drip.style.cssText = `
      position: absolute;
      top: 0;
      right: -10px;
      width: 4px;
      height: 20px;
      background: var(--blood-red);
      border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
      animation: dripFall 1s ease-out forwards;
      z-index: 10;
    `;
    element.parentElement.appendChild(drip);
    
    setTimeout(() => drip.remove(), 1000);
  }
  
  // Add drip animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes dripFall {
      0% { transform: translateY(0) scale(1); opacity: 1; }
      100% { transform: translateY(100px) scale(0.5); opacity: 0; }
    }
    
    .login-form.shake {
      animation: shakeHorror 0.8s ease-in-out;
    }
    
    @keyframes shakeHorror {
      0%, 100% { transform: translateX(0); }
      20% { transform: translateX(-15px); }
      40% { transform: translateX(15px); }
      60% { transform: translateX(-10px); }
      80% { transform: translateX(10px); }
    }
    
    body.flicker {
      animation: flickerScreen 0.1s ease-in-out 3;
    }
    
    @keyframes flickerScreen {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }
    
    body.blood-flash {
      animation: bloodFlash 0.2s ease-in-out;
    }
    
    @keyframes bloodFlash {
      0%, 100% { filter: hue-rotate(0deg) brightness(1); }
      50% { filter: hue-rotate(0deg) brightness(1.5) sepia(0.3); }
    }
    
    .input-group.focused label {
      color: var(--blood-red);
      text-shadow: 0 0 10px var(--blood-red);
    }
  `;
  document.head.appendChild(style);
  
  function createBloodRain() {
    for (let i = 0; i < 100; i++) {
      setTimeout(() => {
        const drop = document.createElement('div');
        drop.style.cssText = `
          position: fixed;
          left: ${Math.random() * 100}vw;
          top: -10px;
          width: 2px;
          height: 20px;
          background: var(--blood-red);
          animation: bloodRain 1s linear forwards;
          z-index: 999;
        `;
        document.body.appendChild(drop);
        
        setTimeout(() => drop.remove(), 1000);
      }, i * 20);
    }
  }
  
  const bloodStyle = document.createElement('style');
  bloodStyle.textContent = `
    @keyframes bloodRain {
      to {
        transform: translateY(100vh) rotate(10deg);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(bloodStyle);
  
  // Eerie typing sound effect (silent Web Audio API)
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  passwordInput.addEventListener('keydown', () => {
    // Silent creepy tone
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscillator.frequency.setValueAtTime(220, audioCtx.currentTime);
    oscillator.type = 'sine';
    gainNode.gain.setValueAtTime(0.01, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
    oscillator.start(audioCtx.currentTime);
    oscillator.stop(audioCtx.currentTime + 0.1);
  });
});

