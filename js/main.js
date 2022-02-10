'use strict'

var $burger, $nav, $navItemsContainer, $navItems, $navItemOffer, $navItemAboutus, $aboutusSection, $offerSection, $sections, $nextCardBtn, $previousCardBtn, $firstOfferCard, $secondOfferCard, $cardTitles, $cardTexts, $elementsToAnimation, $images;
let $oldScroll = 0;

const $offerItems = [
    {
        id: "0",
        title: "Sprzątanie domów i mieszkań",
        text: "Wycieramy kurz ze wszytkich powierzchni otwartych, odkurzamy i myjemy podłogi, zbieramy i wyrzucamy śmieci.",
        imgSrc: "img/home_640.webp"
    },
    {
        id: "1",
        title: "Dezynfekcja",
        text: "Dezynfekujemy pomieszczenia, używając wyłącznie produktów posiadających wymagane atesty.",
        imgSrc: "img/dez_640.webp"
    },
    {
        id: "2",
        title: "Mechaniczne mycie podłóg",
        text: "Pracujemy na nowoczesnym sprzęcie, który zapewnia najwyższą jakość usług.",
        imgSrc: "img/floors_640.webp"
    },
    {
        id: "3",
        title: "Sprzątanie powierzchni sklepowych",
        text: "Obsługujemy sklepy wielkopowierzchniowe, dbając o ich czytość w ciągu dnia.",
        imgSrc: "img/markets_640.webp"
    },
    {
        id: "4",
        title: "Sprzątanie biur i obiektów sportowych",
        text: "Duże powierzchnie to dla nas żaden problem. Zadbamy o Twoje miejsce pracy/czystość podczas imprezy.",
        imgSrc: "img/office_640.webp"
    },
    {
        id: "5",
        title: "Sprzątanie poremontowe",
        text: "Oferujemy sprzątanie poremontowe dla firm budowlanych.",
        imgSrc: "img/renovations_640.webp"
    },
    {
        id: "6",
        title: "Sprzątanie osiedli i przeprowadzki",
        text: "Specjalizujemy się w kompleksowym sprzątaniu osiedli mieszkaniowych. W swojej ofercie posiadamy również transport wyposażenia lokali.",
        imgSrc: "img/estate_640.webp"
    },
    {
        id: "7",
        title: "Alpinistyczne mycie okien",
        text: "Mycie okien na wysokościach to nasza specjalność. Usługę tą można zamówić również w pakiecie ze sprzątaniem biur.",
        imgSrc: "img/windows_640.webp"
    }
    

]

const prepareDOMElements = () => {
    $burger = document.querySelector('.hamburger');
    $nav = document.querySelector('.nav');
    $navItemsContainer = document.querySelector('.nav__items');
    $navItems = document.querySelectorAll('.nav__item');
    $navItemOffer = document.querySelector('.nav__item--offer');
    $navItemAboutus = document.querySelector('.nav__item--aboutus');
    $aboutusSection = document.querySelector('.aboutus');
    $offerSection = document.querySelector('.offer');
    $sections = document.querySelectorAll('.scroll-spy');
    $nextCardBtn = document.querySelector('.offer__card-right-icon');
    $previousCardBtn = document.querySelector('.offer__card-left-icon');
    $secondOfferCard = document.querySelector('.offer__card--second');
    $firstOfferCard = document.querySelector('.offer__card--first');
    $elementsToAnimation = document.getElementsByClassName('os');
    $images = document.getElementsByTagName('img')

}

const prepareDOMEvents = () => {
    $burger.addEventListener("click", handleToggleNav);
    window.addEventListener("scroll", handleShowNaw);
    window.addEventListener("scroll", scrollSpy);
    $navItemAboutus.addEventListener("click", handleHideNav);
    $navItemOffer.addEventListener("click", handleHideNav);
    $nextCardBtn.addEventListener("click", handleCarousel);
    $previousCardBtn.addEventListener("click", handleCarousel);
    window.requestAnimationFrame(osDavingin);
    window.addEventListener('scroll', osDavingin);
    scrollSpy();
    osDavingin();
}

const osDavingin = () => {
    let bufor = (window.innerWidth > 992) ? 210 : 150
    for(let element of $elementsToAnimation) {
        if(element.getBoundingClientRect().top <= (window.innerHeight - bufor)) {
            element.classList.add('os--active');
        };
    };
};

