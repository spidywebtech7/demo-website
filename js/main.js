document.addEventListener('DOMContentLoaded', () => {


    // ==========================================
    // Hero Banner Slider
    // ==========================================
    const heroSlides = document.querySelectorAll('.hero-slide');
    const heroDots = document.querySelectorAll('.hero-dots .dot');
    const heroNextBtn = document.querySelector('.next-btn-hero');
    const heroPrevBtn = document.querySelector('.prev-btn-hero');
    
    if (heroSlides.length > 0) {
        let currentHeroIndex = 0;
        let heroInterval;

        const goToHeroSlide = (index) => {
            heroSlides[currentHeroIndex].classList.remove('active');
            heroDots[currentHeroIndex].classList.remove('active');
            
            currentHeroIndex = index;
            
            heroSlides[currentHeroIndex].classList.add('active');
            heroDots[currentHeroIndex].classList.add('active');
        };

        const nextHeroSlide = () => {
            let index = (currentHeroIndex + 1) % heroSlides.length;
            goToHeroSlide(index);
        };

        const prevHeroSlide = () => {
            let index = (currentHeroIndex - 1 + heroSlides.length) % heroSlides.length;
            goToHeroSlide(index);
        };

        const resetHeroInterval = () => {
            clearInterval(heroInterval);
            heroInterval = setInterval(nextHeroSlide, 3000); // Changed to 3 seconds as requested
        };

        // Event Listeners
        heroNextBtn.addEventListener('click', () => {
            nextHeroSlide();
            resetHeroInterval();
        });

        heroPrevBtn.addEventListener('click', () => {
            prevHeroSlide();
            resetHeroInterval();
        });

        heroDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToHeroSlide(index);
                resetHeroInterval();
            });
        });

        // Initialize autoplay
        resetHeroInterval();
    }

    // ==========================================
    // Reels Carousel Logic
    // ==========================================
    const reelCards = document.querySelectorAll('.reel-card');
    const prevReelBtn = document.querySelector('.prev-reel');
    const nextReelBtn = document.querySelector('.next-reel');

    if (reelCards.length > 0) {
        // Initial state mapped to elements
        let states = ['prev-2', 'prev-1', 'active', 'next-1', 'next-2', 'hidden', 'hidden'];
        
        const updateCards = () => {
            reelCards.forEach((card, index) => {
                // Remove all possible state classes
                card.classList.remove('prev-2', 'prev-1', 'active', 'next-1', 'next-2', 'hidden');
                // Add the current state class
                card.classList.add(states[index]);
            });
        };

        const muteInactiveVideos = () => {
            reelCards.forEach(card => {
                if (!card.classList.contains('active')) {
                    const video = card.querySelector('video');
                    const muteBtnIcon = card.querySelector('.mute-btn i');
                    if (video) video.muted = true;
                    if (muteBtnIcon) muteBtnIcon.className = 'fa-solid fa-volume-xmark';
                }
            });
        };

        if (nextReelBtn && prevReelBtn) {
            nextReelBtn.addEventListener('click', () => {
                const last = states.pop();
                states.unshift(last);
                updateCards();
                muteInactiveVideos();
            });

            prevReelBtn.addEventListener('click', () => {
                const first = states.shift();
                states.push(first);
                updateCards();
                muteInactiveVideos();
            });
        }

        // Mute/Unmute Logic
        const toggleMute = (card, e) => {
            if (card.classList.contains('active')) {
                const video = card.querySelector('video');
                const muteBtnIcon = card.querySelector('.mute-btn i');
                
                if (video) {
                    video.muted = !video.muted;
                    
                    // Ensure video plays on mobile when clicked
                    video.play().catch(err => console.log("Play prevented:", err));
                    
                    if (muteBtnIcon) {
                        muteBtnIcon.className = video.muted ? 'fa-solid fa-volume-xmark' : 'fa-solid fa-volume-high';
                    }
                }
            }
        };

        reelCards.forEach(card => {
            card.addEventListener('click', (e) => {
                toggleMute(card, e);
            });
            // Handle touchstart directly for iOS
            card.addEventListener('touchstart', (e) => {
                toggleMute(card, e);
            }, { passive: true });
        });
    }
});


// Inquiry Form to WhatsApp Logic
document.addEventListener('DOMContentLoaded', () => {
    const inquiryForm = document.getElementById('inquiryForm');
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;
            
            const whatsappNumber = "919825640246";
            
            let whatsappText = `Hello MAHARAJA GOLD BUYER,\n\nI have an inquiry:\n`;
            whatsappText += `*Name:* ${name}\n`;
            whatsappText += `*Email:* ${email}\n`;
            if (phone) {
                whatsappText += `*Phone:* ${phone}\n`;
            }
            whatsappText += `*Message:* ${message}`;
            
            const encodedText = encodeURIComponent(whatsappText);
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedText}`;
            
            // Open WhatsApp in a new tab
            window.open(whatsappUrl, '_blank');
            
            // Optional: reset form after sending
            inquiryForm.reset();
        });
    }
});
