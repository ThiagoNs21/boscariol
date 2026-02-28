execComp({id:`menuMobile`,url:`menu.html`,content:`menu.json`});

window.closesMenu = function(){

    $menuMobile.style.display="none"; $menuBtClose.style.display = "none"; $menuBtOpen.style.display = "flex"; menuKey = false;

}

function runMenu(){
let menuKey = false
$menuMobileBt.addEventListener("click",()=>{

    switch(menuKey){
        case false: $menuMobile.style.display="flex"; $menuBtClose.style.display = "flex"; $menuBtOpen.style.display = "none"; menuKey = true; break
        default: $menuMobile.style.display="none"; $menuBtClose.style.display = "none"; $menuBtOpen.style.display = "flex"; menuKey = false; break
    }

});
}


let galleryList = [{ref:"project",max:10},{ref:"drill",max:5}];

function gallery(){

    let galleryCounter = 0;

    function galleryChangeIMage(index){
        if(galleryCounter>0&&galleryCounter<galleryList[index].max){
        }else if(galleryCounter>=galleryList[index].max){
            galleryCounter=0;
        }else if(galleryCounter<0){
            galleryCounter=galleryList[index].max-1;
        };
        __gallery[index].style.backgroundImage=`linear-gradient(var(--imgCover)),url(image/${galleryList[index].ref}${galleryCounter}.jpeg)`;
    }

    for(let index in galleryList){

        __galleryLeftBt[index].addEventListener("click",()=>{galleryCounter--;galleryChangeIMage(index)});
        __galleryRightBt[index].addEventListener("click",()=>{galleryCounter++;galleryChangeIMage(index)});
    };

};

function postLoad(){
for(let listItem of document.querySelectorAll(".listItem")){listItem.innerText==""?listItem.style.display="none":null;}
document.getElementById("main").style.display="flex";
document.getElementById("footer").style.display="flex";

}

