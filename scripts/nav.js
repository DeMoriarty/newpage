export default class NavBar {
    constructor(items) {
        let sheet = document.styleSheets[0]
        this.height = 40;
        this.navbar = document.createElement("nav")
        this.navbar.classList.add('-sh-nav-bar');
        this.navbar.classList.add('-sh-unselectable');
        sheet.insertRule(`.-sh-nav-bar {
            background-color: rgb(60, 60, 60);
            background: linear-gradient( to bottom, rgb(90, 90, 90)0%, rgb(45, 45, 45) 50%, rgb(45, 45, 45) 100%);
            overflow: hidden;
            position: absolute;
            z-index: 10;
            top: 200;
            left: 0;
            width: 100%;
            height: `+this.height+`px;
            margin: 0px;
            padding: 0px;
            vertical-align: middle;
            box-sizing: border-box;
        }`)
        sheet.insertRule(`.-sh-nav-sticky {
            background-color: rgb(60, 60, 60);
            background: linear-gradient( to bottom, rgb(90, 90, 90)0%, rgb(45, 45, 45) 50%, rgb(45, 45, 45) 100%);
            overflow: hidden;
            position: fixed;
            z-index: 10;
            top: 0;
            left: 0;
            width: 100%;
            height: `+this.height+`px;
            margin: 0px;
            padding: 0px;
            vertical-align: middle;
            box-sizing: border-box;
        }`)

        window.addEventListener('load', ()=>{
            this.originalOffset = this.navbar.offsetTop
            window.addEventListener('scroll', () => {
                if (window.pageYOffset >= this.originalOffset) {
                    this.navbar.classList.add('-sh-nav-sticky')
                    this.navbar.classList.remove('-sh-nav-bar')
                } else {
                    this.navbar.classList.add('-sh-nav-bar')
                    this.navbar.classList.remove('-sh-nav-sticky')
                }
            })
        })

        this.tags = new Array();
        for (let item of items) {
            let tag = document.createElement('a');
            tag.classList.add('-sh-nav-tag');
            tag.innerText = item[0];
            tag.href = item[1];
            this.navbar.appendChild(tag)
            this.tags.push(tag);
        }
        sheet.insertRule(`.-sh-nav-tag {
            float: left;
            display: inline-block;
            color: white;
            text-align: center;
            padding-left: 15px;
            padding-right: 15px;
            padding-top: 10px;
            padding-bottom: 10px;
            text-decoration: none;
            font-size: larger;
        }`);
        sheet.insertRule(`.-sh-nav-tag:hover {
            animation: -sh-navtag-anim 0.3s ease-out forwards;
            -webkit-animation: -sh-navtag-anim 0.3s ease-out forwards;
            -moz-animation: -sh-navtag-anim 0.3s ease-out forwards;
            -o-animation: -sh-navtag-anim 0.3s ease-out forwards;
        }`);
        sheet.insertRule(`@keyframes -sh-navtag-anim {
            0% {
            }
            100% {
                color: rgb(220, 220, 220);
                background: linear-gradient( to top, rgb(80, 80, 80) 0%, rgb(35, 35, 35) 50%, rgb(35, 35, 35) 100%);
                box-shadow: 1px 1px 10px 1px black inset, -1px -1px 10px 1px black inset;
            }
        }`)

        let icons = document.createElement("link")
        icons.rel = "stylesheet"
        icons.href = "https://fonts.googleapis.com/icon?family=Material+Icons"
        document.head.appendChild(icons)

        this.searchtag = document.createElement("a")
        this.searchtag.classList.add('-sh-nav-search')
        this.searchtag.draggable = false
        sheet.insertRule(`.-sh-nav-search {
            float: right;
            display: blox;
            color: white;
            padding-left: 15px;
            padding-right: 15px;
            padding-top: 10px;
            padding-bottom: 10px;
            text-decoration: none;
            font-size: larger;
            cursor: pointer;
        }`)
        sheet.insertRule(`.-sh-nav-search:hover {
            animation: navtag-anim 0.3s ease-out forwards;
            -webkit-animation: navtag-anim 0.3s ease-out forwards;
            -moz-animation: navtag-anim 0.3s ease-out forwards;
            -o-animation: navtag-anim 0.3s ease-out forwards;
        }`)
        this.navbar.appendChild(this.searchtag)


        this.searchbox = document.createElement('div');
        this.searchbox.classList.add("-sh-nav-searchbox")
        sheet.insertRule(`.-sh-nav-searchbox {
            background: linear-gradient( to bottom, rgb(90, 90, 90)0%, rgb(45, 45, 45) 50%, rgb(45, 45, 45) 100%);
            float: right;
            color: white;
            box-sizing: border-box;
            padding-left: 15px;
            padding-right: 15px;
            padding-top: 7.5px;
            height: `+this.height+`px;
            text-decoration: none;
            font-size: larger;
            position: absolute;
            right: 50px;
            border-left: 1px darkgrey solid;
        }`)
        sheet.insertRule(`.-sh-nav-searchbox:hover {
            animation: none;
        }`)

        this.searchform = document.createElement('form')
        this.searchform.action = "http://www.google.com/search"
        this.searchform.target = "_blank"
        this.searchform.method = "GET"
        this.searchbox.appendChild(this.searchform)

        this.searchbar = document.createElement("input")
        this.searchbar.type = "search";
        this.searchbar.name = "q";
        this.searchbar.classList.add("-sh-nav-searchbar");
        sheet.insertRule(`.-sh-nav-searchbar {
            display: inline-block;
            box-sizing: border-box;
            border: 2px grey solid;
            padding: 3px;
        }`)

        this.searchbutton = document.createElement("input")
        this.searchbutton.type = "submit"
        this.searchbutton.name = "submit"
        this.searchbutton.classList.add("-sh-nav-searchbutton")
        sheet.insertRule(`.-sh-nav-searchbutton {
            display: inline-block;
            border-radius: 10%;
            font-size: 14px;
            border: none;
            margin-left: 10px;
            background-color: silver;
            padding: 3px 9px 3px 9px;
        }`)
        sheet.insertRule(`.-sh-nav-searchbutton:hover {
            background-color: darkgrey;
        }`)

        this.searchform.appendChild(this.searchbar);
        this.searchform.appendChild(this.searchbutton);

        sheet.insertRule(`.-sh-unselectable {
            -webkit-user-select: none;
            -webkit-touch-callout: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }`)
        this.searchicon = document.createElement("i")
        this.searchicon.classList.add("material-icons")
        this.searchicon.innerText = "search";
        this.searchicon.draggable = false;
        this.searchtag.appendChild(this.searchicon);

        this.closeicon = document.createElement("i")
        this.closeicon.classList.add("material-icons")
        this.closeicon.innerText = "close"

        this.searchtag.open = false;
        this.searchtag.onclick = () => {
            if (this.searchtag.open == false) {
                this.searchtag.removeChild(this.searchicon);
                this.navbar.appendChild(this.searchbox)
                this.searchtag.appendChild(this.closeicon);
                this.searchtag.open = true;
            } else {
                this.navbar.removeChild(this.searchbox);
                this.searchtag.removeChild(this.closeicon);
                this.searchtag.appendChild(this.searchicon);
                this.searchtag.open = false
            }
        }
    }
    appendTag(item){
        let a = document.createElement('a');
        a.classList.add('-sh-nav-tag');
        a.innerText = item[0];
        a.href = item[1];
        this.navbar.appendChild(a);
    }
    appenTags(items){
        for (let item in items){
            this.appendTag(item);
        }
    }
}