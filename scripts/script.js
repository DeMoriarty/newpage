import subWindow from './subWindow.js';
import {default as gradSpinner, waterdrop,ncLoader, jumper, dotSpinner, doubleSpinner, iosSpinner, clockSpinner} from './spinner.js'

var conlog = console.log;

// NOTE:Header
var header = document.getElementsByClassName('header')[0]


// NOTE:Content
var content = document.getElementsByClassName('content')[0]
var contentstyle = getComputedStyle(content)

// NOTE:Sidebar
var sizebar = document.getElementsByClassName("side")[0]
sizebar.style.height = contentstyle.height
// NOTE:Footer
var footer = document.getElementsByClassName("footer")[0]

footer.style.top = Number(contentstyle.height.replace('px', '')) + Number(contentstyle.top.replace('px', ''))

// NOTE: Sticky nav bar
var navbar = document.getElementsByClassName("topnav")[0]
var originalOffset = navbar.offsetTop
window.onscroll = () => {
    if (window.pageYOffset >= originalOffset) {
        navbar.classList.add('sticky')
    } else {
        navbar.classList.remove('sticky')
    }
}

var navbarItems = navbar.children

for (let i = 0; i < navbarItems.length; i++) {
    let current = navbarItems[i];
    current.onmouseleave = () => {
        if (current.href == window.location.href) { 
        }
    }
    if (current.href == window.location.href) {
    }
}

var icons = document.createElement("link")
icons.rel = "stylesheet"
icons.href = "https://fonts.googleapis.com/icon?family=Material+Icons"
document.head.appendChild(icons)

var searchtag = document.getElementById("search")
searchtag.draggable = false

var searchbox = document.createElement('div');
searchbox.className = "rightnavtag"
searchbox.id = "searchbox"

var searchform = document.createElement('form')
searchform.action = "http://www.google.com/search"
searchform.target = "_blank"
searchform.method = "GET"
searchbox.appendChild(searchform)

var searchbar = document.createElement("input")
searchbar.type = "search"
searchbar.name = "q"
searchbar.className = "searchbar"

var searchbutton = document.createElement("input")
searchbutton.type = "submit"
searchbutton.name = "submit"
searchbutton.className = "searchbutton"

searchform.appendChild(searchbar);
searchform.appendChild(searchbutton);

var searchicon = document.getElementById("search-icon")
searchicon.className = "material-icons"
searchicon.innerText = "search"

var closeicon = document.createElement("i")
closeicon.id = "close-icon"
closeicon.className = "material-icons"
closeicon.innerText = "close"

searchtag.open = false;
searchtag.onclick = () => {
    if (searchtag.open == false) {
        searchtag.removeChild(searchicon);
        navbar.appendChild(searchbox)
        searchtag.appendChild(closeicon);
        searchtag.open = true;
    } else {
        navbar.removeChild(searchbox);
        searchtag.removeChild(closeicon);
        searchtag.appendChild(searchicon);
        searchtag.open = false
    }

}

var subw1 = new subWindow(150, 50, 400, 300);
var spin = doubleSpinner(0, 0, 20);
var drop = waterdrop(100, 0, 30, 5, 3);
var jump = jumper(200, 30, 3);
var dot = dotSpinner(0,100,25, 12, 2)
var grad = gradSpinner(100, 100, 30, 'white')
var ios = iosSpinner(200, 100, 20, 12, 1.2)
var clock = clockSpinner(300, 100, 30, 60)
var nc = ncLoader(300, 30, 30, 5);
subw1.appendChildren([spin, drop, jump, dot, grad, ios, clock, nc])
var winbut = document.getElementById('openwindow')
winbut.onclick= ()=>{
    subw1.appendTo()
}