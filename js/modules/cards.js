import {getResource} from "../services/services";

function cards() {
    // класи для карток

    class MenuCards {
        constructor(src, alt, title, descr, price, parentSelector, ...className){
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.class = className;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 35;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');
            if(this.class.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.class.forEach(className => element.classList.add(className));
            }
            element.innerHTML= `
            <img src=${this.src} alt=${this.alt} />
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">
            ${this.descr}
            </div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
              <div class="menu__item-cost">Цена:</div>
              <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
          `;
          this.parent.append(element);
        }
    }

    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCards(img, altimg, title, descr, price, '.menu .container').render();
            });
        });
}

export default cards;