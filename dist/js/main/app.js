import loremContents from './loremContents';

document.getElementById('generateButton').addEventListener('click', function () {
    const numberOfUnits = document.getElementById('numberOfUnits').value;
    const lengthType = document.getElementById('lengthType').value;
    const customContent = document.getElementById('customContent').value;
    const language = document.getElementById('languageSelector').value;
    const textSize = document.getElementById('textSize').value;
    const textColor = document.getElementById('textColor').value;
    const backgroundColor = document.getElementById('backgroundColor').value;
    generateLoremIpsum(numberOfUnits, lengthType, customContent, language, textSize, textColor, backgroundColor);
});

function generateLoremIpsum(numberOfUnits, lengthType, customContent, language, textSize, textColor, backgroundColor) {
    const parsedNumber = parseInt(numberOfUnits);

    if (isNaN(parsedNumber) || parsedNumber <= 0) {
        alert('Please enter a valid number.');
        return;
    }

    // Utilise uniquement le contenu importé depuis loremContent.js
    const contentArray = loremContents[language] || loremContents['en'];

    let generatedText = '';

    switch (lengthType) {
        case 'paragraphs':
            for (let p = 0; p < parsedNumber; p++) {
                for (let i = 0; i < contentArray.length; i++) {
                    generatedText += contentArray[i] + ' ';
                }
                generatedText += '\n\n';
            }
            break;

        case 'sentences':
            for (let s = 0; s < parsedNumber; s++) {
                const randomIndex = Math.floor(Math.random() * contentArray.length);
                generatedText += contentArray[randomIndex] + ' ';
            }
            break;

        case 'words':
            for (let w = 0; w < parsedNumber; w++) {
                const randomIndex = Math.floor(Math.random() * contentArray.length);
                generatedText += contentArray[randomIndex].split(' ').slice(0, 5).join(' ') + ' ';
            }
            break;

        default:
            alert('Invalid length type.');
            return;
    }

    // Applique la taille du texte et la couleur
    const outputText = document.getElementById('output');
    outputText.style.fontSize = textSize + 'px';
    outputText.style.color = textColor;
    outputText.style.backgroundColor = backgroundColor;

    // Met à jour la prévisualisation
    const previewText = document.getElementById('previewText');
    previewText.style.fontSize = textSize + 'px';
    previewText.style.color = textColor;
    previewText.style.backgroundColor = backgroundColor;

    // Ajoute la génération actuelle à l'historique
    const historyList = document.getElementById('historyList');
    const historyItem = document.createElement('li');
    historyItem.innerHTML = `<button onclick="reuseHistoryItem(this)">&#8634;</button> ${generatedText}`;
    historyList.appendChild(historyItem);

    console.log('Generated Text:', generatedText);
}

function formatText(style) {
    const outputText = document.getElementById('output');
    const previewText = document.getElementById('previewText');

    switch (style) {
        case 'bold':
            outputText.style.fontWeight = (outputText.style.fontWeight === 'bold') ? 'normal' : 'bold';
            previewText.style.fontWeight = outputText.style.fontWeight;
            break;
        case 'italic':
            outputText.style.fontStyle = (outputText.style.fontStyle === 'italic') ? 'normal' : 'italic';
            previewText.style.fontStyle = outputText.style.fontStyle;
            break;
        case 'underline':
            outputText.style.textDecoration = (outputText.style.textDecoration === 'underline') ? 'none' : 'underline';
            previewText.style.textDecoration = outputText.style.textDecoration;
            break;
        default:
            alert('Invalid style.');
            break;
    }
}

function changeTheme(theme) {
    const body = document.body;
    const previewText = document.getElementById('previewText');

    switch (theme) {
        case 'light':
            body.style.backgroundColor = '#f0f0f0';
            body.style.color = '#333';
            previewText.style.backgroundColor = body.style.backgroundColor;
            previewText.style.color = body.style.color;
            break;
        case 'dark':
            body.style.backgroundColor = '#333';
            body.style.color = '#fff';
            previewText.style.backgroundColor = body.style.backgroundColor;
            previewText.style.color = body.style.color;
            break;
        default:
            alert('Invalid theme.');
            break;
    }
}

function reuseHistoryItem(button) {
    const outputText = document.getElementById('output');
    const previewText = document.getElementById('previewText');
    outputText.innerText = button.nextSibling.textContent.trim();
    previewText.innerText = outputText.innerText;
}

function getDefaultPhrases(language) {
    // Ajoute des tableaux de phrases spécifiques à chaque langue
    const defaultPhrases = {
        en: [
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
            'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
            // Ajoute d'autres phrases en anglais au besoin
        ],
        fr: [
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
            'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
            // Ajoute d'autres phrases en français au besoin
        ]
        // Ajoute d'autres langues au besoin
    };

    return defaultPhrases[language] || defaultPhrases['en'];
}
