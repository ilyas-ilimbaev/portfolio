$(document).ready(function() {
    const toggleMenu = document.querySelector('.toggle-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('#overlay');
    const bodyEl = document.body;
    const formEl = document.querySelector('.form-field');
    const FakeEl = document.querySelector('.fake-placeholder');

    //прослушиваем событие клик по гамбургеру
    toggleMenu.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        bodyEl.classList.toggle('noscroll');
    });

    //прослушиваем событие клик моб меню
    mobileMenu.addEventListener('click', function() {
        this.classList.remove('active');
        toggleMenu.classList.remove('active');
        overlay.classList.remove('active');
        bodyEl.classList.remove('noscroll');
    });

    //прослушиваем событие клик по overlay
    overlay.addEventListener('click', function(){
        this.classList.remove('active');
        toggleMenu.classList.remove('active');
        mobileMenu.classList.toggle('active');
        bodyEl.classList.toggle('noscroll');

    });
    //фильтрация проектов
    let containerEl = document.querySelector('#works-block');
    let mixer = mixitup(containerEl, {
        classNames: {
            block: ""
        }
    });
    formEl.addEventListener('click', function() {
        FakeEl.classList.toggle('active');
    });
    //изменение размера блока 
    // const BigElementBlock = document.querySelector('.portfolio-works__item--big');
    // $('.control-active').click(function(){
    //     BigElementBlock.classList.remove("portfolio-works__item--big");
    // });
});