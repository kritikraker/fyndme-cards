// Get database reference
const database = window.database;

function generateCard() {
    // Basic validation
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
        linkedin: document.getElementById('linkedin').value || '',
        createdAt: Date.now()
    };

    // Generate unique ID
    const cardId = Date.now().toString(36);

    // Reference to where we want to store this card
    const cardRef = ref(database, 'cards/' + cardId);

    // Save to Firebase
    set(cardRef, cardData)
        .then(() => {
            // Show success message
            alert('Card created successfully!');
            
            // Generate card URL
            const cardUrl = `${window.location.origin}/fyndme-cards/card.html?id=${cardId}`;
            
            // Show preview section
            document.getElementById('previewSection').style.display = 'block';
            // Update URL in input
            document.getElementById('cardUrl').value = cardUrl;
            
            // Show preview
            const cardPreview = document.getElementById('cardPreview');
            cardPreview.innerHTML = `
                <div class="preview-card">
                    <h3>${cardData.name}</h3>
                    <p>${cardData.title}</p>
                    <div class="contact-details">
                        <p><i class="fas fa-envelope"></i> ${cardData.email}</p>
                        <p><i class="fas fa-phone"></i> ${cardData.phone}</p>
                        ${cardData.linkedin ? `<p><i class="fab fa-linkedin"></i> ${cardData.linkedin}</p>` : ''}
                    </div>
                </div>
            `;
        })
        .catch((error) => {
            console.error("Error saving card:", error);
            alert('Error creating card. Please try again.');
        });
}

function copyLink() {
    const cardUrl = document.getElementById('cardUrl');
    cardUrl.select();
    document.execCommand('copy');
    alert('Link copied!');
}
