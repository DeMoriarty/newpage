import NavBar from './nav.js';

var content = document.getElementById('cont1');
var textFromFile = function (file) {
    fetch(file)
        .then(response => response.text())
        .then(text => this.innerText = text)
}
HTMLElement.prototype.textFromFile = textFromFile
content.textFromFile('articles/calculus/1.txt')

var navcontainer = document.getElementById('nav')
var nav = new NavBar(
    [['HOME', '../index.html'],
    ['ARTICLES', '../article.html']])

navcontainer.appendChild(nav.navbar)