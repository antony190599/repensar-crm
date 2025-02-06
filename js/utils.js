
function generateRandomIdentifier(prefix = "") {
    return  `${prefix}_${Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)}`;   
}

function formatPhoneNumber(number) {
    const cleaned = number.trim();
    return cleaned.startsWith("+") ? cleaned : `${CONFIG_APP.DEFAULT_COUNTRY_CODE}${cleaned}`;
}

function createWhatsAppLink(number, message) {
    const formattedNumber = formatPhoneNumber(number);
    return `${CONFIG_APP.WHATSAPP_BASE_URL}${formattedNumber}?text=${encodeURIComponent(message)}`;
}