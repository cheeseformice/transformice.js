"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[3879],{8860:(e,r,n)=>{n.d(r,{xA:()=>y,yg:()=>u});var l=n(7953);function a(e,r,n){return r in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e}function t(e,r){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);r&&(l=l.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),n.push.apply(n,l)}return n}function i(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{};r%2?t(Object(n),!0).forEach((function(r){a(e,r,n[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):t(Object(n)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))}))}return e}function o(e,r){if(null==e)return{};var n,l,a=function(e,r){if(null==e)return{};var n,l,a={},t=Object.keys(e);for(l=0;l<t.length;l++)n=t[l],r.indexOf(n)>=0||(a[n]=e[n]);return a}(e,r);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);for(l=0;l<t.length;l++)n=t[l],r.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=l.createContext({}),s=function(e){var r=l.useContext(p),n=r;return e&&(n="function"==typeof e?e(r):i(i({},r),e)),n},y=function(e){var r=s(e.components);return l.createElement(p.Provider,{value:r},e.children)},g="mdxType",d={inlineCode:"code",wrapper:function(e){var r=e.children;return l.createElement(l.Fragment,{},r)}},m=l.forwardRef((function(e,r){var n=e.components,a=e.mdxType,t=e.originalType,p=e.parentName,y=o(e,["components","mdxType","originalType","parentName"]),g=s(n),m=a,u=g["".concat(p,".").concat(m)]||g[m]||d[m]||t;return n?l.createElement(u,i(i({ref:r},y),{},{components:n})):l.createElement(u,i({ref:r},y))}));function u(e,r){var n=arguments,a=r&&r.mdxType;if("string"==typeof e||a){var t=n.length,i=new Array(t);i[0]=m;var o={};for(var p in r)hasOwnProperty.call(r,p)&&(o[p]=r[p]);o.originalType=e,o[g]="string"==typeof e?e:a,i[1]=o;for(var s=2;s<t;s++)i[s]=n[s];return l.createElement.apply(null,i)}return l.createElement.apply(null,n)}m.displayName="MDXCreateElement"},3918:(e,r,n)=>{n.r(r),n.d(r,{assets:()=>p,contentTitle:()=>i,default:()=>d,frontMatter:()=>t,metadata:()=>o,toc:()=>s});var l=n(3911),a=(n(7953),n(8860));const t={id:"RoomPlayer",title:"Class: RoomPlayer",sidebar_label:"RoomPlayer",sidebar_position:0,custom_edit_url:null},i=void 0,o={unversionedId:"api/classes/RoomPlayer",id:"api/classes/RoomPlayer",title:"Class: RoomPlayer",description:"Represents a player from the room.",source:"@site/docs/api/classes/RoomPlayer.md",sourceDirName:"api/classes",slug:"/api/classes/RoomPlayer",permalink:"/transformice.js/docs/api/classes/RoomPlayer",draft:!1,editUrl:null,tags:[],version:"current",sidebarPosition:0,frontMatter:{id:"RoomPlayer",title:"Class: RoomPlayer",sidebar_label:"RoomPlayer",sidebar_position:0,custom_edit_url:null},sidebar:"sidebar",previous:{title:"RoomMessage",permalink:"/transformice.js/docs/api/classes/RoomMessage"},next:{title:"TFMConnectionError",permalink:"/transformice.js/docs/api/classes/TFMConnectionError"}},p={},s=[{value:"Hierarchy",id:"hierarchy",level:2},{value:"Properties",id:"properties",level:2},{value:"cheeses",id:"cheeses",level:3},{value:"client",id:"client",level:3},{value:"Inherited from",id:"inherited-from",level:4},{value:"facingRight",id:"facingright",level:3},{value:"gender",id:"gender",level:3},{value:"isDead",id:"isdead",level:3},{value:"isJumping",id:"isjumping",level:3},{value:"isShaman",id:"isshaman",level:3},{value:"isVampire",id:"isvampire",level:3},{value:"look",id:"look",level:3},{value:"mouseColor",id:"mousecolor",level:3},{value:"movingLeft",id:"movingleft",level:3},{value:"movingRight",id:"movingright",level:3},{value:"name",id:"name",level:3},{value:"Inherited from",id:"inherited-from-1",level:4},{value:"nameColor",id:"namecolor",level:3},{value:"pcode",id:"pcode",level:3},{value:"respawnId",id:"respawnid",level:3},{value:"score",id:"score",level:3},{value:"shamanColor",id:"shamancolor",level:3},{value:"title",id:"title",level:3},{value:"titleStars",id:"titlestars",level:3},{value:"vx",id:"vx",level:3},{value:"vy",id:"vy",level:3},{value:"x",id:"x",level:3},{value:"y",id:"y",level:3},{value:"Accessors",id:"accessors",level:2},{value:"hasCheese",id:"hascheese",level:3},{value:"Returns",id:"returns",level:4},{value:"Methods",id:"methods",level:2},{value:"friend",id:"friend",level:3},{value:"Returns",id:"returns-1",level:4},{value:"Inherited from",id:"inherited-from-2",level:4},{value:"unfriend",id:"unfriend",level:3},{value:"Returns",id:"returns-2",level:4},{value:"Inherited from",id:"inherited-from-3",level:4},{value:"whisper",id:"whisper",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Returns",id:"returns-3",level:4},{value:"Inherited from",id:"inherited-from-4",level:4}],y={toc:s},g="wrapper";function d(e){let{components:r,...n}=e;return(0,a.yg)(g,(0,l.A)({},y,n,{components:r,mdxType:"MDXLayout"}),(0,a.yg)("p",null,"Represents a player from the room."),(0,a.yg)("h2",{id:"hierarchy"},"Hierarchy"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},(0,a.yg)("a",{parentName:"p",href:"/transformice.js/docs/api/classes/Player"},(0,a.yg)("inlineCode",{parentName:"a"},"Player"))),(0,a.yg)("p",{parentName:"li"},"\u21b3 ",(0,a.yg)("strong",{parentName:"p"},(0,a.yg)("inlineCode",{parentName:"strong"},"RoomPlayer"))))),(0,a.yg)("h2",{id:"properties"},"Properties"),(0,a.yg)("h3",{id:"cheeses"},"cheeses"),(0,a.yg)("p",null,"\u2022 ",(0,a.yg)("strong",{parentName:"p"},"cheeses"),": ",(0,a.yg)("inlineCode",{parentName:"p"},"number")),(0,a.yg)("p",null,"The number of cheeses that the player is carrying."),(0,a.yg)("hr",null),(0,a.yg)("h3",{id:"client"},"client"),(0,a.yg)("p",null,"\u2022 ",(0,a.yg)("strong",{parentName:"p"},"client"),": ",(0,a.yg)("a",{parentName:"p",href:"/transformice.js/docs/api/classes/Client"},(0,a.yg)("inlineCode",{parentName:"a"},"Client"))),(0,a.yg)("h4",{id:"inherited-from"},"Inherited from"),(0,a.yg)("p",null,(0,a.yg)("a",{parentName:"p",href:"/transformice.js/docs/api/classes/Player"},"Player"),".",(0,a.yg)("a",{parentName:"p",href:"/transformice.js/docs/api/classes/Player#client"},"client")),(0,a.yg)("hr",null),(0,a.yg)("h3",{id:"facingright"},"facingRight"),(0,a.yg)("p",null,"\u2022 ",(0,a.yg)("strong",{parentName:"p"},"facingRight"),": ",(0,a.yg)("inlineCode",{parentName:"p"},"boolean")),(0,a.yg)("p",null,"Whether or not the player is facing right."),(0,a.yg)("hr",null),(0,a.yg)("h3",{id:"gender"},"gender"),(0,a.yg)("p",null,"\u2022 ",(0,a.yg)("strong",{parentName:"p"},"gender"),": ",(0,a.yg)("inlineCode",{parentName:"p"},"number")),(0,a.yg)("p",null,"The player's gender."),(0,a.yg)("hr",null),(0,a.yg)("h3",{id:"isdead"},"isDead"),(0,a.yg)("p",null,"\u2022 ",(0,a.yg)("strong",{parentName:"p"},"isDead"),": ",(0,a.yg)("inlineCode",{parentName:"p"},"boolean")),(0,a.yg)("p",null,"Whether or not the player is dead."),(0,a.yg)("hr",null),(0,a.yg)("h3",{id:"isjumping"},"isJumping"),(0,a.yg)("p",null,"\u2022 ",(0,a.yg)("strong",{parentName:"p"},"isJumping"),": ",(0,a.yg)("inlineCode",{parentName:"p"},"boolean")),(0,a.yg)("p",null,"Whether or not the player is in the air."),(0,a.yg)("hr",null),(0,a.yg)("h3",{id:"isshaman"},"isShaman"),(0,a.yg)("p",null,"\u2022 ",(0,a.yg)("strong",{parentName:"p"},"isShaman"),": ",(0,a.yg)("inlineCode",{parentName:"p"},"boolean")),(0,a.yg)("p",null,"Whether or not the player is shaman."),(0,a.yg)("hr",null),(0,a.yg)("h3",{id:"isvampire"},"isVampire"),(0,a.yg)("p",null,"\u2022 ",(0,a.yg)("strong",{parentName:"p"},"isVampire"),": ",(0,a.yg)("inlineCode",{parentName:"p"},"boolean")),(0,a.yg)("p",null,"Whether or not the player is vampire."),(0,a.yg)("hr",null),(0,a.yg)("h3",{id:"look"},"look"),(0,a.yg)("p",null,"\u2022 ",(0,a.yg)("strong",{parentName:"p"},"look"),": ",(0,a.yg)("inlineCode",{parentName:"p"},"string")),(0,a.yg)("p",null,"The current items and customisation of the player\u2019s outfit as ",(0,a.yg)("inlineCode",{parentName:"p"},"1;0,0,0,0,0,0,0,0,0"),"."),(0,a.yg)("hr",null),(0,a.yg)("h3",{id:"mousecolor"},"mouseColor"),(0,a.yg)("p",null,"\u2022 ",(0,a.yg)("strong",{parentName:"p"},"mouseColor"),": ",(0,a.yg)("inlineCode",{parentName:"p"},"number")),(0,a.yg)("p",null,"The player's mouse color."),(0,a.yg)("hr",null),(0,a.yg)("h3",{id:"movingleft"},"movingLeft"),(0,a.yg)("p",null,"\u2022 ",(0,a.yg)("strong",{parentName:"p"},"movingLeft"),": ",(0,a.yg)("inlineCode",{parentName:"p"},"boolean")),(0,a.yg)("p",null,"Whether or not the player is moving left."),(0,a.yg)("hr",null),(0,a.yg)("h3",{id:"movingright"},"movingRight"),(0,a.yg)("p",null,"\u2022 ",(0,a.yg)("strong",{parentName:"p"},"movingRight"),": ",(0,a.yg)("inlineCode",{parentName:"p"},"boolean")),(0,a.yg)("p",null,"Whether or not the player is moving right."),(0,a.yg)("hr",null),(0,a.yg)("h3",{id:"name"},"name"),(0,a.yg)("p",null,"\u2022 ",(0,a.yg)("strong",{parentName:"p"},"name"),": ",(0,a.yg)("inlineCode",{parentName:"p"},"string")),(0,a.yg)("p",null,"The player's name."),(0,a.yg)("h4",{id:"inherited-from-1"},"Inherited from"),(0,a.yg)("p",null,(0,a.yg)("a",{parentName:"p",href:"/transformice.js/docs/api/classes/Player"},"Player"),".",(0,a.yg)("a",{parentName:"p",href:"/transformice.js/docs/api/classes/Player#name"},"name")),(0,a.yg)("hr",null),(0,a.yg)("h3",{id:"namecolor"},"nameColor"),(0,a.yg)("p",null,"\u2022 ",(0,a.yg)("strong",{parentName:"p"},"nameColor"),": ",(0,a.yg)("inlineCode",{parentName:"p"},"number")),(0,a.yg)("p",null,"The player's name color, By default : ",(0,a.yg)("inlineCode",{parentName:"p"},"-1"),"."),(0,a.yg)("hr",null),(0,a.yg)("h3",{id:"pcode"},"pcode"),(0,a.yg)("p",null,"\u2022 ",(0,a.yg)("strong",{parentName:"p"},"pcode"),": ",(0,a.yg)("inlineCode",{parentName:"p"},"number")),(0,a.yg)("p",null,"The player's temporary code."),(0,a.yg)("hr",null),(0,a.yg)("h3",{id:"respawnid"},"respawnId"),(0,a.yg)("p",null,"\u2022 ",(0,a.yg)("strong",{parentName:"p"},"respawnId"),": ",(0,a.yg)("inlineCode",{parentName:"p"},"number")),(0,a.yg)("p",null,"The player's current respawn ID."),(0,a.yg)("hr",null),(0,a.yg)("h3",{id:"score"},"score"),(0,a.yg)("p",null,"\u2022 ",(0,a.yg)("strong",{parentName:"p"},"score"),": ",(0,a.yg)("inlineCode",{parentName:"p"},"number")),(0,a.yg)("p",null,"The player's score."),(0,a.yg)("hr",null),(0,a.yg)("h3",{id:"shamancolor"},"shamanColor"),(0,a.yg)("p",null,"\u2022 ",(0,a.yg)("strong",{parentName:"p"},"shamanColor"),": ",(0,a.yg)("inlineCode",{parentName:"p"},"number")),(0,a.yg)("p",null,"The player's shaman color."),(0,a.yg)("hr",null),(0,a.yg)("h3",{id:"title"},"title"),(0,a.yg)("p",null,"\u2022 ",(0,a.yg)("strong",{parentName:"p"},"title"),": ",(0,a.yg)("inlineCode",{parentName:"p"},"number")),(0,a.yg)("p",null,"The player's title ID."),(0,a.yg)("hr",null),(0,a.yg)("h3",{id:"titlestars"},"titleStars"),(0,a.yg)("p",null,"\u2022 ",(0,a.yg)("strong",{parentName:"p"},"titleStars"),": ",(0,a.yg)("inlineCode",{parentName:"p"},"number")),(0,a.yg)("p",null,"How many stars in the title."),(0,a.yg)("hr",null),(0,a.yg)("h3",{id:"vx"},"vx"),(0,a.yg)("p",null,"\u2022 ",(0,a.yg)("strong",{parentName:"p"},"vx"),": ",(0,a.yg)("inlineCode",{parentName:"p"},"number")),(0,a.yg)("p",null,"The player\u2019s X velocity."),(0,a.yg)("hr",null),(0,a.yg)("h3",{id:"vy"},"vy"),(0,a.yg)("p",null,"\u2022 ",(0,a.yg)("strong",{parentName:"p"},"vy"),": ",(0,a.yg)("inlineCode",{parentName:"p"},"number")),(0,a.yg)("p",null,"The player\u2019s Y velocity."),(0,a.yg)("hr",null),(0,a.yg)("h3",{id:"x"},"x"),(0,a.yg)("p",null,"\u2022 ",(0,a.yg)("strong",{parentName:"p"},"x"),": ",(0,a.yg)("inlineCode",{parentName:"p"},"number")),(0,a.yg)("p",null,"The player\u2019s X coordinate."),(0,a.yg)("hr",null),(0,a.yg)("h3",{id:"y"},"y"),(0,a.yg)("p",null,"\u2022 ",(0,a.yg)("strong",{parentName:"p"},"y"),": ",(0,a.yg)("inlineCode",{parentName:"p"},"number")),(0,a.yg)("p",null,"The player\u2019s Y coordinate."),(0,a.yg)("h2",{id:"accessors"},"Accessors"),(0,a.yg)("h3",{id:"hascheese"},"hasCheese"),(0,a.yg)("p",null,"\u2022 ",(0,a.yg)("inlineCode",{parentName:"p"},"get")," ",(0,a.yg)("strong",{parentName:"p"},"hasCheese"),"(): ",(0,a.yg)("inlineCode",{parentName:"p"},"boolean")),(0,a.yg)("p",null,"Whether or not the player has a cheese."),(0,a.yg)("h4",{id:"returns"},"Returns"),(0,a.yg)("p",null,(0,a.yg)("inlineCode",{parentName:"p"},"boolean")),(0,a.yg)("h2",{id:"methods"},"Methods"),(0,a.yg)("h3",{id:"friend"},"friend"),(0,a.yg)("p",null,"\u25b8 ",(0,a.yg)("strong",{parentName:"p"},"friend"),"(): ",(0,a.yg)("inlineCode",{parentName:"p"},"void")),(0,a.yg)("p",null,"Add player to the friend list"),(0,a.yg)("h4",{id:"returns-1"},"Returns"),(0,a.yg)("p",null,(0,a.yg)("inlineCode",{parentName:"p"},"void")),(0,a.yg)("h4",{id:"inherited-from-2"},"Inherited from"),(0,a.yg)("p",null,(0,a.yg)("a",{parentName:"p",href:"/transformice.js/docs/api/classes/Player"},"Player"),".",(0,a.yg)("a",{parentName:"p",href:"/transformice.js/docs/api/classes/Player#friend"},"friend")),(0,a.yg)("hr",null),(0,a.yg)("h3",{id:"unfriend"},"unfriend"),(0,a.yg)("p",null,"\u25b8 ",(0,a.yg)("strong",{parentName:"p"},"unfriend"),"(): ",(0,a.yg)("inlineCode",{parentName:"p"},"void")),(0,a.yg)("p",null,"Remove player from the friend list"),(0,a.yg)("h4",{id:"returns-2"},"Returns"),(0,a.yg)("p",null,(0,a.yg)("inlineCode",{parentName:"p"},"void")),(0,a.yg)("h4",{id:"inherited-from-3"},"Inherited from"),(0,a.yg)("p",null,(0,a.yg)("a",{parentName:"p",href:"/transformice.js/docs/api/classes/Player"},"Player"),".",(0,a.yg)("a",{parentName:"p",href:"/transformice.js/docs/api/classes/Player#unfriend"},"unfriend")),(0,a.yg)("hr",null),(0,a.yg)("h3",{id:"whisper"},"whisper"),(0,a.yg)("p",null,"\u25b8 ",(0,a.yg)("strong",{parentName:"p"},"whisper"),"(",(0,a.yg)("inlineCode",{parentName:"p"},"message"),"): ",(0,a.yg)("inlineCode",{parentName:"p"},"void")),(0,a.yg)("p",null,"Send a whisper to the player"),(0,a.yg)("h4",{id:"parameters"},"Parameters"),(0,a.yg)("table",null,(0,a.yg)("thead",{parentName:"table"},(0,a.yg)("tr",{parentName:"thead"},(0,a.yg)("th",{parentName:"tr",align:"left"},"Name"),(0,a.yg)("th",{parentName:"tr",align:"left"},"Type"))),(0,a.yg)("tbody",{parentName:"table"},(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:"left"},(0,a.yg)("inlineCode",{parentName:"td"},"message")),(0,a.yg)("td",{parentName:"tr",align:"left"},(0,a.yg)("inlineCode",{parentName:"td"},"string"))))),(0,a.yg)("h4",{id:"returns-3"},"Returns"),(0,a.yg)("p",null,(0,a.yg)("inlineCode",{parentName:"p"},"void")),(0,a.yg)("h4",{id:"inherited-from-4"},"Inherited from"),(0,a.yg)("p",null,(0,a.yg)("a",{parentName:"p",href:"/transformice.js/docs/api/classes/Player"},"Player"),".",(0,a.yg)("a",{parentName:"p",href:"/transformice.js/docs/api/classes/Player#whisper"},"whisper")))}d.isMDXComponent=!0}}]);