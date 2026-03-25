// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const menuOverlay = document.getElementById('menuOverlay');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        menuOverlay.classList.toggle('active');
    });
}

if (menuOverlay) {
    menuOverlay.addEventListener('click', closeMobileMenu);
}

function closeMobileMenu() {
    if (hamburger) hamburger.classList.remove('active');
    if (mobileMenu) mobileMenu.classList.remove('active');
    if (menuOverlay) menuOverlay.classList.remove('active');
}

// Load articles on homepage
if (document.getElementById('articlesGrid')) {
    loadArticles();
}

function loadArticles() {
    const grid = document.getElementById('articlesGrid');
    if (!grid || typeof articlesData === 'undefined') return;

    grid.innerHTML = articlesData.map(article => `
        <a href="${article.url}" class="article-card">
            <img src="${article.image}" alt="${article.title}" class="article-image">
            <div class="article-content">
                <div class="article-meta">
                    <span class="article-tag">${article.tag}</span>
                    <span>${article.readTime}</span>
                </div>
                <h3 class="article-title">${article.title}</h3>
                <p class="article-excerpt">${article.excerpt}</p>
                <span class="read-more">Read more →</span>
            </div>
        </a>
    `).join('');
}

// Like functionality for article pages
let currentLikes = JSON.parse(localStorage.getItem('articleLikes') || '{}');

function toggleLike(articleId) {
    const currentCount = currentLikes[articleId] || 0;
    const newCount = currentCount > 0 ? 0 : 1;
    currentLikes[articleId] = newCount;
    
    localStorage.setItem('articleLikes', JSON.stringify(currentLikes));

    const likeButton = document.querySelector('.like-button');
    const likeCountSpan = document.getElementById('like-count');
    const likeIcon = document.querySelector('.like-icon');

    if (newCount > 0) {
        likeButton.classList.add('liked');
        likeIcon.textContent = '❤️';
        likeCountSpan.textContent = newCount;
    } else {
        likeButton.classList.remove('liked');
        likeIcon.textContent = '🤍';
        likeCountSpan.textContent = '';
    }
}

// Initialize like button on article pages
function initializeLikeButton(articleId) {
    const likeCount = currentLikes[articleId] || 0;
    const isLiked = likeCount > 0;
    
    const likeButton = document.querySelector('.like-button');
    const likeIcon = document.querySelector('.like-icon');
    const likeCountSpan = document.getElementById('like-count');

    if (likeButton) {
        if (isLiked) {
            likeButton.classList.add('liked');
            likeIcon.textContent = '❤️';
            likeCountSpan.textContent = likeCount;
        }
    }
}