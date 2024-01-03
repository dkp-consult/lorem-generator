import { copyToClipboard } from "./copyToClipboard";

document.getElementById('numberOfParagraphs').addEventListener('click', function () {
    const numberOfParagraphs = document.getElementById('numberOfParagraphs').value;
    generateLoremIpsum(numberOfParagraphs);
});



document.getElementById('themeSelector').addEventListener('change', function () {
    const selectedTheme = document.getElementById('themeSelector').value;
    changeTheme(selectedTheme);
});

function changeTheme(theme) {
    const terminal = document.getElementById('output');

    switch (theme) {
        case 'default':
            terminal.style.backgroundColor = '#000';
            terminal.style.color = '#fff';
            break;
        case 'dark':
            terminal.style.backgroundColor = '#333';
            terminal.style.color = '#fff';
            break;
        case 'green':
            terminal.style.backgroundColor = '#006400';
            terminal.style.color = '#00ff00';
            break;
        default:
            break;
    }
}

const numberOfParagraphsValue = document.getElementById('numberOfParagraphsValue');

const loremIpsumText = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
`;

function generateLoremIpsum(numberOfParagraphs) {
    const parsedParagraphs = parseInt(numberOfParagraphs);

    if (isNaN(parsedParagraphs) || parsedParagraphs <= 0) {
        alert('Veuillez entrer un nombre de paragraphes valide.');
        return;
    }

    let generatedText = '';

    for (let p = 0; p < parsedParagraphs; p++) {
        generatedText += `<p>${loremIpsumText}</p>`;
    }

    const outputText = document.getElementById('output');
    outputText.innerHTML = generatedText;

    // Ajoute le bouton de copie avec un événement associé
    const copyButton = document.getElementById('copyButton');
copyButton.addEventListener('click', function () {
    const copyText = document.getElementById('output');
    copyToClipboard(copyText.innerText);
});
}
// Ajoute un écouteur d'événements sur le slider pour générer automatiquement
document.getElementById('numberOfParagraphs').addEventListener('input', function () {
    const numberOfParagraphs = document.getElementById('numberOfParagraphs').value;
    generateLoremIpsum(numberOfParagraphs);
    numberOfParagraphsValue.textContent = numberOfParagraphs;
});

// Appelle la fonction une fois au chargement de la page pour générer avec la valeur initiale
const initialNumberOfParagraphs = document.getElementById('numberOfParagraphs').value;
generateLoremIpsum(initialNumberOfParagraphs);
numberOfParagraphsValue.textContent = initialNumberOfParagraphs;

