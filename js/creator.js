// Handle card generation
function generateCard() {
    // Basic form validation
    const form = document.getElementById('cardForm');
    if (!form.checkValidity()) {
        alert('Please fill in all required fields');
        return;
    }

    // Get form values
    const cardData = {
        name: document.getElementById('name').value,
        title: document.getElementById('title').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        linkedin: document.getElementById('linkedin').value,
        twitter: document.getElementById('twitter').value
    };

    // Generate unique ID for the card
    const cardId = Date.now().toString(36);

    // Show preview section
    const previewSection = document.getElementById('previewSection');
    previewSection.style.display = 'block';

    // Generate preview (simplified version)
    const cardPreview = document.getElementById('cardPreview');
    cardPreview.innerHTML = `
        <div class="preview-card">
            <h3>${cardData.name}</h3>
            <p>${cardData.title}</p>
            <p>${cardData.email}</p>
            <p>${cardData.phone}</p>
        </div>
    `;

    // Generate shareable link
    const cardUrl = `${window.location.origin}/card.html?id=${cardId}`;
    document.getElementById('cardUrl').value = cardUrl;

    // Scroll to preview
    previewSection.scrollIntoView({ behavior: 'smooth' });
}

// Handle link copying
function copyLink() {
    const cardUrl = document.getElementById('cardUrl');
    cardUrl.select();
    document.execCommand('copy');
    
    // Show feedback
    const copyButton = document.querySelector('.copy-button');
    const originalText = copyButton.innerHTML;
    copyButton.innerHTML = '<i class="fas fa-check"></i> Copied!';
    
    setTimeout(() => {
        copyButton.innerHTML = originalText;
    }, 2000);
}

// Handle file upload preview
document.getElementById('photo').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            // Here you would typically handle the image preview
            console.log('Image loaded:', e.target.result);
        };
        reader.readAsDataURL(file);
    }
});
