(function(e){function t(t){for(var s,r,i=t[0],l=t[1],c=t[2],u=0,d=[];u<i.length;u++)r=i[u],Object.prototype.hasOwnProperty.call(o,r)&&o[r]&&d.push(o[r][0]),o[r]=0;for(s in l)Object.prototype.hasOwnProperty.call(l,s)&&(e[s]=l[s]);p&&p(t);while(d.length)d.shift()();return a.push.apply(a,c||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],s=!0,r=1;r<n.length;r++){var i=n[r];0!==o[i]&&(s=!1)}s&&(a.splice(t--,1),e=l(l.s=n[0]))}return e}var s={},r={app:0},o={app:0},a=[];function i(e){return l.p+"js/"+({"Expenses~Users~scoreBoard":"Expenses~Users~scoreBoard",Expenses:"Expenses",Users:"Users",scoreBoard:"scoreBoard",login:"login"}[e]||e)+"."+{"Expenses~Users~scoreBoard":"4d9d91c8",Expenses:"00bfd164",Users:"4ace908f",scoreBoard:"7b23855c",login:"54618897"}[e]+".js"}function l(t){if(s[t])return s[t].exports;var n=s[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,l),n.l=!0,n.exports}l.e=function(e){var t=[],n={"Expenses~Users~scoreBoard":1,Expenses:1,Users:1,scoreBoard:1};r[e]?t.push(r[e]):0!==r[e]&&n[e]&&t.push(r[e]=new Promise((function(t,n){for(var s="css/"+({"Expenses~Users~scoreBoard":"Expenses~Users~scoreBoard",Expenses:"Expenses",Users:"Users",scoreBoard:"scoreBoard",login:"login"}[e]||e)+"."+{"Expenses~Users~scoreBoard":"2fb423f0",Expenses:"0e544356",Users:"1b373d0d",scoreBoard:"76ee38ab",login:"31d6cfe0"}[e]+".css",o=l.p+s,a=document.getElementsByTagName("link"),i=0;i<a.length;i++){var c=a[i],u=c.getAttribute("data-href")||c.getAttribute("href");if("stylesheet"===c.rel&&(u===s||u===o))return t()}var d=document.getElementsByTagName("style");for(i=0;i<d.length;i++){c=d[i],u=c.getAttribute("data-href");if(u===s||u===o)return t()}var p=document.createElement("link");p.rel="stylesheet",p.type="text/css",p.onload=t,p.onerror=function(t){var s=t&&t.target&&t.target.src||o,a=new Error("Loading CSS chunk "+e+" failed.\n("+s+")");a.code="CSS_CHUNK_LOAD_FAILED",a.request=s,delete r[e],p.parentNode.removeChild(p),n(a)},p.href=o;var v=document.getElementsByTagName("head")[0];v.appendChild(p)})).then((function(){r[e]=0})));var s=o[e];if(0!==s)if(s)t.push(s[2]);else{var a=new Promise((function(t,n){s=o[e]=[t,n]}));t.push(s[2]=a);var c,u=document.createElement("script");u.charset="utf-8",u.timeout=120,l.nc&&u.setAttribute("nonce",l.nc),u.src=i(e);var d=new Error;c=function(t){u.onerror=u.onload=null,clearTimeout(p);var n=o[e];if(0!==n){if(n){var s=t&&("load"===t.type?"missing":t.type),r=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+s+": "+r+")",d.name="ChunkLoadError",d.type=s,d.request=r,n[1](d)}o[e]=void 0}};var p=setTimeout((function(){c({type:"timeout",target:u})}),12e4);u.onerror=u.onload=c,document.head.appendChild(u)}return Promise.all(t)},l.m=e,l.c=s,l.d=function(e,t,n){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},l.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,t){if(1&t&&(e=l(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(l.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)l.d(n,s,function(t){return e[t]}.bind(null,s));return n},l.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="/",l.oe=function(e){throw console.error(e),e};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],u=c.push.bind(c);c.push=t,c=c.slice();for(var d=0;d<c.length;d++)t(c[d]);var p=u;a.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"41cb":function(e,t,n){"use strict";(function(e){n("b0c0"),n("d3b7");var s=n("8c4f"),r=n("84ba"),o=n("c0d6"),a=new s["a"]({base:e,routes:[{path:"/about",name:"about",component:r["a"],meta:{requireAuth:!1}},{path:"/login",name:"login",component:function(){return n.e("login").then(n.bind(null,"a547"))}},{path:"/Expenses",name:"expenses",component:function(){return Promise.all([n.e("Expenses~Users~scoreBoard"),n.e("Expenses")]).then(n.bind(null,"e126"))},meta:{requireAuth:!0}},{path:"/scoreboard",name:"scoreboard",component:function(){return Promise.all([n.e("Expenses~Users~scoreBoard"),n.e("scoreBoard")]).then(n.bind(null,"dd91"))}},{path:"/Users",name:"users",component:function(){return Promise.all([n.e("Expenses~Users~scoreBoard"),n.e("Users")]).then(n.bind(null,"ed81"))},meta:{requireAuth:!0}}]});a.beforeEach((function(e,t,n){e.meta.requireAuth?o["a"].isAuthorised(e.name)?n():n({name:"login"}):n()})),t["a"]=a}).call(this,"/")},"48fb":function(e,t,n){},"495d":function(e,t,n){"use strict";var s=n("7e9a"),r=n.n(s);r.a},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var s=n("a026"),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app",[n("v-app-bar",{staticClass:"hidden-sm-and-down",attrs:{dense:"",app:"","hide-on-scroll":"",color:"blue lighten-1","text-color":"white"}},[n("v-icon",{attrs:{id:"menu",color:"white"},on:{click:function(t){e.navdrawer=!e.navdrawer}}},[e._v("mdi-menu")]),n("span",{staticClass:"text-uppercase white--text",staticStyle:{"font-family":"CoffeeHouse","font-size":"x-large"}},[e._v("Maldestor 95")]),n("v-spacer"),e.storeState.username?n("v-chip",{attrs:{label:"",color:"blue ligthen-1","text-color":"white"}},[e._v("User Connected: "+e._s(e.storeState.username))]):e._e(),n("v-spacer"),n("login-user",{model:{value:e.logged,callback:function(t){e.logged=t},expression:"logged"}})],1),n("v-navigation-drawer",{attrs:{temporary:"",app:""},model:{value:e.navdrawer,callback:function(t){e.navdrawer=t},expression:"navdrawer"}},[n("v-list",{attrs:{dense:""}},[n("v-list-item",{on:{click:function(t){e.navdrawer=!e.navdrawer}}},[n("v-list-item-icon",[n("v-icon",[e._v("mdi-menu")])],1),n("v-list-item-content",[n("v-list-item-title",[e._v("menu")])],1)],1),n("v-subheader",[e._v("TOOLS")]),n("v-list-item-group",{model:{value:e.item,callback:function(t){e.item=t},expression:"item"}},e._l(e.navlistfiltered,(function(t,s){return n("v-list-item",{key:s,on:{click:function(n){return e.navigateTo(t)}}},[n("v-list-item-icon",[n("v-icon",{domProps:{textContent:e._s(t.icon)}})],1),n("v-list-item-content",[n("v-list-item-title",{domProps:{textContent:e._s(t.text)}})],1)],1)})),1),n("v-subheader",[e._v("Info")]),n("p",[e._v(e._s(e.currentroute.path))]),n("login-user",{attrs:{color:"info"},model:{value:e.logged,callback:function(t){e.logged=t},expression:"logged"}})],1)],1),n("v-content",{attrs:{id:"vcontent"}},[n("router-view")],1),n("v-btn",{staticClass:"mt-8 hidden-md-and-up",attrs:{absolute:"",top:"",left:"",fab:"",color:"blue lighten-3",id:"menumobile"}},[n("v-icon",{on:{click:function(t){e.navdrawer=!e.navdrawer}}},[e._v("mdi-menu")])],1)],1)},o=[],a=(n("4de4"),n("b0c0"),n("9911"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-dialog",{attrs:{persistent:"","max-width":"600"},on:{keydown:function(t){if(!t.type.indexOf("key")&&e._k(t.keyCode,"esc",27,t.key,["Esc","Escape"]))return null;e.dialog=!1}},scopedSlots:e._u([{key:"activator",fn:function(t){var s=t.on;return[n("v-btn",e._g({staticClass:"blue lighten-1 white--text"},s),[n("span",[n("v-icon",{attrs:{small:""}},[e._v(" "+e._s(e.value?"mdi-logout":"mdi-login")+" ")])],1),n("v-spacer"),n("span",{attrs:{color:"white"}},[e._v(e._s(e.value?" logout":" login"))])],1)]}}]),model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[e.value?n("v-card",{attrs:{raised:""}},[n("v-row",{attrs:{"no-gutters":""}},[n("v-col",{attrs:{md:"12",align:"center"}},[n("p",[e._v("Are you sure you want to log out?")])])],1),n("v-row",{attrs:{"no-gutters":""}},[n("v-col",{attrs:{md:"6",align:"center"}},[n("v-btn",{attrs:{color:"primary"},on:{click:e.logout}},[e._v("Yes")])],1),n("v-col",{attrs:{md:"6",align:"center"}},[n("v-btn",{attrs:{color:"primary"},on:{click:function(t){e.dialog=!1}}},[e._v("No")])],1)],1)],1):e._e(),e.value?e._e():n("v-card",{attrs:{raised:""}},[n("v-container",[n("h1",{staticClass:"text-center"},[e._v(" Malestor95 ")]),n("p",{staticClass:"text-center"},[e._v("Login")]),n("v-text-field",{attrs:{name:"username",outlined:"",label:"Username or email address"},model:{value:e.username,callback:function(t){e.username=t},expression:"username"}}),n("v-text-field",{attrs:{name:"password",outlined:"",label:"password"},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}}),n("v-row",[n("v-spacer"),n("v-btn",{staticClass:"d-flex-inline justify-start",attrs:{rounded:"",color:"primary"},on:{click:e.login}},[e._v("Sign in")]),n("v-spacer"),n("v-btn",{attrs:{raised:"",rounded:"",color:"primary"},on:{click:function(t){e.dialog=!1}}},[e._v("Cancel")]),n("v-spacer")],1)],1)],1)],1)}),i=[],l=n("c0d6"),c={props:{logged:{type:Boolean,default:!0},value:{type:Boolean,default:!1}},data:function(){return{storeState:l["a"].state,username:"me",password:"tt",dialog:this.value,debug:"none"}},computed:{},methods:{logout:function(){l["a"].logout(),this.$router.push("about"),this.dialog=!1,this.$emit("input",!1)},login:function(){l["a"].login(this.username,this.password),this.dialog=!1,this.$emit("input",!0)},escapeform:function(){this.dialog=!1}}},u=c,d=(n("c072"),n("2877")),p=n("6544"),v=n.n(p),f=n("8336"),g=n("b0af"),m=n("62ad"),h=n("a523"),b=n("169a"),x=n("132d"),_=n("0fd9"),y=n("2fa4"),w=n("8654"),k=Object(d["a"])(u,a,i,!1,null,"58556cc7",null),S=k.exports;v()(k,{VBtn:f["a"],VCard:g["a"],VCol:m["a"],VContainer:h["a"],VDialog:b["a"],VIcon:x["a"],VRow:_["a"],VSpacer:y["a"],VTextField:w["a"]});var E={name:"App",components:{LoginUser:S},data:function(){return{storeState:l["a"].state,logged:!1,navdrawer:null,item:1,navlist:[{icon:"mdi-information-variant",text:"About",link:"about",logrequired:!1},{icon:"mdi-alert-box",text:"Risks",link:"risks",logrequired:!0},{icon:"mdi-cash-100",text:"Expenses",link:"expenses",logrequired:!0},{icon:"mdi-account-group",text:"Users",link:"users",logrequired:!0}]}},methods:{navigateTo:function(e){e.link!=this.$route.path&&this.$router.push(e.link).catch((function(){}))}},computed:{navlistfiltered:function(){var e=this,t=this.navlist.filter((function(t){return e.logged?!t.logrequired|l["a"].isAuthorised(t.link):!t.logrequired}));return t},currentroute:function(){return JSON.stringify(this.$route)},currentApp:function(){var e=this,t=this.navlist.filter((function(t){return e.$route.name==t.link}));return t[0]?t[0].text:"none"}},mounted:function(){l["a"].reinitSession(),this.storeState=l["a"].getState(),this.logged=this.storeState.logged}},I=E,B=(n("5c0b"),n("495d"),n("7496")),P=n("40dc"),C=n("cc20"),U=n("a75b"),V=n("8860"),O=n("da13"),A=n("5d23"),j=n("1baa"),D=n("34c3"),L=n("f774"),T=n("e0c7"),q=Object(d["a"])(I,r,o,!1,null,"504cf870",null),N=q.exports;v()(q,{VApp:B["a"],VAppBar:P["a"],VBtn:f["a"],VChip:C["a"],VContent:U["a"],VIcon:x["a"],VList:V["a"],VListItem:O["a"],VListItemContent:A["a"],VListItemGroup:j["a"],VListItemIcon:D["a"],VListItemTitle:A["b"],VNavigationDrawer:L["a"],VSpacer:y["a"],VSubheader:T["a"]});var $=n("f309");s["a"].use($["a"]);var J=new $["a"]({}),M=n("8c4f"),G=n("0628"),F=n.n(G),H=n("2b27"),R=n.n(H),z=n("41cb");s["a"].config.productionTip=!1,s["a"].use(M["a"]),s["a"].use(n("2ead")),s["a"].use(F.a),s["a"].use(R.a),new s["a"]({vuetify:J,router:z["a"],render:function(e){return e(N)}}).$mount("#app")},"5c0b":function(e,t,n){"use strict";var s=n("7694"),r=n.n(s);r.a},7694:function(e,t,n){},"7e9a":function(e,t,n){},"84ba":function(e,t,n){"use strict";var s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("h1",[e._v("About")]),n("p",[n("router-link",{attrs:{to:"/Expenses"}},[e._v("Go to Expenses")])],1),n("p",[n("router-link",{attrs:{to:"/users"}},[e._v("Go to Users")])],1),n("p",[n("router-link",{attrs:{to:"scoreboard"}},[e._v("ScoreBoard")])],1),n("p",[e._v(" "+e._s(e.sess)+" "),n("br"),e._v(e._s(e.username)+" "),n("br"),e._v(e._s(e.applicationPrivilege)+" "),n("br"),n("v-btn",{attrs:{color:"success"},on:{click:e.getSess}},[e._v("getSess")])],1)])},r=[],o={data:function(){return{sess:"session",username:"none",applicationPrivilege:{}}},methods:{getSess:function(){sessionStorage.getItem("sessionID")?(this.sess=JSON.parse(sessionStorage.getItem("sessionID")),this.username=this.sess.username,this.applicationPrivilege=this.sess.applicationPrivilege):(this.sess="none",this.username="none",this.applicationPrivilege="none")}}},a=o,i=n("2877"),l=n("6544"),c=n.n(l),u=n("8336"),d=Object(i["a"])(a,s,r,!1,null,"6aac85f2",null);t["a"]=d.exports;c()(d,{VBtn:u["a"]})},c072:function(e,t,n){"use strict";var s=n("48fb"),r=n.n(s);r.a},c0d6:function(e,t,n){"use strict";n.d(t,"a",(function(){return l}));n("4de4"),n("caad"),n("d81d"),n("b64b"),n("2532");var s=n("bc3a"),r=n.n(s),o=n("a026"),a=n("0628"),i=n.n(a);o["a"].use(i.a);var l={state:{numbers:[1,2,3],logged:!1,sessionID:"none yet",applicationPrivilege:null,username:null},debug:"",login:function(e,t){var n=this;r.a.post("/login",{username:e,password:t}).then((function(t){n.state.logged=!0,n.debug=t,n.state.sessionID=t.data.sessionID,n.state.applicationPrivilege=t.data.applicationPrivilege,n.state.username=e,sessionStorage.setItem("sessionID",JSON.stringify(n.state))})).catch((function(e){n.state.logged=!1,n.debug=e}))},logout:function(){var e=this;r.a.post("/logout").then((function(t){e.state.logged=!1,e.debug=t,e.state.sessionID="not logged anymore",e.state.applicationPrivilege=null,e.state.username=null,sessionStorage.removeItem("sessionID")})).catch((function(t){e.state.logged=!1,e.debug=t}))},reinitSession:function(){if(sessionStorage.getItem("sessionID")){var e=sessionStorage.getItem("sessionID");this.state=JSON.parse(e)}},reinitState:function(){this.state={numbers:[1,2,3],logged:!1,sessionID:"none yet",applicationPrivilege:null,username:null}},clearSession:function(){sessionStorage.removeItem("sessionID")},isAuthorised:function(e){return null!=this.state.username&&Object.keys(this.state.applicationPrivilege).map((function(e){return e.toLowerCase()})).includes(e)},getApplicationAccess:function(e){var t=Object.keys(this.state.applicationPrivilege).filter((function(t){return t==e}));return 0==t.length?null:this.state.applicationPrivilege[t[0]]},getState:function(){return this.state}}}});
//# sourceMappingURL=app.3d80c577.js.map