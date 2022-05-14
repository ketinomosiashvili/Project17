let mainWraperPost = document.getElementById('post-block');
let overlayContent = document.getElementById('overlay');
let closeOverlay = document.getElementById('close');
let content = document.getElementById('content');
let addButton = document.getElementById('add');
let postOverlay = document.getElementById('postoverlay');
let form = document.getElementById('form');

function ajax(url, callback) {
    let requist = new XMLHttpRequest();
    requist.open('GET', url);
    requist.addEventListener('load', function() {
        let data = JSON.parse(requist.responseText);
        callback(data);
    });

    requist.send();
}

ajax('https://jsonplaceholder.typicode.com/posts', function(data) {
    printData(data);
});

function printData(data) {
    data.forEach(element => {
        createPost(element);
    });

function createPost(item) {
    let divWraper = document.createElement('div');
    divWraper.classList.add('posts');
    divWraper.setAttribute('data-id', item.id);

    let h2Tag = document.createElement('h2');
    h2Tag.innerText = item.id;

    let h3Tag = document.createElement('h3');
    h3Tag.innerText = item.title;
    h3Tag.classList.add('h3-title')

    let deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete Post';
    deleteButton.setAttribute('data-id', item.id);
    deleteButton.classList.add('delete-post-button')

    divWraper.appendChild(h2Tag);
    divWraper.appendChild(h3Tag);
    divWraper.appendChild(deleteButton);

    divWraper.addEventListener('click', function(event) {
        let id = event.target.getAttribute('data-id');
        openOverlay(id);
    })

    deleteButton.addEventListener('click', function(event) {
        event.stopPropagation();
        let id = event.target.getAttribute('data-id');
        deletePost(id);
        divWraper.classList.add('delete-post');
    });

    mainWraperPost.appendChild(divWraper);

    console.log(divWraper);
}

function openOverlay(id) {
    overlayContent.classList.add('active');
    let url = `https://jsonplaceholder.typicode.com/posts/${id}`;

    ajax(url, function(data) {
        overlayFunction(data);
    })
    console.log(id);
}

function deletePost(id) {
    let url = `https://jsonplaceholder.typicode.com/posts/${id}`;
    fetch(url, {
        method: 'DELETE'
    })
}

function overlayFunction(item) {
    let titlePost = document.createElement('h3');
    titlePost.innerText = item.title; 

    let description = document.createElement('p');
    description.innerText = item.body;

    content.appendChild(titlePost);
    content.appendChild(description);
}

closeOverlay.addEventListener('click', function() {
    overlayContent.classList.remove('active');
    content.innerHTML = ' ';
})

addButton.addEventListener('click', function() {
    postOverlay.classList.add('active-add');
})

form.addEventListener('submit', function(event) {
    event.preventDefault();

    let formData = {
        title: event.target[0].value,
        body: event.target[1].value,
        
    }

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then((response) => response.json())
    .then((json) => console.log(json));
        console.log(formData);
        postOverlay.classList.remove('active-add');
        createPost(formData);
        
    })
}

