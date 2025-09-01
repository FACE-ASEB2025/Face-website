// Check if the loader has already run in this session
if (sessionStorage.getItem('hasLoaded')) {
    // If it has, redirect immediately to the home page
    window.location.href = 'home.html';
} else {
    // If not, run the loader and set the flag for this session
    sessionStorage.setItem('hasLoaded', 'true');

    const canvas = document.getElementById('matrix-bg');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const alphabet = katakana + latin + nums;

    const fontSize = 16;
    let columns = canvas.width / fontSize;
    const rainDrops = [];

    for (let x = 0; x < columns; x++) {
        rainDrops[x] = 1;
    }

    const drawMatrix = () => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#0ff'; // Cyan color for the rain
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < rainDrops.length; i++) {
            const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
            ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

            if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                rainDrops[i] = 0;
            }
            rainDrops[i]++;
        }
    };

    let matrixInterval = setInterval(drawMatrix, 30);


    // Loading Simulation
    const progressBarInner = document.getElementById('progress-bar-inner');
    const loadingText = document.getElementById('loading-text');
    const loader = document.getElementById('loader');
    const logoTextContainer = document.getElementById('logo-text');
    const logo = "<FACE>";

    // Animate logo
    logo.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.className = 'logo-char';
        span.style.animationDelay = `${index * 0.1}s`;
        if (char === '<' || char === '>') {
            span.style.color = '#00ffff'; // Cyan for brackets
        }
        logoTextContainer.appendChild(span);
    });


    let progress = 0;
    const messages = [
        "Compiling code...",
        "Decrypting firewall...",
        "Connecting to the mainframe...",
        "Loading modules...",
        "Finalizing...",
        "Welcome."
    ];
    let messageIndex = 0;

    const progressInterval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress > 100) progress = 100;

        progressBarInner.style.width = progress + '%';

        if (progress > (messageIndex + 1) * (100 / messages.length)) {
            if (messageIndex < messages.length) {
                loadingText.innerText = messages[messageIndex];
                messageIndex++;
            }
        }

        if (progress >= 100) {
            clearInterval(progressInterval);
            setTimeout(() => {
                loader.style.transition = 'opacity 1s ease-out';
                loader.style.opacity = '0';
                setTimeout(() => {
                    window.location.href = 'home.html';
                }, 1000);
            }, 500);
        }
    }, 200);

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        columns = canvas.width / fontSize;
        rainDrops.length = 0; // Clear the array
        for (let x = 0; x < columns; x++) {
            rainDrops[x] = 1;
        }
    });
}
