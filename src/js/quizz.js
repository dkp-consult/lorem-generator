document.addEventListener('DOMContentLoaded', function() {
    ajouterQuestion(); // Ajouter une première question par défaut
});

let questionCount = 0; // Compteur de questions pour identifier unique

function ajouterQuestion() {
    questionCount++;
    const encodingSection = document.getElementById('encodingSection');
    const questionHTML = `
        <div class="questionBlock">
            <div>Question ${questionCount}: <input type="text" placeholder="Votre question ici" id="question${questionCount}"></div>
            <div>Réponse 1: <input type="text" class="reponse${questionCount}"><input type="radio" name="correct${questionCount}" value="1"></div>
            <div>Réponse 2: <input type="text" class="reponse${questionCount}"><input type="radio" name="correct${questionCount}" value="2"></div>
            <div>Réponse 3: <input type="text" class="reponse${questionCount}"><input type="radio" name="correct${questionCount}" value="3"></div>
        </div>
        <br>`;
    encodingSection.insertAdjacentHTML('beforeend', questionHTML);
}

function genererPreview() {
    const previewSection = document.getElementById('previewSection');
    previewSection.innerHTML = ''; // Nettoyer la prévisualisation précédente
    let totalPreviewHTML = ''; // Accumuler tout le HTML pour la prévisualisation
    const questionBlocks = document.querySelectorAll('.questionBlock');

    questionBlocks.forEach((block, index) => {
        const question = block.querySelector(`input[type='text']`).value;
        const reponses = block.querySelectorAll(`.reponse${index+1}`);
        let previewHTML = `<div class="questionBlocks"><div class="question">Question ${index+1}: ${question}</div></div>`;

        reponses.forEach((reponse, idx) => {
            previewHTML += `<div><input type="radio" name="q${index+1}" value="${idx+1}"> ${reponse.value}</div>`;
        });

        totalPreviewHTML += previewHTML;
    });

    totalPreviewHTML += `<button onclick="correction()">Soumettre</button><div id="resultats"></div>`;
    previewSection.innerHTML = totalPreviewHTML; // Mettre à jour la prévisualisation visuelle

    // Mettre à jour #codeOutput avec le contenu HTML généré
    const codeOutput = document.getElementById('codeOutput');
    codeOutput.value = totalPreviewHTML;

    // Ajouter le CSS nécessaire à la fin de #codeOutput
    codeOutput.value += `
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        .question { font-weight: bold; margin-top: 10px; }
        .correct { background-color: green; }
        .incorrect { background-color: red; }
    </style>
    `;

    // Ajouter la fonction de correction à la fin de #codeOutput
    codeOutput.value += `
    <script>
        function correction() {
            let score = 0;
            const questionBlocks = document.querySelectorAll('.questionBlock');

            questionBlocks.forEach((block, index) => {
                const correctAnswer = block.querySelector('input[name="correct' + (index+1) + '"]:checked');
                const selectedAnswer = block.querySelector('input[name="q' + (index+1) + '"]:checked');

                if (selectedAnswer && selectedAnswer.value === correctAnswer.value) {
                    score++;
                }
            });

            const resultatDiv = document.getElementById("resultats");
            resultatDiv.innerHTML = 'Vous avez obtenu ' + score + ' sur ' + questionBlocks.length + ' réponses correctes.';
        }
    </script>
    `;
}

function copierCode() {
    const codeOutput = document.getElementById('codeOutput');
    navigator.clipboard.writeText(codeOutput.value)
        .then(() => {
            alert('Code copié dans le presse-papiers !');
        })
        .catch(err => {
            console.error('Erreur lors de la copie dans le presse-papiers :', err);
            alert('Erreur lors de la copie du code.');
        });
}
/*
1. Décomplexifier le process, repartir du code simple et fonctionnel initial ;
=> Stocker les answers dans une variables incrémentée avec le numéro de la question pour faire une boucle de vérification des réponses ? 
2. Ajouter les possibilités d'ajouts de question réponse ; 
3. Sortir une preview ; 
4. Générer le code complet pour intégration WP ; 

NB : lorsque les réponses correctes étaient stockée dans le code, celui-ci fonctionnait bcp mieux cfr. codepen
 */
