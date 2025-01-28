async function getQuote() {
    try {
        console.log("Pridobivam citat...");
        const response = await fetch('https://api.gameofthronesquotes.xyz/v1/random');
        
        if (!response.ok) {
            throw new Error(`HTTP napaka: ${response.status}`);
        }

        const data = await response.json();
        console.log("Prejeti podatki:", data);
        return data; // NE data[0]! 🚨
    } catch (error) {
        console.error("Napaka:", error);
        return null;
    }
}

function displayQuote(quote) {
    if (!quote) {
        console.error("Ni citata za prikaz!");
        return;
    }

    const quoteElement = document.getElementById('quote');
    const authorElement = document.getElementById('author');
    
    // Če elementov ni v DOM-u
    if (!quoteElement || !authorElement) {
        console.error("Manjkajoči HTML elementi!");
        return;
    }

    quoteElement.textContent = quote.sentence;
    
    // Preverimo hišo brez optional chaining (za podporo starejšim brskalnikom)
    const houseName = quote.character.house ? quote.character.house.name : "";
    const authorText = quote.character.name + (houseName ? `, ${houseName}` : '');
    authorElement.textContent = `— ${authorText}`;
}

// Event listener za gumb
document.getElementById('new-quote').addEventListener('click', async () => {
    console.log("Klik na gumb zaznan!");
    const quote = await getQuote();
    displayQuote(quote);
});

// Začetni citat ob nalaganju
window.addEventListener('DOMContentLoaded', async () => {
    console.log("Stran naložena!");
    const initialQuote = await getQuote();
    displayQuote(initialQuote);
});