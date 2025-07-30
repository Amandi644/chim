document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.myItem');
  const totalAmountElement = document.getElementById('totalAmount');
  let cartTotal = 0;

  items.forEach(item => {
    const title = item.querySelector('.myTitle');
    const price = item.querySelector('.myPrice');
    const input = item.querySelector('.myInput');
    const addButton = item.querySelector('.myButton');
    const removeButton = item.querySelector('.myRemove');

    let isInCart = false; // Track if this item was already added

    addButton.addEventListener('click', () => {
      const quantity = parseInt(input.value) || 1;
      const rawPrice = price.textContent.replace(/[^\d.]/g, '');
      const itemPrice = parseFloat(rawPrice);

      if (!isNaN(itemPrice)) {
        const itemTotal = itemPrice * quantity;

        if (!isInCart) {
          cartTotal += itemTotal;
          totalAmountElement.textContent = cartTotal.toFixed(2);
          isInCart = true;
          addButton.classList.add('highlight');
          console.log(`✅ Added ${quantity} x ${title.textContent} = €${itemTotal.toFixed(2)}`);
        } else {
          alert('🛒 This item is already in the cart. Remove it first to re-add.');
        }
      } else {
        console.warn('⚠️ Could not read price:', price.textContent);
      }
    });

    removeButton.addEventListener('click', () => {
      if (isInCart) {
        const quantity = parseInt(input.value) || 1;
        const rawPrice = price.textContent.replace(/[^\d.]/g, '');
        const itemPrice = parseFloat(rawPrice);
        const itemTotal = itemPrice * quantity;

        cartTotal -= itemTotal;
        if (cartTotal < 0) cartTotal = 0;
        totalAmountElement.textContent = cartTotal.toFixed(2);
        isInCart = false;

        addButton.classList.remove('highlight');
        removeButton.classList.add('highlight');

        alert(`❌ Removed "${title?.textContent || 'Item'}" from cart.`);
        console.log(`🗑️ Removed ${quantity} x ${title.textContent} = €${itemTotal.toFixed(2)}`);
      } else {
        alert('⚠️ Item not in cart.');
      }
    });
  });
});