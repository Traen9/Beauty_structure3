// Shopping Cart Functionality
let cart = [];
let cartTotal = 0;

// DOM Elements
const cartIcon = document.querySelector('.cart-icon');
const cartModal = document.getElementById('cart-modal');
const cartItems = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const cartCount = document.querySelector('.cart-count');
const closeCartBtn = document.querySelector('.close-cart');
const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');

// Mobile Menu
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    initializeAnimations();
    updateCartDisplay();
});

function initializeEventListeners() {
    // Cart functionality
    cartIcon.addEventListener('click', openCart);
    closeCartBtn.addEventListener('click', closeCart);
    
    // Add to cart buttons
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', addToCart);
    });
    
    // Mobile menu
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    
    // Smooth scrolling for navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', smoothScroll);
    });
    
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    contactForm.addEventListener('submit', handleFormSubmission);
    
    // Service booking buttons
    document.querySelectorAll('.service-btn').forEach(btn => {
        btn.addEventListener('click', bookService);
    });
    
    // CTA buttons
    document.querySelectorAll('.cta-btn').forEach(btn => {
        btn.addEventListener('click', handleCTAClick);
    });
    
    // Book now button
    document.querySelector('.book-btn').addEventListener('click', scrollToContact);
    
    // Checkout button
    document.querySelector('.checkout-btn').addEventListener('click', handleCheckout);
    
    // Close modal when clicking outside
    cartModal.addEventListener('click', function(e) {
        if (e.target === cartModal) {
            closeCart();
        }
    });
}

function addToCart(e) {
    const productName = e.target.getAttribute('data-product');
    const productPrice = parseFloat(e.target.getAttribute('data-price'));
    
    // Check if item already exists in cart
    const existingItem = cart.find(item => item.name === productName);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: productName,
            price: productPrice,
            quantity: 1
        });
    }
    
    updateCartDisplay();
    showAddToCartAnimation(e.target);
    
    // Show success message
    showNotification(`${productName} added to cart!`, 'success');
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
    renderCartItems();
}

function updateCartDisplay() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart total
    cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalElement.textContent = cartTotal.toFixed(2);
    
    // Show/hide cart count badge
    if (totalItems > 0) {
        cartCount.style.display = 'flex';
    } else {
        cartCount.style.display = 'none';
    }
}

function renderCartItems() {
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
        return;
    }
    
    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <div class="cart-item-price">$${item.price.toFixed(2)} x ${item.quantity}</div>
            </div>
            <button class="remove-item" onclick="removeFromCart(${index})">×</button>
        `;
        cartItems.appendChild(cartItem);
    });
}

function openCart() {
    cartModal.classList.add('active');
    renderCartItems();
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    cartModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function showAddToCartAnimation(button) {
    button.style.transform = 'scale(0.95)';
    button.style.background = '#28a745';
    button.textContent = 'Added!';
    
    setTimeout(() => {
        button.style.transform = 'scale(1)';
        button.style.background = '';
        button.textContent = 'Add to Cart';
    }, 1000);
}

function toggleMobileMenu() {
    navMenu.classList.toggle('mobile-active');
    mobileMenuToggle.classList.toggle('active');
}

function smoothScroll(e) {
    e.preventDefault();
    const targetId = e.target.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
    
    // Close mobile menu if open
    navMenu.classList.remove('mobile-active');
    mobileMenuToggle.classList.remove('active');
}

function handleFormSubmission(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(e.target);
    const name = formData.get('name') || e.target.querySelector('input[placeholder="Full Name"]').value;
    const email = formData.get('email') || e.target.querySelector('input[placeholder="Email Address"]').value;
    const phone = formData.get('phone') || e.target.querySelector('input[placeholder="Phone Number"]').value;
    const service = formData.get('service') || e.target.querySelector('select').value;
    
    // Simple validation
    if (!name || !email || !phone || !service) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    // Simulate form submission
    const submitBtn = e.target.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Booking...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        showNotification('Consultation booked successfully! We\'ll contact you soon.', 'success');
        e.target.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

function bookService(e) {
    const serviceCard = e.target.closest('.service-card');
    const serviceName = serviceCard.querySelector('h3').textContent;
    
    showNotification(`Redirecting to book ${serviceName}...`, 'info');
    
    setTimeout(() => {
        document.querySelector('#contact').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }, 1000);
}

function handleCTAClick(e) {
    const buttonText = e.target.textContent;
    
    if (buttonText.includes('Spa')) {
        document.querySelector('#services').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    } else if (buttonText.includes('Supplements')) {
        document.querySelector('#supplements').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function scrollToContact() {
    document.querySelector('#contact').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

function handleCheckout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty', 'error');
        return;
    }
    
    showNotification('Redirecting to secure checkout...', 'info');
    
    setTimeout(() => {
        showNotification(`Order total: $${cartTotal.toFixed(2)} - Thank you for your purchase!`, 'success');
        cart = [];
        updateCartDisplay();
        closeCart();
    }, 2000);
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 3000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Add animation classes and observe elements
    const animateElements = document.querySelectorAll('.service-card, .supplement-card, .testimonial-card, .about-text, .about-image, .contact-info, .contact-form-container');
    
    animateElements.forEach((el, index) => {
        if (index % 2 === 0) {
            el.classList.add('fade-in');
        } else {
            el.classList.add('slide-in-left');
        }
        observer.observe(el);
    });
    
    // Header scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// Additional CSS for mobile menu and notifications
const additionalStyles = `
.nav-menu.mobile-active {
    display: flex;
    position: fixed;
    top: 80px;
    left: 0;
    width: 100%;
    background: white;
    flex-direction: column;
    padding: 2rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    z-index: 999;
}

.mobile-menu-toggle.active span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
}

.mobile-menu-toggle.active span:nth-child(2) {
    opacity: 0;
}

.mobile-menu-toggle.active span:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -6px);
}

@media (max-width: 768px) {
    .notification {
        right: 10px !important;
        left: 10px !important;
        max-width: none !important;
    }
}
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Initialize cart from localStorage if available
function loadCartFromStorage() {
    const savedCart = localStorage.getItem('spaCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartDisplay();
    }
}

// Save cart to localStorage
function saveCartToStorage() {
    localStorage.setItem('spaCart', JSON.stringify(cart));
}

// Update the addToCart and removeFromCart functions to save to storage
const originalAddToCart = addToCart;
addToCart = function(e) {
    originalAddToCart(e);
    saveCartToStorage();
};

const originalRemoveFromCart = removeFromCart;
removeFromCart = function(index) {
    originalRemoveFromCart(index);
    saveCartToStorage();
};

// Load cart on page load
loadCartFromStorage();