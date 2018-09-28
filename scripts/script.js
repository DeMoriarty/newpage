import subWindow from './subWindow.js';

var conlog = console.log;

// NOTE:Header
var header = document.getElementsByClassName('header')[0]
var headerBackground = document.createElement('img')
header.style.overflow = "hidden"
//headerBackground.height = header.clientHeight;
//headerBackground.width = header.clientWidth;
//header.appendChild(headerBackground)

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
    current.style.display = "inline-block";
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
searchtag.style.display = "inline-flex"
searchtag.style.cursor = "pointer"
searchtag.draggable = false

var searchbox = document.createElement('div');
searchbox.className = "rightnavtag searchbox"
searchbox.id = "searchbox"
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
searchbar.className = "searchbar"
searchbar.style.display = "inline-block"

var searchbutton = document.createElement("input")
searchbutton.type = "submit"
searchbutton.name = "submit"
searchbutton.className = "searchbutton"
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

