sheet = document.styleSheets[0]
export default class Header extends HTMLElement {
    constructor(){
        let container = document.createElement('header')
        container.classList.add('-sh-header')
        sheet.insertRule(`.-sh-header {
            border: grey 1px none;
            background-image: linear-gradient( to top, rgb(255, 255, 255) 0%, rgb(240, 240, 240) 40%, rgb(200, 200, 200)), url('http://mustafaozat.com/wp-content/uploads/2014/04/blue-vignetting-wallpapers_28443_2560x1600.jpg');
            position: absolute;
            overflow: hidden;
            margin: 0px;
            top: 0px;
            left: 0px;
            height: 200;
            width: 100%;
        }`);
        return container;
    }
}