$(document).ready(function() {
    	// ==== link-relocation-delay ====
	$(function () {
		$("a[href^='#']").click(function () {
			var _href = $(this).attr("href");
			$("html, body").animate({ scrollTop: $(_href).offset().top + "px" });
			return false;
		});
	});
    const toggleMenu = document.querySelector('.toggle-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('#overlay');
    const bodyEl = document.body;
    const formEl = document.querySelectorAll('.form-field');

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
    //form placeholder
    for(let item of formEl){
        const thisParent = item.closest('.form-item');
        const FakeEl = thisParent.querySelector('.fake-placeholder');
        //если инпут в фокусе
        item.addEventListener('focus', function(){
            FakeEl.classList.add('active');
        });

        //если инпут теряет фокус
        item.addEventListener('blur', function(){

            if(item.value.length > 0) {
                FakeEl.classList.add('active');
            }
            else {
                FakeEl.classList.remove('active');
            }
        });
    }
    //form validate
    $('.contact-form').validate ({
        rules: {
            email: {
                required: true,
                email: true
            },
            subject: {
                required: true
            },
            message: {
                required: true
            }
        },
        messages: {
            email: {
                required: 'Введите email',
                email: 'отсутствует символ @'
            },
            subject: {
                required: 'Введите тему сообщения'
            },
            message: {
                required: 'Введите сообщение'
            }
        }
    })
    //dots
    // Create page-nav dots
	$("#page-nav").onePageNav({
		currentClass: "active",
		changeHash: false,
		scrollSpeed: 750,
		scrollThreshold: 0.5,
		filter: "",
		easing: "swing",
		begin: function () {},
		end: function () {},
		scrollChange: function ($currentListItem) {},
	});
    //отправка данных
    // $('.contact-form').submit(function(){
    //     let string = $(".contact-form").serialize();
    //     $.ajax({
    //         type: "POST",
    //         url: "libs/php/mail.php",
    //         data: string,
    //         success: function (html) {
    //             $(".contact-form").slideUp(800);
    //             $(".answer").html(html);
    //         },
    //     });
    //     return false;
    // });
    //send mail
    $(".form-btn-submit").click(function(){
        sendAjaxForm('answer', '#contact_form', '../libs/php/mail.php');
        return false; 
        });

    function sendAjaxForm(answer, contact_form, url) {
    $.ajax({
        url:     url, //url страницы (action_ajax_form.php)
        type:     "POST", //метод отправки
        dataType: "html", //формат данных
        data: contact_form.serialize(),  // Сеарилизуем объект
        success: function(response) {
            result = jQuery.parseJSON(response);
            document.getElementById(answer).innerHTML = "Данные отправленны.";
        },
        error: function(html) { // Данные не отправлены
            document.getElementById(answer).innerHTML = "Ошибка. Данные не отправленны.";
        }
    });
    }
    return false;
});