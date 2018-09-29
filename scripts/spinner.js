var sheet = document.styleSheets[0]

export function doubleSpinner(x, y, r){
    let d = r * 2;
    let container = document.createElement('div');
    container.style.left = x;
    container.style.top = y;
    container.style.position = 'absolute';

    let spin = document.createElement('div');
    spin.classList.add('-sh-doublespinner');
    container.appendChild(spin);
    sheet.insertRule(`.-sh-doublespinner {
        position: absolute;
        display: inline-block;
        height: `+ d.toString()+`px;
        width: `+ d.toString() +`px;
        background-color: transparent;
        border-radius: 50%;
        margin: 20px;
        border-width: 3px;
        border-style: solid;
        border-color: transparent;
        border-left-color: black;
        border-right-color: black;
        animation: -sh-doublespinner-anim 1.5s cubic-bezier(0.6, 0, 0.4, 1) infinite alternate-reverse;
    }`);
    sheet.insertRule(`.-sh-doublespinner::after {
        content: '';
        visibility: visible;
        position: absolute;
        height: `+ d.toString() +`px;
        width: `+ d.toString() +`px;
        left: -3px;
        top: -3px;
        border-radius: 50%;
        display: block;
        border-width: 3px;
        border-style: solid;
        border-color: rgba(0, 0, 0, 0);
        border-top-color: black;
        border-bottom-color: black;
        animation: -sh-doublespinner-anim 1.5s cubic-bezier(0.6, 0, 0.4, 1) infinite forwards alternate;
    }`);
    sheet.insertRule(`@keyframes -sh-doublespinner-anim {
        0% {
            transform: rotate(0deg) scale(1);
        }
        50% {
            transform: rotate(90deg) scale(1.3)
        }
        100% {
            transform: rotate(360deg) scale(1);
        }
    }`);
    return container;
}

export function waterdrop(x, y, r, numDrops = 3, duration = 3){
    let d = r * 2;
    let container = document.createElement('div');
    container.style.left = x;
    container.style.top = y;
    container.style.width = d;
    container.style.height = d;
    container.style.position = 'absolute'

    sheet.insertRule(`@keyframes -sh-drop-anim {
        0% {
            visibility: visible;
            transform: scale(0.01);
            opacity: 0.7;
        }
        100% {
            transform: scale(1);
            opacity: 0;
        }
    }`)
    for(let i=0;i<numDrops;i++){
        let drop = document.createElement('div');
        let className = '-sh-waterdrop'+i.toString();
        let delay = (duration / numDrops) * i
        drop.classList.add(className);
        sheet.insertRule(`.`+className+` {
            position: absolute;
            display: inline-block;
            left: 0;
            top: 0;
            height: `+d.toString()+`px;
            width: `+d.toString()+`px;
            background-color: black;
            border-radius: 50%;
            opacity: 0.8;
            visibility: hidden;
            animation: -sh-drop-anim `+duration.toString()+`s  `+delay.toString()+`s ease-out infinite;
        }`);
        container.appendChild(drop);
    }
    return container
}

