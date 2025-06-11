
const urlInput = document.getElementById('urlInput');
const generateBtn = document.getElementById('generateBtn');
const qrBox = document.getElementById('qrBox');
const qrImage = document.getElementById('qrImage');
const statusMessages = document.getElementById('statusMessages');

function addStatusMessage(message, isError = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `status-message ${isError ? 'error' : 'success'}`;
    messageDiv.textContent = message;
    statusMessages.appendChild(messageDiv);
}

function clearStatusMessages() {
    statusMessages.innerHTML = '';
}

function generateQRCode(url) {
    return new Promise((resolve, reject) => {
        const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(url)}&size=200x200`;
        qrImage.onload = () => resolve();
        qrImage.onerror = () => reject(new Error('Failed to generate QR code'));
        qrImage.src = qrCodeUrl;
    });
}

// function saveURL(url) {
//     return new Promise((resolve) => {
//         // Simulate saving URL to database or file
//         setTimeout(() => {
//             const filename = 'urls.txt';
//             resolve(filename);
//         }, 500);
//     });
// }

// function saveQRCode() {
//     return new Promise((resolve) => {
//         // Simulate saving QR code to file
//         setTimeout(() => {
//             resolve();
//         }, 500);
//     });
// }

async function handleQRGeneration() {
    const url = urlInput.value.trim();
    
    // Reset UI
    clearStatusMessages();
    qrBox.style.display = 'none';
    generateBtn.disabled = true;

    try {
        // Validate URL
        if (!url) {
            throw new Error('Please enter a URL');
        }
        try {
            new URL(url);
        } catch {
            throw new Error('Please enter a valid URL (e.g., https://example.com)');
        }

        // Generate QR Code
        await generateQRCode(url);
        addStatusMessage('QR code generated successfully!');
        qrBox.style.display = 'block';

        // Save URL
        // const filename = await saveURL(url);
        // addStatusMessage(`URL saved to ${filename}`);

        // Save QR Code
        // await saveQRCode();
        // addStatusMessage('QR code saved to qrcode.png');

    } catch (err) {
        addStatusMessage(err.message, true);
        console.error(err);
    } finally {
        generateBtn.disabled = false;
    }
}

// Add enter key support
urlInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        handleQRGeneration();
    }
});