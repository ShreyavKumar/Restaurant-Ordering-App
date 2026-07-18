import {menuArray} from './data.js'

const menuItems = document.getElementById('menu-items')
const paymentModal = document.getElementById('payment-modal')

function renderItems(menuItemsArr) {
    const menuItemsHTML = menuItemsArr.map((item) => {
        const {name, ingredients, id, price, emoji} = item
        return `<section class="item-option">
                    <p class="item-img">${emoji}</p>
                    <div class="item-desc">
                        <h2>${name}</h2>
                        <p class="item-ingredients">${ingredients.join(', ')}</p>
                        <p class="item-price">$${price}</p>
                    </div>
                    <button data-item-id="${id}">+</button>
                </section>
                <hr>
                `
    }).join('')
    menuItems.innerHTML = menuItemsHTML
}

renderItems(menuArray)


let itemsSelected = []

menuItems.addEventListener('click', (e) => {
    if(e.target.dataset.itemId && !itemsSelected.includes(Number(e.target.dataset.itemId))) {
        itemsSelected.push(Number(e.target.dataset.itemId))
        renderOrderSummary(itemsSelected)
    }
})

function renderOrderSummary(itemIdAddedToCart) {
    let totalPrice = 0
    
    const itemSummaryHtml = itemIdAddedToCart.map((itemId) => {
        const itemHtml = menuArray.map((menuItem) => {
            if(menuItem.id == itemId) {
                totalPrice += menuItem.price
                return `
                <div class="bill-item">
                    <h3>${menuItem.name}</h3>
                    <button data-remove-item-id="${menuItem.id}">remove</button>
                    <p class="bill-item-price">${menuItem.price}</p>
                </div>`
            }
        }).join('')
        return itemHtml
    }).join('')

    if(itemSummaryHtml) {
        const orderSummaryHtml = `
        <h2>Your Order</h2>
        <div class="items-added" id="items-added">
            ${itemSummaryHtml}
        </div>
        <hr class="order-summary-break">
        <div class="order-amount">
            <h3>Total Price:</h3>
            <p class="final-price">$${totalPrice}</p>
        </div>
        <button class="complete-order-btn" id="complete-order-btn">Complete Order</button>
        `

        document.getElementById('order-summary').innerHTML = orderSummaryHtml
    }
    else {
        document.getElementById('order-summary').innerHTML = ''
    }
    
}

document.getElementById('order-summary').addEventListener('click', (e) => {
    if(e.target.dataset.removeItemId) {
        const filteredItemsSelected = itemsSelected.filter((itemId) => {
            return itemId != Number(e.target.dataset.removeItemId)
        })
        itemsSelected = filteredItemsSelected
        renderOrderSummary(itemsSelected)
    }
    else if(e.target.id === 'complete-order-btn') {
        paymentModal.classList.toggle('payment-modal-display')
    }
})

//Item Options


/*  <section class="item-option">
        <p class="item-img">🍕</p>
        <div class="item-desc">
            <h2>Pizza</h2>
            <p class="item-ingredients">pepperoni,mushrom,mozarella</p>
            <p class="item-price">$69</p>
        </div>
        <button id="item-id">+</button>
    </section>
    <hr>  */

//Order Summary

/*  <h2>Your Order</h2>
    <div class="items-added" id="items-added">
        <div class="bill-item">
            <h3>Pizza</h3>
            <button>remove</button>
            <p class="bill-item-price">$14</p>
        </div>
    </div>
    <hr class="order-summary-break">
    <div class="order-amount">
        <h3>Total Price:</h3>
        <p class="final-price">$69</p>
    </div> */