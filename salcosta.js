// ------------------------
// Day/Night mode switch


const lightSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme'); //Reads theme from browser memory

if (currentTheme) { //Checks for current theme, adjusts
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        lightSwitch.checked = true;
    }
}

function switchTheme(e) { //Changes theme on checkbox
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
    else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }    
}

lightSwitch.addEventListener('change', switchTheme, false);

// Activate night switch via keyboard Enter
function switchThemeEnter(event) {
    if (event.key == "Enter") {
        lightSwitch.click();
    }
}


// --------------------------------
// Back to Top button


// show button after scrolling 120px
window.onscroll = function() {scrollAppearTopBtn()};

function scrollAppearTopBtn() {
    if (document.body.scrollTop > 120 || document.documentElement.scrollTop > 120) {
        document.getElementById("top-button").className = "button visible";
    } else {
        document.getElementById("top-button").className = "button hidden";
    }
}

// scroll to the top on click
function scrollToTop() {
    window.scrollTo({top: 0});
}

// Hide / Show scroll bar for pop ups

function hideScrollBars() {
    document.documentElement.style.overflowY = "hidden";
}
function showScrollBars() {
    document.documentElement.style.overflowY = "visible";
}


// --------------------------------------
// Responsive Navigation for mobile


var navResponsive = document.getElementById("header-nav");

function navOpen() {
    if (navResponsive.className === "header-container right") {
        navResponsive.className += " responsive";
    } else {
        navResponsive.className = "header-container right";
    }
}
function navClose() { // Closes responsive nav
    if (navResponsive.className === "header-container right responsive") {
        navResponsive.className = "header-container right";
    } else {
        navResponsive.className = "header-container right responsive";
    }
}


// ---------------------------------
// Toggle Photo Gallery

var galleryTabOpen = document.getElementsByClassName('gallery-tab digital');
function galleryToggle(element) {
    var gallery = document.getElementsByClassName('photo-gallery');
    var galleryTab = document.getElementsByClassName('gallery-tab');
    var selector = document.getElementsByClassName('selector-dot');
    if (element.className == "gallery-tab digital") {
        galleryTab[0].className = "gallery-tab digital open-tab";
        galleryTab[1].className = "gallery-tab film";
        gallery[0].className = "photo-gallery digital visible";
        gallery[1].className = "photo-gallery film hidden";
        selector[0].className = "selector-dot left";
        galleryTabOpen = document.getElementsByClassName('gallery-tab digital');
    }
    else if (element.className == "gallery-tab film") {
        galleryTab[0].className = "gallery-tab digital";
        galleryTab[1].className = "gallery-tab film open-tab";
        gallery[0].className = "photo-gallery digital hidden";
        gallery[1].className = "photo-gallery film visible";
        selector[0].className = "selector-dot right";
        galleryTabOpen = document.getElementsByClassName('gallery-tab film');
    }
    return galleryTabOpen;
}

// ---------------------------------
// Open photo modal and retrieve image


var modalIndex = 0;

function openModal(element) {
    document.getElementById("img00").src = element.getElementsByTagName('img')[0].src;

    if (element.className == "photo-tile film") {
        modalIndex = photoTilesFilmArray.indexOf(element);
    }
    else {
        modalIndex = photoTilesArray.indexOf(element);
    }

    if (element.getElementsByTagName('img')[0].className == "portrait") {
        document.getElementById("img00").className = "portrait";
    }
    else if (element.getElementsByTagName('img')[0].className == "") {
        document.getElementById("img00").className = "";
    }
    hideScrollBars();
    document.getElementById("modal00").className = "visible";
    var captionText = document.getElementById("caption");
    captionText.innerHTML = element.alt;

    return modalIndex;
}

// Close the modal
function closeModal() {
    document.getElementById("modal00").className = "hidden";
    showScrollBars();
}

// Next & Previous Photo functions
function galleryNext() {
    if (galleryTabOpen == document.getElementsByClassName('gallery-tab digital')) {
        if (modalIndex == (photoTilesArray.length - 1)) {
            openModal(photoTilesArray[0])
        }
        else {
            openModal(photoTilesArray[modalIndex + 1]);
        }
    }
    if (galleryTabOpen == document.getElementsByClassName('gallery-tab film')) {
        if (modalIndex == (photoTilesFilmArray.length - 1)) {
            openModal(photoTilesFilmArray[0])
        }
        else {
            openModal(photoTilesFilmArray[modalIndex + 1]);
        }
    }
}

function galleryPrevious() {
    if (galleryTabOpen == document.getElementsByClassName('gallery-tab digital')) {
        if (modalIndex == 0) {
            openModal(photoTilesArray[photoTilesArray.length - 1])
        }
        else {
            openModal(photoTilesArray[modalIndex - 1]);
        }
    }
    if (galleryTabOpen == document.getElementsByClassName('gallery-tab film')) {
        if (modalIndex == 0) {
            openModal(photoTilesFilmArray[photoTilesFilmArray.length - 1])
        }
        else {
            openModal(photoTilesFilmArray[modalIndex - 1]);
        }
    }

    
}

// Modal next & previous via swipe

let touchstartX = 0
let touchendX = 0

function checkSwipeDir() {
    if (document.getElementById("modal00").className == "visible") { // Check if modal opened
        if (touchendX < touchstartX) galleryPrevious();
        if (touchendX > touchstartX) galleryNext();
    }
}

document.addEventListener('touchstart', e => {
  touchstartX = e.changedTouches[0].screenX
})

document.addEventListener('touchend', e => {
  touchendX = e.changedTouches[0].screenX
  checkSwipeDir()
})

// Modal next & previous via arrow keys

document.addEventListener('keydown', function(event) {
    if (document.getElementById("modal00").className == "visible") { // Check if modal opened
        switch (event.key) {
            case 'ArrowLeft':
                galleryPrevious();
                break;
            case 'ArrowRight':
                galleryNext();
                break;
        }
    }
});

