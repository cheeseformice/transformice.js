"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[8717],{8860:(e,r,a)=>{a.d(r,{xA:()=>c,yg:()=>d});var t=a(7953);function n(e,r,a){return r in e?Object.defineProperty(e,r,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[r]=a,e}function s(e,r){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);r&&(t=t.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),a.push.apply(a,t)}return a}function o(e){for(var r=1;r<arguments.length;r++){var a=null!=arguments[r]?arguments[r]:{};r%2?s(Object(a),!0).forEach((function(r){n(e,r,a[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):s(Object(a)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(a,r))}))}return e}function l(e,r){if(null==e)return{};var a,t,n=function(e,r){if(null==e)return{};var a,t,n={},s=Object.keys(e);for(t=0;t<s.length;t++)a=s[t],r.indexOf(a)>=0||(n[a]=e[a]);return n}(e,r);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(t=0;t<s.length;t++)a=s[t],r.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var i=t.createContext({}),p=function(e){var r=t.useContext(i),a=r;return e&&(a="function"==typeof e?e(r):o(o({},r),e)),a},c=function(e){var r=p(e.components);return t.createElement(i.Provider,{value:r},e.children)},g="mdxType",m={inlineCode:"code",wrapper:function(e){var r=e.children;return t.createElement(t.Fragment,{},r)}},y=t.forwardRef((function(e,r){var a=e.components,n=e.mdxType,s=e.originalType,i=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),g=p(a),y=n,d=g["".concat(i,".").concat(y)]||g[y]||m[y]||s;return a?t.createElement(d,o(o({ref:r},c),{},{components:a})):t.createElement(d,o({ref:r},c))}));function d(e,r){var a=arguments,n=r&&r.mdxType;if("string"==typeof e||n){var s=a.length,o=new Array(s);o[0]=y;var l={};for(var i in r)hasOwnProperty.call(r,i)&&(l[i]=r[i]);l.originalType=e,l[g]="string"==typeof e?e:n,o[1]=l;for(var p=2;p<s;p++)o[p]=a[p];return t.createElement.apply(null,o)}return t.createElement.apply(null,a)}y.displayName="MDXCreateElement"},4512:(e,r,a)=>{a.r(r),a.d(r,{assets:()=>i,contentTitle:()=>o,default:()=>m,frontMatter:()=>s,metadata:()=>l,toc:()=>p});var t=a(3911),n=(a(7953),a(8860));const s={id:"RoomMessage",title:"Class: RoomMessage",sidebar_label:"RoomMessage",sidebar_position:0,custom_edit_url:null},o=void 0,l={unversionedId:"api/classes/RoomMessage",id:"api/classes/RoomMessage",title:"Class: RoomMessage",description:"Represents a room message.",source:"@site/docs/api/classes/RoomMessage.md",sourceDirName:"api/classes",slug:"/api/classes/RoomMessage",permalink:"/transformice.js/docs/api/classes/RoomMessage",draft:!1,editUrl:null,tags:[],version:"current",sidebarPosition:0,frontMatter:{id:"RoomMessage",title:"Class: RoomMessage",sidebar_label:"RoomMessage",sidebar_position:0,custom_edit_url:null},sidebar:"sidebar",previous:{title:"Room",permalink:"/transformice.js/docs/api/classes/Room"},next:{title:"RoomPlayer",permalink:"/transformice.js/docs/api/classes/RoomPlayer"}},i={},p=[{value:"Hierarchy",id:"hierarchy",level:2},{value:"Properties",id:"properties",level:2},{value:"author",id:"author",level:3},{value:"Inherited from",id:"inherited-from",level:4},{value:"client",id:"client",level:3},{value:"Inherited from",id:"inherited-from-1",level:4},{value:"content",id:"content",level:3},{value:"Inherited from",id:"inherited-from-2",level:4},{value:"Methods",id:"methods",level:2},{value:"reply",id:"reply",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Returns",id:"returns",level:4}],c={toc:p},g="wrapper";function m(e){let{components:r,...a}=e;return(0,n.yg)(g,(0,t.A)({},c,a,{components:r,mdxType:"MDXLayout"}),(0,n.yg)("p",null,"Represents a room message."),(0,n.yg)("h2",{id:"hierarchy"},"Hierarchy"),(0,n.yg)("ul",null,(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("p",{parentName:"li"},(0,n.yg)("a",{parentName:"p",href:"/transformice.js/docs/api/classes/Message"},(0,n.yg)("inlineCode",{parentName:"a"},"Message"))),(0,n.yg)("p",{parentName:"li"},"\u21b3 ",(0,n.yg)("strong",{parentName:"p"},(0,n.yg)("inlineCode",{parentName:"strong"},"RoomMessage"))))),(0,n.yg)("h2",{id:"properties"},"Properties"),(0,n.yg)("h3",{id:"author"},"author"),(0,n.yg)("p",null,"\u2022 ",(0,n.yg)("strong",{parentName:"p"},"author"),": ",(0,n.yg)("a",{parentName:"p",href:"/transformice.js/docs/api/classes/Player"},(0,n.yg)("inlineCode",{parentName:"a"},"Player"))),(0,n.yg)("h4",{id:"inherited-from"},"Inherited from"),(0,n.yg)("p",null,(0,n.yg)("a",{parentName:"p",href:"/transformice.js/docs/api/classes/Message"},"Message"),".",(0,n.yg)("a",{parentName:"p",href:"/transformice.js/docs/api/classes/Message#author"},"author")),(0,n.yg)("hr",null),(0,n.yg)("h3",{id:"client"},"client"),(0,n.yg)("p",null,"\u2022 ",(0,n.yg)("strong",{parentName:"p"},"client"),": ",(0,n.yg)("a",{parentName:"p",href:"/transformice.js/docs/api/classes/Client"},(0,n.yg)("inlineCode",{parentName:"a"},"Client"))),(0,n.yg)("h4",{id:"inherited-from-1"},"Inherited from"),(0,n.yg)("p",null,(0,n.yg)("a",{parentName:"p",href:"/transformice.js/docs/api/classes/Message"},"Message"),".",(0,n.yg)("a",{parentName:"p",href:"/transformice.js/docs/api/classes/Message#client"},"client")),(0,n.yg)("hr",null),(0,n.yg)("h3",{id:"content"},"content"),(0,n.yg)("p",null,"\u2022 ",(0,n.yg)("strong",{parentName:"p"},"content"),": ",(0,n.yg)("inlineCode",{parentName:"p"},"string")),(0,n.yg)("h4",{id:"inherited-from-2"},"Inherited from"),(0,n.yg)("p",null,(0,n.yg)("a",{parentName:"p",href:"/transformice.js/docs/api/classes/Message"},"Message"),".",(0,n.yg)("a",{parentName:"p",href:"/transformice.js/docs/api/classes/Message#content"},"content")),(0,n.yg)("h2",{id:"methods"},"Methods"),(0,n.yg)("h3",{id:"reply"},"reply"),(0,n.yg)("p",null,"\u25b8 ",(0,n.yg)("strong",{parentName:"p"},"reply"),"(",(0,n.yg)("inlineCode",{parentName:"p"},"message"),"): ",(0,n.yg)("inlineCode",{parentName:"p"},"void")),(0,n.yg)("p",null,"Reply the author with a message."),(0,n.yg)("h4",{id:"parameters"},"Parameters"),(0,n.yg)("table",null,(0,n.yg)("thead",{parentName:"table"},(0,n.yg)("tr",{parentName:"thead"},(0,n.yg)("th",{parentName:"tr",align:"left"},"Name"),(0,n.yg)("th",{parentName:"tr",align:"left"},"Type"))),(0,n.yg)("tbody",{parentName:"table"},(0,n.yg)("tr",{parentName:"tbody"},(0,n.yg)("td",{parentName:"tr",align:"left"},(0,n.yg)("inlineCode",{parentName:"td"},"message")),(0,n.yg)("td",{parentName:"tr",align:"left"},(0,n.yg)("inlineCode",{parentName:"td"},"string"))))),(0,n.yg)("h4",{id:"returns"},"Returns"),(0,n.yg)("p",null,(0,n.yg)("inlineCode",{parentName:"p"},"void")),(0,n.yg)("p",null,(0,n.yg)("strong",{parentName:"p"},(0,n.yg)("inlineCode",{parentName:"strong"},"Example"))),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre",className:"language-js"},"client.on('roomMessage', (message) => {\n    if (client.name === message.author.name)\n        return;\n    message.reply('Hello');\n")),(0,n.yg)("p",null,"}"))}m.isMDXComponent=!0}}]);