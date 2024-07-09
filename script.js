const leftBtn = document.querySelector('#left');
const rightBtn = document.querySelector('#right');
const carouselBox = document.querySelectorAll('.carousel');
const carousel = document.querySelector('.carousel');
let arrowIcons = document.querySelectorAll('.wrapper i');
let firstImg = carousel.querySelectorAll('img')[0];
let firstImgWidth = firstImg.clientWidth + 14; //getting first img width and adding margin value
console.log(firstImgWidth);
let counter = 0;
let isDragStart = false,prevPageX,prevScrollLeft;

function moveImgLeft(){
    carouselBox.forEach((e)=>{
        if(counter < e.children.length){
            let curImg = e.children;
            curImg[counter].style.display = 'none';
            counter++; 
        }
    })
}

const showHideIcon = () =>{
    arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
}
arrowIcons.forEach(icon =>{
    icon.addEventListener('click',()=>{
        //If clicked icon is left, reduce width from the carousel scroll left else add to it
        carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcon(),60);
    });
});

const draggingStart = (e) => {
    //updating global variables value on mousedown event
    isDragStart = true;
    prevPageX = e.pageX;
    // console.log("Prev page X : ",prevPageX);
    prevScrollLeft = carousel.scrollLeft;
    // console.log("prev scroll left",prevScrollLeft);
}

const dragging = (e) => {
    //scrolling images/carousel to left according to mouse pointer

    // console.log(e.pageX); //pageX returns horizontal coordinates of mouse pointer
    // scrollLeft set or return the no. of pixels an element content is scrolled horizontally
    if(!isDragStart) return;
    e.preventDefault();
    carousel.classList.add("dragging");
    // console.log(carousel.scrollLeft);
    let positionDiff = e.pageX - prevPageX;
    // console.log("Position Diff", positionDiff);
    // console.log("prev Scroll", prevScrollLeft);
    carousel.scrollLeft = prevScrollLeft - positionDiff; 
}

const draggingStop = () => {
    carousel.classList.remove("dragging");
    isDragStart = false;
}

carousel.addEventListener('mousemove',dragging);
carousel.addEventListener('mousedown',draggingStart);
carousel.addEventListener('mouseup',draggingStop);
// rightBtn.addEventListener('click',moveImgLeft);
// leftBtn.addEventListener('click',moveImgRight);