(function iife() {

  const list = document.querySelector('.items-list');
  const login = document.querySelector('.login');
  const status = document.querySelector('.status');
  const addItem = document.querySelector('.add-item');
  const logout = document.querySelector('.logout');
  const loading = document.querySelector('.loading');

  const errMsgs = {
    'duplicate': 'That name already exists',
    'missing-name': 'Name field is empty',
    'network-error': 'There was a problem connecting to the network, try again',
    'not-found': 'Item does not exist',
    'uid-missing': 'UID is missing or empty',
    'uid-unknown': 'UID is unknown',
    'bad-login': 'Bad login',
  };

  function updateStatus( message ) {
    status.innerText = message;
  }

  function renderLoginPage() {
    list.innerHTML = '';
    addItem.innerHTML = '';
    logout.innerHTML = '';
    loading.innerHTML = '';
    const loginHtml = `
                        <input class="username" placeholder="enter username">
                        <button class="submit-button" type="button">Submit</button> `;
    login.innerHTML = loginHtml;
  }

  function renderLoadingPage(){
    login.innerHTML = '';
    list.innerHTML = '';
    addItem.innerHTML = '';
    logout.innerHTML = '';
    updateStatus('');
    loading.innerHTML = 'Loading....';
  }

  function renderItemsList(items) {
    login.innerHTML = '';
    loading.innerHTML = '';
    const itemListHtml = Object.keys(items).map((key) => {
    const item = items[key];
    return `
        <li class="item">
          <span class="item-name" data-id="${key}">${item.name}</span>
          <input class="item-quantity" data-id="${key}" value = "${item.quantity}">
          <button class="update-button" data-name="${key}">update</button>
          <button class="delete-button" data-name="${key}">X</button>
        </li>`
    }).join('');

    const addItemHtml = `
                <input class="add-item-name" placeholder="Item Name">
                <input class="add-item-quantity" placeholder="Item quantity" value=0>
                <button class="add-button">Add</button> `;
    const logoutHtml = `<button class="logout-button">Logout</button>`;
    logout.innerHTML = logoutHtml;
    addItem.innerHTML = addItemHtml;
    list.innerHTML = itemListHtml;
    const addButton = document.querySelector('.add-button');
    addButton.disabled = true;
  }

  function convertError(response) {
    if(response.ok) {
      return response.json();
    }
    return response.json()
    .then( err => Promise.reject(err) );
  }

  function getItemListAndRender() {
    fetch('/items/', {
      method: 'GET',
    })
    .catch( () => Promise.reject( { error: 'network-error' }) )
    .then(convertError)
    .then(items => {
      renderItemsList(items);
    })
    .catch( err => {
      updateStatus(errMsgs[err.error] || err.error);
      if(err.error === 'uid-missing' || err.error === 'uid-unknown'){
        renderLoginPage();
      }
    })
  }

  logout.addEventListener('click', (e) => {
    if(e.target.classList.contains('logout-button') ) {
      fetch(`/session/`, {
        method: 'DELETE'
      })
      .catch( () => Promise.reject( { error: 'network-error' }) )
      .then( convertError )
      .then( () => {
        renderLoginPage();
        updateStatus('');
      })
      .catch( err => {
        updateStatus(errMsgs[err.error] || err.error);
      });
    }
  });

  list.addEventListener('click', (e) => {
    if(e.target.classList.contains('delete-button') ) {
      const itemid = e.target.dataset.name;
      fetch(`/items/${itemid}`, {
        method: 'DELETE',
      })
      .catch( () => Promise.reject( { error: 'network-error' }) )
      .then( convertError )
      .then( () => {
        getItemListAndRender();
        updateStatus('');
      })
      .catch( err => {
        updateStatus(errMsgs[err.error] || err.error);
        if(err.error === 'uid-missing' || err.error === 'uid-unknown'){
          renderLoginPage();
        }else{
          getItemListAndRender();
        }
      });
    }
  });

  list.addEventListener('click', (e) => {
    if(e.target.classList.contains('update-button') ) {
      const itemid = e.target.dataset.name;
      const newQuantity = e.target.previousElementSibling.value;
      const item =
      {
        quantity: newQuantity,
      };
      fetch(`/items/${itemid}`, {
        body: JSON.stringify(item),
        headers: { 'Content-type': 'application/json' },
        method: 'PATCH',
      })
      .catch( () => Promise.reject( { error: 'network-error' }) )
      .then( convertError )
      .then( () => {
        getItemListAndRender();
        updateStatus('');
      })
      .catch( err => {
        updateStatus(errMsgs[err.error] || err.error);
        if(err.error === 'uid-missing' || err.error === 'uid-unknown'){
          renderLoginPage();
        }else{
          getItemListAndRender();
        }
      });
    }
  });

  login.addEventListener('click', (e) => {
    if(e.target.classList.contains('submit-button') ) {
      const usrName = document.querySelector('.username').value;
      const user = {
                      name : usrName,
                    };
      if(user) {
        fetch(`/session/`, {
          body: JSON.stringify(user),
          headers: { 'Content-type': 'application/json' },
          method: 'POST',
        })
        .catch( () => Promise.reject( { error: 'network-error' }) )
        .then(convertError)
        .then( () => {
          renderLoadingPage();
          getItemListAndRender();
          updateStatus('');
        })
        .catch( err => {
          updateStatus(errMsgs[err.error] || err.error);
          renderLoginPage();
        });
      }
    }
  });

  addItem.addEventListener('click', (e) => {
    if(e.target.classList.contains('add-button') ) {
      const itemName = document.querySelector('.add-item-name').value;
      const itemQuantity = document.querySelector('.add-item-quantity').value;
      const item = {
                    name: itemName,
                    quantity: itemQuantity,
                  };
      if(item.name) {
        fetch(`/items/`, {
          body: JSON.stringify(item),
          headers: { 'Content-type': 'application/json' },
          method: 'POST',
        })
        .catch( () => Promise.reject( { error: 'network-error' }) )
        .then(convertError)
        .then(() => {
          getItemListAndRender();
          updateStatus('');
        })
        .catch( err => {
          updateStatus(errMsgs[err.error] || err.error);
          if(err.error === 'uid-missing' || err.error === 'uid-unknown'){
            renderLoginPage();
          }else{
            getItemListAndRender();
          }
        });
      }
    }
  });

  addItem.addEventListener('keyup', function (event) {
    let targetValue = event.target.value;
    let previousToTarget = '';
    let nextToTarget = '';
    let disableFlag = true;
    try{
      previousToTarget = event.target.previousElementSibling.value;
    }catch(error){
      previousToTarget = '';
    }
    try{
      nextToTarget = event.target.nextElementSibling.value;
    }catch(error){
      nextToTarget = '';
    }
    if(targetValue && (previousToTarget || nextToTarget)){
      disableFlag = false;
    }
    document.querySelector('.add-button').disabled = disableFlag;
  });

  fetch('/session/', {
    method: 'GET',
  })
  .catch( () => Promise.reject( { error: 'network-error' }) )
  .then( convertError )
  .then(status => {
    if (status.statusCode == 100) {
      renderLoadingPage();
      getItemListAndRender();
      updateStatus('');
    } else {
      renderLoginPage();
    }
    updateStatus('');
  })
  .catch( err => {
    updateStatus(errMsgs[err.error] || err.error);
    renderLoginPage();
  });

})();
