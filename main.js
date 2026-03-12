document.addEventListener('DOMContentLoaded', () => {
    // Show the first section initially
    document.getElementById('section-1').classList.remove('hidden');

    // Handle 'Other' gender text input activation
    const genderRadios = document.querySelectorAll('input[name="gender"]');
    const genderOtherText = document.getElementById('gender-other-text');
    const genderOtherRadio = document.getElementById('gender-other-radio');

    genderRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.value === '其他') {
                genderOtherText.classList.add('active');
                genderOtherText.required = true;
                genderOtherText.focus();
            } else {
                genderOtherText.classList.remove('active');
                genderOtherText.required = false;
                genderOtherText.value = '';
            }
        });
    });

    // Make clicking the text input auto-select the 'Other' radio
    genderOtherText.addEventListener('focus', () => {
        genderOtherRadio.checked = true;
        genderOtherText.classList.add('active');
        genderOtherText.required = true;
    });

    // Update range slider values dynamically
    const ranges = document.querySelectorAll('.custom-range');
    ranges.forEach(range => {
        const output = document.getElementById(range.id + '_val');
        
        // Initial value setup
        updateRangeUI(range, output);

        // Update on input
        range.addEventListener('input', () => {
            updateRangeUI(range, output);
        });
    });

    function updateRangeUI(range, output) {
        output.textContent = range.value;
        // Calculate position for dynamic styling if needed
        const val = (range.value - range.min) / (range.max - range.min);
        // Add dynamic background to slider track
        range.style.background = `linear-gradient(to right, var(--primary-color) ${val * 100}%, rgba(255, 255, 255, 0.1) ${val * 100}%)`;
    }

    // Handle Form Submission
    const form = document.getElementById('survey-form');
    const successMessage = document.getElementById('success-message');

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent actual submission

        // In a real app, you would gather formData and send via fetch/XHR here
        /*
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        console.log("Form Submitted:", data);
        */
        
        // Hide all sections and show success message
        document.querySelectorAll('.form-section').forEach(sec => sec.classList.add('hidden'));
        successMessage.classList.remove('hidden');
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// Navigation logic
function nextSection(sectionNum) {
    // Basic validation before moving next
    const currentSection = document.getElementById(`section-${sectionNum - 1}`);
    const requiredInputs = currentSection.querySelectorAll('input[required]');
    
    let isValid = true;
    requiredInputs.forEach(input => {
        if (!input.checkValidity()) {
            isValid = false;
            input.reportValidity(); // Native browser popup for validation
        }
    });

    if (!isValid) return;

    // Hide current, show next
    currentSection.classList.add('hidden');
    const nextSec = document.getElementById(`section-${sectionNum}`);
    nextSec.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function prevSection(sectionNum) {
    // Hide current, show prev
    const currentSection = document.getElementById(`section-${sectionNum + 1}`);
    currentSection.classList.add('hidden');
    const prevSec = document.getElementById(`section-${sectionNum}`);
    prevSec.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function resetForm() {
    const form = document.getElementById('survey-form');
    form.reset();
    
    // Reset specific UI elements
    document.getElementById('gender-other-text').classList.remove('active');
    
    // Reset range sliders UI
    const ranges = document.querySelectorAll('.custom-range');
    ranges.forEach(range => {
        const output = document.getElementById(range.id + '_val');
        output.textContent = range.value;
        const val = (range.value - range.min) / (range.max - range.min);
        range.style.background = `linear-gradient(to right, var(--primary-color) ${val * 100}%, rgba(255, 255, 255, 0.1) ${val * 100}%)`;
    });

    // Hide success, show section 1
    document.getElementById('success-message').classList.add('hidden');
    document.getElementById('section-1').classList.remove('hidden');
}
