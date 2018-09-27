import subWindow from './subWindow.js';

var conlog = console.log;

// NOTE:Header
var header = document.getElementsByClassName('header')[0]
var headerBackground = document.createElement('img')
header.style.overflow = "hidden"
headerBackground.src = "data:image/jpeg;base64,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"
//headerBackground.height = header.clientHeight;
//headerBackground.width = header.clientWidth;
header.appendChild(headerBackground)

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
    //let navbarPos = navbar.getBoundingClientRect();
    let offset = navbar.offsetTop
    if (window.pageYOffset >= originalOffset) {
        navbar.classList.add('sticky')
    } else {
        navbar.classList.remove('sticky')
    }
}

var navbarItems = navbar.children

for (let i = 0; i < navbarItems.length; i++) {
    let current = navbarItems[i];
    current.style.display = "inline-block"
    current.onmouseenter = () => { current.style.backgroundColor = 'rgb(0,60,90)'; }
    current.onmouseleave = () => {
        current.style.backgroundColor = 'rgb(60,108,128)';
        if (current.href == window.location.href) {
            current.style.backgroundColor = "rgb(0,30,30)"
        }
    }
    if (current.href == window.location.href) {
        current.style.backgroundColor = "rgb(0,30,30)"
    }
}

var icons = document.createElement("link")
icons.rel = "stylesheet"
icons.href = "https://fonts.googleapis.com/icon?family=Material+Icons"
document.head.appendChild(icons)

var searchtag = document.getElementById("search")
searchtag.style.display = "inline-flex"
searchtag.style.cursor = "pointer"
searchtag.draggable = false

var searchbox = document.createElement('div');
searchbox.className = "rightnavtag"
searchbox.style.position = "absolute"
searchbox.style.right = "50px"
//navbar.appendChild(searchbox)


var searchform = document.createElement('form')
searchform.action = "http://www.google.com/search"
searchform.target = "_blank"
searchform.method = "GET"
searchbox.appendChild(searchform)

var searchbar = document.createElement("input")
searchbar.type = "search"
searchbar.name = "q"
searchbar.style.display = "inline-block"

var searchbutton = document.createElement("input")
searchbutton.type = "submit"
searchbutton.name = "submit"
searchbutton.style.display = "inline-block"

searchform.appendChild(searchbar);
searchform.appendChild(searchbutton);

var searchicon = document.getElementById("search-icon")
searchicon.className = "material-icons"
searchicon.innerText = "search"
var closeicon = document.createElement("i")
closeicon.id = "close-icon"
closeicon.className = "material-icons"
closeicon.innerText = "close"
closeicon.style.display = "block"
closeicon.style.float = "right"

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

var subw1 = new subWindow(150, 250, 200, 300)
subw1.appendTo(document.body)

