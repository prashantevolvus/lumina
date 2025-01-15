function isDOMElement(element) {
    return element instanceof Element || element instanceof HTMLDocument;
}

function checkTargetContainer(containerId) {
    const container = document.getElementById(containerId);
    if (!isDOMElement(container)) {
        console.error(`Target container with id "${containerId}" is not a DOM element.`);
        return false;
    }
    return true;
}

document.addEventListener('DOMContentLoaded', () => {
    const containerId = 'app';
    if (!checkTargetContainer(containerId)) {
        const errorMessage = document.createElement('div');
        errorMessage.textContent = `Error: Target container with id "${containerId}" is not a DOM element.`;
        document.body.appendChild(errorMessage);
    }
});
