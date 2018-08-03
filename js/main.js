import fetchJSONP from 'fetch-jsonp';
import { isValidZip, showAlert } from './validate'

const petForm = document.querySelector('#pet-form');

petForm.addEventListener('submit', fetchAnimals);

function fetchAnimals(e) {
    e.preventDefault();

    const animal = document.querySelector('#animal').value;
    const zip = document.querySelector('#zip').value;

    if (!isValidZip(zip)) {
        showAlert('Please Enter a valid zipcode', 'warning');
        return;
    }

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
                    <h4 class="find-a-pet-style display-4 mb-4">${pet.name.$t} (${pet.age.$t})</h4>
                    <p class="text-info text-monospace">
                        ${pet.contact.address1.$t !== undefined ? pet.contact.address1.$t : ''}
                        ${pet.contact.city.$t}
                        ${pet.contact.state.$t}
                        ${pet.contact.zip.$t}
                    </p>
                    <ul class="list-group">
                        <li class="find-a-pet-container list-group-item text-monospace">
                            <strong>Phone:</strong> ${pet.contact.phone.$t !== undefined ? pet.contact.phone.$t : 'none'}
                        </li>
                        <li class="find-a-pet-container list-group-item text-monospace">
                            <strong>Email:</strong> ${pet.contact.email.$t !== undefined ? pet.contact.email.$t : 'none'}
                        </li>
                        <li class="find-a-pet-container list-group-item text-monospace">
                            <strong>Shelter ID:</strong> ${pet.shelterId.$t !== undefined ? pet.shelterId.$t : 'none'}
                        </li>
                    </ul>
                </div>
                <div class="col-sm-6 text-center">
                    <figure class="figure">
                      <img src="${pet.media.photos.photo[3].$t}" class="img-sepia figure-img img-fluid rounded float-right mt-3">
                      <figcaption class="figure-caption text-center" style="color: #82612B">
                        <strong>${pet.breeds.breed.$t !== undefined ? pet.breeds.breed.$t : ''}</strong>
                      </figcaption>
                    </figure>
                </div>
            </div>
        `;

        results.appendChild(div);
    });
}
