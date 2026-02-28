async function execComp(argument){

   let text = "";
   let component = argument.url.includes(".html")?(await(await fetch(`${argument.url}`)).text()):argument.url
   let info = argument.content;

   console.log("URL:",argument.url);
   console.log("CONTENT:",argument.content);

   if(typeof info && info.includes(".json")){
   
   info = await(await fetch(`${info}`)).json()
   
   }
   
   if(typeof info == "object" && !Array.isArray(info)){
   
   for(let property in info){
   
     component = 
     !info[property].includes("({")?
     component.replaceAll(`{${property}}`,info[property]):""

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
   };
   
   text += replaces;
   
   };
   
   };
   
   if(!argument.id){setTimeout(()=>{
   getRef();
   if(argument.func){setTimeout(argument.func(),30)};
   },70);return text}
   else if(document.getElementById(argument.id)){document.getElementById(argument.id).innerHTML = text;getRef();};
   setTimeout(compAutoExec,100);

};
   async function compReload(url){
   localStorage.setItem(url,null);
   }
   

   function ref(arg){
      window[arg.replaceAll(".","__").replaceAll("-","_").replaceAll("#","$")] = !arg.includes("#")?
      document.querySelectorAll(arg)?document.querySelectorAll(arg):ref(arg)
      :document.querySelector(arg)?document.querySelector(arg):ref(arg);
   };
   
   function getRef(){
   
   for(let all of document.querySelectorAll("*")){

   ref(all.tagName.toLowerCase());
   if(all.id){ref(`#${all.id}`)};
   
   if(all.className!=""&&typeof all.className === "string"){
      (all.className.split(" ")).map(all=>ref(`.${all}`))
   }

   };

   }

async function compAutoExec(a){

   for(let all of document.querySelectorAll("html *")){
      if(all.hasAttribute("data-model")){
         let content = `${all.getAttribute("data-model")}.json`;
         let text = all.innerHTML;
         if(text.includes("{")&&text.includes("}")){
         all.innerHTML = await execComp({url:text,content:content});
         all.removeAttribute("data-model")
         }
      }
   };

   for(let all of document.querySelectorAll("html *")){
      if(all.hasAttribute("data-comp")){
         let data = `${all.getAttribute("data-comp")}`;
         all.innerHTML = await eval(`execComp({${data}})`);
         all.removeAttribute("data-comp")
      }
   }

};

compAutoExec();