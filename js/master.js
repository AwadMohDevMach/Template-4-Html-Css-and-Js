
// select landing page element 
let landingPage = document.querySelector(".landing-page")
let toogleSettings = document.querySelector(".toogle-settings")
let gear = document.querySelector(".toogle-settings i")
let settingBox = document.querySelector(".settings-box")
let randomSpan = document.querySelectorAll(".random-backgrands span")

// backgrand option 
let backgrandOption = true;

// variable to control interval
let bachgroundInterval;

// array is 
let imagsArray = ['image1.jpeg','image2.jpeg','image3.jpeg','image4.jpeg','image5.jpeg']


// check if there's local storage random background item 
let backgrandLocalItem = localStorage.getItem("background_option")

// check if random background  local storage is not empty
if(backgrandLocalItem !== null){
    // console.log(backgrandLocalItem)
    if (backgrandLocalItem === 'true'){
        backgrandOption = true;
    }else { 
        backgrandOption=false;
    }
    // remove class active on all sapn  
    hendleClasssActive(randomSpan)
    
}

function hendleClasssActive(e){
    removeActive(e)
    if(backgrandLocalItem === 'true'){
        document.querySelector(".yes").classList.add("active")
    }else if(backgrandLocalItem === 'fales'){
        document.querySelector(".no").classList.add("active")
    }
}


function removeActive(e){
    e.forEach(el => {
        el.classList.remove("active")
    })
}

// chech there is colorlocal strage 
let mainColor = localStorage.getItem("color_option")


if(mainColor !== null){
    document.documentElement.style.setProperty('--main-color' , mainColor)

     // remove active class from all colors list items
     document.querySelectorAll(".colors-list li").forEach((ele =>{
        ele.classList.remove("active");

    // if data-color === main color in local storage 
    if (ele.dataset.color === mainColor){

        // add class active 
        ele.classList.add("active");
    }
    }))
}

// add class clicked on setting Box
toogleSettings.addEventListener("click" , function(){
    // toogle class fa-spin for rotation on self 
    gear.classList.toggle("fa-spin")

    // toogle class clicked on main setting box
    settingBox.classList.toggle("clicked")
})


// switch colors 
const colorsLi = document.querySelectorAll(".colors-list li")

// loop on all list items
colorsLi.forEach(li => {

    // loop on list items
    li.addEventListener("click" , (e) =>{
        
        // set color on root 
        document.documentElement.style.setProperty('--main-color' , e.target.dataset.color)

        // set color on local storage
        localStorage.setItem("color_option" ,  e.target.dataset.color)

        hanfleActive(e)
    })
})

// switch random backgrands option 
const randomBacEl = document.querySelectorAll(".random-backgrands span")

// loop on all list spans
randomBacEl.forEach(span => {

    // loop on list span
    span.addEventListener("click" , (e) =>{
        
        hanfleActive(e);
        
        // add active class on element clicked
        if (e.target.dataset.backgrand === 'yes'){

            backgrandOption = true;

            randomizeImgas()

            localStorage.setItem("background_option" , true)
        }else if(e.target.dataset.backgrand === 'no'){
            backgrandOption = false;

            clearInterval(bachgroundInterval)

            localStorage.setItem("background_option" , false)
        }else{
            landingPage.style.backgroundImage = 'url("/imags/' + imagsArray[0] + '")';

            clearInterval(bachgroundInterval)

            location.setItem("background_option" , e.target.dataset.backgrand = 'one')
        }
    })
})


// function to rndomize imgs 
function randomizeImgas(){
    if (backgrandOption === true){
        bachgroundInterval = setInterval(function(){
            //  get random number
            let randomNumber = Math.floor(Math.random() *imagsArray.length)
        
            // change background image url 
            landingPage.style.backgroundImage = 'url("/imags/' + imagsArray[randomNumber] + '")';
        
            // add transition on landing page 
            landingPage.style.transition = ".3s"
        },3000)
    }
}
randomizeImgas()



// select skills selector
let ourSkllis = document.querySelector(".skills")

window.onscroll = function(){

    // skills offset top 
    let skillsOffsetTop = ourSkllis.offsetTop; // this is over the skills section 

    // skills outer height 
    let skillsOuterHeight = ourSkllis.offsetHeight; //this is height of skills including borders 
    console.log(skillsOuterHeight)

    // window height 
    let windowHeight = this.innerHeight; // this is height the window scroll 

    // window Scrolltop
    let windowScrollTop = this.pageYOffset; 

    if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)){
        
        let allSkills = document.querySelectorAll(".skill-box .skill-progress span")

        allSkills.forEach(skill =>{
            skill.style.width = skill.dataset.progress
        })
    }

}
// create popup with the image 
let ourGallery = document.querySelectorAll(".gallery img")

