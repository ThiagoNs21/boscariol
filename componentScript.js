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

  component = 
  !info[property].includes("({")?
  component.replaceAll(`{${property}}`,info[property]):""
  //component.replaceAll(`{${property}}`,await eval(`execComp(${info[property].replaceAll("({","{").replaceAll("})","}")})`))

};

text = component;

}else{

for(let list of info){

let replaces = component;

 for(let property in list){

  replaces = 
  !list[property].includes("({")?
  replaces.replaceAll(`{${property}}`,list[property]):
  replaces.replaceAll(`{${property}}`,await eval(`execComp(${list[property].replaceAll("({","{").replaceAll("})","}")})`))
/*
  if(list[property].includes("({"))
  console.log(await eval(`execComp(${list[property].replaceAll("({","{").replaceAll("})","}")})`))*/
};

text += replaces;

};

};

/*
if(text.includes("({")){

   let exec = (text.split("({")).filter(text=>text.includes("})")).map(text=>`{${text.substring(0,text.indexOf("})"))}}`)
   for(let e of exec){
      text = text.replaceAll(`(${e})`,await eval(`execComp(${e})`));
   }
   //console.log("exec: ",exec)
}

*/

//console.log(argument.url,":",localStorage.getItem(argument.url));
//console.log(argument.url," text:",text);
//console.log(argument.id,":",document.getElementById(argument.id));

if(!argument.id) return text
else document.getElementById(argument.id).innerHTML = text;


};

async function compReload(url){
localStorage.setItem(url,null);
}

function ref(arg){
   window[arg.replaceAll(".","__").replaceAll("-","_").replaceAll("#","$")] = !arg.includes("#")?document.querySelectorAll(arg):document.querySelector(arg);
};

function getRef(){





}
