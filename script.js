$(document).ready(function() {
    // mobil taoggle
    $('.menu-toggle').click(function() {
        $(this).toggleClass('active');
        $('.main-nav').toggleClass('active');
        
        // Toggle body scroll ked j emanu otvorene
        if ($('.main-nav').hasClass('active')) {
            $('body').css('overflow', 'hidden');
        } else {
            $('body').css('overflow', 'auto');
        }
    });
    
    // zatvaranie menu ked sa klikne na link na mobile
    $('.main-nav a').click(function() {
        if ($(window).width() <= 768) {
            $('.menu-toggle').removeClass('active');
            $('.main-nav').removeClass('active');
            $('body').css('overflow', 'auto');
        }
    });
    
    // window resize
    $(window).resize(function() {
        if ($(window).width() > 768) {
            $('.menu-toggle').removeClass('active');
            $('.main-nav').removeClass('active');
            $('body').css('overflow', 'auto');
        }
    });
    
    // slider
    const slider = {
        slides: $('.slide'),
        currentIndex: 0,
        interval: null,
        
        init: function() {
            this.createDots();
            this.showSlide(this.currentIndex);
            this.startAutoSlide();
            this.setupControls();
        },
        
        showSlide: function(index) {
            this.slides.removeClass('active');
            $(this.slides[index]).addClass('active');
            $('.dot').removeClass('active');
            $($('.dot')[index]).addClass('active');
            $('.slider-container').css('transform', `translateX(-${index * 100}%)`);
            this.currentIndex = index;
        },
        
        nextSlide: function() {
            let newIndex = (this.currentIndex + 1) % this.slides.length;
            this.showSlide(newIndex);
        },
        
        prevSlide: function() {
            let newIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
            this.showSlide(newIndex);
        },
        
        createDots: function() {
            const dotsContainer = $('.slider-dots');
            this.slides.each(function(index) {
                dotsContainer.append('<div class="dot"></div>');
            });
            
            $('.dot').click((e) => {
                const dotIndex = $('.dot').index(e.target);
                this.showSlide(dotIndex);
                this.resetAutoSlide();
            });
        },
        
        startAutoSlide: function() {
            this.interval = setInterval(() => {
                this.nextSlide();
            }, 5000);
        },
        
        resetAutoSlide: function() {
            clearInterval(this.interval);
            this.startAutoSlide();
        },
        
        setupControls: function() {
            $('.next').click(() => {
                this.nextSlide();
                this.resetAutoSlide();
            });
            
            $('.prev').click(() => {
                this.prevSlide();
                this.resetAutoSlide();
            });
        }
    };
    
    slider.init();
    
    // Smooth scrollovanie
    $('a[href*="#"]').on('click', function(e) {
        e.preventDefault();
        
        $('html, body').animate(
            {
                scrollTop: $($(this).attr('href')).offset().top - 100,
            },
            500,
            'linear'
        );
    });
    
    // Newsletter formular ig
    $('.newsletter form').submit(function(e) {
        e.preventDefault();
        const email = $(this).find('input[type="email"]').val();
        
        // Simple validation
        if (email && email.includes('@')) {
            // Here you would typically send the data to a server
            $(this).html('<p class="success-message">Ďakujeme za prihlásenie!</p>');
        } else {
            $(this).find('input[type="email"]').css('border-color', 'red');
            setTimeout(() => {
                $(this).find('input[type="email"]').css('border-color', '#ddd');
            }, 2000);
        }
    });
    
    // animacie elementov
    const animateOnScroll = function() {
        const elements = $('.feature-item, .slide-caption, .sidebar li');
        
        elements.each(function() {
            const elementPosition = $(this).offset().top;
            const scrollPosition = $(window).scrollTop() + $(window).height();
            
            if (elementPosition < scrollPosition - 50 && !$(this).hasClass('animated')) {
                $(this).addClass('animated');
            }
        });
    };
    
    $(window).scroll(animateOnScroll);
    animateOnScroll(); // Run once on page load
});
