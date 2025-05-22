document.addEventListener('DOMContentLoaded', () => {
    const addBtn = document.getElementById('add-btn');
    const listBtn = document.getElementById('list-btn');
    const formContainer = document.getElementById('form-container');
    const listContainer = document.getElementById('list-container');
    const mainContainer = document.getElementById('container');
    const dataForm = document.getElementById('data-form');
    const dataList = document.getElementById('data-list');
    const cancelForm = document.getElementById('cancel-form');
    const backToMain = document.getElementById('back-to-main');
    const addParent = document.getElementById('add-parent');
    const parentContainer = document.getElementById('parent-container');
    const addFriend = document.getElementById('add-friend');
    const friendContainer = document.getElementById('friend-container');

    let dataStorage = [];
    let parentCount = 0; // Contador de padres

    const showSection = (section) => {
        mainContainer.classList.add('hidden');
        formContainer.classList.add('hidden');
        listContainer.classList.add('hidden');
        section.classList.remove('hidden');
    };

    addBtn.addEventListener('click', () => showSection(formContainer));
    listBtn.addEventListener('click', () => {
        populateList();
        showSection(listContainer);
    });
    cancelForm.addEventListener('click', () => showSection(mainContainer));
    backToMain.addEventListener('click', () => showSection(mainContainer));

    dataForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const rut = document.getElementById('rut').value;
        const dob = document.getElementById('dob').value;
        const birthplace = document.getElementById('birthplace').value;
        const address = document.getElementById('address').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;

        const parents = [...parentContainer.querySelectorAll('div')].map(parent => ({
            name: parent.children[0].value,
            rut: parent.children[1].value,
        }));

        const friends = [...friendContainer.querySelectorAll('div')].map(friend => ({
            rut: friend.children[0].value,
            description: friend.children[1].value,
        }));

        dataStorage.push({
            name, rut, dob, birthplace, address, phone, email, parents, friends,
        });

        alert('Datos guardados exitosamente');
        dataForm.reset();
        parentContainer.innerHTML = ''; // Reinicia el contenedor de padres
        parentCount = 0; // Reinicia el contador de padres
        addParent.disabled = false; // Reactiva el botón de agregar padres
        showSection(mainContainer);
    });

    addParent.addEventListener('click', () => {
        if (parentCount < 2) {
            const div = document.createElement('div');
            div.innerHTML = `
                <input type="text" placeholder="Nombre del padre/madre">
                <input type="text" placeholder="RUT del padre/madre">
            `;
            parentContainer.appendChild(div);
            parentCount++;

            if (parentCount === 2) {
                addParent.disabled = true;
            }
        }
    });

    addFriend.addEventListener('click', () => {
        const div = document.createElement('div');
        div.innerHTML = `<input type="text" placeholder="Nombre">
                        <input type="text" placeholder="RUT">
                         <input type="text" placeholder="Descripción">`;
        friendContainer.appendChild(div);
    });

    const populateList = () => {
        dataList.innerHTML = '';
        dataStorage.forEach((item, index) => {
            const li = document.createElement('li');
            const link = document.createElement('a');
            link.href = `view.html?index=${index}`; // Pasa el índice en la URL
            link.target = '_blank'; // Abre en una nueva pestaña
            link.textContent = item.name;
            li.appendChild(link);
            dataList.appendChild(li);
        });
    };
});
