const STORE_KEY = 'groceryList';

function updateDataStore(items = []) {
    localStorage.setItem(STORE_KEY, JSON.stringify(items));
}

function getFromDataStore() {
    return localStorage.getItem(STORE_KEY);
}

function get() {
    const items = getFromDataStore();
    return items ? JSON.parse(items) : []
};

function getbyId(id) {
    const item = get().filter(i => i.id === id);
    return (item && item.length) ? item[0] : {};
};

function edit(id, name, quantity, total) {
    let items = get();
    items = items.map(function (item) {
        if (item.id === id) {
            item.name = name;
            item.quantity = quantity;
            item.total = total;
        }
        return item;
    });
    updateDataStore(items);
}

function editQuantity(id) {
    let items = get();
    items = items.map(function (item) {
        if (item.id === id) {
            item.quantity = item.quantity-1;
            item.total = (Number(item.quantity) * Number(item.price)).toFixed(2)
        }
        return item;
    });
    updateDataStore(items);
}

const helpers = {
    get,
    getbyId,
    createOrUpdate: (id, name, quantity, price, total) => {
        const item = getbyId(id);
        if (item && item.id) {
            return edit(id, name, quantity, total);
        }
        const grocery = { id, name, quantity, price, total };
        const items = get();
        items.push(grocery);
        updateDataStore(items);
    },
    removeOne: (id, name, quantity, price, total) => {
        const item = getbyId(id);
        if (item && item.id) {
            if (item.quantity === 1) {
                let items = get();
                items = items.filter((item) => (item.id !== id));
                updateDataStore(items);
                return;
            }
            return editQuantity(id);
        }

        const grocery = { id, name, quantity, price, total };
        const items = get();
        items.push(grocery);
        updateDataStore(items);
    },
    remove: (id) => {
        let items = get();
        items = items.filter((item) => (item.id !== id));
        updateDataStore(items);
    },
    clear: () => updateDataStore(),
};

export default helpers;