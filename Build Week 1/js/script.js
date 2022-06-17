//------------------------ HAMBURGER MENU -----------------------------------

function hamburger() {
    let hamList = document.getElementById("hamburger");
    if (hamList.style.display === "block") {
      hamList.style.display = "none";
    } else {
      hamList.style.display = "block";
    }
} 

//------------------------ NAVBAR --------------------------------------

//--- STICKY NAV ---
//Variables
var navbar = document.getElementById("navbar"); //navbar

//call functions
window.onscroll = function() {setSticky()};

//set function
function setSticky() {
  let sticky = navbar.offsetTop; //navbar dist from the top
  if (window.scrollY >= sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
}

//--- UNDERLINE ANCHOR ---

let sections = document.querySelectorAll('section[id]'); //list of sections

function underlineNav() {
  sections.forEach(element => {

    let sectionHeight = element.offsetHeight; //height of the section
    let sectionTop = element.offsetTop - 50; //current section distance from the top border of the main
    let sectionId = element.getAttribute('id'); //ID of the section
    
    /* if scrolled px > current section distance from the top and <= distance from the top + height of current section,
    underline the li in navbar;
    else, remove the underline */
    if (window.scrollY > sectionTop && window.scrollY <= sectionTop + sectionHeight) {
      document.querySelector(`#${sectionId}-link`).classList.add('underlined');
    } else {
      document.querySelector(`#${sectionId}-link`).classList.remove('underlined');
    }    
  });
}

window.addEventListener('scroll', underlineNav);//event onscroll

//--------------------------- SLIDER --------------------------------------

//Variables

let rightButton = document.getElementById("slide-right"),
  imgWidth = document.getElementById('slide-1').naturalWidth,
  slider = document.getElementById('slider'),
  sliderGap = parseInt(getComputedStyle(slider).gap.slice(0,2)),
  slides = document.querySelectorAll('.slide');

//functions
function endlessScroll() {
  let maxScroll = imgWidth*slides.length + sliderGap*(slides.length - 1) - 1; //end of slider div
  if (slider.offsetWidth + parseInt(slider.scrollLeft) >= maxScroll) { //if you reach the end, scroll back
    scrollBackInterval = setInterval(scrollBack, 1);
  }

};
function scrollBack(){
  slider.scrollLeft -= 1;
  if (slider.scrollLeft == 0) {
    clearInterval(scrollBackInterval);
  }
};

function scrollOn() {
  if (slider.scrollLeft % (imgWidth + sliderGap) == 0){ //if pixels scrolled are multiple of img width
    scrollForward = setInterval(stopScroll, 1) //scroll to the next img
  }
};

function stopScroll() {
  slider.scrollLeft += 1; //scroll 1px
  if (slider.scrollLeft % (imgWidth + sliderGap) == 0){ //if you reach next img in slider
    clearInterval(scrollForward) //stop scrolling
  } 
}


//button onclick event
rightButton.addEventListener("click", scrollOn);
slider.addEventListener("scroll", endlessScroll);
rightButton.addEventListener("click", 
  () => {console.log('scroll: ', slider.offsetWidth + parseInt(slider.scrollLeft), 'maxScroll: ',imgWidth*8 + sliderGap*7);})

//----------------------------------- FADE IN ------------------------------------------

let elToFade = document.querySelectorAll('.fade-in'); //list of fade-in elements

function fadeIn() {
  for (let i = 0; i < elToFade.length; i++) { //for each element in list
    let el = elToFade[i];
    let inView = el.getBoundingClientRect().top - window.innerHeight + 20;

    if (inView < 0) {//if element is inView, apply the InView class
      el.classList.add('inView');
    } else { //else, remove it
      el.classList.remove('inView');
    }
  }
};

//add onscroll event
window.addEventListener('scroll', fadeIn);

