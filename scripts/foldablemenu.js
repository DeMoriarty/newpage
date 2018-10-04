export default class FoldableMenu {
    constructor(items){
        var sheet = document.styleSheets[0];
        this.container = document.createElement('section');
        this.container.classList.add('-sh-foldable-container')

        this.ulist = document.createElement('ul');
        for(let item in items){
            if(item.itemName === undefined) {

            } else {

            }
        }
    }
}