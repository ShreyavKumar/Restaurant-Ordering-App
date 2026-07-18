import {menuArray} from './data.js'

function renderItems(menuItems) {
    const menuItemsHTML = menuItems.map((item) => {
        return `<section class="item-option">
                    <p class="item-img">${item.emoji}</p>
                    <div class="item-desc">
                        <h2>${item.name}</h2>
                        <p class="item-ingredients">${item.ingredients.join(', ')}</p>
                        <p class="item-price">$${item.price}</p>
                    </div>
                    <button>+</button>
                </section>
                <hr>
                `
    }).join('')
    document.getElementById('menu-items').innerHTML = menuItemsHTML
}

renderItems(menuArray)


/*  <section class="item-option">
        <p class="item-img">🍕</p>
        <div class="item-desc">
            <h2>Pizza</h2>
            <p class="item-ingredients">pepperoni,mushrom,mozarella</p>
            <p class="item-price">$69</p>
        </div>
        <button>+</button>
    </section>
    <hr>  */