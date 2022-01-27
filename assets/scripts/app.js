const addMovieModel = document.getElementById('add-modal');
const startAddMovieButton = document.querySelector('header button');
const backdrop = document.getElementById('backdrop');
const canselAddMovieButton = addMovieModel.querySelector('.btn--passive');
const confirmAddMovieButton = addMovieModel.querySelector('.btn--success');
const userInputs = addMovieModel.querySelectorAll('input');
const entryTextSection = document.getElementById('entry-text');
const listRoot = document.getElementById('movie-list');
const deleteMovieModel = document.getElementById('delete-modal');

const movies = [];

const updateUI = () => {
    if (movies.length === 0){
        entryTextSection.style.display = 'block';
    } else {
        entryTextSection.style.display = 'none';
    }
};

const deleteMovieHandler = movieId => {
    let movieIndex = 0;
    for (let movie of movies){
        if (movie.id === movieId) {
            break;
        }
        movieIndex++;
    }
    movies.splice(movieIndex, 1);
    listRoot.children[movieIndex].remove();
    closeMovieDeletionModel();
    updateUI();
}

const closeMovieDeletionModel = () => {
    toggleBackdrop();
    deleteMovieModel.classList.remove('visible');
};

const startDeleteMovieHandler = (movieId) => {
    deleteMovieModel.classList.add('visible');
    toggleBackdrop();
    const canselDeletionButton = deleteMovieModel.querySelector('.btn--passive');
    let confirmDeletionButton  = deleteMovieModel.querySelector('.btn--danger');

    confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true));
    confirmDeletionButton = deleteMovieModel.querySelector('.btn--danger');
    canselDeletionButton.removeEventListener('click', closeMovieDeletionModel);

    canselDeletionButton.addEventListener('click', closeMovieDeletionModel);
    confirmDeletionButton.addEventListener('click', deleteMovieHandler.bind(null, movieId));
};

const renderNewMovieElement = (id, title, imageUrl, rating) => {
    const newMovieElement = document.createElement('li');
    newMovieElement.className = 'movie-element';
    newMovieElement.innerHTML = `
        <div class = "movie-element__image">
            <img src="${imageUrl}" alt=${title}>
        </div>
        <div class="movie-element__info">
            <h2>${title}</h2>
            <p>${rating}/5 stars</p>
        </div>
        `;
    newMovieElement.addEventListener('click', startDeleteMovieHandler.bind(null, id));
    listRoot.append(newMovieElement);
};

const toggleBackdrop = () => {
    backdrop.classList.toggle('visible');
};

const closeMovieModel = () => {
    addMovieModel.classList.remove('visible');
};

const showMovieModel = () => {
    addMovieModel.classList.add('visible');
    toggleBackdrop();
};

const backdropClickHandler = () => {
    closeMovieModel();
    closeMovieDeletionModel();
    clearMovieInput();
}

const clearMovieInput = () => {
    for (const userInput of userInputs) {
        userInput.value = '';
    }
};

const canselAddMovieHandler = () => {
    closeMovieModel();
    toggleBackdrop(); 
    clearMovieInput();
};

const addMovieHandler = () => {
    const titleValue = userInputs[0].value,
          imageUrlValue = userInputs[1].value,
          ratingValue = userInputs[2].value;

    if (titleValue.trim() === '' ||
        imageUrlValue.trim() === '' ||
        ratingValue.trim() === '' ||
        +ratingValue < 1 ||
        +ratingValue > 5
        ) {
            alert('please enter a valid value (rating between 1 and 5.)');
            return;
    }

    const newMovie = {
        id: Math.random() * Date.now(), //its not recommented I am using it for demonstration.
        title: titleValue,
        image: imageUrlValue,
        rating: ratingValue
    };
    movies.push(newMovie);
    console.log(movies);
    closeMovieModel();
    toggleBackdrop();
    clearMovieInput();
    renderNewMovieElement(newMovie.id, newMovie.title, newMovie.image, newMovie.rating);
    updateUI();
};

startAddMovieButton.addEventListener('click', showMovieModel);
backdrop.addEventListener('click', backdropClickHandler);
canselAddMovieButton.addEventListener('click', canselAddMovieHandler);
confirmAddMovieButton.addEventListener('click', addMovieHandler);

getDateAndTime();

function getDateAndTime(){
  const currentDateAndTime = new Date();
  let hour = currentDateAndTime.getHours(),
      minute = currentDateAndTime.getMinutes(),
      second = currentDateAndTime.getSeconds();

  if(minute < 10){
    minute = "0" + minute
  }

  if(second < 10){
    second = "0" + second
  }
  let getCurrentTime = hour + ":" + minute + ":" + second + " ";

  if(hour > 11){
    getCurrentTime += "P.M"
  }else{
    getCurrentTime += "A.M"
  }
  document.getElementById('time-update').innerHTML = getCurrentTime;
  setTimeout(getDateAndTime,1000);
}
