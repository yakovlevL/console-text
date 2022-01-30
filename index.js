class Typer {
    constructor({ selector, speed, file } = { selector: "#console", speed: 3, file: "my-chat.txt" }) {
        this.console = document.querySelector(selector);
        this.speed = speed;
        this.file = file;
        this._text = null;
        this._accessCountimer = null;
        this._index = 0;
        this.init();
    }
    async init() {
        this._accessCountimer = setInterval(() => this.updLstChr(), 500);
        this._text = (await (await fetch(this.file)).text()).slice(0, -1); // try catch not really necessary

        const timer = setInterval(() => {
            this.addText();
            this._index > this._text.length && clearInterval(timer);
        }, 30);
    }
    content() {
        return this.console.innerHTML;
    }
    write(str) {
        this.console.innerHTML += str;
    }
    addText() {
        if (!this._text) return;

        if (this.content().slice(-1) === "|")
            this.console.innerHTML = this.content().slice(0, -1);

        this._index += this.speed;

        this.console.innerHTML = this._text.slice(0, this._index).replace(/\n/g, "<br/>");
        window.scrollBy(0, 50);
    }
    updLstChr() {
        if (this.content().slice(-1) === "|")
            this.console.innerHTML = this.console.innerHTML.slice(0, -1);
        else
            this.write("|");
    }
}

window.typer = new Typer({
    selector: "#console",
    speed: 3,
    file: "my-chat.txt"
});
