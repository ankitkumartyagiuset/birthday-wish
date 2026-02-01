/* =========================================
   JAVASCRIPT LOGIC
   ========================================= */

const audio = document.getElementById('bg-music');
let galleryStep = 0;

// 1. APP START FUNCTION
function startApp() {
    // Overlay hatao
    document.getElementById('start-overlay').style.display = 'none';
    
    // Music Play karo
    audio.volume = 0.6;
    audio.play().catch(error => {
        console.log("Music autoplay blocked:", error);
    });

    // Pehla page dikhao
    goToPage('page-1');

    // Background animations start karo
    startFloatingItems();
}

// 2. NAVIGATION FUNCTION
function goToPage(pageId) {
    // Sab pages pehle se hide karo
    const pages = document.querySelectorAll('.page-section');
    pages.forEach(page => {
        page.classList.remove('active');
    });

    // Jo page chahiye usko 'active' class do
    const activePage = document.getElementById(pageId);
    if(activePage) {
        activePage.classList.add('active');
    }

    // Agar Page 2 hai, toh typing start karo
    if (pageId === 'page-2') {
        typeWriter();
    }
}

// 3. TYPING EFFECT
const messageText = "Bhaiya,\n\nAaj tumhara special din hai. Mujhe Asha h ki aapka Yah sal bahut axha ho . Bas Apki Sadi kab hogi usi ka intezar h. \n\nMay God bless you with endless happiness and success. Happy Birthday! ❤️";

function typeWriter() {
    const el = document.getElementById('typing-content');
    const btn = document.getElementById('btn-page-2');
    
    el.innerHTML = ""; // Clear karo pehle
    let i = 0;
    
    // Button pehle se hidden hai (CSS class: hidden-btn), zaroorat nahi chupane ki
    
    function type() {
        if (i < messageText.length) {
            // New line handle karo
            if (messageText.charAt(i) === '\n') {
                el.innerHTML += '<br>';
            } else {
                el.innerHTML += messageText.charAt(i);
            }
            i++;
            setTimeout(type, 60); // Speed
        } else {
            // Typing khatam, button dikhao (hidden-btn class hata do)
            btn.classList.remove('hidden-btn');
        }
    }
    type();
}

// 4. GALLERY LOGIC
function nextGalleryItem() {
    galleryStep++;

    if (galleryStep === 1) {
        document.getElementById('photo-1').classList.add('show');
    } 
    else if (galleryStep === 2) {
        document.getElementById('photo-1').classList.remove('show');
        document.getElementById('photo-2').classList.add('show');
    } 
    else if (galleryStep === 3) {
        document.getElementById('photo-2').classList.remove('show');
        document.getElementById('photo-3').classList.add('show');
        document.getElementById('btn-gallery').innerText = "Final Wish 🎁";
    } 
    else if (galleryStep === 4) {
        // Sab chhao, final msg dikhao
        document.getElementById('photo-3').classList.remove('show');
        document.getElementById('btn-gallery').style.display = 'none';
        document.getElementById('final-message').style.display = 'block';
        launchConfetti(); // Confetti burst
    }
}

// 5. BACKGROUND FLOATING ANIMATIONS
function startFloatingItems() {
    const box = document.getElementById('anim-box');
    const items = ['🎈', '❤️', '🎉', '🎂', '✨'];
    
    setInterval(() => {
        const div = document.createElement('div');
        div.classList.add('floater');
        div.innerText = items[Math.floor(Math.random() * items.length)];
        div.style.left = Math.random() * 100 + "vw";
        div.style.animationDuration = (Math.random() * 5 + 5) + "s"; // 5-10 sec
        
        box.appendChild(div);

        // 10 sec baad remove kar do taaki heavy na ho
        setTimeout(() => { div.remove(); }, 10000);
    }, 800);
}

// 6. FINAL CONFETTI
function launchConfetti() {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff'];
    for (let i = 0; i < 100; i++) {
        const conf = document.createElement('div');
        conf.style.position = 'fixed';
        conf.style.width = '10px';
        conf.style.height = '10px';
        conf.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        conf.style.left = Math.random() * 100 + 'vw';
        conf.style.top = '-10px';
        conf.style.zIndex = '1000';
        conf.style.transition = 'top 3s ease-out, transform 3s linear';
        document.body.appendChild(conf);

        setTimeout(() => {
            conf.style.top = '100vh';
            conf.style.transform = `rotate(${Math.random() * 360}deg)`;
        }, 50);

        setTimeout(() => conf.remove(), 3500);
    }
}