const handleCarousel = (e) => {

    let firstCardImg = $firstOfferCard.querySelector('.offer__card-img');
    let secondCardImg = $secondOfferCard.querySelector('.offer__card-img');
    let firstCardTitle = $firstOfferCard.querySelector('.offer__card-title');
    let secondCardTitle = $secondOfferCard.querySelector('.offer__card-title');
    let firstItemText = $firstOfferCard.querySelector('.offer__card-text');
    let secondItemText = $secondOfferCard.querySelector('.offer__card-text');
    let windowWidth = window.innerWidth;
    let activeItemFirst = parseInt($firstOfferCard.getAttribute("data-idItem"));
    let activeItemSecond = parseInt($secondOfferCard.getAttribute("data-idItem"));
    let newItemFirst;
    let newItemSecond;
    
    if(e.target.classList.contains('offer__card-right-icon')) {
        if(windowWidth > 992) {
            if(activeItemFirst === 6) {
                newItemFirst = 0;
                newItemSecond = 1;
            } else {
                newItemFirst = activeItemFirst + 2;
                newItemSecond = activeItemSecond + 2;
            }
        } else {
            if(activeItemFirst === 7) {
            newItemFirst = 0;
            } else {
            newItemFirst = activeItemFirst + 1;
            }
        }
    } else if (e.target.classList.contains('offer__card-left-icon')) {
        if(windowWidth > 992) {
            if(activeItemFirst === 0) {
                newItemFirst = 6;
                newItemSecond = 7;
            } else {
                newItemFirst = activeItemFirst - 2;
                newItemSecond = activeItemSecond - 2;
            }
        } else {
            if(activeItemFirst === 0) {
                newItemFirst = 7;
            } else {
                newItemFirst = activeItemFirst - 1;
            }
        }
    }
    
    firstCardImg.classList.add('transparent');
    if(windowWidth > 992) {
        secondCardImg.classList.add('transparent');
    }

    setTimeout(() => {
        firstCardTitle.innerText =  $offerItems[newItemFirst].title;
        firstItemText.innerText = $offerItems[newItemFirst].text;
        firstCardImg.setAttribute("src", $offerItems[newItemFirst].imgSrc);
        $firstOfferCard.setAttribute("data-idItem", newItemFirst);
        if(windowWidth > 992) {
            secondCardTitle.innerText =  $offerItems[newItemSecond].title;
            secondItemText.innerText = $offerItems[newItemSecond].text;
            secondCardImg.setAttribute("src", $offerItems[newItemSecond].imgSrc);
            $secondOfferCard.setAttribute("data-idItem", newItemSecond);
        }
    }, 310)

    setTimeout(() => {
        firstCardImg.classList.remove('transparent');
        if(windowWidth > 992) {
            secondCardImg.classList.remove('transparent');
        }
    }, 330)
}

const scrollSpy = () => {
    for(let section of $sections) {
        let sectionId = section.getAttribute('id');
        if (window.pageYOffset >= (section.offsetTop - 300) && (window.pageYOffset < (section.offsetTop + section.clientHeight - 360))) {
            for(let menuLink of $navItems) {
                if(menuLink.getAttribute('href') == `#${sectionId}`) {
                    menuLink.classList.add('nav__item--active');
                };
            };
        } else {
            for(let menuLink of $navItems) {
                if(menuLink.getAttribute('href') == `#${sectionId}`) {
                    menuLink.classList.remove('nav__item--active');
                };
            };
        };
    };
};

const handleHideNav = () => {
    const hideNavOfferAndAboutus = () => {
        if((($aboutusSection.offsetTop === window.pageYOffset) || ($offerSection.offsetTop === window.pageYOffset)) && !($nav.classList.contains('nav--open'))) {
            $nav.classList.add('nav--hidden');
            setTimeout(() => window.removeEventListener("scroll", hideNavOfferAndAboutus), 100);
        };
    };
    window.addEventListener("scroll", hideNavOfferAndAboutus);
}

const handleToggleNav = () => {
    $burger.classList.toggle('is-active');
    $navItemsContainer.classList.toggle('nav--open');
    document.body.classList.toggle('sticky-body');

    for (let navItem of $navItems) {
        const handleNavMobile = () => {
            $burger.classList.remove('is-active');
            $navItemsContainer.classList.remove('nav--open');
            document.body.classList.remove('sticky-body');
        };
        
        if ($navItemsContainer.classList.contains('nav--open')) {
            navItem.addEventListener("click", handleNavMobile);
        } else {
            navItem.removeEventListener("click", handleNavMobile);
        };
    };
};

const handleShowNaw = () => {
        if((window.pageYOffset > 300) && window.pageYOffset > $oldScroll) {
            $nav.classList.add('nav--hidden');
        } else {
            $nav.classList.remove('nav--hidden');
        }
        $oldScroll = (window.pageYOffset <= 0 ? 0 : window.pageYOffset);
}

const detectBrowser = () => {
    var ua = navigator.userAgent.toLowerCase(); 
    if (ua.indexOf('safari') != -1) { 
        if (ua.indexOf('chrome') > -1) {
            console.log("chrome");
            for(let image of $images) {
                let newSource = `${image.getAttribute('src').slice(0, -5)}.jpg`;
                image.src = newSource;
            }
            for(let item of $offerItems) {
                let newSource = `${item.imgSrc.slice(0, -5)}.jpg`;
                item.imgSrc = newSource;
            }
        } 
    }
}

const main = () => {
    prepareDOMElements();
    prepareDOMEvents();
    detectBrowser();
};

document.addEventListener('DOMContentLoaded', main);