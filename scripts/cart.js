const API_URL = 'http://localhost:8000/api/pokemon';

let cart = [];
let totalValue = 0;

const getTotalVal = () => {
    let total = 0;

    for (let i = 0; i < cart.length; i++) {
        const pokemon = cart[i].pokemon;
        total += pokemon.price;
    }
    totalValue = total;

    const totalValueDiv = document.querySelector('.totalVal');
    totalValueDiv.innerText = '$' + totalValue.toFixed(2);

    return total;
};

const clearCart = async () => {
    const res = await fetch(`${API_URL}/cart`, {
        method: `DELETE`,
    });
    cart = [];
    getTotalVal();
    displayCart();
};

const checkOut = async () => {
    if (!getTotalVal()) {
        alert('Insert Items');
    } else {
        const val = totalValue
        await clearCart();
        setTimeout(() => alert(`Purchase Successful, $${val.toFixed(2)} has been charged to your account `), 100);
    }
};

const getCart = async () => {
    const pokemonList = await Pokemon.find({});
    res.status(200).json(pokemonList);
};

const removeFromCart = async (pokemon) => {
    console.log('removeFromCart called');

    const res = await fetch(`${API_URL}/cart/${pokemon.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(pokemon),
    });
    const data = await res.json();
    console.log('data', data);

    const firstIndex = cart.findIndex((cartItem) => {
        return cartItem.pokemon.id == pokemon.id;
    });

    cart = cart.filter((item, idx) => idx !== firstIndex);
    getTotalVal();
    displayCart();
};

const displayCart = () => {
    // get our cartContainer
    const cartContainer = document.querySelector('.cartContainer');
    cartContainer.innerHTML = '';

    // for each pokemon in cart
    for (let index = 0; index < cart.length; index++) {
        const pokemonData = cart[index].pokemon;

        // make an image and buy button for each pokemon
        const img = document.createElement('img');
        img.src = pokemonData.sprites.front_default;
        img.style.width = '64px';
        img.style.height = '64px';

        // add name
        const name = document.createElement('h6');
        name.innerText = pokemonData.name;

        // add price
        const price = document.createElement('h6');
        price.innerText = '$' + pokemonData.price.toFixed(2);

        let btn = document.createElement('button');
        btn.innerText = 'Remove from Cart';
        btn.addEventListener('click', async () => {
            // add pokemon to cart
            await removeFromCart(pokemonData);
        });

        // add the image an button to a div
        const div = document.createElement('div');
        div.appendChild(img);
        div.appendChild(name);
        div.appendChild(price);
        div.appendChild(btn);
        div.style.display = 'flex';
        div.style.flexDirection = 'column';
        div.style.alignItems = 'center';
        div.style.padding = '20px';

        // add image and button to typeContainer
        cartContainer.appendChild(div);
    }
};

const load = async () => {
    console.log('cart js loaded');
    const cartRes = await fetch(`${API_URL}/cart`);
    cart = await cartRes.json();
    getTotalVal();
    displayCart();
};

window.addEventListener('load', load);
