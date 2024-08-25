"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyToClipboard = copyToClipboard;
exports.default = copy;
// A "API" antiga, utilizando document.execCommand('copy'), não consegue copiar texto em branco.
// A nova API não precisa de permissão apenas para escrever na área de transferência,
// desde que o documento esteja focado.
function copyToClipboard(text) {
    // Disponível apenas em alguns browsers e em ambientes seguros https.
    if (navigator.clipboard) {
        return new Promise((resolve) => {
            navigator.clipboard
                .writeText(text)
                .then(() => {
                resolve(true);
            })
                .catch(() => {
                // Fallback to the old way.
                resolve(copy(text));
            });
        });
    }
    return copy(text) ? Promise.resolve(true) : Promise.reject(new Error('Copy to clipboard not available.'));
}
function copy(text) {
    let succeeded;
    const fakeElem = document.createElement('textarea');
    // Prevent zooming on iOS
    fakeElem.style.fontSize = '12pt';
    // Reset box model
    fakeElem.style.border = '0';
    fakeElem.style.padding = '0';
    fakeElem.style.margin = '0';
    // Move element out of screen horizontally
    fakeElem.style.position = 'absolute';
    fakeElem.style.left = '-9999px';
    // Move element to the same position vertically
    const yPosition = window.pageYOffset || document.documentElement.scrollTop;
    fakeElem.style.top = `${yPosition}px`;
    fakeElem.setAttribute('readonly', '');
    fakeElem.value = text;
    document.body.appendChild(fakeElem);
    const previouslySelectedElement = document.activeElement;
    fakeElem.select();
    fakeElem.setSelectionRange(0, text.length);
    try {
        succeeded = document.execCommand('copy');
    }
    catch (err) {
        succeeded = false;
    }
    document.body.removeChild(fakeElem);
    if (previouslySelectedElement && previouslySelectedElement instanceof HTMLElement) {
        previouslySelectedElement.focus();
    }
    return succeeded;
}
