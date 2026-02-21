(()=>{
let baseUrl = ""
function execData(...data){
for(let content of data){
//compReload(`${content}.html`);
execComp({id:`${content}`,url:`${baseUrl}${content}.html`,content:`${baseUrl}${content}.json`});
//compReload(`${baseUrl}${content}.html`);
}}

execData("header","main","footer");
execData("menu","servicesDrillingSectionList","servicesEngineerSectionList","trainingList","professionalBackgroundServiceExecutionList","professionalBackgroundProjectList");

//compReload(`menu.html`);
execComp({id:`menuMobile`,url:`${baseUrl}menu.html`,content:`${baseUrl}menu.json`});

setTimeout(()=>{
for(let listItem of document.querySelectorAll(".listItem")){listItem.innerText==""?listItem.style.display="none":null;console.log(listItem.innerText)}
document.getElementById("main").style.display="flex";
document.getElementById("footer").style.display="flex";

ref("#menuMobileBt");
ref("#menuMobile");
ref("#menuBtOpen");
ref("#menuBtClose");

window.closesMenu = function(){

    $menuMobile.style.display="none"; $menuBtClose.style.display = "none"; $menuBtOpen.style.display = "flex"; menuKey = false;

}

let menuKey = false
$menuMobileBt.addEventListener("click",()=>{

    switch(menuKey){
        case false: $menuMobile.style.display="flex"; $menuBtClose.style.display = "flex"; $menuBtOpen.style.display = "none"; menuKey = true; break
        default: $menuMobile.style.display="none"; $menuBtClose.style.display = "none"; $menuBtOpen.style.display = "flex"; menuKey = false; break
    }

});

},2000);
})();
