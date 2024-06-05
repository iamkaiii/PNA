export class ButtonPopperComponent {
    constructor(parent) {
        this.parent = parent;
    }

    addListeners(listener) {
        document
            .getElementById("Pbutton")
            .addEventListener("click", listener)
    }
    
    getHTML() {
        return (
            `
            <a id="Pbutton" type="button" class="btn btn-lg btn-danger" data-bs-toggle="popover" data-bs-title="Заголовок всплывающего окна" data-bs-content="А вот и потрясающий контент. Это очень увлекательно. Верно?">Нажмите, чтобы переключить всплывающее окно</a>
            `
        )
    }
    
    render(listener) {
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
        this.addListeners(listener)
    }
    
}

