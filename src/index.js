const toyCollectionDiv = document.getElementById('toy-collection');

// Fetch Andy's Toys on page load
fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(toys => {
    toys.forEach(toy => renderToyCard(toy));
  });

// Function to render a toy card
function renderToyCard(toy) {
  const card = document.createElement('div');
  card.classList.add('card');

  const name = document.createElement('h2');
  name.textContent = toy.name;

  const image = document.createElement('img');
  image.src = toy.image;
  image.classList.add('toy-avatar');

  const likes = document.createElement('p');
  likes.textContent = `${toy.likes} Likes`;

  const likeBtn = document.createElement('button');
  likeBtn.classList.add('like-btn');
  likeBtn.id = toy.id;
  likeBtn.textContent = 'Like ❤️';
  likeBtn.addEventListener('click', () => updateLikes(toy.id, likes));

  card.append(name, image, likes, likeBtn);
  toyCollectionDiv.appendChild(card);
}

// Handle new toy form submission 
const toyForm = document.getElementById('add-toy-form');
toyForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent default form submission

  const nameInput = document.getElementById('name');
  const imageInput = document.getElementById('image');

  const newToy = {
    name: nameInput.value,
    image: imageInput.value,
    likes: 0
  };

  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(newToy)
  })
  .then(response => response.json())
  .then(newToy => {
    renderToyCard(newToy);
    nameInput.value = ''; // Clear form inputs
    imageInput.value = '';
  });
});

// Function to update likes
function updateLikes(toyId, likesElement) {
  const currentLikes = parseInt(likesElement.textContent, 10);
  const newLikes = currentLikes + 1;

  fetch(`http://localhost:3000/toys/${toyId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ likes: newLikes })
  })
  .then(response => response.json())
  .then(updatedToy => {
    likesElement.textContent = `${updatedToy.likes} Likes`;
  });
}