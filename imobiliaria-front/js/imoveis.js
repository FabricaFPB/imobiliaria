
document.addEventListener('DOMContentLoaded', function() {
    
    const toggleFiltersBtn = document.querySelector('.btn-toggle-filters');
    const filtersContent = document.querySelector('.filters-content');
    
    if (toggleFiltersBtn && filtersContent) {
        toggleFiltersBtn.addEventListener('click', function() {
            filtersContent.classList.toggle('active');
            
            const icon = toggleFiltersBtn.querySelector('i');
            if (filtersContent.classList.contains('active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-filter';
            }
        });
    }
    
    const viewBtns = document.querySelectorAll('.view-btn');
    const propertiesGrid = document.getElementById('properties-container');
    
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            viewBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const viewType = this.getAttribute('data-view');
            
            if (viewType === 'list') {
                propertiesGrid.classList.add('list-view');
            } else {
                propertiesGrid.classList.remove('list-view');
            }
        });
    });
    
    const favoriteButtons = document.querySelectorAll('.btn-favorite');
    
    favoriteButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const icon = this.querySelector('i');
            
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                this.style.color = '#ff6600';
                
                this.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 200);
                
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                this.style.color = '';
            }
        });
    });
    
    const filterBtn = document.querySelector('.btn-filter');
    const filterSelects = document.querySelectorAll('.form-control');
    
    if (filterBtn) {
        filterBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const filters = {};
            filterSelects.forEach(select => {
                if (select.value && select.value !== select.options[0].text) {
                    const placeholder = select.options[0].text.toLowerCase();
                    filters[placeholder] = select.value;
                }
            });
            
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Aplicando...';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
                
                const resultsCount = document.querySelector('.results-count');
                if (resultsCount) {
                    const count = Math.floor(Math.random() * 50) + 10;
                    resultsCount.textContent = `${count} imóveis encontrados`;
                }
                
                if (window.innerWidth < 768 && filtersContent.classList.contains('active')) {
                    filtersContent.classList.remove('active');
                    const icon = toggleFiltersBtn.querySelector('i');
                    icon.className = 'fas fa-filter';
                }
            }, 1500);
        });
    }
    
    const paginationBtns = document.querySelectorAll('.btn-pagination');
    
    paginationBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (!this.disabled) {
                const propertiesSection = document.querySelector('.properties-grid');
                if (propertiesSection) {
                    propertiesSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
                
                this.style.opacity = '0.7';
                setTimeout(() => {
                    this.style.opacity = '1';
                }, 300);
            }
        });
    });
    
    const viewPropertyBtns = document.querySelectorAll('.btn-view-property');
    
    viewPropertyBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const originalText = this.textContent;
            this.textContent = 'Carregando...';
            this.disabled = true;
            
            setTimeout(() => {
                this.textContent = originalText;
                this.disabled = false;
                
                alert('Redirecionando para detalhes do imóvel...');
            }, 800);
        });
    });
    
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    function handleResize() {
        const width = window.innerWidth;
        
        if (width >= 992) {
            filtersContent.classList.remove('active');
            filtersContent.style.display = 'block';
        } else if (width >= 768) {
            filtersContent.style.display = filtersContent.classList.contains('active') ? 'block' : 'none';
        } else {
            filtersContent.style.display = filtersContent.classList.contains('active') ? 'block' : 'none';
        }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize(); 
});

function animateCards() {
    const cards = document.querySelectorAll('.property-card');
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

window.addEventListener('load', animateCards);
