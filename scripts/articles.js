import NavBar from './nav.js';
import Foldable from './foldablemenu.js';

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

var foldablecontainer = document.getElementById('lm');
var foldable = new Foldable();

navcontainer.appendChild(nav.navbar)
foldablecontainer.appendChild(foldable.container)