import fetchJSONP from 'fetch-jsonp';

const petForm = document.querySelector('#pet-form');

petForm.addEventListener('submit', fetchAnimals);

function fetchAnimals(e) {
    e.preventDefault();

    const animal = document.querySelector('#animal').value;
    const zip = document.querySelector('#zip').value;

    fetchJSONP(`http://api.petfinder.com/pet.find?format=json&key=f17ffec197220acc8564aee272dd76e2&animal=${animal}&location=${zip}&callback=callback`, {jsonpCallbackFunction: 'callback'})
        .then(res => res.json())
        .then(data => showAnimals(data.petfinder.pets.pet))
        .catch(err => console.error(err));
}

function showAnimals(pets) {
    const results = document.querySelector('#results');

    results.innerHTML = '';

    pets.map(pet => {
        console.log(pet)
        const div = document.createElement('div');
        div.classList.add('card', 'card-body', 'mb-3');
        div.innerHTML = `
            <div class="row">
                <div class="col-sm-6">
                    <h4>${pet.name.$t} (${pet.age.$t})</h4>
                    <p4 class="text-secondary">
                        ${pet.breeds.breed.$t !== undefined ? pet.breeds.breed.$t : ''}
                    </p>
                    <p4>
                        ${pet.contact.address1.$t !== undefined ? pet.contact.address1.$t : ''}
                        ${pet.contact.city.$t}
                        ${pet.contact.state.$t}
                        ${pet.contact.zip.$t}
                    </p>
                    <ul class="list-group">
                        <li class="list-group-item">
                            Phone: ${pet.contact.phone.$t !== undefined ? pet.contact.phone.$t : 'none'}
                        </li>
                        <li class="list-group-item">
                            Email: ${pet.contact.email.$t !== undefined ? pet.contact.email.$t : 'none'}
                        </li>
                        <li class="list-group-item">
                            Shelter ID: ${pet.shelterId.$t !== undefined ? pet.shelterId.$t : 'none'}
                        </li>
                    </ul>
                </div>
                <div class="col-sm-6 text-center">
                </div>
            </div>
        `;

        results.appendChild(div);
    });
}

// function callback(data) {
//     console.log(data)
// }
