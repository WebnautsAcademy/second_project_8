  let popUp = document.querySelector(".modal");
    let popUpAgree = document.querySelector(".modal__open");

    let btn = document.querySelector(".main__btn");
    let popUpClose = document.querySelector('.modal__btn');

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
    btn.addEventListener("click", showPopUpOnClick);
popUpClose.addEventListener('click', closePopUpOnClick);
