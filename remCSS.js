//document.body.style.display="none";
window.addEventListener("load",async function(){

    let stlVarLen = document.createElement('style');
    document.querySelector('head').appendChild(stlVarLen);
    
    let viewport = ()=>{return parseInt((window.innerWidth/screen.width)*100);}

    let  rootStyle = ()=>{

        if(!window.navigator.userAgent.match('Mobile')||!window.navigator.userAgent.match('Android')){     

             let $vh = (10/((window.outerHeight/screen.height)*100))*(10+((10/((window.outerHeight/screen.height)*5))))
         
             if(Math.floor(parseInt((window.outerWidth/screen.width)*100)) >= 99){
                 stlVarLen.innerHTML = `*,:root{--len:calc(1.01vw);font-size:calc(1.01vw);--width:${parseInt((window.outerWidth/screen.width)*10)*10};}`;
             }else{ 
                stlVarLen.innerHTML = `*,:root{--len:calc(calc(1.4vh) * calc( 1.11 * ${$vh} ));font-size:calc(calc(1.4vh) * calc( 1.11 * ${$vh} ));--width:${parseInt((window.outerWidth/screen.width)*10)*10};}`;
            }
        }
    };
  
if(window.navigator.userAgent.match('Mobile')||window.navigator.userAgent.match('Android')){
    stlVarLen.innerHTML = `@media(orientation:landscape){*,:root{--len:calc(1.5vw);font-size:calc(1.5vw);--width:${parseInt((window.outerWidth/screen.width)*5)*6};}}@media(orientation:portrait){*,:root{--len:calc(3.1vw);font-size:calc(3.1vw);--width:${parseInt((screen.width))}px;}} `;  
};

rootStyle();
window.addEventListener('resize',()=>{rootStyle()})

let element = document.createElement("style");
document.querySelectorAll("head")[0].appendChild(element);


function getVarClasses(){
    
    let findIn = document.querySelectorAll("body")
    findIn = findIn[0].querySelectorAll("*");

    
   let classList = [];

   findIn.forEach(f=>{

    
    f.classList.forEach(c=>{
        if(!classList.includes(c))
            classList.push(c)
    })

   });

   classList = classList.filter(c=>{if(c.includes("var")){

    return c

   }});

   let parts = [];

   classList.forEach((c,i)=>{

    let getHook = c.replace("var_","");
    getHook = getHook.split("_")

    parts[i] = getHook;



   });

   
   function resizeViewport(){

    let resizableStyleSheet = "";
    let resizableVar = "";

    parts.forEach(a=>{
        
    resizableVar = "";

    if(viewport()>a[3]&&!navigator.userAgent.includes("Android")){

        resizableVar += `.var_${a[0]}_${a[1]}_${a[2]}_${a[3]}{${a[0]}:${a[1]};}
        `;

    }else{


        resizableVar += `.var_${a[0]}_${a[1]}_${a[2]}_${a[3]}{${a[0]}:${a[2]};}
        `;
    }

    resizableStyleSheet += resizableVar;

    });

        return resizableStyleSheet

   };


   let newStyle = document.createElement("style")
   document.querySelectorAll("head")[0].appendChild(newStyle)

     newStyle.innerHTML = resizeViewport();
    window.addEventListener("resize",()=>{ newStyle.innerHTML = resizeViewport()});

   
};

//getVarClasses();

///////////////////////////


let styleSheet = [];
  
function findStyle(a){
  let findIn = document.querySelectorAll("body")
  findIn = findIn[0].querySelectorAll("*");
 let classList = [];

 findIn.forEach(f=>{
  
  f.classList.forEach(c=>{
      if(!classList.includes(c))
          classList.push(c)
  })

 })

 classList.forEach(c=>{
  
 for(let int = 0;int<=9;int++){

  a.forEach(all=>{

      let ref = all.substring(0,all.indexOf("$"))
      if(c.includes(ref)&&c.indexOf(ref)==0&&c.includes(int)){
          let name = `${ref}$`
          let hook = c.indexOf(ref)+ref.length
          let value = Number(c.substring(hook))/10;

          if(!isNaN(value)){
              let properties = all.replace(name,"");
              let getStyle =  `.${c}${properties.replaceAll("$",value)}}`
              if(!styleSheet.includes(getStyle))
                  styleSheet.push(getStyle);
          }
        }

      });
     }
  });
  
 let response = "";
 response = "";
 styleSheet.forEach(c=>response+=c);

 let text = [];

 response.split("}");
 let widthLength = response.trim().split("}").map(h=>`${h}}`)
 .filter(response=>response.includes(":["))
 .map(response=>{
     let declaration = response
         .split(";")
         .map(response=>response.substring(response.indexOf("--")))
             .filter(response=>{
             if(response.includes(":["))
                 return response
         })
         .map(txt=>txt.substring(txt.indexOf("--")+2)
         .replaceAll(":["," ")
         .replaceAll("]"," ")
         .replaceAll(", ",",")
         .replaceAll(" ,",",")
         .replaceAll(" , ",",")
         .split(" "))

         .map((style,int)=>{
             return{
             name:style[0],
             before:style[1],
             after:style[2],
             gear:style[3]
         }})
     return{

         selectors:response.substring(0,response.indexOf("{")).replaceAll("/*","").replaceAll("*/",""),
         declaration:declaration
     }
 })
 
 text.push(...widthLength);


 function resizeViewport(){

     let StyleSheet = "";
     let resizableStyleSheet = "";
     let resizableVar = "";
 
     text.forEach(style=>{

         style.declaration.forEach(rule=>{
         
             resizableVar = "";
         
             if(viewport()>rule.gear&&!navigator.userAgent.includes("Android")||viewport()>rule.gear&&!navigator.userAgent.includes('Mobile')){
         
                 resizableVar += `--${rule.name}:${rule.before};`;
         
             }else{
         
         
                 resizableVar += `--${rule.name}:${rule.after};`;
             }
         
             resizableStyleSheet += resizableVar;
         
             });
         
                 StyleSheet += `${style.selectors}{${resizableStyleSheet}}`;

     });

     let res = response+StyleSheet;

     return res
 
    };

let resizableStyle = document.createElement("style")
document.querySelectorAll("head")[0].appendChild(resizableStyle);

resizableStyle.innerText = resizeViewport();
window.addEventListener("resize",()=>{resizableStyle.innerText = resizeViewport()});
};
////////////////////////////////////////////////////////////////////////////////////////

document.querySelectorAll("link").forEach(link=>{
  if(link.href.includes(".rem")){
      //console.log(link.href)
      fetch(link.href).then(async link=>{
          let sheet = (await link.text()).split("}").filter(sheet=>{if(sheet!="")return `${sheet}}`}).map(sheet=>sheet.trim());
          findStyle(sheet);
          
        //  let documentLength = document.querySelectorAll("*").length;
        //
        //  setInterval(()=>{
        //      let gear = true;
        //      const time = setInterval(()=>{
        //          if(gear){
        //               
        //              if(documentLength!=document.querySelectorAll("*").length){
        //                  documentLength = document.querySelectorAll("*").length;
        //                  findStyle(sheet)
        //              }
        //               
        //              gear = false;
        //          }else{
        //              clearInterval(time);
        //              gear = true;
        //      }
        //      },500)
        //  },500);
          
    });
  }
});


let styleFunction = {}; 

styleFunction.resize = async(href)=>{
let text = [];

    all = href.split("}");
    let widthLength = href.trim().split("}").map(h=>`${h}}`)
    .filter(href=>href.includes(":["))
    .map(href=>{
        let declaration = href
            .split(";")
            .map(href=>href.substring(href.indexOf("--")))
                .filter(href=>{
                if(href.includes(":["))
                    return href
            })
            .map(txt=>txt.substring(txt.indexOf("--")+2)
            .replaceAll(":["," ")
            .replaceAll("]"," ")
            .replaceAll(", ",",")
            .replaceAll(" ,",",")
            .replaceAll(" , ",",")
            .split(" "))

            .map((style,int)=>{
                return{
                name:style[0],
                before:style[1],
                after:style[2],
                gear:style[3]
            }})
        return{

            selectors:href.substring(0,href.indexOf("{")).replaceAll("/*","").replaceAll("*/",""),
            declaration:declaration
        }
    })
    
    text.push(...widthLength);


    function resizeViewport(){
  
        let StyleSheet = "";
        let resizableStyleSheet = "";
        let resizableVar = "";
    
        text.forEach(style=>{

            style.declaration.forEach(rule=>{
            
                resizableVar = "";
            
                if(viewport()>rule.gear&&!navigator.userAgent.includes("Android")||viewport()>rule.gear&&!navigator.userAgent.includes('Mobile')){
            
                    resizableVar += `--${rule.name}:${rule.before};`;
            
                }else{
            
            
                    resizableVar += `--${rule.name}:${rule.after};`;
                }
            
                resizableStyleSheet += resizableVar;
            
                });
            
                    StyleSheet += `${style.selectors}{${resizableStyleSheet}}`;

        });

        return StyleSheet
    
       };
    
  let resizableStyle = document.createElement("style")
  document.querySelectorAll("head")[0].appendChild(resizableStyle);
 
  resizableStyle.innerText = resizeViewport();
  window.addEventListener("resize",()=>{resizableStyle.innerText = resizeViewport()});
  
  ////////////////////////////////////

}

styleFunction.event = async(href)=>{
    let documentLength = document.querySelectorAll("*").length;
    let documentDefaultStyle = true;
    function applyEventCssRules(href){
    let eventsStyleVar = `onabort,onblur,onfocus,oncancel,onauxclick,onbeforeinput,onbeforetoggle,oncanplay,oncanplaythrough,onchange,onclick,onclose,oncontentvisibilityautostatechange,oncontextlost,oncontextmenu,oncontextrestored,oncopy,oncuechange,oncut,ondblclick,ondrag,ondragend,ondragenter,ondragexit,ondragleave,ondragover,ondragstart,ondrop,ondurationchange,onemptied,onended,onformdata,oninput,oninvalid,onkeydown,onkeypress,onkeyup,onload,onloadeddata,onloadedmetadata,onloadstart,onmousedown,onmouseenter,onmouseleave,onmousemove,onmouseout,onmouseover,onmouseup,onwheel,onpaste,onpause,onplay,onplaying,onprogress,onratechange,onreset,onresize,onscroll,onscrollend,onsecuritypolicyviolation,onseeked,onseeking,onselect,onslotchange,onstalled,onsubmit,onsuspend,ontimeupdate,onvolumechange,onwaiting,onselectstart,onselectionchange,ontoggle,onpointercancel,onpointerdown,onpointerup,onpointermove,onpointerout,onpointerover,onpointerenter,onpointerleave,ongotpointercapture,onlostpointercapture,onmozfullscreenchange,onmozfullscreenerror,onanimationcancel,onanimationend,onanimationiteration,onanimationstart,ontransitioncancel,ontransitionend,ontransitionrun,ontransitionstart,onwebkitanimationend,onwebkitanimationiteration,onwebkitanimationstart,onwebkittransitionend,onerror,onfullscreenchange,onfullscreenerror`.split(",");
    
    let eventRun = [];
    
    let styleProper = "";
    let StyleSheets = "";
    
    eventsStyleVar.forEach(async eventTarget=>{
    
    if(href.includes(`event-${eventTarget.substring("2")}`)){
        
        let eventChanger = `event-${eventTarget.substring("2")}`;
    
        href = href.trim().split("}").map(h=>`${h}}`)
        .filter(href=>href.includes(`${eventChanger});`))
        .map(href=>{
    
            let ref = href.substring(0,href.indexOf("{")).trim();
    
            let event = href.replaceAll("}","") 
            .substring(href.indexOf("{")+1)  
            .replaceAll(`,${eventChanger});`,"****___")
            .replaceAll(`, ${eventChanger});`,"****___")
            .split("___")
            .filter(href=>href.includes("****")?href:null)
            .map(href=>href.replaceAll("****","")
                           .substring(href.indexOf(";")+1)
                           .trim())
    
           .filter(ref=>ref!="")
           .map(ref=>ref.trim())
           .map(ref=>{
    
               if(ref.includes(":("))
                   return ref.replaceAll(":(",",")
               
               if(ref.includes(": ("))
                   return ref.replaceAll(": (",",")
           })
           .map(href=>href.split(","))
           .map(href=>{
    
            return href.map(href=>{
    
            let replace = href.substring(href.indexOf('"')+1,href.indexOf('" '))
            return href.replaceAll(replace,replace.replaceAll(" ","||"))
            })
    
           })
    
           let events = [...event];
    
        href
           return{
               ref:ref,
               event:events.map(e=>{
                   let before = e[1].replaceAll('"','').trim().split(" ");
                   let after = e[2].replaceAll('"','').trim().split(" ");
                   let name = e[0]
                   
                   if(name.includes(";")){
                    name = e[0].split("--").filter(e=>!e.includes(";"))
                    name = `--${name[0]}`
                   }
    
                   return{
                       name:name,
                       before:{hook:before[0].replaceAll("||"," "),proper:before[1]},
                       after:{hook:after[0].replaceAll("||"," "),proper:after[1]},
                       event:eventTarget.substring(2)
                   }
               })
           }
       
       })
      
       eventRun.push(...href);
    }})
    
       eventRun.forEach(text=>{
    
        styleProper = "";
        
        text.event.forEach(textEvent=>{

    
            styleProper+=`${textEvent.name}:${textEvent.before.proper};`;
    
            if(textEvent.before.hook!=textEvent.after.hook){
    
                document.querySelectorAll(`${textEvent.before.hook}`).forEach((all,range)=>{
    
                    document.querySelectorAll(`${text.ref}`)[range].style.setProperty(`${textEvent.name}`, textEvent.before.proper);
        
                    all.addEventListener(textEvent.event,()=>{
                        document.querySelectorAll(`${text.ref}`)[range].style.setProperty(`${textEvent.name}`, textEvent.before.proper);
                    })
            
                }) 
        
                document.querySelectorAll(`${textEvent.after.hook}`).forEach((all,range)=>{
        
                    all.addEventListener(textEvent.event,()=>{
                        document.querySelectorAll(`${text.ref}`)[range].style.setProperty(`${textEvent.name}`, textEvent.after.proper);  
                    })
            
                })
    
            }else{
    
                document.querySelectorAll(`${textEvent.before.hook}`).forEach((all,range)=>{
    
                    document.querySelectorAll(`${text.ref}`)[range].style.setProperty(`${textEvent.name}`, textEvent.before.proper);
                    let actionKey = false;
                    all.addEventListener(textEvent.event,()=>{
                        if(actionKey){     
                        document.querySelectorAll(`${text.ref}`)[range].style.setProperty(`${textEvent.name}`, textEvent.before.proper);
                        actionKey = false;
                        }
                        else{     
                        document.querySelectorAll(`${text.ref}`)[range].style.setProperty(`${textEvent.name}`, textEvent.after.proper);
                        actionKey = true;
                        };
                    });
    
                }); 
            };
        });
        StyleSheets += `${text.ref}{
            ${styleProper}
        }`;
    });
    if(documentDefaultStyle){
    //let newStyle = document.createElement("style")
    //document.querySelectorAll("head")[0].appendChild(newStyle)
    //newStyle.innerHTML = StyleSheets;
    //documentDefaultStyle = false;
    }
};
    applyEventCssRules(href);
     setInterval(()=>{
        let gear = true;
        const time = setInterval(()=>{
            if(gear){
                 
                if(documentLength!=document.querySelectorAll("*").length){
                    documentLength = document.querySelectorAll("*").length;
                    applyEventCssRules(href)
                }
                 
                gear = false;
            }else{
                clearInterval(time);
                gear = true;
        }
        },100)
    },100);
    
};


styleFunction.range = async(href)=>{
 
    let text = [];
    let StyleSheets = "";
    
        let list = href
                .split("}")
                .filter(list=>list.includes(':nth-child("(')||list.includes(')"]{'))
                .map(list=>`${list.replaceAll("(range)","range")}}`)
                .map(list=>{
                    let search = "";

                    if(list.includes(':nth-child("(')){
                        if(list.includes('(min:')){
                            search = list.substring(list.indexOf("min"), list.indexOf(')"){'))
                         }else
                            search = list.substring(list.indexOf("max"), list.indexOf(')"){'))
                    }else{
                        if(list.includes('(min:'))
                            search = list.substring(list.indexOf("min"), list.indexOf(')"]'));
                         else
                            search = list.substring(list.indexOf("max"), list.indexOf(')"]'));
                    }
                    return{
                        search:search.split(" ").map(res=>(res.substring(4))),
                        declaration:list.replaceAll(`(${search})`,"range")
                    }
                })
        
        text.push(...list)

        text.forEach(text=>{

            if(text.search.length>1){

                for(let range = parseFloat(text.search[0]);range<=parseFloat(text.search[1]);range++){
                    StyleSheets+=text.declaration
                    .replaceAll("range ",range)
                    .replaceAll("range",range)
                    .replaceAll('child("',"child(")
                    .replaceAll('"){',"){")
                    .replaceAll('"(',"")
                    .replaceAll(')"',"")
                    .replaceAll(`"${range}"`,range)
                }

            }else{

                for(let range = 0;range<=parseFloat(text.search[0]);range++){
                    StyleSheets+=text.declaration
                    .replaceAll("range ",range)
                    .replaceAll("range",range)
                    .replaceAll('child("',"child(")
                    .replaceAll('"){',"){")
                    .replaceAll('"(',"")
                    .replaceAll(')"',"")
                    .replaceAll(`"${range}"`,range)
                               
                }
            }

        });

   //let newStyle = document.createElement("style")
   //document.querySelectorAll("head")[0].appendChild(newStyle)
   //newStyle.innerHTML = StyleSheets;
    
};

let getStyleSheets = (style)=>{
    fetch(style.href)
    .then(async watch=>{
        if(watch.status==200){
            let href = await watch.text();
            for(let method in styleFunction){
              styleFunction[method](href)
            }
            document.body.style.display="flex";
        }else{
            getStyleSheets(style);
        }
    })
    .catch(ERROR=>{
        console.log("Fetch ERROR:",ERROR)
    })
}

let style = document.querySelectorAll("link");
style.forEach(async(style)=>{getStyleSheets(style)})});