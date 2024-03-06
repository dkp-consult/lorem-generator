document.addEventListener("DOMContentLoaded", function () {
  ajouterQuestion(); // Ajouter une première question par défaut
});

let questionCount = 0; // Compteur de questions pour identifier unique

function ajouterQuestion() {
  questionCount++;
  const encodingSection = document.getElementById("encodingSection");
  const questionHTML = `
        <div class="questionBlock">
            <div>Question ${questionCount}: <input type="text" placeholder="Votre question ici" id="question${questionCount}"></div>
            <div>Réponse 1: <input type="text" class="reponse${questionCount}"><input type="radio" name="correct${questionCount}" value="1"></div>
            <div>Réponse 2: <input type="text" class="reponse${questionCount}"><input type="radio" name="correct${questionCount}" value="2"></div>
            <div>Réponse 3: <input type="text" class="reponse${questionCount}"><input type="radio" name="correct${questionCount}" value="3"></div>
        </div>
        <br>`;
  encodingSection.insertAdjacentHTML("beforeend", questionHTML);
}

function genererPreview() {
  let totalPreviewHTML = ""; // Accumuler tout le HTML pour la prévisualisation
  let correctAnswersScript = "const correctAnswers = {\n"; // Initialiser le script des réponses correctes

  const questionBlocks = document.querySelectorAll(".questionBlock");
  questionBlocks.forEach((block, index) => {
    const questionNumber = `q${index + 1}`;
    const question = block.querySelector(`input[type='text']`).value;
    const reponses = block.querySelectorAll(`.reponse${index + 1}`);
    const correctInput = block.querySelector(`input[name='correct${index + 1}']:checked`).value;
    correctAnswersScript += `    "${questionNumber}": "${correctInput}",\n`;

    let previewHTML = `<div class="question">Question ${
      index + 1
    }: ${question}</div>`;
    reponses.forEach((reponse, idx) => {
      previewHTML += `<div><input type="radio" name="${questionNumber}" value="${idx + 1}"> ${reponse.value}</div>`;
    });

    totalPreviewHTML += `<div class="questionBlock">${previewHTML}</div>`;
  });

  correctAnswersScript += "};\n";
  totalPreviewHTML += `<button onclick="correction()">Soumettre</button><div id="resultats"></div>`;

  const correctionScript = `
<script>
${correctAnswersScript}

function correction() {
    let score = 0;
    const questionBlocks = document.querySelectorAll('.questionBlock');

    questionBlocks.forEach((block, index) => {
        const questionNumber = \`q\${index + 1}\`;
        const correctAnswer = correctAnswers[questionNumber];
        const options = block.querySelectorAll(\`input[name='\${questionNumber}']\`);

        options.forEach(option => {
            const isCorrect = option.value === correctAnswer;
            option.parentElement.classList.remove('correct', 'incorrect');
            if (isCorrect) {
                if (option.checked) {
                    score++;
                }
                option.parentElement.style.backgroundColor = 'lightgreen'; // Correct answer
            } else {
                option.parentElement.style.backgroundColor = 'lightcoral'; // Incorrect answer
            }
        });
    });

    const resultatDiv = document.getElementById("resultats");
    resultatDiv.innerHTML = \`Vous avez obtenu \${score} sur \${questionBlocks.length} réponses correctes.\`;
}
</script>`;

  // Mettre à jour le contenu de codeOutput
  const codeOutput = document.getElementById("codeOutput");
  codeOutput.value = totalPreviewHTML + correctionScript;
}

document.getElementById('btnGenerer').addEventListener('click', function() {
  const codeOutput = document.getElementById("codeOutput").value;
  genererPreview(); // Génère le contenu pour codeOutput
  insererContenuDansIframe(codeOutput); // Insère le contenu de codeOutput dans l'iframe
});

function copierCode() {
  const codeOutput = document.getElementById("codeOutput");
  navigator.clipboard
    .writeText(codeOutput.value)
    .then(() => alert("Code copié dans le presse-papiers !"))
    .catch((err) => console.error("Erreur lors de la copie :", err));
}

  

  function insererContenuDansIframe(code) {
    // Obtenir le parent de l'iframe actuelle
    const iframeContainer = document.getElementById('vueLive').parentNode;
    const oldIframe = document.getElementById('vueLive');
  
    // Créer une nouvelle iframe
    const newIframe = document.createElement('iframe');
    newIframe.id = oldIframe.id;
    newIframe.name = oldIframe.name;
    newIframe.style.width = oldIframe.style.width; // Copiez d'autres attributs au besoin
    newIframe.style.height = oldIframe.style.height;
  
    // Supprimer l'ancienne iframe et ajouter la nouvelle au conteneur
    iframeContainer.removeChild(oldIframe);
    iframeContainer.appendChild(newIframe);
  
    // Utiliser la nouvelle iframe pour le contenu
    const iframe = newIframe;
    const doc = iframe.contentDocument || iframe.contentWindow.document;
  
    // Procédez comme avant pour insérer le contenu
    doc.open();
    doc.write("..");
    doc.close();
  
    const scriptRegex = /<script.*?>([\s\S]*?)<\/script>/gi;
    let scriptContent = '';
    let htmlContent = code.replace(scriptRegex, function(match, group1) {
      scriptContent += group1 + '\n';
      return ''; // Supprime le script du HTML
    });
  
    const contenu = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body>
        ${htmlContent}
      </body>
      </html>
    `;
  
    doc.open();
    doc.write(contenu);
  
    if (scriptContent.trim() !== '') {
      const scriptTag = doc.createElement("script");
      scriptTag.textContent = scriptContent;
      doc.body.appendChild(scriptTag);
    }
  
    doc.close();
  }
  
  document.getElementById('btnGenerer').addEventListener('click', function() {
    const codeOutput = document.getElementById("codeOutput").value;
    insererContenuDansIframe(codeOutput);
  });

