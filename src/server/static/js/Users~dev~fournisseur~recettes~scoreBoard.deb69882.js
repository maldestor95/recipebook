(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Users~dev~fournisseur~recettes~scoreBoard"],{"24e2":function(t,e,i){"use strict";var n=i("e0c7");e["a"]=n["a"]},"34ef":function(t,e,i){"use strict";var n=i("cc20");e["a"]=n["a"]},"68dd":function(t,e,i){},"8ce9":function(t,e,i){},"9e88":function(t,e,i){"use strict";i("a4d3"),i("4de4"),i("4160"),i("e439"),i("dbb4"),i("b64b"),i("159b");var n=i("ade3"),s=(i("cf36"),i("5607")),o=i("a026"),a=i("132d"),r=i("a9ad"),c=i("7560"),l=i("80d2");function u(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,n)}return i}function h(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?u(Object(i),!0).forEach((function(e){Object(n["a"])(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):u(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}e["a"]=o["a"].extend({name:"v-simple-checkbox",functional:!0,directives:{ripple:s["a"]},props:h({},r["a"].options.props,{},c["a"].options.props,{disabled:Boolean,ripple:{type:Boolean,default:!0},value:Boolean,indeterminate:Boolean,indeterminateIcon:{type:String,default:"$checkboxIndeterminate"},onIcon:{type:String,default:"$checkboxOn"},offIcon:{type:String,default:"$checkboxOff"}}),render:function(t,e){var i=e.props,n=e.data,s=[];if(i.ripple&&!i.disabled){var o=t("div",r["a"].options.methods.setTextColor(i.color,{staticClass:"v-input--selection-controls__ripple",directives:[{name:"ripple",value:{center:!0}}]}));s.push(o)}var c=i.offIcon;i.indeterminate?c=i.indeterminateIcon:i.value&&(c=i.onIcon),s.push(t(a["a"],r["a"].options.methods.setTextColor(i.value&&i.color,{props:{disabled:i.disabled,dark:i.dark,light:i.light}}),c));var u={"v-simple-checkbox":!0,"v-simple-checkbox--disabled":i.disabled};return t("div",h({},n,{class:u,on:{click:function(t){t.stopPropagation(),n.on&&n.on.input&&!i.disabled&&Object(l["C"])(n.on.input).forEach((function(t){return t(!i.value)}))}}}),s)}})},b974:function(t,e,i){"use strict";i.d(e,"b",(function(){return X}));i("a4d3"),i("e01a"),i("d28b"),i("99af"),i("4de4"),i("c740"),i("4160"),i("a630"),i("caad"),i("d81d"),i("13d5"),i("fb6a"),i("a434"),i("b0c0"),i("4ec9"),i("e439"),i("dbb4"),i("b64b"),i("d3b7"),i("ac1f"),i("25f0"),i("2532"),i("3ca3"),i("1276"),i("2ca0"),i("498a"),i("159b"),i("ddb0");var n=i("ade3"),s=(i("4ff9"),i("68dd"),i("34ef")),o=(i("7db0"),i("c975"),i("a9e3"),i("2909")),a=(i("ee6f"),i("480e")),r=i("16b7"),c=i("b848"),l=i("75eb"),u=i("f573"),h=i("e4d3"),d=i("f2e7"),f=i("7560"),p=i("a293"),m=i("dc22"),v=i("58df"),g=i("d9bd"),b=i("80d2");function y(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,n)}return i}function O(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?y(Object(i),!0).forEach((function(e){Object(n["a"])(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):y(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}var x=Object(v["a"])(c["a"],r["a"],l["a"],u["a"],h["a"],d["a"],f["a"]),w=x.extend({name:"v-menu",provide:function(){return{isInMenu:!0,theme:this.theme}},directives:{ClickOutside:p["a"],Resize:m["a"]},props:{auto:Boolean,closeOnClick:{type:Boolean,default:!0},closeOnContentClick:{type:Boolean,default:!0},disabled:Boolean,disableKeys:Boolean,maxHeight:{type:[Number,String],default:"auto"},offsetX:Boolean,offsetY:Boolean,openOnClick:{type:Boolean,default:!0},openOnHover:Boolean,origin:{type:String,default:"top left"},transition:{type:[Boolean,String],default:"v-menu-transition"}},data:function(){return{calculatedTopAuto:0,defaultOffset:8,hasJustFocused:!1,listIndex:-1,resizeTimeout:0,selectedIndex:null,tiles:[]}},computed:{activeTile:function(){return this.tiles[this.listIndex]},calculatedLeft:function(){var t=Math.max(this.dimensions.content.width,parseFloat(this.calculatedMinWidth));return this.auto?Object(b["g"])(this.calcXOverflow(this.calcLeftAuto(),t))||"0":this.calcLeft(t)||"0"},calculatedMaxHeight:function(){var t=this.auto?"200px":Object(b["g"])(this.maxHeight);return t||"0"},calculatedMaxWidth:function(){return Object(b["g"])(this.maxWidth)||"0"},calculatedMinWidth:function(){if(this.minWidth)return Object(b["g"])(this.minWidth)||"0";var t=Math.min(this.dimensions.activator.width+Number(this.nudgeWidth)+(this.auto?16:0),Math.max(this.pageWidth-24,0)),e=isNaN(parseInt(this.calculatedMaxWidth))?t:parseInt(this.calculatedMaxWidth);return Object(b["g"])(Math.min(e,t))||"0"},calculatedTop:function(){var t=this.auto?Object(b["g"])(this.calcYOverflow(this.calculatedTopAuto)):this.calcTop();return t||"0"},hasClickableTiles:function(){return Boolean(this.tiles.find((function(t){return t.tabIndex>-1})))},styles:function(){return{maxHeight:this.calculatedMaxHeight,minWidth:this.calculatedMinWidth,maxWidth:this.calculatedMaxWidth,top:this.calculatedTop,left:this.calculatedLeft,transformOrigin:this.origin,zIndex:this.zIndex||this.activeZIndex}}},watch:{isActive:function(t){t||(this.listIndex=-1)},isContentActive:function(t){this.hasJustFocused=t},listIndex:function(t,e){if(t in this.tiles){var i=this.tiles[t];i.classList.add("v-list-item--highlighted"),this.$refs.content.scrollTop=i.offsetTop-i.clientHeight}e in this.tiles&&this.tiles[e].classList.remove("v-list-item--highlighted")}},created:function(){this.$attrs.hasOwnProperty("full-width")&&Object(g["d"])("full-width",this)},mounted:function(){this.isActive&&this.callActivate()},methods:{activate:function(){var t=this;this.updateDimensions(),requestAnimationFrame((function(){t.startTransition().then((function(){t.$refs.content&&(t.calculatedTopAuto=t.calcTopAuto(),t.auto&&(t.$refs.content.scrollTop=t.calcScrollPosition()))}))}))},calcScrollPosition:function(){var t=this.$refs.content,e=t.querySelector(".v-list-item--active"),i=t.scrollHeight-t.offsetHeight;return e?Math.min(i,Math.max(0,e.offsetTop-t.offsetHeight/2+e.offsetHeight/2)):t.scrollTop},calcLeftAuto:function(){return parseInt(this.dimensions.activator.left-2*this.defaultOffset)},calcTopAuto:function(){var t=this.$refs.content,e=t.querySelector(".v-list-item--active");if(e||(this.selectedIndex=null),this.offsetY||!e)return this.computedTop;this.selectedIndex=Array.from(this.tiles).indexOf(e);var i=e.offsetTop-this.calcScrollPosition(),n=t.querySelector(".v-list-item").offsetTop;return this.computedTop-i-n-1},changeListIndex:function(t){if(this.getTiles(),this.isActive&&this.hasClickableTiles)if(t.keyCode!==b["u"].tab){if(t.keyCode===b["u"].down)this.nextTile();else if(t.keyCode===b["u"].up)this.prevTile();else{if(t.keyCode!==b["u"].enter||-1===this.listIndex)return;this.tiles[this.listIndex].click()}t.preventDefault()}else this.isActive=!1},closeConditional:function(t){var e=t.target;return this.isActive&&!this._isDestroyed&&this.closeOnClick&&!this.$refs.content.contains(e)},genActivatorListeners:function(){var t=u["a"].options.methods.genActivatorListeners.call(this);return this.disableKeys||(t.keydown=this.onKeyDown),t},genTransition:function(){return this.transition?this.$createElement("transition",{props:{name:this.transition}},[this.genContent()]):this.genContent()},genDirectives:function(){var t=this,e=[{name:"show",value:this.isContentActive}];return!this.openOnHover&&this.closeOnClick&&e.push({name:"click-outside",value:function(){t.isActive=!1},args:{closeConditional:this.closeConditional,include:function(){return[t.$el].concat(Object(o["a"])(t.getOpenDependentElements()))}}}),e},genContent:function(){var t=this,e={attrs:O({},this.getScopeIdAttrs(),{role:"role"in this.$attrs?this.$attrs.role:"menu"}),staticClass:"v-menu__content",class:O({},this.rootThemeClasses,Object(n["a"])({"v-menu__content--auto":this.auto,"v-menu__content--fixed":this.activatorFixed,menuable__content__active:this.isActive},this.contentClass.trim(),!0)),style:this.styles,directives:this.genDirectives(),ref:"content",on:{click:function(e){var i=e.target;i.getAttribute("disabled")||t.closeOnContentClick&&(t.isActive=!1)},keydown:this.onKeyDown}};return!this.disabled&&this.openOnHover&&(e.on=e.on||{},e.on.mouseenter=this.mouseEnterHandler),this.openOnHover&&(e.on=e.on||{},e.on.mouseleave=this.mouseLeaveHandler),this.$createElement("div",e,this.showLazyContent(this.getContentSlot()))},getTiles:function(){this.tiles=Array.from(this.$refs.content.querySelectorAll(".v-list-item"))},mouseEnterHandler:function(){var t=this;this.runDelay("open",(function(){t.hasJustFocused||(t.hasJustFocused=!0,t.isActive=!0)}))},mouseLeaveHandler:function(t){var e=this;this.runDelay("close",(function(){e.$refs.content.contains(t.relatedTarget)||requestAnimationFrame((function(){e.isActive=!1,e.callDeactivate()}))}))},nextTile:function(){var t=this.tiles[this.listIndex+1];if(!t){if(!this.tiles.length)return;return this.listIndex=-1,void this.nextTile()}this.listIndex++,-1===t.tabIndex&&this.nextTile()},prevTile:function(){var t=this.tiles[this.listIndex-1];if(!t){if(!this.tiles.length)return;return this.listIndex=this.tiles.length,void this.prevTile()}this.listIndex--,-1===t.tabIndex&&this.prevTile()},onKeyDown:function(t){var e=this;if(t.keyCode===b["u"].esc){setTimeout((function(){e.isActive=!1}));var i=this.getActivator();this.$nextTick((function(){return i&&i.focus()}))}else!this.isActive&&[b["u"].up,b["u"].down].includes(t.keyCode)&&(this.isActive=!0);this.$nextTick((function(){return e.changeListIndex(t)}))},onResize:function(){this.isActive&&(this.$refs.content.offsetWidth,this.updateDimensions(),clearTimeout(this.resizeTimeout),this.resizeTimeout=window.setTimeout(this.updateDimensions,100))}},render:function(t){var e={staticClass:"v-menu",class:{"v-menu--attached":""===this.attach||!0===this.attach||"attach"===this.attach},directives:[{arg:"500",name:"resize",value:this.onResize}]};return t("div",e,[!this.activator&&this.genActivator(),this.$createElement(a["a"],{props:{root:!0,light:this.light,dark:this.dark}},[this.genTransition()])])}}),I=w,T=(i("a15b"),i("615b"),i("9e88"));i("8ce9");function $(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,n)}return i}function C(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?$(Object(i),!0).forEach((function(e){Object(n["a"])(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):$(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}var k=f["a"].extend({name:"v-divider",props:{inset:Boolean,vertical:Boolean},render:function(t){var e;return this.$attrs.role&&"separator"!==this.$attrs.role||(e=this.vertical?"vertical":"horizontal"),t("hr",{class:C({"v-divider":!0,"v-divider--inset":this.inset,"v-divider--vertical":this.vertical},this.themeClasses),attrs:C({role:"separator","aria-orientation":e},this.$attrs),on:this.$listeners})}}),A=k,j=i("24e2"),S=i("da13"),D=i("1800"),P=i("5d23"),M=i("8860"),L=i("5607"),B=i("a9ad");function E(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,n)}return i}function V(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?E(Object(i),!0).forEach((function(e){Object(n["a"])(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):E(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}var F=Object(v["a"])(B["a"],f["a"]).extend({name:"v-select-list",directives:{ripple:L["a"]},props:{action:Boolean,dense:Boolean,hideSelected:Boolean,items:{type:Array,default:function(){return[]}},itemDisabled:{type:[String,Array,Function],default:"disabled"},itemText:{type:[String,Array,Function],default:"text"},itemValue:{type:[String,Array,Function],default:"value"},noDataText:String,noFilter:Boolean,searchInput:null,selectedItems:{type:Array,default:function(){return[]}}},computed:{parsedItems:function(){var t=this;return this.selectedItems.map((function(e){return t.getValue(e)}))},tileActiveClass:function(){return Object.keys(this.setTextColor(this.color).class||{}).join(" ")},staticNoDataTile:function(){var t={attrs:{role:void 0},on:{mousedown:function(t){return t.preventDefault()}}};return this.$createElement(S["a"],t,[this.genTileContent(this.noDataText)])}},methods:{genAction:function(t,e){var i=this;return this.$createElement(D["a"],[this.$createElement(T["a"],{props:{color:this.color,value:e},on:{input:function(){return i.$emit("select",t)}}})])},genDivider:function(t){return this.$createElement(A,{props:t})},genFilteredText:function(t){if(t=t||"",!this.searchInput||this.noFilter)return Object(b["k"])(t);var e=this.getMaskedCharacters(t),i=e.start,n=e.middle,s=e.end;return"".concat(Object(b["k"])(i)).concat(this.genHighlight(n)).concat(Object(b["k"])(s))},genHeader:function(t){return this.$createElement(j["a"],{props:t},t.header)},genHighlight:function(t){return'<span class="v-list-item__mask">'.concat(Object(b["k"])(t),"</span>")},genLabelledBy:function(t){return"list-item-".concat(this._uid)},getMaskedCharacters:function(t){var e=(this.searchInput||"").toString().toLocaleLowerCase(),i=t.toLocaleLowerCase().indexOf(e);if(i<0)return{start:"",middle:t,end:""};var n=t.slice(0,i),s=t.slice(i,i+e.length),o=t.slice(i+e.length);return{start:n,middle:s,end:o}},genTile:function(t){var e=this,i=t.item,n=t.index,s=t.disabled,o=void 0===s?null:s,a=t.value,r=void 0!==a&&a;r||(r=this.hasItem(i)),i===Object(i)&&(o=null!==o?o:this.getDisabled(i));var c={attrs:{"aria-selected":String(r),"aria-labelledby":"".concat(this.genLabelledBy(i),"-").concat(n),role:"option"},on:{mousedown:function(t){t.preventDefault()},click:function(){return o||e.$emit("select",i)}},props:{activeClass:this.tileActiveClass,disabled:o,ripple:!0,inputValue:r}};if(!this.$scopedSlots.item)return this.$createElement(S["a"],c,[this.action&&!this.hideSelected&&this.items.length>0?this.genAction(i,r):null,this.genTileContent(i,n)]);var l=this,u=this.$scopedSlots.item({parent:l,item:i,attrs:V({},c.attrs,{},c.props),on:c.on});return this.needsTile(u)?this.$createElement(S["a"],c,u):u},genTileContent:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,i=this.genFilteredText(this.getText(t));return this.$createElement(P["a"],[this.$createElement(P["b"],{attrs:{id:"".concat(this.genLabelledBy(t),"-").concat(e)},domProps:{innerHTML:i}})])},hasItem:function(t){return this.parsedItems.indexOf(this.getValue(t))>-1},needsTile:function(t){return 1!==t.length||null==t[0].componentOptions||"v-list-item"!==t[0].componentOptions.Ctor.options.name},getDisabled:function(t){return Boolean(Object(b["o"])(t,this.itemDisabled,!1))},getText:function(t){return String(Object(b["o"])(t,this.itemText,t))},getValue:function(t){return Object(b["o"])(t,this.itemValue,this.getText(t))}},render:function(){for(var t=[],e=this.items.length,i=0;i<e;i++){var n=this.items[i];this.hideSelected&&this.hasItem(n)||(null==n?t.push(this.genTile({item:n,index:i})):n.header?t.push(this.genHeader(n)):n.divider?t.push(this.genDivider(n)):t.push(this.genTile({item:n,index:i})))}return t.length||t.push(this.$slots["no-data"]||this.staticNoDataTile),this.$slots["prepend-item"]&&t.unshift(this.$slots["prepend-item"]),this.$slots["append-item"]&&t.push(this.$slots["append-item"]),this.$createElement("div",{staticClass:"v-select-list v-card",class:this.themeClasses},[this.$createElement(M["a"],{attrs:{id:this.$attrs.id,role:"listbox",tabindex:-1},props:{dense:this.dense}},t)])}}),H=i("8654"),W=i("a026"),_=W["a"].extend({name:"comparable",props:{valueComparator:{type:Function,default:b["i"]}}}),Y=W["a"].extend({name:"filterable",props:{noDataText:{type:String,default:"$vuetify.noDataText"}}});function N(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,n)}return i}function z(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?N(Object(i),!0).forEach((function(e){Object(n["a"])(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):N(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}var X={closeOnClick:!1,closeOnContentClick:!1,disableKeys:!0,openOnClick:!1,maxHeight:304},R=Object(v["a"])(H["a"],_,Y);e["a"]=R.extend().extend({name:"v-select",directives:{ClickOutside:p["a"]},props:{appendIcon:{type:String,default:"$dropdown"},attach:{type:null,default:!1},cacheItems:Boolean,chips:Boolean,clearable:Boolean,deletableChips:Boolean,disableLookup:Boolean,eager:Boolean,hideSelected:Boolean,items:{type:Array,default:function(){return[]}},itemColor:{type:String,default:"primary"},itemDisabled:{type:[String,Array,Function],default:"disabled"},itemText:{type:[String,Array,Function],default:"text"},itemValue:{type:[String,Array,Function],default:"value"},menuProps:{type:[String,Array,Object],default:function(){return X}},multiple:Boolean,openOnClear:Boolean,returnObject:Boolean,smallChips:Boolean},data:function(){return{cachedItems:this.cacheItems?this.items:[],content:null,isBooted:!1,isMenuActive:!1,lastItem:20,lazyValue:void 0!==this.value?this.value:this.multiple?[]:void 0,selectedIndex:-1,selectedItems:[],keyboardLookupPrefix:"",keyboardLookupLastTime:0}},computed:{allItems:function(){return this.filterDuplicates(this.cachedItems.concat(this.items))},classes:function(){return z({},H["a"].options.computed.classes.call(this),{"v-select":!0,"v-select--chips":this.hasChips,"v-select--chips--small":this.smallChips,"v-select--is-menu-active":this.isMenuActive,"v-select--is-multi":this.multiple})},computedItems:function(){return this.allItems},computedOwns:function(){return"list-".concat(this._uid)},computedCounterValue:function(){return this.multiple?this.selectedItems.length:(this.getText(this.selectedItems[0])||"").toString().length},directives:function(){return this.isFocused?[{name:"click-outside",value:this.blur,args:{closeConditional:this.closeConditional}}]:void 0},dynamicHeight:function(){return"auto"},hasChips:function(){return this.chips||this.smallChips},hasSlot:function(){return Boolean(this.hasChips||this.$scopedSlots.selection)},isDirty:function(){return this.selectedItems.length>0},listData:function(){var t=this.$vnode&&this.$vnode.context.$options._scopeId,e=t?Object(n["a"])({},t,!0):{};return{attrs:z({},e,{id:this.computedOwns}),props:{action:this.multiple,color:this.itemColor,dense:this.dense,hideSelected:this.hideSelected,items:this.virtualizedItems,itemDisabled:this.itemDisabled,itemText:this.itemText,itemValue:this.itemValue,noDataText:this.$vuetify.lang.t(this.noDataText),selectedItems:this.selectedItems},on:{select:this.selectItem},scopedSlots:{item:this.$scopedSlots.item}}},staticList:function(){return(this.$slots["no-data"]||this.$slots["prepend-item"]||this.$slots["append-item"])&&Object(g["b"])("assert: staticList should not be called if slots are used"),this.$createElement(F,this.listData)},virtualizedItems:function(){return this.$_menuProps.auto?this.computedItems:this.computedItems.slice(0,this.lastItem)},menuCanShow:function(){return!0},$_menuProps:function(){var t="string"===typeof this.menuProps?this.menuProps.split(","):this.menuProps;return Array.isArray(t)&&(t=t.reduce((function(t,e){return t[e.trim()]=!0,t}),{})),z({},X,{eager:this.eager,value:this.menuCanShow&&this.isMenuActive,nudgeBottom:t.offsetY?1:0},t)}},watch:{internalValue:function(t){this.initialValue=t,this.setSelectedItems()},isBooted:function(){var t=this;this.$nextTick((function(){t.content&&t.content.addEventListener&&t.content.addEventListener("scroll",t.onScroll,!1)}))},isMenuActive:function(t){var e=this;this.$nextTick((function(){return e.onMenuActiveChange(t)})),t&&(this.isBooted=!0)},items:{immediate:!0,handler:function(t){var e=this;this.cacheItems&&this.$nextTick((function(){e.cachedItems=e.filterDuplicates(e.cachedItems.concat(t))})),this.setSelectedItems()}}},mounted:function(){this.content=this.$refs.menu&&this.$refs.menu.$refs.content},methods:{blur:function(t){H["a"].options.methods.blur.call(this,t),this.isMenuActive=!1,this.isFocused=!1,this.selectedIndex=-1},activateMenu:function(){this.disabled||this.readonly||this.isMenuActive||(this.isMenuActive=!0)},clearableCallback:function(){var t=this;this.setValue(this.multiple?[]:void 0),this.$nextTick((function(){return t.$refs.input&&t.$refs.input.focus()})),this.openOnClear&&(this.isMenuActive=!0)},closeConditional:function(t){return!this._isDestroyed&&this.content&&!this.content.contains(t.target)&&this.$el&&!this.$el.contains(t.target)&&t.target!==this.$el},filterDuplicates:function(t){for(var e=new Map,i=0;i<t.length;++i){var n=t[i],s=this.getValue(n);!e.has(s)&&e.set(s,n)}return Array.from(e.values())},findExistingIndex:function(t){var e=this,i=this.getValue(t);return(this.internalValue||[]).findIndex((function(t){return e.valueComparator(e.getValue(t),i)}))},genChipSelection:function(t,e){var i=this,n=this.disabled||this.readonly||this.getDisabled(t);return this.$createElement(s["a"],{staticClass:"v-chip--select",attrs:{tabindex:-1},props:{close:this.deletableChips&&!n,disabled:n,inputValue:e===this.selectedIndex,small:this.smallChips},on:{click:function(t){n||(t.stopPropagation(),i.selectedIndex=e)},"click:close":function(){return i.onChipInput(t)}},key:JSON.stringify(this.getValue(t))},this.getText(t))},genCommaSelection:function(t,e,i){var n=e===this.selectedIndex&&this.computedColor,s=this.disabled||this.getDisabled(t);return this.$createElement("div",this.setTextColor(n,{staticClass:"v-select__selection v-select__selection--comma",class:{"v-select__selection--disabled":s},key:JSON.stringify(this.getValue(t))}),"".concat(this.getText(t)).concat(i?"":", "))},genDefaultSlot:function(){var t=this.genSelections(),e=this.genInput();return Array.isArray(t)?t.push(e):(t.children=t.children||[],t.children.push(e)),[this.genFieldset(),this.$createElement("div",{staticClass:"v-select__slot",directives:this.directives},[this.genLabel(),this.prefix?this.genAffix("prefix"):null,t,this.suffix?this.genAffix("suffix"):null,this.genClearIcon(),this.genIconSlot(),this.genHiddenInput()]),this.genMenu(),this.genProgress()]},genInput:function(){var t=H["a"].options.methods.genInput.call(this);return delete t.data.attrs.name,t.data.domProps.value=null,t.data.attrs.readonly=!0,t.data.attrs.type="text",t.data.attrs["aria-readonly"]=!0,t.data.attrs.autocomplete=t.data.attrs.autocomplete||"off",t.data.on.keypress=this.onKeyPress,t},genHiddenInput:function(){return this.$createElement("input",{domProps:{value:this.lazyValue},attrs:{type:"hidden",name:this.attrs$.name}})},genInputSlot:function(){var t=H["a"].options.methods.genInputSlot.call(this);return t.data.attrs=z({},t.data.attrs,{role:"button","aria-haspopup":"listbox","aria-expanded":String(this.isMenuActive),"aria-owns":this.computedOwns}),t},genList:function(){return this.$slots["no-data"]||this.$slots["prepend-item"]||this.$slots["append-item"]?this.genListWithSlot():this.staticList},genListWithSlot:function(){var t=this,e=["prepend-item","no-data","append-item"].filter((function(e){return t.$slots[e]})).map((function(e){return t.$createElement("template",{slot:e},t.$slots[e])}));return this.$createElement(F,z({},this.listData),e)},genMenu:function(){var t=this,e=this.$_menuProps;return e.activator=this.$refs["input-slot"],""===this.attach||!0===this.attach||"attach"===this.attach?e.attach=this.$el:e.attach=this.attach,this.$createElement(I,{attrs:{role:void 0},props:e,on:{input:function(e){t.isMenuActive=e,t.isFocused=e}},ref:"menu"},[this.genList()])},genSelections:function(){var t,e=this.selectedItems.length,i=new Array(e);t=this.$scopedSlots.selection?this.genSlotSelection:this.hasChips?this.genChipSelection:this.genCommaSelection;while(e--)i[e]=t(this.selectedItems[e],e,e===i.length-1);return this.$createElement("div",{staticClass:"v-select__selections"},i)},genSlotSelection:function(t,e){var i=this;return this.$scopedSlots.selection({attrs:{class:"v-chip--select"},parent:this,item:t,index:e,select:function(t){t.stopPropagation(),i.selectedIndex=e},selected:e===this.selectedIndex,disabled:this.disabled||this.readonly})},getMenuIndex:function(){return this.$refs.menu?this.$refs.menu.listIndex:-1},getDisabled:function(t){return Object(b["o"])(t,this.itemDisabled,!1)},getText:function(t){return Object(b["o"])(t,this.itemText,t)},getValue:function(t){return Object(b["o"])(t,this.itemValue,this.getText(t))},onBlur:function(t){t&&this.$emit("blur",t)},onChipInput:function(t){this.multiple?this.selectItem(t):this.setValue(null),0===this.selectedItems.length?this.isMenuActive=!0:this.isMenuActive=!1,this.selectedIndex=-1},onClick:function(t){this.isDisabled||(this.isAppendInner(t.target)||(this.isMenuActive=!0),this.isFocused||(this.isFocused=!0,this.$emit("focus")))},onEscDown:function(t){t.preventDefault(),this.isMenuActive&&(t.stopPropagation(),this.isMenuActive=!1)},onKeyPress:function(t){var e=this;if(!(this.multiple||this.readonly||this.disableLookup)){var i=1e3,n=performance.now();n-this.keyboardLookupLastTime>i&&(this.keyboardLookupPrefix=""),this.keyboardLookupPrefix+=t.key.toLowerCase(),this.keyboardLookupLastTime=n;var s=this.allItems.findIndex((function(t){var i=(e.getText(t)||"").toString();return i.toLowerCase().startsWith(e.keyboardLookupPrefix)})),o=this.allItems[s];-1!==s&&(this.setValue(this.returnObject?o:this.getValue(o)),setTimeout((function(){return e.setMenuIndex(s)})))}},onKeyDown:function(t){var e=this,i=t.keyCode,n=this.$refs.menu;if([b["u"].enter,b["u"].space].includes(i)&&this.activateMenu(),this.$emit("keydown",t),n)return this.isMenuActive&&i!==b["u"].tab&&this.$nextTick((function(){n.changeListIndex(t),e.$emit("update:list-index",n.listIndex)})),!this.isMenuActive&&[b["u"].up,b["u"].down].includes(i)?this.onUpDown(t):i===b["u"].esc?this.onEscDown(t):i===b["u"].tab?this.onTabDown(t):i===b["u"].space?this.onSpaceDown(t):void 0},onMenuActiveChange:function(t){if(!(this.multiple&&!t||this.getMenuIndex()>-1)){var e=this.$refs.menu;if(e&&this.isDirty)for(var i=0;i<e.tiles.length;i++)if("true"===e.tiles[i].getAttribute("aria-selected")){this.setMenuIndex(i);break}}},onMouseUp:function(t){var e=this;this.hasMouseDown&&3!==t.which&&!this.isDisabled&&(this.isAppendInner(t.target)?this.$nextTick((function(){return e.isMenuActive=!e.isMenuActive})):this.isEnclosed&&(this.isMenuActive=!0)),H["a"].options.methods.onMouseUp.call(this,t)},onScroll:function(){var t=this;if(this.isMenuActive){if(this.lastItem>=this.computedItems.length)return;var e=this.content.scrollHeight-(this.content.scrollTop+this.content.clientHeight)<200;e&&(this.lastItem+=20)}else requestAnimationFrame((function(){return t.content.scrollTop=0}))},onSpaceDown:function(t){t.preventDefault()},onTabDown:function(t){var e=this.$refs.menu;if(e){var i=e.activeTile;!this.multiple&&i&&this.isMenuActive?(t.preventDefault(),t.stopPropagation(),i.click()):this.blur(t)}},onUpDown:function(t){var e=this.$refs.menu;if(e){if(t.preventDefault(),this.multiple)return this.activateMenu();var i=t.keyCode;e.getTiles(),b["u"].up===i?e.prevTile():e.nextTile(),e.activeTile&&e.activeTile.click()}},selectItem:function(t){var e=this;if(this.multiple){var i=(this.internalValue||[]).slice(),n=this.findExistingIndex(t);if(-1!==n?i.splice(n,1):i.push(t),this.setValue(i.map((function(t){return e.returnObject?t:e.getValue(t)}))),this.$nextTick((function(){e.$refs.menu&&e.$refs.menu.updateDimensions()})),!this.multiple)return;var s=this.getMenuIndex();if(this.setMenuIndex(-1),this.hideSelected)return;this.$nextTick((function(){return e.setMenuIndex(s)}))}else this.setValue(this.returnObject?t:this.getValue(t)),this.isMenuActive=!1},setMenuIndex:function(t){this.$refs.menu&&(this.$refs.menu.listIndex=t)},setSelectedItems:function(){var t=this,e=[],i=this.multiple&&Array.isArray(this.internalValue)?this.internalValue:[this.internalValue],n=!0,s=!1,o=void 0;try{for(var a,r=function(){var i=a.value,n=t.allItems.findIndex((function(e){return t.valueComparator(t.getValue(e),t.getValue(i))}));n>-1&&e.push(t.allItems[n])},c=i[Symbol.iterator]();!(n=(a=c.next()).done);n=!0)r()}catch(l){s=!0,o=l}finally{try{n||null==c.return||c.return()}finally{if(s)throw o}}this.selectedItems=e},setValue:function(t){var e=this.internalValue;this.internalValue=t,t!==e&&this.$emit("change",t)},isAppendInner:function(t){var e=this.$refs["append-inner"];return e&&(e===t||e.contains(t))}}})},cf36:function(t,e,i){},ee6f:function(t,e,i){},f573:function(t,e,i){"use strict";i("a9e3"),i("d3b7");var n=i("fe6c"),s=i("21be"),o=i("4ad4"),a=i("58df"),r=i("80d2"),c=Object(a["a"])(s["a"],n["a"],o["a"]);e["a"]=c.extend().extend({name:"menuable",props:{allowOverflow:Boolean,light:Boolean,dark:Boolean,maxWidth:{type:[Number,String],default:"auto"},minWidth:[Number,String],nudgeBottom:{type:[Number,String],default:0},nudgeLeft:{type:[Number,String],default:0},nudgeRight:{type:[Number,String],default:0},nudgeTop:{type:[Number,String],default:0},nudgeWidth:{type:[Number,String],default:0},offsetOverflow:Boolean,openOnClick:Boolean,positionX:{type:Number,default:null},positionY:{type:Number,default:null},zIndex:{type:[Number,String],default:null}},data:function(){return{absoluteX:0,absoluteY:0,activatedBy:null,activatorFixed:!1,dimensions:{activator:{top:0,left:0,bottom:0,right:0,width:0,height:0,offsetTop:0,scrollHeight:0,offsetLeft:0},content:{top:0,left:0,bottom:0,right:0,width:0,height:0,offsetTop:0,scrollHeight:0}},hasJustFocused:!1,hasWindow:!1,inputActivator:!1,isContentActive:!1,pageWidth:0,pageYOffset:0,stackClass:"v-menu__content--active",stackMinZIndex:6}},computed:{computedLeft:function(){var t=this.dimensions.activator,e=this.dimensions.content,i=(!1!==this.attach?t.offsetLeft:t.left)||0,n=Math.max(t.width,e.width),s=0;if(s+=this.left?i-(n-t.width):i,this.offsetX){var o=isNaN(Number(this.maxWidth))?t.width:Math.min(t.width,Number(this.maxWidth));s+=this.left?-o:t.width}return this.nudgeLeft&&(s-=parseInt(this.nudgeLeft)),this.nudgeRight&&(s+=parseInt(this.nudgeRight)),s},computedTop:function(){var t=this.dimensions.activator,e=this.dimensions.content,i=0;return this.top&&(i+=t.height-e.height),!1!==this.attach?i+=t.offsetTop:i+=t.top+this.pageYOffset,this.offsetY&&(i+=this.top?-t.height:t.height),this.nudgeTop&&(i-=parseInt(this.nudgeTop)),this.nudgeBottom&&(i+=parseInt(this.nudgeBottom)),i},hasActivator:function(){return!!this.$slots.activator||!!this.$scopedSlots.activator||!!this.activator||!!this.inputActivator}},watch:{disabled:function(t){t&&this.callDeactivate()},isActive:function(t){this.disabled||(t?this.callActivate():this.callDeactivate())},positionX:"updateDimensions",positionY:"updateDimensions"},beforeMount:function(){this.hasWindow="undefined"!==typeof window},methods:{absolutePosition:function(){return{offsetTop:0,offsetLeft:0,scrollHeight:0,top:this.positionY||this.absoluteY,bottom:this.positionY||this.absoluteY,left:this.positionX||this.absoluteX,right:this.positionX||this.absoluteX,height:0,width:0}},activate:function(){},calcLeft:function(t){return Object(r["g"])(!1!==this.attach?this.computedLeft:this.calcXOverflow(this.computedLeft,t))},calcTop:function(){return Object(r["g"])(!1!==this.attach?this.computedTop:this.calcYOverflow(this.computedTop))},calcXOverflow:function(t,e){var i=t+e-this.pageWidth+12;return t=(!this.left||this.right)&&i>0?Math.max(t-i,0):Math.max(t,12),t+this.getOffsetLeft()},calcYOverflow:function(t){var e=this.getInnerHeight(),i=this.pageYOffset+e,n=this.dimensions.activator,s=this.dimensions.content.height,o=t+s,a=i<o;return a&&this.offsetOverflow&&n.top>s?t=this.pageYOffset+(n.top-s):a&&!this.allowOverflow?t=i-s-12:t<this.pageYOffset&&!this.allowOverflow&&(t=this.pageYOffset+12),t<12?12:t},callActivate:function(){this.hasWindow&&this.activate()},callDeactivate:function(){this.isContentActive=!1,this.deactivate()},checkForPageYOffset:function(){this.hasWindow&&(this.pageYOffset=this.activatorFixed?0:this.getOffsetTop())},checkActivatorFixed:function(){if(!1===this.attach){var t=this.getActivator();while(t){if("fixed"===window.getComputedStyle(t).position)return void(this.activatorFixed=!0);t=t.offsetParent}this.activatorFixed=!1}},deactivate:function(){},genActivatorListeners:function(){var t=this,e=o["a"].options.methods.genActivatorListeners.call(this),i=e.click;return e.click=function(e){t.openOnClick&&i&&i(e),t.absoluteX=e.clientX,t.absoluteY=e.clientY},e},getInnerHeight:function(){return this.hasWindow?window.innerHeight||document.documentElement.clientHeight:0},getOffsetLeft:function(){return this.hasWindow?window.pageXOffset||document.documentElement.scrollLeft:0},getOffsetTop:function(){return this.hasWindow?window.pageYOffset||document.documentElement.scrollTop:0},getRoundedBoundedClientRect:function(t){var e=t.getBoundingClientRect();return{top:Math.round(e.top),left:Math.round(e.left),bottom:Math.round(e.bottom),right:Math.round(e.right),width:Math.round(e.width),height:Math.round(e.height)}},measure:function(t){if(!t||!this.hasWindow)return null;var e=this.getRoundedBoundedClientRect(t);if(!1!==this.attach){var i=window.getComputedStyle(t);e.left=parseInt(i.marginLeft),e.top=parseInt(i.marginTop)}return e},sneakPeek:function(t){var e=this;requestAnimationFrame((function(){var i=e.$refs.content;i&&"none"===i.style.display?(i.style.display="inline-block",t(),i.style.display="none"):t()}))},startTransition:function(){var t=this;return new Promise((function(e){return requestAnimationFrame((function(){t.isContentActive=t.hasJustFocused=t.isActive,e()}))}))},updateDimensions:function(){var t=this;this.hasWindow="undefined"!==typeof window,this.checkActivatorFixed(),this.checkForPageYOffset(),this.pageWidth=document.documentElement.clientWidth;var e={};if(!this.hasActivator||this.absolute)e.activator=this.absolutePosition();else{var i=this.getActivator();if(!i)return;e.activator=this.measure(i),e.activator.offsetLeft=i.offsetLeft,!1!==this.attach?e.activator.offsetTop=i.offsetTop:e.activator.offsetTop=0}this.sneakPeek((function(){e.content=t.measure(t.$refs.content),t.dimensions=e}))}}})}}]);
//# sourceMappingURL=Users~dev~fournisseur~recettes~scoreBoard.deb69882.js.map