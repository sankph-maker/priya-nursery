$html = Get-Content -Path 'index.html' -Raw
$ids = @(
    'main-header', 'menu-toggle-btn', 'nav-menu-list', 
    'carousel-track', 'carousel-prev', 'carousel-next', 'carousel-dots', 
    'step-1', 'step-2', 'step-3', 'quiz-result', 
    'btn-step1-next', 'btn-step2-prev', 'btn-step2-next', 'btn-step3-prev', 'btn-quiz-submit', 'btn-quiz-restart', 
    'result-plant-img', 'result-plant-category', 'result-plant-name', 'result-plant-desc', 
    'result-sun', 'result-water', 'result-suitability', 'result-whatsapp-btn', 
    'contact-form', 'form-success-msg', 'form-name', 'form-phone', 'form-email', 'form-interest', 'form-message', 
    'catalog-grid', 'catalog-search', 'catalog-filters', 'catalog-no-results'
)

foreach ($id in $ids) {
    if ($html -notmatch "id=['`"]$id['`"]") {
        Write-Host "Missing ID: $id"
    }
}
