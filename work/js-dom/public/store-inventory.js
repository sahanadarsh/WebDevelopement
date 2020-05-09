(function IIFE() {
  
  const counter = () =>  {
    let count = 0;
    return () => {
      count += 1;
      return count;
    };
  };
  const nextId = counter();
  
  const items = {};
  
  const addButton = document.querySelector('.outgoing button');
  const list = document.querySelector('.items');
  const keyUpEvent = document.querySelector('.to-add-text');
  
  const renderList = (items) => {
    list.innerHTML = Object.keys(items).map( (key) => {
      const item = items[key];
      return `
        <li class= "item-list">
          <span data-id="${key}" class = "item-name">${item.name}</span>
          <button data-id="${key}" class="delete-button">X</button>
          <button data-id="${key}" class="minus-button" ${item.quantity <= 0 ? "disabled" : ""}>-</button>
          <span data-id="${key}" class = "item-quantity">${item.quantity}</span>
          <button data-id="${key}" class="plus-button">+</button>    
        </li>
      `;
    }).join('\n');
  };
  
  list.addEventListener('click', function (event) {
    const id = event.target.dataset.id;
    if(event.target.classList.contains('item') && items[id]) {
      renderList(items);
    }
    
    if(event.target.classList.contains('delete-button')) {
      delete items[id];
      renderList(items);
    }

    if(event.target.classList.contains('plus-button')) {
      items[id].quantity++;
      renderList(items);
    }

    if(event.target.classList.contains('minus-button')) {
      if(items[id].quantity > 0){
        items[id].quantity--;
      }
      renderList(items);
    }
  });

  addButton.addEventListener('click', function (event) {
    const text = keyUpEvent.value;
    items[ nextId() ] = {name: text, quantity: 0};
    renderList(items); 
    keyUpEvent.value = '';
    addButton.disabled = true;
  });
  
  keyUpEvent.addEventListener('keyup', function (event) {
    const text = event.target.value;
    addButton.disabled = !text;
  });
  
  addButton.disabled = true;
  renderList(items);
})();