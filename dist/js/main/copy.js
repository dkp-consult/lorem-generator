function copyToClipboard() {
    // Code pour copier dans le presse-papiers...
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

export { copyToClipboard };