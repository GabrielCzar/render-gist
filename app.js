'use strict';

function renderContent() {
    const urlHtml = document.querySelector('#urlHtml').value;
    const urlCss = document.querySelector('#urlCss').value;

    renderContentInWindow(urlHtml, urlCss);
}

function renderContentInWindow(urlHtml, urlCss) {
    const w = window.open();
    w.document.open();
    w.document.write("<h2>Hello World!</h2>");
    w.document.close();

    fetch(urlHtml).then(async res => {
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