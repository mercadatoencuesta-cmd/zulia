/* ==========================================================================
   CERVEZA ZULIA SURVEYS & REWARDS SYSTEM - INTERACTION LOGIC
   ========================================================================== */

// Global App State
const state = {
    user: {
        name: "Juan Pérez",
        id: "USR-00012345",
        cedula: "12345678",
        email: "juan@email.com",
        phone: "+57 3000000000",
        registrationDate: "15/05/2026",
        points: 0,
        hasSpunWheel: false,
        completedSurveysCount: 124,
        rewardsCount: 8,
        rankingPos: 154,
        dailyStreak: 3, // claimed up to day 3
        dailyBonusClaimedToday: false
    },
    levels: [
        { level: 1, name: "Novato", minPts: 0, maxPts: 499 },
        { level: 2, name: "Principiante", minPts: 500, maxPts: 999 },
        { level: 3, name: "Iniciado", minPts: 1000, maxPts: 1499 },
        { level: 4, name: "Colaborador", minPts: 1500, maxPts: 2249 },
        { level: 5, name: "Fanático", minPts: 2250, maxPts: 2999 },
        { level: 6, name: "Especialista", minPts: 3000, maxPts: 3999 },
        { level: 7, name: "Explorador", minPts: 4000, maxPts: 4999 }, // Juan's starting bracket
        { level: 8, name: "Embajador", minPts: 5000, maxPts: 7999 },
        { level: 9, name: "Leyenda", minPts: 8000, maxPts: 999999 }
    ],
    surveys: [
        {
            id: "surv-tech",
            title: "Encuesta sobre Tecnología",
            duration: 5,
            points: 100,
            category: "recomendadas",
            status: "Disponible",
            questions: [
                {
                    type: "single",
                    text: "¿Qué sistema operativo móvil utilizas con mayor frecuencia?",
                    options: ["Android", "iOS", "Otros", "No poseo smartphone"]
                },
                {
                    type: "multiple",
                    text: "¿Para qué utilizas principalmente tu teléfono inteligente? (Selecciona todas las que apliquen)",
                    options: ["Redes Sociales", "Trabajo / Productividad", "Juegos Móviles", "Estudios", "Banca y Finanzas"]
                },
                {
                    type: "scale",
                    minLabel: "Muy improbable",
                    maxLabel: "Muy probable",
                    scaleMax: 5,
                    text: "¿Qué tan probable es que descargues una nueva aplicación móvil si esta te ofrece recompensas en puntos canjeables?"
                }
            ]
        },
        {
            id: "surv-compra",
            title: "Hábitos de consumo y Cerveza Zulia",
            duration: 10,
            points: 150,
            category: "nuevas",
            status: "Disponible",
            questions: [
                {
                    type: "single",
                    text: "¿Cuál es tu marca de cerveza favorita para reuniones sociales?",
                    options: ["Cerveza Zulia", "Polar Pilsen", "Regional Light", "Corona / Importadas", "No consumo alcohol"]
                },
                {
                    type: "single",
                    text: "¿Con qué frecuencia consumes cerveza durante la semana?",
                    options: ["Diariamente", "Semanalmente", "Mensualmente", "Raramente", "Nunca"]
                },
                {
                    type: "multiple",
                    text: "¿Qué atributos valoras más al elegir una Cerveza Zulia? (Elige varios)",
                    options: ["Sabor refrescante", "Diseño original de la botella", "Su herencia tradicional", "Precio competitivo", "Facilidad de encontrarla"]
                },
                {
                    type: "text",
                    text: "¿Qué sugerencia le darías a Cerveza Zulia para mejorar tu experiencia en eventos y festivales?"
                }
            ]
        },
        {
            id: "surv-marcas",
            title: "Satisfacción de marcas y publicidad",
            duration: 8,
            points: 120,
            category: "mejor-pagadas",
            status: "Disponible",
            questions: [
                {
                    type: "single",
                    text: "¿A través de qué medio te enteras habitualmente de promociones de tus marcas favoritas?",
                    options: ["Instagram / Redes sociales", "Publicidad en televisión", "Vallas publicitarias en la calle", "Recomendación de amigos", "Puntos de venta"]
                },
                {
                    type: "scale",
                    minLabel: "Insatisfecho",
                    maxLabel: "Excelente",
                    scaleMax: 5,
                    text: "¿Cómo calificarías la presencia de Cerveza Zulia en las redes sociales actualmente?"
                }
            ]
        },
        {
            id: "surv-vida",
            title: "Estilo de vida y bienestar",
            duration: 12,
            points: 180,
            category: "mas-rapidas",
            status: "Disponible",
            questions: [
                {
                    type: "single",
                    text: "¿Cuál es tu actividad al aire libre preferida para los fines de semana?",
                    options: ["Ir a la playa / piscina", "Hacer senderismo o caminatas", "Practicar algún deporte", "Descansar en parques urbanos"]
                },
                {
                    type: "single",
                    text: "¿Acompañas tus comidas de fin de semana con alguna bebida alcohólica ligera?",
                    options: ["Siempre", "A veces", "Nunca"]
                }
            ]
        }
    ],
    rewards: [
        { id: "rew-amazon", name: "Gift Card Amazon $10", points: 2000, category: "gift-cards", icon: "amazon" },
        { id: "rew-mercadolibre", name: "Tarjeta Mercado Libre", points: 2000, category: "cupones", icon: "mercadolibre" },
        { id: "rew-paypal", name: "PayPal $10 USD", points: 2500, category: "dinero", icon: "paypal" },
        { id: "rew-banco", name: "Transferencia Bancaria", points: 3000, category: "dinero", icon: "banco" },
        { id: "rew-zulia", name: "Cupón Tienda Zulia (Six-pack)", points: 1500, category: "sorteos", icon: "zulia" }
    ],
    history: [
        { type: "puntos", label: "Encuesta Tecnología", value: "+100 puntos", date: "15/06/2026", isPositive: true },
        { type: "premios", label: "Canje Gift Card Amazon", value: "-2000 puntos", date: "14/06/2026", isPositive: false },
        { type: "bonos", label: "Bono diario", value: "+50 puntos", date: "14/06/2026", isPositive: true },
        { type: "puntos", label: "Encuesta Hábitos", value: "+150 puntos", date: "13/06/2026", isPositive: true },
        { type: "premios", label: "Canje PayPal $10", value: "-2500 puntos", date: "12/06/2026", isPositive: false }
    ],
    notifications: [
        { id: 1, title: "Nueva encuesta disponible", text: "Encuesta sobre hábitos de consumo y cerveza te espera.", time: "Hace 10 min", unread: true },
        { id: 2, title: "¡Felicidades! Subiste de nivel", text: "Ahora eres Nivel 7 - Explorador.", time: "Hace 1 hora", unread: false },
        { id: 3, title: "Premio entregado", text: "Tu Gift Card Amazon fue enviada a tu correo.", time: "Hace 2 horas", unread: false },
        { id: 4, title: "Bono diario disponible", text: "Reclama tu bono de hoy y no pierdas tu racha.", time: "Hace 3 horas", unread: true }
    ],
    leaderboard: {
        semanal: [
            { rank: 1, name: "Carlos", points: 12500, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" },
            { rank: 2, name: "María", points: 11900, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100" },
            { rank: 3, name: "Pedro", points: 11100, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100" },
            { rank: 4, name: "Ana", points: 10200, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100" },
            { rank: 5, name: "Luis", points: 9800, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100" }
        ],
        mensual: [
            { rank: 1, name: "María", points: 45300, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100" },
            { rank: 2, name: "Carlos", points: 41200, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" },
            { rank: 3, name: "Alejandra", points: 38500, avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100" },
            { rank: 4, name: "Pedro", points: 34100, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100" },
            { rank: 5, name: "Juan Pérez", points: 28400, avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100" }
        ],
        total: [
            { rank: 1, name: "Fernando", points: 154000, avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100" },
            { rank: 2, name: "María", points: 142800, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100" },
            { rank: 3, name: "Carlos", points: 139100, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" },
            { rank: 4, name: "Gabriela", points: 122400, avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=100" },
            { rank: 5, name: "Pedro", points: 119800, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100" }
        ]
    },
    activeSurvey: null,
    activeSurveyIndex: 0,
    answers: {},
    pendingRedeemReward: null
};

// Application Router & Screen toggles
function navigateTo(screenId) {
    // Clear wheel sound ticking if we navigate away from ruleta
    if (screenId !== 'ruleta' && wheelTickTimeoutId) {
        clearTimeout(wheelTickTimeoutId);
        wheelTickTimeoutId = null;
    }

    // Intercept navigation if they haven't spun the lucky wheel yet
    const loginOrAuthScreens = ['splash', 'login', 'register', 'verification', 'ruleta'];
    if (!state.user.hasSpunWheel && !loginOrAuthScreens.includes(screenId)) {
        screenId = 'ruleta';
    }

    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });

    // Handle screen display
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
        
        // Custom actions when showing specific screens
        if (screenId === 'dashboard') {
            renderDashboard();
        } else if (screenId === 'ruleta') {
            renderWheel();
        } else if (screenId === 'profile') {
            renderProfile();
        } else if (screenId === 'surveys-list') {
            renderSurveysList();
        } else if (screenId === 'premios') {
            renderRewards();
        } else if (screenId === 'ranking') {
            renderRanking();
        } else if (screenId === 'historial') {
            renderHistory();
        } else if (screenId === 'notificaciones') {
            renderNotifications();
        } else if (screenId === 'daily-bonus') {
            renderDailyBonus();
        }
    }

    // Toggle navigation bar visibility based on screen authentication requirements
    const bottomNav = document.getElementById('bottom-nav');
    const authScreens = ['splash', 'login', 'register', 'verification', 'survey-active', 'survey-completed', 'ruleta'];
    if (authScreens.includes(screenId)) {
        bottomNav.style.display = 'none';
    } else {
        bottomNav.style.display = 'flex';
        // Mark active tab
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('onclick').includes(screenId)) {
                item.classList.add('active');
            }
        });
    }
}

// User Levels & Progress calculations
function getUserLevelInfo(points) {
    let currentLevel = state.levels[0];
    let nextLevel = state.levels[1];

    for (let i = 0; i < state.levels.length; i++) {
        if (points >= state.levels[i].minPts) {
            currentLevel = state.levels[i];
            nextLevel = state.levels[i + 1] || currentLevel;
        }
    }

    const range = nextLevel.minPts - currentLevel.minPts;
    const progressInLevel = points - currentLevel.minPts;
    const progressPercent = nextLevel === currentLevel ? 100 : Math.min(100, Math.floor((progressInLevel / range) * 100));
    const pointsNeeded = nextLevel === currentLevel ? 0 : nextLevel.minPts - points;

    return {
        level: currentLevel.level,
        name: currentLevel.name,
        percent: progressPercent,
        needed: pointsNeeded,
        nextName: nextLevel.name
    };
}

// Update User Points and trigger recalculations
function updateUserPoints(amount, label, type = "puntos") {
    state.user.points += amount;
    
    // Add to history log
    const dateStr = new Date().toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
    state.history.unshift({
        type: type,
        label: label,
        value: `${amount > 0 ? '+' : ''}${amount} puntos`,
        date: dateStr,
        isPositive: amount > 0
    });

    // Trigger level up notification if applicable
    const oldLevel = getUserLevelInfo(state.user.points - amount).level;
    const newLevel = getUserLevelInfo(state.user.points).level;
    if (newLevel > oldLevel) {
        const levelName = state.levels.find(l => l.level === newLevel).name;
        state.notifications.unshift({
            id: Date.now(),
            title: "¡Subiste de nivel!",
            text: `Felicitaciones, alcanzaste el Nivel ${newLevel} - ${levelName}.`,
            time: "Justo ahora",
            unread: true
        });
        showToast(`🎉 ¡Felicidades! Subiste al Nivel ${newLevel} - ${levelName}!`, "success");
    }

    // Refresh general displays
    renderHeaderStats();
}

function showToast(message, type = "success") {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <svg style="width: 18px; height: 18px; fill: currentColor;" viewBox="0 0 24 24">
            ${type === 'success' 
                ? '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>'
                : '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>'}
        </svg>
        <span>${message}</span>
    `;
    container.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 50);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, 3500);
}

// LUCKY WHEEL (RULETA) LOGIC
const wheelSectors = [
    { text: "+150", color: "#091322", textColor: "#ffffff" },
    { text: "+1000", color: "#00812c", textColor: "#ffffff" },
    { text: "+2500", color: "#fbe122", textColor: "#091322" },
    { text: "+3000", color: "#091322", textColor: "#ffffff" },
    { text: "+350", color: "#00812c", textColor: "#ffffff" },
    { text: "+600", color: "#fbe122", textColor: "#091322" },
    { text: "+5000", color: "#091322", textColor: "#ffffff" },
    { text: "+3550", color: "#00812c", textColor: "#ffffff" }
];

let isWheelSpinning = false;
let wheelAudioCtx = null;
let wheelTickTimeoutId = null;

function renderWheel() {
    const canvas = document.getElementById('wheel-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const center = width / 2;
    const radius = center - 8; // leave margin for rim overlap

    ctx.clearRect(0, 0, width, height);

    const numSectors = wheelSectors.length;
    const arcSize = (2 * Math.PI) / numSectors;

    for (let i = 0; i < numSectors; i++) {
        const sector = wheelSectors[i];
        const startAngle = i * arcSize - Math.PI / 2;
        const endAngle = startAngle + arcSize;

        // Draw Sector Wedge
        ctx.beginPath();
        ctx.moveTo(center, center);
        ctx.arc(center, center, radius, startAngle, endAngle);
        ctx.fillStyle = sector.color;
        ctx.fill();

        // Draw Wedge Separator Line
        ctx.strokeStyle = '#ffd700';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw text and decoration inside Sector
        ctx.save();
        ctx.translate(center, center);
        const middleAngle = startAngle + arcSize / 2;
        ctx.rotate(middleAngle);

        // Position text along the wedge radius
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = sector.textColor;
        ctx.font = '800 15px "Outfit", sans-serif';
        ctx.fillText(sector.text, radius - 35, 0);

        // Draw gold coin drawing or emoji
        ctx.font = '14px sans-serif';
        ctx.fillText('🪙', radius - 15, 0);

        ctx.restore();
    }

    // Draw central circular core border
    ctx.beginPath();
    ctx.arc(center, center, 42, 0, 2 * Math.PI);
    ctx.fillStyle = '#ffd700';
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#091322';
    ctx.stroke();

    // Draw inner central core circle
    ctx.beginPath();
    ctx.arc(center, center, 32, 0, 2 * Math.PI);
    ctx.fillStyle = '#091322';
    ctx.fill();
}

function playTickSound() {
    try {
        if (!wheelAudioCtx) {
            wheelAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (wheelAudioCtx.state === 'suspended') {
            wheelAudioCtx.resume();
        }
        const osc = wheelAudioCtx.createOscillator();
        const gain = wheelAudioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(600, wheelAudioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(120, wheelAudioCtx.currentTime + 0.05);
        gain.gain.setValueAtTime(0.3, wheelAudioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, wheelAudioCtx.currentTime + 0.05);
        osc.connect(gain);
        gain.connect(wheelAudioCtx.destination);
        osc.start();
        osc.stop(wheelAudioCtx.currentTime + 0.06);
    } catch (e) {
        // Ignore audio errors
    }
}

function spinWheel() {
    if (isWheelSpinning) return;
    isWheelSpinning = true;

    // Play initial pop sound
    playTickSound();

    // Disable buttons
    const centerBtn = document.getElementById('wheel-center-btn');
    const spinBtn = document.getElementById('ruleta-spin-btn');
    if (centerBtn) centerBtn.disabled = true;
    if (spinBtn) spinBtn.disabled = true;

    // Pick a random winner index (0-7)
    const winnerIndex = Math.floor(Math.random() * wheelSectors.length);
    const winnerSector = wheelSectors[winnerIndex];
    // Clean point value from "+150" etc.
    const wonPoints = parseInt(winnerSector.text.replace('+', ''), 10);

    // Calculate rotation angles
    const sectorAngleDeg = 360 / wheelSectors.length;
    // Calculate center angle of the winner sector (in degrees)
    const winnerCenterDeg = (winnerIndex * sectorAngleDeg) + (sectorAngleDeg / 2);
    
    // Top pointer is at 12 o'clock (0 degrees relative to the drawing start).
    // To align winner center (winnerCenterDeg) with 12 o'clock, we need to rotate the wheel counter-clockwise
    // by winnerCenterDeg, which is equivalent to a clockwise rotation of: 360 - winnerCenterDeg.
    // We add a small random offset within the sector (-12 to +12 deg) for natural feel.
    const randomOffset = (Math.random() - 0.5) * 24; 
    const baseRotation = 360 - winnerCenterDeg + randomOffset;
    
    // Add 5-7 full spins
    const fullSpins = 5 + Math.floor(Math.random() * 3);
    const finalRotation = (fullSpins * 360) + baseRotation;

    const wheelContainer = document.getElementById('lucky-wheel-canvas-container');
    if (wheelContainer) {
        wheelContainer.style.transition = 'transform 5s cubic-bezier(0.15, 0.85, 0.35, 1)';
        wheelContainer.style.transform = `rotate(${finalRotation}deg)`;
    }

    // Play ticks during the spin
    let tickCount = 0;
    const totalTicks = 35;
    const playTickSequence = () => {
        if (tickCount < totalTicks) {
            playTickSound();
            tickCount++;
            // Decelerating interval: speed decreases as tickCount increases
            const delay = 40 + Math.pow(tickCount, 1.9) * 4;
            wheelTickTimeoutId = setTimeout(playTickSequence, delay);
        }
    };
    // Start tick noise slightly delayed
    wheelTickTimeoutId = setTimeout(playTickSequence, 100);

    // Stop and handle results after 5 seconds (5000ms)
    setTimeout(() => {
        if (wheelTickTimeoutId) {
            clearTimeout(wheelTickTimeoutId);
            wheelTickTimeoutId = null;
        }
        // Confetti effect (matches sequence/game feel)
        try {
            if (typeof confetti === 'function') {
                confetti({
                    particleCount: 150,
                    spread: 80,
                    origin: { y: 0.6 }
                });
            }
        } catch (e) {}

        // Set user points
        state.user.points = wonPoints;
        state.user.hasSpunWheel = true;

        // Reset history transactions and add this spin as first action
        state.history = [
            { type: "puntos", label: "Puntos Iniciales (Ruleta)", value: `+${wonPoints} puntos`, date: new Date().toLocaleDateString('es-ES'), isPositive: true }
        ];

        showToast(`🎉 ¡Felicidades! Ganaste +${wonPoints} puntos de bienvenida`, "success");

        // Wait 1.5 seconds and redirect to dashboard
        setTimeout(() => {
            // Reset button states for future sessions if needed
            isWheelSpinning = false;
            if (centerBtn) centerBtn.disabled = false;
            if (spinBtn) spinBtn.disabled = false;
            if (wheelContainer) {
                // reset rotation transform silently after screen transition
                setTimeout(() => {
                    wheelContainer.style.transition = 'none';
                    wheelContainer.style.transform = 'rotate(0deg)';
                }, 600);
            }
            navigateTo('dashboard');
        }, 1500);

    }, 5000);
}

/* ==========================================================================
   RENDER METHODS FOR VARIOUS VIEWS
   ========================================================================== */

function renderHeaderStats() {
    // Header names and level titles
    const levelInfo = getUserLevelInfo(state.user.points);
    
    // Updates dashboard elements
    const pName = document.getElementById('dash-user-name');
    if (pName) {
        // If it's the dashboard greeting, make it ¡Hola, [Firstname]! 👋
        if (pName.classList.contains('dashboard-greeting') || pName.id === 'dash-user-name') {
            pName.innerText = `¡Hola, ${state.user.name.split(' ')[0]}! 👋`;
        } else {
            pName.innerText = state.user.name;
        }
    }
    const pLevel = document.getElementById('dash-user-level');
    if (pLevel) pLevel.innerText = `Nivel ${levelInfo.level} – ${levelInfo.name}`;

    // New Gamified Selectors
    const pRank = document.getElementById('dash-user-rank');
    if (pRank) pRank.innerText = levelInfo.name;
    const pBadge = document.getElementById('dash-level-badge');
    if (pBadge) {
        if (pBadge.classList.contains('wallet-level-badge')) {
            pBadge.innerText = `NIVEL ${levelInfo.level}`;
        } else {
            pBadge.innerText = `Lvl ${levelInfo.level}`;
        }
    }
    const pWallet = document.getElementById('dash-wallet-balance');
    if (pWallet) pWallet.innerText = state.user.points.toLocaleString();
    
    const pXpBar = document.getElementById('dash-xp-bar');
    if (pXpBar) pXpBar.style.width = `${levelInfo.percent}%`;
    const pXpText = document.getElementById('dash-xp-text');
    if (pXpText) {
        if (levelInfo.level === 9) {
            pXpText.innerText = "¡Nivel máximo!";
        } else {
            pXpText.innerText = `${levelInfo.needed} puntos para Nivel ${levelInfo.level + 1}`;
        }
    }
    const pXpPercent = document.getElementById('dash-xp-percent');
    if (pXpPercent) pXpPercent.innerText = `${levelInfo.percent}%`;

    // Updates level progress card (legacy fallback)
    const dLevel = document.getElementById('prog-level-title');
    if (dLevel) dLevel.innerText = `Nivel ${levelInfo.level}`;
    const dPoints = document.getElementById('prog-points-total');
    if (dPoints) dPoints.innerHTML = `${state.user.points.toLocaleString()} <span class="points-label">puntos</span>`;
    const dBar = document.getElementById('prog-bar-inner');
    if (dBar) dBar.style.width = `${levelInfo.percent}%`;
    const dNeeded = document.getElementById('prog-needed-text');
    if (dNeeded) {
        if (levelInfo.level === 9) {
            dNeeded.innerText = "¡Nivel máximo alcanzado!";
        } else {
            dNeeded.innerText = `${levelInfo.needed} puntos para Nivel ${levelInfo.level + 1}`;
        }
    }

    // Refresh notifications badge indicator
    const unreadCount = state.notifications.filter(n => n.unread).length;
    const notifBadge = document.getElementById('notif-badge-dot');
    if (notifBadge) {
        notifBadge.style.display = unreadCount > 0 ? 'block' : 'none';
    }
}

// 3. MENU PRINCIPAL (DASHBOARD)
function renderDashboard() {
    renderHeaderStats();

    // Render quick stats (with safety checks since they are removed from Dashboard but exist on Profile)
    const statCompleted = document.getElementById('stat-completed-surveys');
    if (statCompleted) statCompleted.innerText = state.user.completedSurveysCount;
    const statPoints = document.getElementById('stat-total-points');
    if (statPoints) statPoints.innerText = state.user.points.toLocaleString();
    const statRewards = document.getElementById('stat-rewards-earned');
    if (statRewards) statRewards.innerText = state.user.rewardsCount;
    const statRanking = document.getElementById('stat-ranking-pos');
    if (statRanking) statRanking.innerText = `#${state.user.rankingPos}`;

    // Render daily surveys list
    const surveysContainer = document.getElementById('dashboard-surveys-list');
    if (!surveysContainer) return;
    surveysContainer.innerHTML = '';

    const availableSurveys = state.surveys.filter(s => s.status === 'Disponible').slice(0, 3);
    if (availableSurveys.length === 0) {
        surveysContainer.innerHTML = '<div style="text-align: center; color: rgba(9, 19, 34, 0.6); font-size: 0.82rem; padding: 20px 0; font-weight: 600;">No hay encuestas disponibles por hoy.</div>';
    } else {
        availableSurveys.forEach((survey, index) => {
            let cardBg, textColor, tagBg, tagColor, btnBg, btnColor, imgAsset, iconEmoji, iconBg;
            
            if (index === 0) {
                cardBg = 'linear-gradient(135deg, #091322 0%, #152f5c 100%)';
                textColor = '#ffffff';
                tagBg = 'rgba(255, 215, 0, 0.2)';
                tagColor = '#ffd700';
                btnBg = '#fbe122';
                btnColor = '#091322';
                imgAsset = 'zulia_can_ice.png?v=3';
                iconEmoji = '📱';
                iconBg = 'linear-gradient(135deg, #1fa2ff 0%, #12d8fa 100%)';
            } else if (index === 1) {
                cardBg = 'linear-gradient(135deg, #005a20 0%, #008f33 100%)';
                textColor = '#ffffff';
                tagBg = 'rgba(255, 255, 255, 0.2)';
                tagColor = '#ffffff';
                btnBg = '#ffffff';
                btnColor = '#005a20';
                imgAsset = 'zulia_bottle_ice.png?v=3';
                iconEmoji = '🍺';
                iconBg = 'linear-gradient(135deg, #fbe122 0%, #ff8800 100%)';
            } else {
                cardBg = 'linear-gradient(135deg, #f5a623 0%, #ffc107 100%)';
                textColor = '#091322';
                tagBg = 'rgba(9, 19, 34, 0.1)';
                tagColor = '#091322';
                btnBg = '#091322';
                btnColor = '#ffffff';
                imgAsset = 'zulia_bottles_ice.png?v=3';
                iconEmoji = '📢';
                iconBg = 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)';
            }

            const card = document.createElement('div');
            card.className = 'survey-large-card';
            card.style.background = cardBg;
            card.style.color = textColor;
            
            card.innerHTML = `
                <div class="survey-card-left">
                    <div style="display: flex; gap: 12px; align-items: flex-start; width: 100%;">
                        <div class="survey-card-icon-animated" style="background: ${iconBg};">
                            <span>${iconEmoji}</span>
                        </div>
                        <div style="flex: 1;">
                            <h4 class="survey-card-title">${survey.title}</h4>
                            <div class="survey-card-meta">
                                <span class="survey-card-tag" style="background-color: ${tagBg}; color: ${tagColor};">+${survey.points} Pts</span>
                                <span class="survey-card-time" style="color: ${textColor}cc;">⏱️ ${survey.duration} min</span>
                            </div>
                        </div>
                    </div>
                    <button class="survey-card-btn" style="background-color: ${btnBg}; color: ${btnColor};" onclick="startSurvey('${survey.id}')">Responder</button>
                </div>
                <img src="${imgAsset}" class="survey-card-right-img" alt="Cerveza Zulia">
            `;
            surveysContainer.appendChild(card);
        });
    }
}

// 4. PERFIL DE USUARIO
function renderProfile() {
    document.getElementById('prof-name').innerText = state.user.name;
    document.getElementById('prof-id').innerText = state.user.id;
    document.getElementById('prof-cedula').innerText = state.user.cedula;
    document.getElementById('prof-correo').innerText = state.user.email;
    document.getElementById('prof-telefono').innerText = state.user.phone;
    document.getElementById('prof-registro').innerText = state.user.registrationDate;

    // Stats
    const levelInfo = getUserLevelInfo(state.user.points);
    document.getElementById('prof-stat-level').innerText = levelInfo.level;
    document.getElementById('prof-stat-points').innerText = state.user.points.toLocaleString();
    document.getElementById('prof-stat-completed').innerText = state.user.completedSurveysCount;
    document.getElementById('prof-stat-rewards').innerText = state.user.rewardsCount;

    // Achievements Badges rendering
    const badgeScroll = document.getElementById('profile-badges-scroll');
    badgeScroll.innerHTML = '';

    const achievements = [
        { id: 1, title: "Primera encuesta", icon: "🏅", desc: "Completa tu primer cuestionario.", unlocked: state.user.completedSurveysCount >= 1 },
        { id: 2, title: "100 encuestas", icon: "🏆", desc: "Supera las 100 encuestas completadas.", unlocked: state.user.completedSurveysCount >= 100 },
        { id: 3, title: "Nivel 5 alcanzado", icon: "🚀", desc: "Llega al nivel de Fanático.", unlocked: levelInfo.level >= 5 },
        { id: 4, title: "Primer premio", icon: "🎁", desc: "Canjea cualquier recompensa del catálogo.", unlocked: state.user.rewardsCount >= 1 },
        { id: 5, title: "Súper Referidor", icon: "📣", desc: "Registra tu primer amigo invitado.", unlocked: true } // Simulated unlocked
    ];

    achievements.forEach(ach => {
        const badgeDiv = document.createElement('div');
        badgeDiv.className = `achievement-badge ${ach.unlocked ? '' : 'locked'}`;
        badgeDiv.title = ach.desc;
        badgeDiv.innerHTML = `
            <span class="icon">${ach.icon}</span>
            <span class="title">${ach.title}</span>
        `;
        badgeScroll.appendChild(badgeDiv);
    });
}

// 5. LISTA DE ENCUESTAS
let currentSurveyFilter = 'todas';
function renderSurveysList() {
    const listContainer = document.getElementById('surveys-page-list');
    listContainer.innerHTML = '';

    const filteredSurveys = state.surveys.filter(survey => {
        if (currentSurveyFilter === 'todas') return true;
        return survey.category === currentSurveyFilter;
    });

    if (filteredSurveys.length === 0) {
        listContainer.innerHTML = '<div style="text-align: center; color: var(--text-muted); font-size: 0.82rem; padding: 40px 0;">No se encontraron encuestas en esta categoría.</div>';
        return;
    }

    filteredSurveys.forEach(survey => {
        let gradient, diffTag;
        if (survey.id === 'surv-tech') {
            gradient = 'linear-gradient(135deg, #0f1c3f 0%, #1d3b73 100%)';
            diffTag = 'FÁCIL';
        } else if (survey.id === 'surv-compra') {
            gradient = 'linear-gradient(135deg, #022567 0%, #005691 100%)';
            diffTag = 'X2 PUNTOS';
        } else if (survey.id === 'surv-marcas') {
            gradient = 'linear-gradient(135deg, #0f3d24 0%, #1c6d3d 100%)';
            diffTag = 'RECOMENDADA';
        } else {
            gradient = 'linear-gradient(135deg, #3d1052 0%, #631e84 100%)';
            diffTag = 'NUEVA';
        }

        const isCompleted = survey.status !== 'Disponible';
        const card = document.createElement('div');
        card.className = 'card game-survey-card';
        card.style.marginBottom = '16px';
        if (isCompleted) {
            card.style.background = 'linear-gradient(135deg, #334155 0%, #1e293b 100%)';
            card.style.opacity = '0.7';
            card.style.filter = 'grayscale(0.6)';
            card.style.animation = 'none';
        } else {
            card.style.background = gradient;
        }

        card.innerHTML = `
            <div class="game-card-left">
                <div class="game-card-badge" style="${isCompleted ? 'background-color:#64748b; color:#fff;' : ''}">${isCompleted ? 'COMPLETADA' : diffTag}</div>
                <h4 class="game-card-title">${survey.title}</h4>
                <div class="game-card-meta">
                    <span class="game-meta-item">⏱️ ${survey.duration} min</span>
                    <span class="game-meta-item">🎯 ${survey.questions.length} preg.</span>
                </div>
            </div>
            <div class="game-card-right">
                <div class="game-points-bubble" style="${isCompleted ? 'border-color:#64748b; background:rgba(30,41,59,0.8);' : ''}">
                    <span class="coin-spin">🪙</span>
                    <span class="points-val">+${survey.points}</span>
                    <span class="points-unit" style="${isCompleted ? 'color:#94a3b8;' : ''}">PTS</span>
                </div>
                ${isCompleted
                    ? `<button class="game-play-btn" style="background:#475569; border-color:#64748b; box-shadow:none; cursor:not-allowed;" disabled>
                        <span>LISTO</span>
                        <svg viewBox="0 0 24 24" style="width:12px; height:12px; fill:currentColor;"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                       </button>`
                    : `<button class="game-play-btn" onclick="startSurvey('${survey.id}')">
                        <span>INICIAR</span>
                        <svg viewBox="0 0 24 24" style="width:12px; height:12px; fill:currentColor;"><path d="M8 5v14l11-7z"/></svg>
                       </button>`
                }
            </div>
        `;
        listContainer.appendChild(card);
    });
}

function filterSurveys(filter, element) {
    currentSurveyFilter = filter;
    document.querySelectorAll('#surveys-list .tab-pill').forEach(pill => {
        pill.classList.remove('active');
    });
    element.classList.add('active');
    renderSurveysList();
}

// 6. ENCUESTA ACTIVA (ENCUESTA EN PROGRESO)
function startSurvey(surveyId) {
    const survey = state.surveys.find(s => s.id === surveyId);
    if (!survey || survey.status !== 'Disponible') return;

    state.activeSurvey = survey;
    state.activeSurveyIndex = 0;
    state.answers = {};

    navigateTo('survey-active');
    renderActiveQuestion();
}

function renderActiveQuestion() {
    const survey = state.activeSurvey;
    const index = state.activeSurveyIndex;
    const question = survey.questions[index];

    // Update screen title
    document.getElementById('active-survey-title').innerText = `${survey.title}`;
    document.getElementById('active-survey-step').innerText = `Pregunta ${index + 1} de ${survey.questions.length}`;

    // Update progress bar
    const progressPercent = Math.round(((index) / survey.questions.length) * 100);
    document.getElementById('active-survey-progress-bar').style.width = `${progressPercent}%`;

    // Render Question Body
    const body = document.getElementById('active-survey-body');
    body.innerHTML = '';

    const qCard = document.createElement('div');
    qCard.className = 'question-card';

    const qText = document.createElement('h4');
    qText.className = 'question-text';
    qText.innerText = question.text;
    qCard.appendChild(qText);

    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'options-list';

    if (question.type === 'single') {
        question.options.forEach((opt, oIdx) => {
            const optDiv = document.createElement('div');
            optDiv.className = 'option-item';
            optDiv.innerHTML = `
                <input type="radio" id="opt-${oIdx}" name="survey-q" value="${opt}" onchange="selectRadioOption('${opt}')">
                <label for="opt-${oIdx}" class="option-label">
                    <span class="option-checkbox-indicator"></span>
                    <span>${opt}</span>
                </label>
            `;
            optionsContainer.appendChild(optDiv);
        });
    } else if (question.type === 'multiple') {
        question.options.forEach((opt, oIdx) => {
            const optDiv = document.createElement('div');
            optDiv.className = 'option-item';
            optDiv.innerHTML = `
                <input type="checkbox" id="opt-${oIdx}" name="survey-q" value="${opt}" onchange="toggleCheckboxOption('${opt}')">
                <label for="opt-${oIdx}" class="option-label">
                    <span class="option-checkbox-indicator"></span>
                    <span>${opt}</span>
                </label>
            `;
            optionsContainer.appendChild(optDiv);
        });
    } else if (question.type === 'scale') {
        const scaleWrapper = document.createElement('div');
        scaleWrapper.className = 'scale-container';

        const scaleBtns = document.createElement('div');
        scaleBtns.className = 'scale-wrapper';

        for (let i = 1; i <= question.scaleMax; i++) {
            scaleBtns.innerHTML += `<button class="scale-btn" onclick="selectScaleOption(${i}, this)">${i}</button>`;
        }

        const labelsDiv = document.createElement('div');
        labelsDiv.className = 'scale-labels';
        labelsDiv.innerHTML = `
            <span>${question.minLabel}</span>
            <span>${question.maxLabel}</span>
        `;

        scaleWrapper.appendChild(scaleBtns);
        scaleWrapper.appendChild(labelsDiv);
        optionsContainer.appendChild(scaleWrapper);
    } else if (question.type === 'text') {
        const ta = document.createElement('textarea');
        ta.className = 'text-answer-input';
        ta.placeholder = 'Escribe tu respuesta aquí...';
        ta.oninput = (e) => {
            state.answers[index] = e.target.value;
            validateQuestionNextButton();
        };
        optionsContainer.appendChild(ta);
    }

    qCard.appendChild(optionsContainer);
    body.appendChild(qCard);

    // Initial check for next button availability
    validateQuestionNextButton();
}

function selectRadioOption(value) {
    state.answers[state.activeSurveyIndex] = value;
    validateQuestionNextButton();
}

function toggleCheckboxOption(value) {
    const idx = state.activeSurveyIndex;
    if (!state.answers[idx]) {
        state.answers[idx] = [];
    }
    
    const index = state.answers[idx].indexOf(value);
    if (index > -1) {
        state.answers[idx].splice(index, 1);
    } else {
        state.answers[idx].push(value);
    }

    if (state.answers[idx].length === 0) {
        delete state.answers[idx];
    }
    validateQuestionNextButton();
}

function selectScaleOption(value, btnElement) {
    state.answers[state.activeSurveyIndex] = value;
    
    // Deactivate all buttons
    document.querySelectorAll('.scale-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    // Activate clicked button
    btnElement.classList.add('active');
    validateQuestionNextButton();
}

function validateQuestionNextButton() {
    const nextBtn = document.getElementById('survey-next-btn');
    const hasAnswer = state.answers[state.activeSurveyIndex] !== undefined && state.answers[state.activeSurveyIndex] !== "";
    nextBtn.disabled = !hasAnswer;
}

function nextSurveyQuestion() {
    const survey = state.activeSurvey;
    
    if (state.activeSurveyIndex < survey.questions.length - 1) {
        state.activeSurveyIndex++;
        renderActiveQuestion();
    } else {
        // Survey fully answered!
        completeActiveSurvey();
    }
}

function completeActiveSurvey() {
    const survey = state.activeSurvey;
    
    // Update survey status
    survey.status = 'Completada';
    state.user.completedSurveysCount++;

    // Add points
    updateUserPoints(survey.points, `Encuesta: ${survey.title}`, "puntos");

    // Display completed screen
    document.getElementById('completed-survey-reward').innerText = `+${survey.points} puntos`;
    navigateTo('survey-completed');
    state.activeSurvey = null;
}

// 7. SISTEMA DE NIVELES VIEW
function renderLevelsScreen() {
    const list = document.getElementById('levels-list-container');
    list.innerHTML = '';

    const userLevel = getUserLevelInfo(state.user.points).level;

    state.levels.forEach(lvl => {
        const isActive = lvl.level === userLevel;
        const row = document.createElement('div');
        row.className = `level-row ${isActive ? 'active-level' : ''}`;
        row.innerHTML = `
            <div class="level-row-left">
                <span class="level-number-badge">${lvl.level}</span>
                <span class="level-row-name">${lvl.name}</span>
            </div>
            <span class="level-row-points">${lvl.minPts.toLocaleString()} pts</span>
        `;
        list.appendChild(row);
    });
}

// 8. PAGINA DE PREMIOS (REWARDS)
let currentRewardFilter = 'todos';
function renderRewards() {
    document.getElementById('rewards-current-balance').innerText = `${state.user.points.toLocaleString()} puntos`;

    const grid = document.getElementById('rewards-catalog-grid');
    grid.innerHTML = '';

    const filtered = state.rewards.filter(rew => {
        if (currentRewardFilter === 'todos') return true;
        return rew.category === currentRewardFilter;
    });

    filtered.forEach(rew => {
        // Set icon paths for each reward type
        let svgPath = '';
        if (rew.icon === 'amazon') {
            svgPath = '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.36 12.3c-.3.42-.72.78-1.26 1.08-.54.3-1.2.45-1.98.45-1.02 0-1.74-.24-2.16-.72-.42-.48-.63-1.14-.63-1.98 0-.96.27-1.68.81-2.16.54-.48 1.44-.72 2.7-.72h1.02v-.42c0-.66-.12-1.11-.36-1.35-.24-.24-.69-.36-1.35-.36-.6 0-1.05.15-1.35.45-.3.3-.48.75-.54 1.35H8.79c.06-.96.39-1.68.99-2.16.6-.48 1.5-.72 2.7-.72 1.26 0 2.13.27 2.61.81.48.54.72 1.35.72 2.43v3.15c0 .72.09 1.23.27 1.53h-1.5c-.09-.27-.15-.72-.18-1.35zm-1.02-2.16v-.66h-.84c-.66 0-1.11.12-1.35.36-.24.24-.36.63-.36 1.17 0 .54.09.9.27 1.08.18.18.51.27.99.27.54 0 .93-.12 1.17-.36.24-.24.36-.66.36-1.26zm2.46 4.74c-1.5 1.05-3.36 1.62-5.46 1.62-1.89 0-3.6-.45-5.13-1.35.45.18.96.27 1.53.27 1.8 0 3.39-.78 4.56-2.04.18.15.39.24.63.24.3 0 .57-.12.78-.33l.99.99c.39-.36.78-.81 1.17-1.32.18.39.54.69.99.69.36 0 .66-.18.84-.45l.99.99c.39-.42.72-.93.99-1.5.03.27.15.51.33.69l1.17 1.17z"/>';
        } else if (rew.icon === 'paypal') {
            svgPath = '<path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8 12.5c-2.48 0-4.5-2.02-4.5-4.5S9.52 7.5 12 7.5s4.5 2.02 4.5 4.5-2.02 4.5-4.5 4.5zM12 9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>';
        } else if (rew.icon === 'mercadolibre') {
            svgPath = '<path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>';
        } else if (rew.icon === 'banco') {
            svgPath = '<path d="M4 10h3v7H4zm6.5 0h3v7h-3zM2 19h20v3H2zm15-9h3v7h-3zm-5-9L2 6v2h20V6L12 1z"/>';
        } else {
            svgPath = '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15.5h-2v-2h2v2zm0-4.5h-2V7h2v6z"/>';
        }

        const card = document.createElement('div');
        card.className = 'reward-card';
        card.innerHTML = `
            <div class="reward-card-left">
                <div class="reward-icon-box" style="color: ${state.user.points >= rew.points ? 'var(--accent-color)' : 'var(--text-muted)'}">
                    <svg viewBox="0 0 24 24">${svgPath}</svg>
                </div>
                <div class="reward-info">
                    <h4>${rew.name}</h4>
                    <span class="reward-cost">${rew.points.toLocaleString()} puntos</span>
                </div>
            </div>
            <div>
                <button class="btn-sm" 
                    ${state.user.points >= rew.points ? '' : 'disabled style="background-color: var(--border-color); color: var(--text-muted); cursor: not-allowed;"'} 
                    onclick="openRedeemPopup('${rew.id}')">Canjear</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

function filterRewards(category, element) {
    currentRewardFilter = category;
    document.querySelectorAll('#premios .tab-pill').forEach(pill => {
        pill.classList.remove('active');
    });
    element.classList.add('active');
    renderRewards();
}

function openRedeemPopup(rewardId) {
    const reward = state.rewards.find(r => r.id === rewardId);
    if (!reward || state.user.points < reward.points) return;

    state.pendingRedeemReward = reward;

    document.getElementById('redeem-popup-title').innerText = 'Confirmar Canje';
    document.getElementById('redeem-popup-desc').innerText = `¿Estás seguro de que deseas canjear ${reward.name} por ${reward.points.toLocaleString()} puntos?`;
    document.getElementById('redeem-confirm-btn').style.display = 'block';
    
    document.getElementById('redeem-popup').classList.add('active');
}

function closeRedeemPopup() {
    document.getElementById('redeem-popup').classList.remove('active');
    state.pendingRedeemReward = null;
}

function confirmRedeemReward() {
    const reward = state.pendingRedeemReward;
    if (!reward || state.user.points < reward.points) return;

    // Deduct points
    updateUserPoints(-reward.points, `Canje: ${reward.name}`, "premios");
    state.user.rewardsCount++;

    // Generate virtual claim voucher code
    const voucherCode = `ZULIA-${Math.floor(100000 + Math.random() * 900000)}`;

    // Add to notifications
    state.notifications.unshift({
        id: Date.now(),
        title: "Premio canjeado con éxito",
        text: `Canjeaste ${reward.name}. Código de reclamo: ${voucherCode}`,
        time: "Justo ahora",
        unread: true
    });

    // Update popup display to show success state
    document.getElementById('redeem-popup-title').innerText = '¡Canje Exitoso!';
    document.getElementById('redeem-popup-desc').innerHTML = `
        <div style="font-size: 0.82rem; margin-bottom: 12px;">Has canjeado con éxito <strong>${reward.name}</strong>.</div>
        <div style="background-color: var(--bg-secondary); border: 2px dashed var(--accent-color); padding: 10px; border-radius: var(--border-radius-sm); font-size: 1.1rem; font-weight: 700; color: var(--accent-color); letter-spacing: 1px; margin-bottom: 10px;">${voucherCode}</div>
        <p style="font-size: 0.75rem; color: var(--text-secondary);">El código fue enviado a tu correo registrado (${state.user.email}).</p>
    `;
    
    // Hide confirm button
    document.getElementById('redeem-confirm-btn').style.display = 'none';

    showToast("🎁 ¡Canje realizado con éxito!", "success");
    renderRewards();
}

// 9. PAGINA DE RANKING
let currentRankingFilter = 'semanal';
function renderRanking() {
    const podiumContainer = document.getElementById('ranking-podium-container');
    const listContainer = document.getElementById('ranking-list-container');
    const myPosContainer = document.getElementById('ranking-my-position');

    const data = state.leaderboard[currentRankingFilter];

    // Render top 3 in Podium format
    const top3 = data.slice(0, 3);
    
    // Check order for visual appeal (2nd left, 1st center, 3rd right)
    const second = top3[1] || { name: '-', points: 0, avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100' };
    const first = top3[0] || { name: '-', points: 0, avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100' };
    const third = top3[2] || { name: '-', points: 0, avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100' };

    podiumContainer.innerHTML = `
        <!-- Second Place -->
        <div class="podium-item second">
            <div class="podium-avatar-wrapper">
                <img class="podium-avatar" src="${second.avatar}" alt="2nd">
                <span class="podium-rank-badge">2</span>
            </div>
            <div class="podium-name">${second.name}</div>
            <div class="podium-pts">${second.points.toLocaleString()} pts</div>
            <div class="podium-pillar"></div>
        </div>
        <!-- First Place -->
        <div class="podium-item first">
            <div class="podium-avatar-wrapper">
                <svg class="podium-crown" viewBox="0 0 24 24"><path d="M5 16h14v2H5zm14-8l-3.5 3.5L12 6l-3.5 5.5L5 8l1.5 6h11z"/></svg>
                <img class="podium-avatar" src="${first.avatar}" alt="1st">
                <span class="podium-rank-badge">1</span>
            </div>
            <div class="podium-name">${first.name}</div>
            <div class="podium-pts">${first.points.toLocaleString()} pts</div>
            <div class="podium-pillar"></div>
        </div>
        <!-- Third Place -->
        <div class="podium-item third">
            <div class="podium-avatar-wrapper">
                <img class="podium-avatar" src="${third.avatar}" alt="3rd">
                <span class="podium-rank-badge">3</span>
            </div>
            <div class="podium-name">${third.name}</div>
            <div class="podium-pts">${third.points.toLocaleString()} pts</div>
            <div class="podium-pillar"></div>
        </div>
    `;

    // Render other players list
    listContainer.innerHTML = '';
    const otherPlayers = data.slice(3);
    
    otherPlayers.forEach(player => {
        const item = document.createElement('div');
        item.className = 'rank-list-item';
        item.innerHTML = `
            <div class="rank-item-left">
                <span class="rank-number">${player.rank}</span>
                <img class="rank-avatar" src="${player.avatar}" alt="${player.name}">
                <span class="rank-name">${player.name}</span>
            </div>
            <span class="rank-points">${player.points.toLocaleString()} pts</span>
        `;
        listContainer.appendChild(item);
    });

    // Render my position sticky element
    const myPoints = currentRankingFilter === 'semanal' 
        ? state.user.points 
        : (currentRankingFilter === 'mensual' ? 28400 : state.user.points * 3.5); // Simulated relative scale
    
    const myRank = currentRankingFilter === 'semanal' ? state.user.rankingPos : 5;

    myPosContainer.innerHTML = `
        <div class="rank-item-left">
            <span class="rank-number">#${myRank}</span>
            <img class="rank-avatar" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100" alt="Me">
            <span class="rank-name">${state.user.name} (Tú)</span>
        </div>
        <span class="rank-points">${Math.round(myPoints).toLocaleString()} pts</span>
    `;
}

function filterRanking(filter, element) {
    currentRankingFilter = filter;
    document.querySelectorAll('#ranking .tab-pill').forEach(pill => {
        pill.classList.remove('active');
    });
    element.classList.add('active');
    renderRanking();
}

// 10. SISTEMA DE REFERIDOS
function copyReferralCode() {
    const code = document.getElementById('referral-code').innerText;
    navigator.clipboard.writeText(code).then(() => {
        showToast("📋 ¡Código copiado al portapapeles!", "success");
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

// 11. HISTORIAL
let currentHistoryFilter = 'todos';
function renderHistory() {
    const list = document.getElementById('history-list-container');
    list.innerHTML = '';

    const filtered = state.history.filter(item => {
        if (currentHistoryFilter === 'todos') return true;
        return item.type === currentHistoryFilter;
    });

    if (filtered.length === 0) {
        list.innerHTML = '<div style="text-align: center; color: var(--text-muted); font-size: 0.82rem; padding: 40px 0;">No hay transacciones registradas.</div>';
        return;
    }

    filtered.forEach(item => {
        let svgPath = '';
        if (item.type === 'puntos') {
            svgPath = '<path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>';
        } else if (item.type === 'premios') {
            svgPath = '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.75z"/>';
        } else if (item.type === 'bonos') {
            svgPath = '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm0-4h-2V7h2v6z"/>';
        }

        const div = document.createElement('div');
        div.className = `history-item ${item.isPositive ? 'positive' : 'negative'}`;
        div.innerHTML = `
            <div class="history-item-left">
                <div class="history-icon-wrapper">
                    <svg viewBox="0 0 24 24">${svgPath}</svg>
                </div>
                <div class="history-item-details">
                    <h5>${item.label}</h5>
                    <p>${item.date}</p>
                </div>
            </div>
            <span class="history-value">${item.value}</span>
        `;
        list.appendChild(div);
    });
}

function filterHistory(filter, element) {
    currentHistoryFilter = filter;
    document.querySelectorAll('#historial .tab-pill').forEach(pill => {
        pill.classList.remove('active');
    });
    element.classList.add('active');
    renderHistory();
}

// 12. NOTIFICACIONES VIEW
function renderNotifications() {
    const list = document.getElementById('notifications-list-container');
    list.innerHTML = '';

    if (state.notifications.length === 0) {
        list.innerHTML = '<div style="text-align: center; color: var(--text-muted); font-size: 0.82rem; padding: 40px 0;">No tienes notificaciones.</div>';
        return;
    }

    state.notifications.forEach(notif => {
        const item = document.createElement('div');
        item.className = `notification-item ${notif.unread ? 'unread' : ''}`;
        
        // Custom icon selection
        let iconSvg = '<path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>';
        if (notif.title.includes('nivel')) {
            iconSvg = '<path d="M12 2L1 21h22L12 2zm0 4l7.53 13H4.47L12 6z"/>';
        } else if (notif.title.includes('Premio') || notif.title.includes('canjeado')) {
            iconSvg = '<path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.67C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 14H4V8h16v10z"/>';
        }

        item.innerHTML = `
            <div class="notification-icon-box">
                <svg viewBox="0 0 24 24">${iconSvg}</svg>
            </div>
            <div class="notification-content">
                <h5>${notif.title}</h5>
                <p>${notif.text}</p>
                <span class="notification-time">${notif.time}</span>
            </div>
        `;
        list.appendChild(item);
        
        // Mark as read after render
        notif.unread = false;
    });

    // Reset notification badge counter next render
    renderHeaderStats();
}

function clearAllNotifications() {
    state.notifications = [];
    renderNotifications();
    showToast("🧹 Notificaciones eliminadas", "success");
}

// 13. BONO DIARIO
function renderDailyBonus() {
    const grid = document.getElementById('daily-bonus-grid');
    grid.innerHTML = '';

    const rewardsMap = [10, 20, 30, 50, 100, 150, 200];
    const todayIndex = state.user.dailyStreak; // Index of current day to claim (0-indexed represents day 1)

    for (let d = 0; d < 7; d++) {
        const isClaimed = d < todayIndex;
        const isCurrent = d === todayIndex && !state.user.dailyBonusClaimedToday;
        
        const card = document.createElement('div');
        card.className = `bonus-day-card ${isClaimed ? 'claimed' : ''} ${isCurrent ? 'current' : ''} ${d === 6 ? 'day-7' : ''}`;
        
        let icon = '🪙';
        if (d === 6) icon = '🎁';

        card.innerHTML = `
            <span class="bonus-day-title">Día ${d + 1}</span>
            <span class="bonus-day-icon">${icon}</span>
            <span class="bonus-day-points">+${rewardsMap[d]}</span>
        `;
        grid.appendChild(card);
    }

    const claimBtn = document.getElementById('claim-bonus-btn');
    if (state.user.dailyBonusClaimedToday) {
        claimBtn.disabled = true;
        claimBtn.innerText = 'Bono de hoy reclamado';
    } else {
        claimBtn.disabled = false;
        claimBtn.innerText = 'Reclamar bono';
    }
}

function claimDailyBonus() {
    if (state.user.dailyBonusClaimedToday) return;

    const rewardsMap = [10, 20, 30, 50, 100, 150, 200];
    const todayIndex = state.user.dailyStreak;
    const bonusVal = rewardsMap[todayIndex];

    // Award Points
    updateUserPoints(bonusVal, `Bono Asistencia Día ${todayIndex + 1}`, "bonos");

    // Advance Streak
    state.user.dailyStreak = (state.user.dailyStreak + 1) % 7;
    state.user.dailyBonusClaimedToday = true;

    // Refresh UI
    renderDailyBonus();
    showToast(`🪙 ¡Reclamaste +${bonusVal} puntos de asistencia!`, "success");
}

// 14. CENTRO DE AYUDA FAQ TOGGLERS
function toggleFaq(element) {
    const isActive = element.classList.contains('active');
    
    // Close all other elements
    document.querySelectorAll('.help-item').forEach(item => {
        item.classList.remove('active');
    });

    if (!isActive) {
        element.classList.add('active');
    }
}

/* ==========================================================================
   INITIALIZATION AND FORM ACTIONS
   ========================================================================== */

// Handle Auth Transitions
function handleLogin(e) {
    e.preventDefault();
    // Simple mock authentication success
    showToast("🔑 Sesión iniciada como Juan Pérez", "success");
    navigateTo('dashboard');
}

function handleRegister(e) {
    e.preventDefault();
    // Simulate navigation to OTP SMS/Email screen
    navigateTo('verification');
}

function handleVerification(e) {
    e.preventDefault();
    showToast("✅ Cuenta verificada con éxito", "success");
    navigateTo('dashboard');
}

function logout() {
    state.user.points = 0;
    state.user.hasSpunWheel = false;
    state.history = [];
    showToast("🚪 Sesión cerrada y puntos reiniciados", "info");
    navigateTo('login');
}

// Setup Event Listeners and Initial Load
window.addEventListener('DOMContentLoaded', () => {
    // Check if we should skip splash screen
    const skipSplash = window.location.hash === '#login';
    
    if (skipSplash) {
        navigateTo('login');
    } else {
        // Navigate initially to splash screen
        navigateTo('splash');
        
        // Transition from splash to secuencia.html after 4000ms
        setTimeout(() => {
            const splashScreen = document.getElementById('splash');
            if (splashScreen) {
                splashScreen.style.opacity = '0';
                splashScreen.style.transform = 'scale(0.95)';
                splashScreen.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            }
            
            setTimeout(() => {
                window.location.href = 'secuencia.html';
            }, 600);
        }, 4000);
    }

    // Intercept submit actions
    const loginForm = document.getElementById('login-form');
    if (loginForm) loginForm.addEventListener('submit', handleLogin);

    const registerForm = document.getElementById('register-form');
    if (registerForm) registerForm.addEventListener('submit', handleRegister);

    const verificationForm = document.getElementById('verification-form');
    if (verificationForm) verificationForm.addEventListener('submit', handleVerification);

    // Auto-advance OTP verification input focuses
    const pinInputs = document.querySelectorAll('.pin-field');
    pinInputs.forEach((input, index) => {
        input.addEventListener('input', (e) => {
            if (e.target.value.length === 1 && index < pinInputs.length - 1) {
                pinInputs[index + 1].focus();
            }
        });
        
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && e.target.value.length === 0 && index > 0) {
                pinInputs[index - 1].focus();
            }
        });
    });
});
