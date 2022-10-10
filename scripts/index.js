const API_URL = 'http://localhost:8000/api/pokemon';

const load = async () => {
    console.log('index loaded');

    //get poke types from api
    const types = await getTypes()
    console.log('types:', types);

    //get our pokeContainer
    const pokeContainer = document.querySelector('.pokeContainer');

    //forEach poke type
    for (let i = 0; i < types.length; i++) {
        const type = types[i];

        //make image and button for each poke type

        const img = document.createElement('img');
        img.src = type.image;
        img.style.width = '64px';
        img.style.height = '64px';

        const btn = document.createElement('button');
        btn.innerText = type.name;
        btn.addEventListener('click', async () => {
            //go to the page for the type
            window.location.href = `./type.html?type=${type.name}`;
        });

        //add the image and button to a div
        const div = document.createElement('div');
        div.appendChild(img);
        div.appendChild(btn);
        div.style.display = 'flex';
        div.style.flexDirection = 'column';
        // add the div to the pokeContainer
        pokeContainer.appendChild(div);
    }
};

window.addEventListener('load', load);
