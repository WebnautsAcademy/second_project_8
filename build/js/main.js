   let popUp = document.querySelector(".modal");
    let popUpAgree = document.querySelector(".modal-open");

    let button = document.querySelector(".modal-open");
    let popUpClose = document.querySelector('.modal__close');

    function showPopUpOnClick() {
        popUp.classList.add('modal-show');
    };
    function showPopUpDarkOnClick() {
        popUpAgree.classList.add('modal-show');
    };
    function closePopUpOnClick() {
        popUp.classList.remove('modal-show');
    }
    function closePopUpDarkOnClick() {
        popUpAgree.classList.remove('modal-show');

    }
    button.addEventListener("click", showPopUpOnClick);
popUpClose.addEventListener('click', closePopUpOnClick);