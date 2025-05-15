/**
 * Handles scroll-based reveal animations for sections and elements
 */
export const initScrollAnimations = () => {
  // Function to handle elements visibility based on scroll position
  const handleScrollAnimations = () => {
    const revealElements = document.querySelectorAll('.reveal');
    
    revealElements.forEach((element) => {
      const revealPosition = element.getBoundingClientRect().top;
      const screenHeight = window.innerHeight;
      
      // Reveal when element is 150px from entering the screen
      if (revealPosition < screenHeight - 150) {
        element.classList.add('reveal-visible');
      } else {
        element.classList.remove('reveal-visible');
      }
    });
  };
  
  // Add scroll event listener
  window.addEventListener('scroll', handleScrollAnimations);
  
  // Initial check on page load
  handleScrollAnimations();
  
  return () => {
    window.removeEventListener('scroll', handleScrollAnimations);
  };
};

/**
 * Adds a typing animation to a text element
 */
export const typeText = (element, text, speed= 100) => {
  let index = 0;
  element.textContent = '';
  
  const typeNextChar = () => {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      index++;
      setTimeout(typeNextChar, speed);
    }
  };
  
  typeNextChar();
};

/**
 * Adds hover effects to project cards
 */
export const initProjectCardEffects = () => {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      card.classList.add('hover-card');
    });
    
    card.addEventListener('mouseleave', () => {
      card.classList.remove('hover-card');
    });
  });
};

/**
 * Initialize all animations
 */
export const initAnimations = () => {
  document.addEventListener('DOMContentLoaded', () => {
    const cleanupScroll = initScrollAnimations();
    initProjectCardEffects();
    
    // Add reveal class to all section headings and main content blocks
    document.querySelectorAll('.section-heading').forEach((heading) => {
      heading.classList.add('reveal');
    });
    
    document.querySelectorAll('section > div > div').forEach((content) => {
      if (!content.classList.contains('reveal')) {
        content.classList.add('reveal');
      }
    });
    
    return () => {
      cleanupScroll();
    };
  });
};