export function jumper(x, y, numDots = 3, duration = 1.2, jumpHeight = 15) {
    let w = numDots * 15 + 5;
    let h = jumpHeight + 10;
    let bottom = 0;
    let container = document.createElement('div');
    container.classList.add('-sh-jumper-container');
    container.style.position = "absolute";
    container.style.left = x;
    container.style.top = y;
    container.style.width = w;
    container.style.height = h;
    container.style.backgroundColor = 'transparent'

    for(let i=0;i<numDots;i++){
        let dot = document.createElement('div')
        let className = '-sh-jumper'+i.toString();
        let delay = (duration / numDots) * i;
        let left = 5 + 15 * i;
        dot.classList.add(className)
        sheet.insertRule(`.`+className+` {
            position: absolute;
            width: 10px;
            height: 10px;
            background-color: black;
            border-radius: 50%;
            left: `+ left +`px;
            bottom: 0px;
            animation: -sh-jump-anim `+duration.toString()+`s `+delay.toString()+`s ease-in-out infinite;
        }`)
        sheet.insertRule(`.`+className+`::after {
            content: '';
            position: absolute;
            width: 10px;
            height: 3px;
            background-color: black;
            border-radius: 50%;
            bottom: `+bottom.toString()+`px;
            opacity: 0.7;
            animation: -sh-jump-shadow `+duration.toString()+`s `+delay.toString()+`s ease-in-out infinite;
        }`)

        container.appendChild(dot)
    }
    sheet.insertRule(`@keyframes -sh-jump-anim {
        0% {
            bottom: `+bottom.toString()+`px;
        }
        25% {
            bottom: `+bottom.toString()+`px;
        }
        50% {
            bottom: `+jumpHeight.toString()+`px;
        }
        75% {
            bottom: `+bottom.toString()+`px;
        }
        100% {
            bottom: `+bottom.toString()+`px;
        }
    }`);
    sheet.insertRule(`@keyframes -sh-jump-shadow {
        0% {
            transform: scale(1);
            opacity: 0.7;
            bottom: 0px;
        }
        25%{
            transform: scale(1);
            opacity: 0.7;
            bottom: 0px;
        }
        50% {
            transform: scale(0.3);
            opacity: 0.4;
            bottom: -`+jumpHeight.toString()+`px;
        }
        75% {
            transform: scale(1);
            opacity: 0.7;
            bottom: 0px;
        }
        100% {
            transform: scale(1);
            opacity: 0.7;
            bottom: 0px;
        }
    }`)
    return container
}

export function dotSpinner(x, y, r, numDots=8, duration=2){
    let d = r * 2;
    let container = document.createElement('div');
    container.style.position = "absolute"
    container.style.left = x;
    container.style.top = y;
    container.style.height = d;
    container.style.width = d;
    container.style.margin = 8;
    container.style.backgroundColor = "transparent";

    for(let i=0;i<numDots;i++){
        let dot = document.createElement('div')
        let className = '-sh-dotspinner'+i.toString();
        let deg = (360 / numDots) * i;
        let delay = (duration / numDots) * i;
        dot.classList.add(className)
        sheet.insertRule(`.`+className+` {
            position: absolute;
            height: `+d.toString()+`px;
            width: `+d.toString()+`px;
            background-color: transparent;
            left: 0px;
            top: 0px;
            border-radius: 50%;
            transform: rotate(`+deg.toString()+`deg);
        }`)
        sheet.insertRule(`.`+className+`::after {
            content: '';
            position: absolute;
            width: 10px;
            height: 10px;
            background-color: black;
            border-radius: 50%;
            left: 0px;
            top: 0px;
            visibility: hidden;
            animation: -sh-dotspinner-anim `+duration.toString()+`s `+delay.toString()+`s linear infinite;
        }`)
        container.appendChild(dot)
    }
    sheet.insertRule(`@keyframes -sh-dotspinner-anim {
        0% {
            visibility: visible;
            transform: scale(1)
            opacity: 1;
        }
        100% {
            transform: scale(0.1);
            opacity: 0.3;
        }
    }`)
    return container
}

export default function gradSpinner(x, y, r, centerColor="white", duration=2){
    let container = document.createElement('div');
    let d = r * 2;
    let in_d = d * 0.75;
    let ring_width = (d-in_d)/2;
    container.classList.add('-sh-gradspinner-container')
    sheet.insertRule(`.-sh-gradspinner-container{
        left: `+x.toString()+`px;
        top: `+y.toString()+`px;
        height: `+d.toString()+`px;
        width: `+d.toString()+`px;
        position: absolute;
        border-radius: 50%;
        background-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(89, 131, 165, 0) 77%, rgba(128, 185, 132, 0) 100%);
        animation: -sh-gradspinner-anim `+duration.toString()+`s infinite linear;
    }`)

    sheet.insertRule(`.-sh-gradspinner-container::after {
        content: '';
        position: absolute;
        height: `+in_d.toString()+`px;
        width: `+in_d.toString()+`px;
        left: `+ring_width.toString()+`px;
        top: `+ring_width.toString()+`px;
        background-color: `+centerColor+`;
        border-radius: 50%;
    }`)

    sheet.insertRule(`@keyframes -sh-gradspinner-anim {
        0% {}
        100% {
            transform: rotate(1turn)
        }
    }`)
    return container;
}