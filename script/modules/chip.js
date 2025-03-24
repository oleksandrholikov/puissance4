export default class Chip{
    constructor(color) {
        this.element = document.createElement("div");
        this.element.classList.add("chip");
        this.element.style.backgroundColor = color;
    }

    drop(targetCell, delay = 500) {
        return new Promise(resolve => {
            const playground = document.querySelector(".playground"); // Родительский контейнер
            const startY = -100; // Начальная позиция (за границей экрана)
            const endY = targetCell.getBoundingClientRect().top - playground.getBoundingClientRect().top;
    
            this.element.style.position = "absolute";
            this.element.style.top = `${startY}px`;
            this.element.style.left = `${targetCell.offsetLeft}px`;
    
            playground.appendChild(this.element);
    
            setTimeout(() => {
                this.element.style.transition = `top ${delay}ms ease-in-out`;
                this.element.style.top = `${endY-3}px`;
            }, 10);
    
            setTimeout(resolve, delay);
        });
    }
}