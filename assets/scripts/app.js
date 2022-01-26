const addMovieModel = document.getElementById('add-modal');
const startAddMovieButton = document.querySelector('header button');
const backdrop = document.getElementById('backdrop');
const canselAddMovieButton = addMovieModel.querySelector('.btn--passive');
const confirmAddMovieButton = addMovieModel.querySelector('.btn--success');
const userInputs = addMovieModel.querySelectorAll('input');
const entryTextSection = document.getElementById('entry-text');

const movies = [];

const updateUI = () => {
    if (movies.length === 0){
        entryTextSection.style.display = 'block';
    } else {
        entryTextSection.style.display = 'none';
    }
};

const toggleBackdrop = () => {
    backdrop.classList.toggle('visible');
};

const toggleMovieModel = () => {
    addMovieModel.classList.toggle('visible');
    toggleBackdrop();
};

const backdropClickHandler = () => {
    toggleMovieModel();
}

const clearMovieInput = () => {
    for (const userInput of userInputs) {
        userInput.value = '';
    }
};

const canselAddMovieHandler = () => {
    toggleMovieModel();
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
        title: titleValue,
        image: imageUrlValue,
        rating: ratingValue
    };
    movies.push(newMovie);
    console.log(movies);
    toggleMovieModel();
    clearMovieInput();
    updateUI();
};

startAddMovieButton.addEventListener('click', toggleMovieModel);
backdrop.addEventListener('click', backdropClickHandler);
canselAddMovieButton.addEventListener('click', canselAddMovieHandler);
confirmAddMovieButton.addEventListener('click', addMovieHandler);