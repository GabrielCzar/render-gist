'use strict';

function renderContent() {
    const urlHtml = document.querySelector('#urlHtml').value;
    const urlCss = document.querySelector('#urlCss').value;

    if (!urlHtml) {
        showErrorMessage("Empty html uri, please insert a valid uri.")
        return;
    }

    if (!isSecureUrl(urlHtml)) {
        showErrorMessage("Required a secure uri. Please use only uri with https.")
        return;
    }

    renderContentInWindow(urlHtml, urlCss);
}

function renderContentInWindow(urlHtml, urlCss) {
    const w = window.open();
    w.document.open();
    w.document.write("<h2>Wait a moment, rendering content...</h2>");
    w.document.close();

    fetch(urlHtml)
        .then(async res => {
            const html = await res.text();
            const page = w.document.querySelector('html');
            page.innerHTML = html;

            fetch(urlCss).then(async res => {
                const css = await res.text();
                const style = w.document.createElement('style');
                style.innerText = css;
                const head = w.document.querySelector('head');
                head.appendChild(style);
            });

        });
}

const isSecureUrl = (url) => url.includes('https://');

function showErrorMessage(message) {
    clearTimeoutIfNecessary()
    const errorMessage = document.querySelector('#error');
    errorMessage.innerText = message;
    errorMessage.style.opacity = 1;

    timer = setTimeout(() => errorMessage.style.opacity = 0, 3000)
}

function clearTimeoutIfNecessary() {
    if (timer) {
        clearTimeout(timer)
        timer = null;
    }
}

var timer = null;