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
    const previewSection = document.getElementById("previewSection");
    previewSection.innerHTML = ""; // Nettoyer la prévisualisation précédente
    let totalPreviewHTML = ""; // Accumuler tout le HTML pour la prévisualisation
    let correctAnswersScript = "const correctAnswers = {\n"; // Initialiser le script des réponses correctes
  
    const questionBlocks = document.querySelectorAll(".questionBlock");
    questionBlocks.forEach((block, index) => {
      const questionNumber = `q${index + 1}`;
      const question = block.querySelector(`input[type='text']`).value;
      const reponses = block.querySelectorAll(`.reponse${index + 1}`);
      const correctInput = block.querySelector(
        `input[name='correct${index + 1}']:checked`
      ).value;
      correctAnswersScript += `    "${questionNumber}": "${correctInput}",\n`; // Ajouter la réponse correcte au script
  
      let previewHTML = `<div class="question">Question ${
        index + 1
      }: ${question}</div>`;
      reponses.forEach((reponse, idx) => {
        previewHTML += `<div><input type="radio" name="${questionNumber}" value="${
          idx + 1
        }"> ${reponse.value}</div>`;
      });
  
      totalPreviewHTML += `<div class="questionBlock">${previewHTML}</div>`;
    });
  
    correctAnswersScript += "};\n"; // Fermer l'objet des réponses correctes
  
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
  
    previewSection.innerHTML = totalPreviewHTML; // Mettre à jour la prévisualisation visuelle
  
    // Copie le contenu généré et le script de correction dans codeOutput
    const codeOutput = document.getElementById("codeOutput");
    codeOutput.value = totalPreviewHTML + correctionScript; // Ajouter le script de correction
  }
  
  function copierCode() {
    const codeOutput = document.getElementById("codeOutput");
    navigator.clipboard
      .writeText(codeOutput.value)
      .then(() => alert("Code copié dans le presse-papiers !"))
      .catch((err) => console.error("Erreur lors de la copie :", err));
  }
  

  function insererContenuDansIframe(code) {

    const iframe = document.getElementById('vueLive');
    const doc = iframe.contentDocument || iframe.contentWindow.document;

    doc.open();
    doc.write("..")
    doc.close();
  
    // Extraction du JavaScript en utilisant une expression régulière
    // Cette expression régulière est assez basique et peut nécessiter des ajustements
    const scriptRegex = /<script.*?>([\s\S]*?)<\/script>/gi;
    let scriptContent = '';
    let htmlContent = code.replace(scriptRegex, function(match, group1) {
      scriptContent += group1 + '\n';
      return ''; // Supprime le script du HTML
    });
  
    // Créez le contenu de l'iframe sans le script
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

    // Insérer le HTML
    doc.open();
    doc.write(contenu);
  
    // Ajouter le script à la fin du body pour s'assurer qu'il est chargé après le contenu HTML
    if (scriptContent.trim() !== '') {
      const scriptTag = doc.createElement("script");
      scriptTag.textContent = scriptContent;
      doc.body.appendChild(scriptTag);
    }
  
    doc.close();
  }
  document.getElementById('btnGenerer').addEventListener('click', function() {
    const codeOutput = document.getElementById("codeOutput").value; // Le code généré que vous avez mentionné
    insererContenuDansIframe(codeOutput);
  });

/* 
L'iFrame ne fonctionne plus correctement lorsqu'il y a une modification du QCM, mais il fonctionne correctement suite au refresh de la page 
*/