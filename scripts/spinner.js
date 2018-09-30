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
            transform: scale(0.1);
            opacity: 0.3;
        }
        30% {
            
            transform: scale(1);
            opacity: 1;
        }
        70% {
            transform: scale(0.1);
            opacity: 0.3;
        }
        100% {
            transform: scale(0);
        }
    }`)
    return container
}

export function iosSpinner(x, y, r, numDots = 12, duration=2){
    let d = r * 2;
    let dotHeight = d / 3;
    let dotWidth = dotHeight * 2 / 5;
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
        let className = '-sh-iosspinner'+i.toString();
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
            width: `+dotWidth.toString()+`px;
            height: `+dotHeight.toString()+`px;
            background-color: black;
            border-radius: 20%;
            left: 0px;
            top: 0px;
            transform: rotate(-52deg);
            visibility: hidden;
            animation: -sh-iosspinner-anim `+duration.toString()+`s `+delay.toString()+`s linear infinite;
        }`)
        container.appendChild(dot)
    }
    sheet.insertRule(`@keyframes -sh-iosspinner-anim {
        0% {
            visibility: visible;
            opacity: 1;
        }
        100% {
            opacity: 0.2;
        }
    }`)
    return container
}

export function clockSpinner(x,y,r, duration = 60){
    let d = r * 2;
    let container = document.createElement('div')
    container.classList.add('-sh-clockspinner-container')
    sheet.insertRule(`.-sh-clockspinner-container{
        position: absolute;
        left: `+x.toString()+`px;
        top: `+y.toString()+`px;
        width: `+d.toString()+`px;
        height: `+d.toString()+`px;
        border-radius: 50%;
        background-color: lightgrey;
        overflow: hidden;
        animation: -sh-clockspinner-anim `+duration.toString()+`s infinite steps(60);
    }`)
    sheet.insertRule(`.-sh-clockspinner-container::after{
        content:'';
        position: absolute;
        left:`+r.toString()+`px;
        top: 3px;
        width: 2px;
        height: `+(r-3).toString()+`px;
        box-shadow: 5px 2px 3px 0px black;
        border-top-left-radius: 50%;
        border-top-right-radius: 50%;
        background-color: black;
        animation: -sh-clockspinner-shadow-anim `+duration.toString()+`s infinite steps(60);
    }`)
    sheet.insertRule(`@keyframes -sh-clockspinner-anim {
        0% {
        }
        100% {
            transform: rotate(360deg)
        }
    }`)
    sheet.insertRule(`@keyframes -sh-clockspinner-shadow-anim {
        0% {
            box-shadow: 4px 2px 3px 0px black;
        }
        25% {
            box-shadow: 2px -4px 3px 0px black;
        }
        50% {
            box-shadow: -4px -2px 3px 0px black;
        }
        75% {
            box-shadow: -2px 4px 3px 0px black;
        }
        100% {
            box-shadow: 4px 2px 3px 0px black;
        }
    }`)

    return container
}

export function ncLoader(x, y, height, numDots){
    // NOTE: Newton's cradle
    let container = document.createElement('div');
    let width = 10 + 10 * numDots;
    container.classList.add('-sh-ncloader-container')
    sheet.insertRule(`.-sh-ncloader-container {
        position: absolute;
        left: `+x.toString()+`px;
        top: `+y.toString()+`px;
        height: `+height.toString()+`px;
        width: `+width.toString()+`px;
        background-color: transparent;
        border-top: black 2px solid;
    }`)
    for(let i=0;i<numDots;i++){
        let nc = document.createElement('div')
        let className = '-sh-ncloader'+i.toString()
        let dotx = 10 + i * 10;
        let doth = height - 15;
        let animation = '';
        let shadowAnimation = '';
        if (i == 0){
            animation = 'animation: -sh-ncloader-anim-cw 1s linear infinite;'
            shadowAnimation = 'animation: -sh-ncloader-shadow-anim-cw 1s linear infinite'
        } else if(i == numDots-1){
            animation = 'animation: -sh-ncloader-anim-ccw 1s 0.5s linear infinite;'
            shadowAnimation = 'animation: -sh-ncloader-shadow-anim-ccw 1s 0.5s linear infinite'
        }
        nc.classList.add(className)
        sheet.insertRule(`.`+className+` {
            position: absolute;
            left: `+dotx.toString()+`px;
            top: 0px;
            height: `+doth.toString()+`px;
            width: 1px;
            transform-origin: center top;
            background-color:black;
            `+animation+`
        }`)
        let ball = document.createElement('div')
        nc.appendChild(ball)
        ball.classList.add(className+'ball')
        sheet.insertRule(`.`+className+`ball {
            position: absolute;
            left: -5px;
            top: `+doth.toString()+`px;
            height: 10px;
            width: 10px;
            border-radius: 50%;
            transform-origin: center top;
            background-color:silver;
            `+animation+`
        }`)
        sheet.insertRule(`.`+className+`ball::after {
            position: absolute;
            content: '';
            left: 1px;
            top: 2px;
            height: 3px;
            width: 3px;
            border-radius: 50%;
            transform-origin: center top;
            background-color:white;
            box-shadow: 1px 1px 3px 0px white, -1px -1px 3px 0px white;

        }`)

        let shadow = document.createElement('div')
        container.appendChild(shadow)
        shadow.classList.add(className+'shadow')
        sheet.insertRule(`.`+className+`shadow {
            position: absolute;
            left : `+(dotx-5).toString()+`px;
            bottom : -5px;
            height: 4px;
            width: 8px;
            border-radius: 50%;
            background-color: black;
            opacity: 0.5;
            `+shadowAnimation+`
        }`)
        container.appendChild(nc)
    }
    sheet.insertRule(`@keyframes -sh-ncloader-anim-cw {
        0% {
            transform: rotate(0deg);
        }
        20% {
            transform: rotate(29deg);
        }
        25% {
            transform: rotate(30deg);
        }
        30% {
            transform: rotate(29deg);
        }
        50% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(0deg);
        }
    }`)
    sheet.insertRule(`@keyframes -sh-ncloader-anim-ccw {
        0% {
            transform: rotate(0deg);
        }
        20% {
            transform: rotate(-29deg)
        }
        25% {
            transform: rotate(-30deg)
        }
        30% {
            transform: rotate(-29deg)
        }
        50% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(0deg);
        }
    }`)
    sheet.insertRule(`@keyframes -sh-ncloader-shadow-anim-cw {
        0% {
            transform: translate(0px) scale(1);
            opacity: 0.5;
        }
        20% {
            transform: translate(-11px) scale(0.75);
            opacity: 0.3;
        }
        25% {
            transform: translate(-12px) scale(0.7);
            opacity: 0.2;
        }
        30% {
            transform: translate(-11px) scale(0.75);
            opacity: 0.3;
        }
        50% {
            transform: translate(0px) scale(1);
            opacity: 0.5;
        }
        100% {
            transform: translate(0px) scale(1);
            opacity: 0.6
        }
    }`)
    sheet.insertRule(`@keyframes -sh-ncloader-shadow-anim-ccw {
        0% {
            transform: translate(0px) scale(1);
            opacity: 0.5;
        }
        20% {
            transform: translate(11px) scale(0.75);
            opaciy: 0.3;
        }
        25% {
            transform: translate(12px) scale(0.7);
            opacity: 0.2;
        }
        30% {
            transform: translate(11px) scale(0.75);
            opacity: 0.3;
        }
        50% {
            transform: translate(0px) scale(1);
            opacity: 0.5;
        }
        100% {
            opacity: 0.6
            transform: translate(0px) scale(1)
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