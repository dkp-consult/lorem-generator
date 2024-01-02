import loremContents from '../data/loremContents';


document.getElementById('generateButton').addEventListener('click', function () {
    const numberOfParagraphs = document.getElementById('numberOfParagraphs').value;
    generateLoremIpsum(numberOfParagraphs);
});

function generateLoremIpsum(numberOfParagraphs) {
    const parsedParagraphs = parseInt(numberOfParagraphs);

    if (isNaN(parsedParagraphs) || parsedParagraphs <= 0) {
        alert('Veuillez entrer un nombre de paragraphes valide.');
        return;
    }

    const loremIpsumText = loremContents['fr'];

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
        const textArea = document.createElement('textarea');
        textArea.value = copyText.innerText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    });
}
// Ajoute un écouteur d'événements sur le slider pour générer automatiquement
document.getElementById('numberOfParagraphs').addEventListener('input', function () {
    const numberOfParagraphs = document.getElementById('numberOfParagraphs').value;
    generateLoremIpsum(numberOfParagraphs);
});

// Appelle la fonction une fois au chargement de la page pour générer avec la valeur initiale
const initialNumberOfParagraphs = document.getElementById('numberOfParagraphs').value;
generateLoremIpsum(initialNumberOfParagraphs);