ourGallery.forEach(img =>{

    img.addEventListener("click" , (e) =>{
        
        // create overlay element 
        let overlay = document.createElement("div")

        // add class to overlay
        overlay.className = 'popup-overlay';

        //append overlay to the bodey
        document.body.appendChild(overlay)

        // create popup 
        let popupBox = document.createElement("div")

        // add class to the popup bos 
        popupBox.className = 'popup-box'

        if (img.alt !== null){
            
            // create heading 
            let imgHeading = document.createElement("h3")

            // create text img heading
            let textHeading = document.createTextNode(img.alt)

            // append text to heading img
            imgHeading.appendChild(textHeading)

            popupBox.appendChild(imgHeading)

        }

        // create the image 
        let popupImag = document.createElement("img")

        // add class on image
        popupImag.className = 'popup-image'

        // set image source 
        popupImag.src = img.src;

        // add image to popup box 
        popupBox.appendChild(popupImag);

        // append the popup box to body 
        document.body.appendChild(popupBox)

        // create the close span
        let closebutton = document.createElement("span")

        // add class on close button
        closebutton.className = 'close-button'

        // create text close button
        let textClose = document.createTextNode("X")

        // append text close to close button
        closebutton.appendChild(textClose)

        // append the close button to popup box
        popupBox.appendChild(closebutton)

    })

})

document.addEventListener('click' , function(e){

    if(e.target.className === 'close-button'){

    // remove the current poppup
    e.target.parentElement.remove();

    // remove overlay
    document.querySelector(".popup-overlay").remove();
    }
})

// select all bullets 
 const allBullets = document.querySelectorAll(".nav-bullets .bullet");

// Select all links 
const alllinks = document.querySelectorAll(".links a")



// create function scroll any where
function scroolToSomeWhere (elements){

    elements.forEach(el =>{
    
        el.addEventListener("click",(e) =>{
    
            document.querySelector(e.target.dataset.section).scrollIntoView({
    
                behavior: 'smooth'
    
            })
    
        })
    
    })
}

scroolToSomeWhere(allBullets)
scroolToSomeWhere(alllinks)

// handle active state 
function hanfleActive(ev){

   // remove active class from all childrens
    ev.target.parentElement.querySelectorAll(".active").forEach((ele =>{
            ele.classList.remove("active");
        }))
        // add active class on element clicked
        ev.target.classList.add("active");
}

let bulletsSpans = document.querySelectorAll(".bullets-options span")

let bulletsContainer = document.querySelector(".nav-bullets")

let bulletLocalItem = localStorage.getItem("bullets_item")

if(bulletLocalItem !== null){
    
    bulletsSpans.forEach(span =>{

        span.classList.remove("active")

    })
    
    if(bulletLocalItem === "block"){

        bulletsContainer.style.display = "block"

        document.querySelector(".bullets-options .yes").classList.add("active")

    }else{

        bulletsContainer.style.display = "none"

        document.querySelector(".bullets-options .no").classList.add("active")
    }
}

bulletsSpans.forEach(span => {

    span.addEventListener("click" , (e) => {

        if(e.target.dataset.display === 'show'){

            bulletsContainer.style.display = "block"

            localStorage.setItem("bullets_item" , "block")

        }else{
            bulletsContainer.style.display = "none"

            localStorage.setItem("bullets_item" , "none")
        }

        hanfleActive(e)

    })
})

// reset button
document.querySelector(".reset-options").onclick = function(){

    // localStorage.clear();
    localStorage.removeItem("saad");
    localStorage.removeItem("background_option");
    localStorage.removeItem("bullets-options");
    localStorage.removeItem("bullets_item");
    localStorage.removeItem("color_option");

    // window relod
    window.location.reload();
}


// toggle menue
let toggleBtn = document.querySelector(".toggle-menu");
let Tlinks = document.querySelector(".links")
let LisLinks = document.querySelectorAll(".links.open li a")


toggleBtn.onclick = function(){

    // toogle class menu active on button
    toggleBtn.classList.toggle("menu-active")

    // toggle class "open" on links
    Tlinks.classList.toggle("open")

}

// click anyw

document.addEventListener("click" , (e) =>{

    if(e.target !== toggleBtn && e.target !== Tlinks ){

        if(Tlinks.classList.contains("open")){
           // toogle class menu active on button
        toggleBtn.classList.toggle("menu-active")

        // toggle class "open" on links
        Tlinks.classList.toggle("open")
        }
        
    }
})
Tlinks.onclick = function(e){
    e.stopPropagtion();
}