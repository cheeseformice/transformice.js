"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[141],{8860:(e,n,t)=>{t.d(n,{xA:()=>g,yg:()=>u});var r=t(7953);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function l(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?l(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):l(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function o(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)t=l[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)t=l[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var p=r.createContext({}),s=function(e){var n=r.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},g=function(e){var n=s(e.components);return r.createElement(p.Provider,{value:n},e.children)},c="mdxType",y={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},d=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,l=e.originalType,p=e.parentName,g=o(e,["components","mdxType","originalType","parentName"]),c=s(t),d=a,u=c["".concat(p,".").concat(d)]||c[d]||y[d]||l;return t?r.createElement(u,i(i({ref:n},g),{},{components:t})):r.createElement(u,i({ref:n},g))}));function u(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var l=t.length,i=new Array(l);i[0]=d;var o={};for(var p in n)hasOwnProperty.call(n,p)&&(o[p]=n[p]);o.originalType=e,o[c]="string"==typeof e?e:a,i[1]=o;for(var s=2;s<l;s++)i[s]=t[s];return r.createElement.apply(null,i)}return r.createElement.apply(null,t)}d.displayName="MDXCreateElement"},87:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>p,contentTitle:()=>i,default:()=>y,frontMatter:()=>l,metadata:()=>o,toc:()=>s});var r=t(3911),a=(t(7953),t(8860));const l={id:"Internal.Connection",title:"Class: Connection",sidebar_label:"Connection",custom_edit_url:null},i=void 0,o={unversionedId:"api/classes/Internal.Connection",id:"api/classes/Internal.Connection",title:"Class: Connection",description:"Internal.Connection",source:"@site/docs/api/classes/Internal.Connection.md",sourceDirName:"api/classes",slug:"/api/classes/Internal.Connection",permalink:"/transformice.js/docs/api/classes/Internal.Connection",draft:!1,editUrl:null,tags:[],version:"current",frontMatter:{id:"Internal.Connection",title:"Class: Connection",sidebar_label:"Connection",custom_edit_url:null},sidebar:"sidebar",previous:{title:"WhisperMessage",permalink:"/transformice.js/docs/api/classes/WhisperMessage"},next:{title:"ClientEvents",permalink:"/transformice.js/docs/api/interfaces/Internal.ClientEvents"}},p={},s=[{value:"Hierarchy",id:"hierarchy",level:2},{value:"Constructors",id:"constructors",level:2},{value:"constructor",id:"constructor",level:3},{value:"Returns",id:"returns",level:4},{value:"Overrides",id:"overrides",level:4},{value:"Properties",id:"properties",level:2},{value:"buffer",id:"buffer",level:3},{value:"fingerprint",id:"fingerprint",level:3},{value:"length",id:"length",level:3},{value:"open",id:"open",level:3},{value:"socket",id:"socket",level:3},{value:"Methods",id:"methods",level:2},{value:"close",id:"close",level:3},{value:"Returns",id:"returns-1",level:4},{value:"connect",id:"connect",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Returns",id:"returns-2",level:4},{value:"send",id:"send",level:3},{value:"Parameters",id:"parameters-1",level:4},{value:"Returns",id:"returns-3",level:4}],g={toc:s},c="wrapper";function y(e){let{components:n,...t}=e;return(0,a.yg)(c,(0,r.A)({},g,t,{components:n,mdxType:"MDXLayout"}),(0,a.yg)("p",null,(0,a.yg)("a",{parentName:"p",href:"/transformice.js/docs/api/modules/Internal"},"Internal"),".Connection"),(0,a.yg)("p",null,"Represents a client that connects to Transformice."),(0,a.yg)("h2",{id:"hierarchy"},"Hierarchy"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("p",{parentName:"li"},(0,a.yg)("inlineCode",{parentName:"p"},"EventEmitter")),(0,a.yg)("p",{parentName:"li"},"\u21b3 ",(0,a.yg)("strong",{parentName:"p"},(0,a.yg)("inlineCode",{parentName:"strong"},"Connection"))))),(0,a.yg)("h2",{id:"constructors"},"Constructors"),(0,a.yg)("h3",{id:"constructor"},"constructor"),(0,a.yg)("p",null,"\u2022 ",(0,a.yg)("strong",{parentName:"p"},"new Connection"),"(): ",(0,a.yg)("a",{parentName:"p",href:"/transformice.js/docs/api/classes/Internal.Connection"},(0,a.yg)("inlineCode",{parentName:"a"},"Connection"))),(0,a.yg)("p",null,"Constructor."),(0,a.yg)("h4",{id:"returns"},"Returns"),(0,a.yg)("p",null,(0,a.yg)("a",{parentName:"p",href:"/transformice.js/docs/api/classes/Internal.Connection"},(0,a.yg)("inlineCode",{parentName:"a"},"Connection"))),(0,a.yg)("p",null,(0,a.yg)("strong",{parentName:"p"},(0,a.yg)("inlineCode",{parentName:"strong"},"Example"))),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-js"},"const conn = new Connection(client, 'connectionName');\n")),(0,a.yg)("h4",{id:"overrides"},"Overrides"),(0,a.yg)("p",null,"EventEmitter.constructor"),(0,a.yg)("h2",{id:"properties"},"Properties"),(0,a.yg)("h3",{id:"buffer"},"buffer"),(0,a.yg)("p",null,"\u2022 ",(0,a.yg)("strong",{parentName:"p"},"buffer"),": ",(0,a.yg)("inlineCode",{parentName:"p"},"Buffer")),(0,a.yg)("hr",null),(0,a.yg)("h3",{id:"fingerprint"},"fingerprint"),(0,a.yg)("p",null,"\u2022 ",(0,a.yg)("strong",{parentName:"p"},"fingerprint"),": ",(0,a.yg)("inlineCode",{parentName:"p"},"number")),(0,a.yg)("hr",null),(0,a.yg)("h3",{id:"length"},"length"),(0,a.yg)("p",null,"\u2022 ",(0,a.yg)("strong",{parentName:"p"},"length"),": ",(0,a.yg)("inlineCode",{parentName:"p"},"number")),(0,a.yg)("hr",null),(0,a.yg)("h3",{id:"open"},"open"),(0,a.yg)("p",null,"\u2022 ",(0,a.yg)("strong",{parentName:"p"},"open"),": ",(0,a.yg)("inlineCode",{parentName:"p"},"boolean")),(0,a.yg)("hr",null),(0,a.yg)("h3",{id:"socket"},"socket"),(0,a.yg)("p",null,"\u2022 ",(0,a.yg)("strong",{parentName:"p"},"socket"),": ",(0,a.yg)("inlineCode",{parentName:"p"},"Socket")),(0,a.yg)("h2",{id:"methods"},"Methods"),(0,a.yg)("h3",{id:"close"},"close"),(0,a.yg)("p",null,"\u25b8 ",(0,a.yg)("strong",{parentName:"p"},"close"),"(): ",(0,a.yg)("inlineCode",{parentName:"p"},"void")),(0,a.yg)("p",null,"Close the connection."),(0,a.yg)("h4",{id:"returns-1"},"Returns"),(0,a.yg)("p",null,(0,a.yg)("inlineCode",{parentName:"p"},"void")),(0,a.yg)("hr",null),(0,a.yg)("h3",{id:"connect"},"connect"),(0,a.yg)("p",null,"\u25b8 ",(0,a.yg)("strong",{parentName:"p"},"connect"),"(",(0,a.yg)("inlineCode",{parentName:"p"},"host"),", ",(0,a.yg)("inlineCode",{parentName:"p"},"port"),"): ",(0,a.yg)("inlineCode",{parentName:"p"},"void")),(0,a.yg)("p",null,"Connects the socket."),(0,a.yg)("h4",{id:"parameters"},"Parameters"),(0,a.yg)("table",null,(0,a.yg)("thead",{parentName:"table"},(0,a.yg)("tr",{parentName:"thead"},(0,a.yg)("th",{parentName:"tr",align:"left"},"Name"),(0,a.yg)("th",{parentName:"tr",align:"left"},"Type"))),(0,a.yg)("tbody",{parentName:"table"},(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:"left"},(0,a.yg)("inlineCode",{parentName:"td"},"host")),(0,a.yg)("td",{parentName:"tr",align:"left"},(0,a.yg)("inlineCode",{parentName:"td"},"string"))),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:"left"},(0,a.yg)("inlineCode",{parentName:"td"},"port")),(0,a.yg)("td",{parentName:"tr",align:"left"},(0,a.yg)("inlineCode",{parentName:"td"},"number"))))),(0,a.yg)("h4",{id:"returns-2"},"Returns"),(0,a.yg)("p",null,(0,a.yg)("inlineCode",{parentName:"p"},"void")),(0,a.yg)("hr",null),(0,a.yg)("h3",{id:"send"},"send"),(0,a.yg)("p",null,"\u25b8 ",(0,a.yg)("strong",{parentName:"p"},"send"),"(",(0,a.yg)("inlineCode",{parentName:"p"},"identifier"),", ",(0,a.yg)("inlineCode",{parentName:"p"},"packet"),"): ",(0,a.yg)("inlineCode",{parentName:"p"},"void")),(0,a.yg)("p",null,"Sends a packet to the connection."),(0,a.yg)("h4",{id:"parameters-1"},"Parameters"),(0,a.yg)("table",null,(0,a.yg)("thead",{parentName:"table"},(0,a.yg)("tr",{parentName:"thead"},(0,a.yg)("th",{parentName:"tr",align:"left"},"Name"),(0,a.yg)("th",{parentName:"tr",align:"left"},"Type"),(0,a.yg)("th",{parentName:"tr",align:"left"},"Description"))),(0,a.yg)("tbody",{parentName:"table"},(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:"left"},(0,a.yg)("inlineCode",{parentName:"td"},"identifier")),(0,a.yg)("td",{parentName:"tr",align:"left"},(0,a.yg)("inlineCode",{parentName:"td"},"BulleIdentifier")),(0,a.yg)("td",{parentName:"tr",align:"left"},"-")),(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:"left"},(0,a.yg)("inlineCode",{parentName:"td"},"packet")),(0,a.yg)("td",{parentName:"tr",align:"left"},(0,a.yg)("a",{parentName:"td",href:"/transformice.js/docs/api/classes/ByteArray"},(0,a.yg)("inlineCode",{parentName:"a"},"ByteArray"))),(0,a.yg)("td",{parentName:"tr",align:"left"},"The packet.")))),(0,a.yg)("h4",{id:"returns-3"},"Returns"),(0,a.yg)("p",null,(0,a.yg)("inlineCode",{parentName:"p"},"void")))}y.isMDXComponent=!0}}]);