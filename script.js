document.addEventListener('DOMContentLoaded', function() {
    // Personalize with sister's details
    const sisterName = "Sis Teemerh";
    const sisterBirthday = "2002-08-05"; // YYYY-MM-DD format
    
    // Set name and age
    document.getElementById('sister-name').textContent = sisterName;
    const age = calculateAge(sisterBirthday);
    document.getElementById('sister-age').textContent = age;
    
    // Initialize countdown timer
    initializeCountdown(sisterBirthday);
    
    // Initialize memory gallery
    initializeGallery();
    
    // Initialize cake interaction
    initializeCake();
    
    // Create some confetti for celebration
    createConfetti();
});

function calculateAge(birthday) {
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    return age;
}

function initializeCountdown(birthday) {
    function updateCountdown() {
        const now = new Date();
        const currentYear = now.getFullYear();
        
        // Set next birthday (this year or next year)
        let nextBirthday = new Date(birthday);
        nextBirthday.setFullYear(currentYear);
        
        if (now > nextBirthday) {
            nextBirthday.setFullYear(currentYear + 1);
        }
        
        const diff = nextBirthday - now;
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

function initializeGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const prevBtn = document.querySelector('.gallery-nav.prev');
    const nextBtn = document.querySelector('.gallery-nav.next');
    let currentIndex = 0;
    
    function showSlide(index) {
        galleryItems.forEach(item => item.classList.remove('active'));
        galleryItems[index].classList.add('active');
    }
    
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : galleryItems.length - 1;
        showSlide(currentIndex);
    });
    
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex < galleryItems.length - 1) ? currentIndex + 1 : 0;
        showSlide(currentIndex);
    });
    
    // Auto-advance slides every 5 seconds
    setInterval(() => {
        currentIndex = (currentIndex < galleryItems.length - 1) ? currentIndex + 1 : 0;
        showSlide(currentIndex);
    }, 5000);
}

function initializeCake() {
    const candle = document.querySelector('.candle');
    const blowButton = document.getElementById('blow-button');
    let isLit = true;
    
    blowButton.addEventListener('click', () => {
        isLit = !isLit;
        candle.setAttribute('data-lit', isLit);
        blowButton.textContent = isLit ? 'Blow Out Candles' : 'Light Candles';
        
        if (!isLit) {
            createConfetti();
        }
    });
}

function createConfetti() {
    const colors = ['#e91e63', '#00bcd4', '#ffeb3b', '#4caf50', '#ff9800'];
    const container = document.querySelector('.confetti-container');
    
    // Clear previous confetti
    container.innerHTML = '';
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        
        // Fixed the backgroundColor typo here
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = `${Math.random() * 10 + 5}px`;
        confetti.style.height = `${Math.random() * 10 + 5}px`;
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.opacity = '1';
        confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear ${Math.random() * 5}s forwards`;
        
        // Add random shape
        if (Math.random() > 0.5) {
            confetti.style.borderRadius = '50%';
        }
        
        container.appendChild(confetti);
    }
    
    // Add CSS for falling animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fall {
            to {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Remove confetti after animation
    setTimeout(() => {
        container.innerHTML = '';
        document.head.removeChild(style);
    }, 8000);
        }
