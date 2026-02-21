
async function execComp(argument){

let text = "";
let component = (await(await fetch(`${argument.url}`)).text());

/*
if(localStorage.getItem(argument.url)!="null"&&typeof localStorage.getItem(argument.url)!="undefined"&&typeof localStorage.getItem(argument.url)!=""&&localStorage.getItem(argument.url)!=null){
   component = localStorage.getItem(argument.url)
}else{
   localStorage.setItem(argument.url,(await(await fetch(`${argument.url}`)).text()));
   component = localStorage.getItem(argument.url);
}
*/
              
let info = argument.content;
if(typeof info && info.includes(".json")){

info = await(await fetch(`${info}`)).json()

}

if(typeof info == "object" && !Array.isArray(info)){

for(let property in info){

  component = component.replaceAll(`{${property}}`,info[property]);

};
text = component;

}else{

for(let list of info){

let replaces = component;

 for(let property in list){

  replaces = replaces.replaceAll(`{${property}}`,list[property]);

};

text += replaces;

};

};

console.log(argument.url,":",localStorage.getItem(argument.url));
console.log(argument.url," text:",text);
console.log(argument.id,":",document.getElementById(argument.id));
document.getElementById(argument.id).innerHTML = text;

};

async function compReload(url){
localStorage.setItem(url,null);
}

function ref(arg){
   window[arg.replaceAll(".","__").replaceAll("-","_").replaceAll("#","$")] = !arg.includes("#")?document.querySelectorAll(arg):document.querySelector(arg);
};

function getRef(){





}
