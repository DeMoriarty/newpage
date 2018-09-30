export default class SubWindow {
    constructor(x, y, width, height) {
        let windowmask = document.createElement('div')

        windowmask.style.position = 'fixed'
        windowmask.style.top = 0
        windowmask.style.left = 0;
        windowmask.style.width = '100%'
        windowmask.style.height = '100%'
        windowmask.style.zIndex = '100';
        windowmask.style.backgroundColor = 'rgba(128,128,128,0.5)'
        this.windowmask = windowmask;
        window.prevTarget = windowmask


        let body = document.createElement('div');
        body.style.position = "fixed";
        body.className = '-sh-subwindow-body'
        body.style.top = x;
        body.style.left = y;
        body.style.height = height;
        body.style.width = width;
        body.style.minHeight = 150;
        this.minHeight = 150;
        body.style.minWidth = 250;
        this.minWidth = 250;
        this.initialX = 0;
        this.initialY = 0;
        this.initialHeight = 0;
        this.initialWidth = 0;
        windowmask.appendChild(body);
        this.body = body

        // NOTE:Borders
        let topborder = document.createElement('div');
        topborder.classList.add('-sh-topborder')
        topborder.draggable = true;
        topborder.ondragend = () => {
            this.body.style.height = this.lastHeight;
            this.body.style.top = this.lastTop;
        }
        topborder.ondragstart = (event) => {
            this.initialY = this.body.offsetTop;
            this.initialHeight = this.body.offsetHeight;
            let clone = topborder.cloneNode(true);
            clone.style.visibility = "hidden";
            event.dataTransfer.setDragImage(clone, 0, 0)
        }
        topborder.ondrag = (event) => {
            if (topborder.draggable === true) {
                this.lastHeight = this.body.offsetHeight
                this.lastTop = this.body.offsetTop
                this.body.style.height = this.body.offsetHeight - event.offsetY
                this.body.style.top = this.body.offsetTop + event.offsetY
                if (this.body.offsetHeight <= Number(this.body.style.minHeight.replace('px', ''))) {
                    this.body.style.height = Number(this.body.style.minHeight.replace('px', ''))
                    this.body.style.top = this.initialY + this.initialHeight - this.minHeight;
                }
            }
        }

        //console.log(event.pageX, event.pageY, event.clientX, event.clientY)}
        this.body.appendChild(topborder)

        let bottomborder = document.createElement('div');
        bottomborder.classList.add('-sh-bottomborder')
        bottomborder.draggable = true;
        bottomborder.ondragstart = (event) => {
            let clone = bottomborder.cloneNode(true);
            clone.style.visibility = "hidden";
            event.dataTransfer.setDragImage(clone, 0, 0)
        }
        bottomborder.ondrag = (event) => {
            if (bottomborder.draggable === true) {
                body.style.height = body.offsetHeight + event.offsetY
            }
        }
        this.body.appendChild(bottomborder)

        let leftborder = document.createElement('div');
        leftborder.classList.add('-sh-leftborder')
        leftborder.classList.add('no_ghost')
        leftborder.draggable = true;
        leftborder.ondragend = () => {
            this.body.style.width = this.lastWidth;
            this.body.style.left = this.lastLeft;
        }
        leftborder.ondragstart = (event) => {
            this.initialX = this.body.offsetLeft;
            this.initialWidth = this.body.offsetWidth;
            let clone = leftborder.cloneNode(true);
            clone.style.visibility = "hidden";
            event.dataTransfer.setDragImage(clone, 0, 0)
            //return false
        }
        leftborder.ondrag = (event) => {
            if (leftborder.draggable === true) {
                this.lastLeft = this.body.offsetLeft;
                this.lastWidth = this.body.offsetWidth;
                this.body.style.width = this.body.offsetWidth - event.offsetX;
                this.body.style.left = this.body.offsetLeft + event.offsetX;
                if (this.body.offsetWidth <= Number(this.body.style.minWidth.replace('px', ''))) {
                    this.body.style.width = Number(this.body.style.minWidth.replace('px', ''));
                    this.body.style.left = this.initialX + this.initialWidth - this.minWidth;
                }
            }
        }
        this.body.appendChild(leftborder)

        let rightborder = document.createElement('div');
        rightborder.classList.add('-sh-rightborder')
        rightborder.draggable = true;
        rightborder.ondragstart = (event) => {
            let clone = rightborder.cloneNode(true);
            clone.style.visibility = "hidden";
            event.dataTransfer.setDragImage(clone, 0, 0)
        }
        rightborder.ondrag = (event) => {
            if (rightborder.draggable === true) {
                body.style.width = body.offsetWidth + event.offsetX
            }
        }
        this.body.appendChild(rightborder)

        // NOTE: DragBar
        let dragbar = document.createElement('div')
        dragbar.classList.add('-sh-dragbar')
        dragbar.draggable = true;
        dragbar.initialX = 0;
        dragbar.initialY = 0;
        dragbar.last_top = 0;
        dragbar.last_left = 0;

        dragbar.ondragstart = (event) => {
            let clone = this.dragbar.cloneNode(true);
            clone.style.visibility = "hidden";
            event.dataTransfer.setDragImage(clone, 0, 0)
            this.initialX = event.offsetX
            this.initialY = event.offsetY
        }
        dragbar.ondragend = () => {
            this.body.style.top = this.lastTop;
            this.body.style.left = this.lastLeft;
        }
        dragbar.ondrag = (event) => {
            if (this.dragbar.draggable === true && event.offsetY > 0 && event.offsetX > 0) {
                this.lastTop = this.body.offsetTop;
                this.lastLeft = this.body.offsetLeft;
                this.body.style.top = this.body.offsetTop + event.offsetY - this.initialY;
                this.body.style.left = this.body.offsetLeft + event.offsetX - this.initialX;
            }
        }
        window.ondragleave = (event) => {
            if (event.offsetX < 0 || event.offsetY < 0) {
                this.body.style.top = this.lastTop;
                this.body.style.left = this.lastLeft;
            }
        }
        this.body.appendChild(dragbar)
        this.dragbar = dragbar

        // NOTE: Window Title
        let title = document.createElement('span')
        title.innerHTML = "New Window"
        title.style.textAlign = "center"
        title.style.verticalAlign = 'middle'
        title.style.display = 'block'
        title.style.position = 'relative'
        window.addEventListener('load', () => {
            
        })
        this.dragbar.appendChild(title)
        this.title = title

        // NOTE: Content
        let content = document.createElement('div')
        content.style.width = 'calc(100% - 10px)';
        content.style.left = 5;
        content.style.position = 'absolute';
        content.style.backgroundColor = "white"
        this.body.appendChild(content)
        this.content = content

        // NOTE: Close Icon
        let closeIcon = document.createElement('i')
        closeIcon.classList.add("material-icons")
        closeIcon.classList.add("unselectable")
        closeIcon.classList.add('-sh-closeicon')
        closeIcon.innerText = "close"
        closeIcon.onclick = () => {
            document.body.removeChild(windowmask)
        }
        body.appendChild(closeIcon)
        this.closeIcon = closeIcon
    }
    appendTo() {
        document.body.appendChild(this.windowmask)
        this.content.style.height = 'calc(100% - ' + (this.dragbar.offsetHeight + 10).toString() + 'px)';
        this.content.style.top = 5 + this.dragbar.offsetHeight;
        this.title.style.top = (this.dragbar.offsetHeight - this.title.offsetHeight) / 2
    }

    appendChildren(list){
        for(let item of list){
            this.content.appendChild(item)
        }
    }
}