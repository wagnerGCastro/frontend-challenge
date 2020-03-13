(function(t){function z(){for(var a=0;a<g.length;a++)g[a][0](g[a][1]);g=[];m=!1}function n(a,b){g.push([a,b]);m||(m=!0,A(z,0))}function B(a,b){function c(a){p(b,a)}function h(a){k(b,a)}try{a(c,h)}catch(d){h(d)}}function u(a){var b=a.owner,c=b.state_,b=b.data_,h=a[c];a=a.then;if("function"===typeof h){c=l;try{b=h(b)}catch(d){k(a,d)}}v(a,b)||(c===l&&p(a,b),c===q&&k(a,b))}function v(a,b){var c;try{if(a===b)throw new TypeError("A promises callback cannot return that same promise.");if(b&&("function"===
typeof b||"object"===typeof b)){var h=b.then;if("function"===typeof h)return h.call(b,function(d){c||(c=!0,b!==d?p(a,d):w(a,d))},function(b){c||(c=!0,k(a,b))}),!0}}catch(d){return c||k(a,d),!0}return!1}function p(a,b){a!==b&&v(a,b)||w(a,b)}function w(a,b){a.state_===r&&(a.state_=x,a.data_=b,n(C,a))}function k(a,b){a.state_===r&&(a.state_=x,a.data_=b,n(D,a))}function y(a){var b=a.then_;a.then_=void 0;for(a=0;a<b.length;a++)u(b[a])}function C(a){a.state_=l;y(a)}function D(a){a.state_=q;y(a)}function e(a){if("function"!==
typeof a)throw new TypeError("Promise constructor takes a function argument");if(!1===this instanceof e)throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");this.then_=[];B(a,this)}var f=t.Promise,s=f&&"resolve"in f&&"reject"in f&&"all"in f&&"race"in f&&function(){var a;new f(function(b){a=b});return"function"===typeof a}();"undefined"!==typeof exports&&exports?(exports.Promise=s?f:e,exports.Polyfill=e):"function"==
typeof define&&define.amd?define(function(){return s?f:e}):s||(t.Promise=e);var r="pending",x="sealed",l="fulfilled",q="rejected",E=function(){},A="undefined"!==typeof setImmediate?setImmediate:setTimeout,g=[],m;e.prototype={constructor:e,state_:r,then_:null,data_:void 0,then:function(a,b){var c={owner:this,then:new this.constructor(E),fulfilled:a,rejected:b};this.state_===l||this.state_===q?n(u,c):this.then_.push(c);return c.then},"catch":function(a){return this.then(null,a)}};e.all=function(a){if("[object Array]"!==
Object.prototype.toString.call(a))throw new TypeError("You must pass an array to Promise.all().");return new this(function(b,c){function h(a){e++;return function(c){d[a]=c;--e||b(d)}}for(var d=[],e=0,f=0,g;f<a.length;f++)(g=a[f])&&"function"===typeof g.then?g.then(h(f),c):d[f]=g;e||b(d)})};e.race=function(a){if("[object Array]"!==Object.prototype.toString.call(a))throw new TypeError("You must pass an array to Promise.race().");return new this(function(b,c){for(var e=0,d;e<a.length;e++)(d=a[e])&&"function"===
typeof d.then?d.then(b,c):b(d)})};e.resolve=function(a){return a&&"object"===typeof a&&a.constructor===this?a:new this(function(b){b(a)})};e.reject=function(a){return new this(function(b,c){c(a)})}})("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this);

(function(t){var e=function(){try{return!!Symbol.iterator}catch(e){return false}};var r=e();var n=function(t){var e={next:function(){var e=t.shift();return{done:e===void 0,value:e}}};if(r){e[Symbol.iterator]=function(){return e}}return e};var i=function(e){return encodeURIComponent(e).replace(/%20/g,"+")};var o=function(e){return decodeURIComponent(String(e).replace(/\+/g," "))};var a=function(){var a=function(e){Object.defineProperty(this,"_entries",{writable:true,value:{}});var t=typeof e;if(t==="undefined"){}else if(t==="string"){if(e!==""){this._fromString(e)}}else if(e instanceof a){var r=this;e.forEach(function(e,t){r.append(t,e)})}else if(e!==null&&t==="object"){if(Object.prototype.toString.call(e)==="[object Array]"){for(var n=0;n<e.length;n++){var i=e[n];if(Object.prototype.toString.call(i)==="[object Array]"||i.length!==2){this.append(i[0],i[1])}else{throw new TypeError("Expected [string, any] as entry at index "+n+" of URLSearchParams's input")}}}else{for(var o in e){if(e.hasOwnProperty(o)){this.append(o,e[o])}}}}else{throw new TypeError("Unsupported input's type for URLSearchParams")}};var e=a.prototype;e.append=function(e,t){if(e in this._entries){this._entries[e].push(String(t))}else{this._entries[e]=[String(t)]}};e.delete=function(e){delete this._entries[e]};e.get=function(e){return e in this._entries?this._entries[e][0]:null};e.getAll=function(e){return e in this._entries?this._entries[e].slice(0):[]};e.has=function(e){return e in this._entries};e.set=function(e,t){this._entries[e]=[String(t)]};e.forEach=function(e,t){var r;for(var n in this._entries){if(this._entries.hasOwnProperty(n)){r=this._entries[n];for(var i=0;i<r.length;i++){e.call(t,r[i],n,this)}}}};e.keys=function(){var r=[];this.forEach(function(e,t){r.push(t)});return n(r)};e.values=function(){var t=[];this.forEach(function(e){t.push(e)});return n(t)};e.entries=function(){var r=[];this.forEach(function(e,t){r.push([t,e])});return n(r)};if(r){e[Symbol.iterator]=e.entries}e.toString=function(){var r=[];this.forEach(function(e,t){r.push(i(t)+"="+i(e))});return r.join("&")};t.URLSearchParams=a};var s=function(){try{var e=t.URLSearchParams;return new e("?a=1").toString()==="a=1"&&typeof e.prototype.set==="function"}catch(e){return false}};if(!s()){a()}var f=t.URLSearchParams.prototype;if(typeof f.sort!=="function"){f.sort=function(){var r=this;var n=[];this.forEach(function(e,t){n.push([t,e]);if(!r._entries){r.delete(t)}});n.sort(function(e,t){if(e[0]<t[0]){return-1}else if(e[0]>t[0]){return+1}else{return 0}});if(r._entries){r._entries={}}for(var e=0;e<n.length;e++){this.append(n[e][0],n[e][1])}}}if(typeof f._fromString!=="function"){Object.defineProperty(f,"_fromString",{enumerable:false,configurable:false,writable:false,value:function(e){if(this._entries){this._entries={}}else{var r=[];this.forEach(function(e,t){r.push(t)});for(var t=0;t<r.length;t++){this.delete(r[t])}}e=e.replace(/^\?/,"");var n=e.split("&");var i;for(var t=0;t<n.length;t++){i=n[t].split("=");this.append(o(i[0]),i.length>1?o(i[1]):"")}}})}})(typeof global!=="undefined"?global:typeof window!=="undefined"?window:typeof self!=="undefined"?self:this);(function(h){var e=function(){try{var e=new h.URL("b","http://a");e.pathname="c d";return e.href==="http://a/c%20d"&&e.searchParams}catch(e){return false}};var t=function(){var t=h.URL;var e=function(e,t){if(typeof e!=="string")e=String(e);var r=document,n;if(t&&(h.location===void 0||t!==h.location.href)){r=document.implementation.createHTMLDocument("");n=r.createElement("base");n.href=t;r.head.appendChild(n);try{if(n.href.indexOf(t)!==0)throw new Error(n.href)}catch(e){throw new Error("URL unable to set base "+t+" due to "+e)}}var i=r.createElement("a");i.href=e;if(n){r.body.appendChild(i);i.href=i.href}if(i.protocol===":"||!/:/.test(i.href)){throw new TypeError("Invalid URL")}Object.defineProperty(this,"_anchorElement",{value:i});var o=new h.URLSearchParams(this.search);var a=true;var s=true;var f=this;["append","delete","set"].forEach(function(e){var t=o[e];o[e]=function(){t.apply(o,arguments);if(a){s=false;f.search=o.toString();s=true}}});Object.defineProperty(this,"searchParams",{value:o,enumerable:true});var c=void 0;Object.defineProperty(this,"_updateSearchParams",{enumerable:false,configurable:false,writable:false,value:function(){if(this.search!==c){c=this.search;if(s){a=false;this.searchParams._fromString(this.search);a=true}}}})};var r=e.prototype;var n=function(t){Object.defineProperty(r,t,{get:function(){return this._anchorElement[t]},set:function(e){this._anchorElement[t]=e},enumerable:true})};["hash","host","hostname","port","protocol"].forEach(function(e){n(e)});Object.defineProperty(r,"search",{get:function(){return this._anchorElement["search"]},set:function(e){this._anchorElement["search"]=e;this._updateSearchParams()},enumerable:true});Object.defineProperties(r,{toString:{get:function(){var e=this;return function(){return e.href}}},href:{get:function(){return this._anchorElement.href.replace(/\?$/,"")},set:function(e){this._anchorElement.href=e;this._updateSearchParams()},enumerable:true},pathname:{get:function(){return this._anchorElement.pathname.replace(/(^\/?)/,"/")},set:function(e){this._anchorElement.pathname=e},enumerable:true},origin:{get:function(){var e={"http:":80,"https:":443,"ftp:":21}[this._anchorElement.protocol];var t=this._anchorElement.port!=e&&this._anchorElement.port!=="";return this._anchorElement.protocol+"//"+this._anchorElement.hostname+(t?":"+this._anchorElement.port:"")},enumerable:true},password:{get:function(){return""},set:function(e){},enumerable:true},username:{get:function(){return""},set:function(e){},enumerable:true}});e.createObjectURL=function(e){return t.createObjectURL.apply(t,arguments)};e.revokeObjectURL=function(e){return t.revokeObjectURL.apply(t,arguments)};h.URL=e};if(!e()){t()}if(h.location!==void 0&&!("origin"in h.location)){var r=function(){return h.location.protocol+"//"+h.location.hostname+(h.location.port?":"+h.location.port:"")};try{Object.defineProperty(h.location,"origin",{get:r,enumerable:true})}catch(e){setInterval(function(){h.location.origin=r()},100)}}})(typeof global!=="undefined"?global:typeof window!=="undefined"?window:typeof self!=="undefined"?self:this);
(self.Tarp=self.Tarp||{}).require=function(e){function m(c,e){var a=c.match(/^((\.)?.*\/|)(.[^.]*|)(\..*|)$/);return(new URL(a[1]+a[3]+(a[3]&&(a[4]||".js")),e)).href}function p(c,g,a){var b;var f=e.resolve(c,g,m);var d=l[f]=l[f]||{u:f};d.p||(d.p=new Promise(function(a,c){b=d.r=new XMLHttpRequest;b.onload=b.onerror=function(){var n,g,q=0;if(b=d.r){d.r=null;if(99<b.status&&(f=b.responseURL||f)!=d.u){if(l[f]){d=l[d.u]=l[f];d.p.then(a,c);if(d.r){var h=d.r;d.r=b;h.abort();h.onload()}return}d.u=f;l[f]=
d}if(99<b.status&&400>b.status){d.s=n=b.responseText;d.t=b.getResponseHeader("Content-Type");var k=function(){0>--q&&a(d)};if(b.$)for(n=n.replace(/\/\/.*|\/\*[\s\S]*?\*\//g,""),g=/require\s*(?:\.\s*resolve\s*(?:\.\s*paths\s*)?)?\(\s*(?:"((?:[^"\\]|\\.)+)"|'((?:[^'\\]|\\.)+)')\s*\)/g;null!==(h=g.exec(n));){var m=(new URL("."==(h[1]||h[2])[0]?f:e.paths[0],e.root)).href;(h=p(h[1]||h[2],m,!0)).r&&(q++,h.p.then(k,k))}k()}else c(d.e=Error(f+" "+b.status))}}}));if(b=b||!a&&d.r)try{b.abort(),b.$=a,b.open("GET",
f,!!a),b.send()}catch(q){b.onerror()}if(d.e)throw d.e;return d}function r(c,g){if(!c.m){var a=c.m={children:[],exports:Object.create(null),filename:c.u,id:c.u,loaded:!1,parent:g,paths:e.paths.slice(),uri:c.u};a.require=t(a);g&&g.children.push(a);"application/json"==c.t?a.exports=JSON.parse(c.s):(new Function("exports,require,module,__filename,__dirname",c.s+"\n//# sourceURL="+a.uri))(a.exports,a.require,a,a.uri,a.uri.match(/.*\//)[0]);a.loaded=!0}return c.m}function t(c){function g(a,f,d){function b(b){var e=
/package\.json$/;return e.test(b.u)&&!e.test(f)?(c=r(b,c),"string"==typeof c.exports.main?g(a,c.exports.main,d):c.exports):1==a?b.u:2==a?[k.match(/.*\//)[0]]:r(b,c).exports}var k=(new URL("."==f[0]?c?c.uri:e.root:e.paths[0],e.root)).href;return d?new Promise(function(a,c){p(f,k,d).p.then(b).then(a,c)}):b(p(f,k,d))}var a=g.bind(void 0,0);a.resolve=g.bind(a,1);a.resolve.paths=g.bind(a.resolve,2);return a}var l=Object.create(null);e=e||{};e.paths=e.paths||["./node_modules/"];e.resolve=e.resolve||m;e.root=
e.root||location.href;var u=t(null);e.expose&&(self.require=u);if(e.main)return u(e.main,!e.sync)};

/*!
 * jQuery Form Plugin
 * version: 4.2.2
 * Requires jQuery v1.7.2 or later
 * Project repository: https://github.com/jquery-form/form

 * Copyright 2017 Kevin Morris
 * Copyright 2006 M. Alsup

 * Dual licensed under the LGPL-2.1+ or MIT licenses
 * https://github.com/jquery-form/form#license

 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 */
!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof module&&module.exports?module.exports=function(t,r){return void 0===r&&(r="undefined"!=typeof window?require("jquery"):require("jquery")(t)),e(r),r}:e(jQuery)}(function(e){"use strict";function t(t){var r=t.data;t.isDefaultPrevented()||(t.preventDefault(),e(t.target).closest("form").ajaxSubmit(r))}function r(t){var r=t.target,a=e(r);if(!a.is("[type=submit],[type=image]")){var n=a.closest("[type=submit]");if(0===n.length)return;r=n[0]}var i=r.form;if(i.clk=r,"image"===r.type)if(void 0!==t.offsetX)i.clk_x=t.offsetX,i.clk_y=t.offsetY;else if("function"==typeof e.fn.offset){var o=a.offset();i.clk_x=t.pageX-o.left,i.clk_y=t.pageY-o.top}else i.clk_x=t.pageX-r.offsetLeft,i.clk_y=t.pageY-r.offsetTop;setTimeout(function(){i.clk=i.clk_x=i.clk_y=null},100)}function a(){if(e.fn.ajaxSubmit.debug){var t="[jquery.form] "+Array.prototype.join.call(arguments,"");window.console&&window.console.log?window.console.log(t):window.opera&&window.opera.postError&&window.opera.postError(t)}}var n=/\r?\n/g,i={};i.fileapi=void 0!==e('<input type="file">').get(0).files,i.formdata=void 0!==window.FormData;var o=!!e.fn.prop;e.fn.attr2=function(){if(!o)return this.attr.apply(this,arguments);var e=this.prop.apply(this,arguments);return e&&e.jquery||"string"==typeof e?e:this.attr.apply(this,arguments)},e.fn.ajaxSubmit=function(t,r,n,s){function u(r){var a,n,i=e.param(r,t.traditional).split("&"),o=i.length,s=[];for(a=0;a<o;a++)i[a]=i[a].replace(/\+/g," "),n=i[a].split("="),s.push([decodeURIComponent(n[0]),decodeURIComponent(n[1])]);return s}function c(r){function n(e){var t=null;try{e.contentWindow&&(t=e.contentWindow.document)}catch(e){a("cannot get iframe.contentWindow document: "+e)}if(t)return t;try{t=e.contentDocument?e.contentDocument:e.document}catch(r){a("cannot get iframe.contentDocument: "+r),t=e.document}return t}function i(){function t(){try{var e=n(v).readyState;a("state = "+e),e&&"uninitialized"===e.toLowerCase()&&setTimeout(t,50)}catch(e){a("Server abort: ",e," (",e.name,")"),s(L),j&&clearTimeout(j),j=void 0}}var r=p.attr2("target"),i=p.attr2("action"),o=p.attr("enctype")||p.attr("encoding")||"multipart/form-data";w.setAttribute("target",m),l&&!/post/i.test(l)||w.setAttribute("method","POST"),i!==f.url&&w.setAttribute("action",f.url),f.skipEncodingOverride||l&&!/post/i.test(l)||p.attr({encoding:"multipart/form-data",enctype:"multipart/form-data"}),f.timeout&&(j=setTimeout(function(){T=!0,s(A)},f.timeout));var u=[];try{if(f.extraData)for(var c in f.extraData)f.extraData.hasOwnProperty(c)&&(e.isPlainObject(f.extraData[c])&&f.extraData[c].hasOwnProperty("name")&&f.extraData[c].hasOwnProperty("value")?u.push(e('<input type="hidden" name="'+f.extraData[c].name+'">',k).val(f.extraData[c].value).appendTo(w)[0]):u.push(e('<input type="hidden" name="'+c+'">',k).val(f.extraData[c]).appendTo(w)[0]));f.iframeTarget||h.appendTo(D),v.attachEvent?v.attachEvent("onload",s):v.addEventListener("load",s,!1),setTimeout(t,15);try{w.submit()}catch(e){document.createElement("form").submit.apply(w)}}finally{w.setAttribute("action",i),w.setAttribute("enctype",o),r?w.setAttribute("target",r):p.removeAttr("target"),e(u).remove()}}function s(t){if(!x.aborted&&!X){if((O=n(v))||(a("cannot access response document"),t=L),t===A&&x)return x.abort("timeout"),void S.reject(x,"timeout");if(t===L&&x)return x.abort("server abort"),void S.reject(x,"error","server abort");if(O&&O.location.href!==f.iframeSrc||T){v.detachEvent?v.detachEvent("onload",s):v.removeEventListener("load",s,!1);var r,i="success";try{if(T)throw"timeout";var o="xml"===f.dataType||O.XMLDocument||e.isXMLDoc(O);if(a("isXml="+o),!o&&window.opera&&(null===O.body||!O.body.innerHTML)&&--C)return a("requeing onLoad callback, DOM not available"),void setTimeout(s,250);var u=O.body?O.body:O.documentElement;x.responseText=u?u.innerHTML:null,x.responseXML=O.XMLDocument?O.XMLDocument:O,o&&(f.dataType="xml"),x.getResponseHeader=function(e){return{"content-type":f.dataType}[e.toLowerCase()]},u&&(x.status=Number(u.getAttribute("status"))||x.status,x.statusText=u.getAttribute("statusText")||x.statusText);var c=(f.dataType||"").toLowerCase(),l=/(json|script|text)/.test(c);if(l||f.textarea){var p=O.getElementsByTagName("textarea")[0];if(p)x.responseText=p.value,x.status=Number(p.getAttribute("status"))||x.status,x.statusText=p.getAttribute("statusText")||x.statusText;else if(l){var m=O.getElementsByTagName("pre")[0],g=O.getElementsByTagName("body")[0];m?x.responseText=m.textContent?m.textContent:m.innerText:g&&(x.responseText=g.textContent?g.textContent:g.innerText)}}else"xml"===c&&!x.responseXML&&x.responseText&&(x.responseXML=q(x.responseText));try{M=N(x,c,f)}catch(e){i="parsererror",x.error=r=e||i}}catch(e){a("error caught: ",e),i="error",x.error=r=e||i}x.aborted&&(a("upload aborted"),i=null),x.status&&(i=x.status>=200&&x.status<300||304===x.status?"success":"error"),"success"===i?(f.success&&f.success.call(f.context,M,"success",x),S.resolve(x.responseText,"success",x),d&&e.event.trigger("ajaxSuccess",[x,f])):i&&(void 0===r&&(r=x.statusText),f.error&&f.error.call(f.context,x,i,r),S.reject(x,"error",r),d&&e.event.trigger("ajaxError",[x,f,r])),d&&e.event.trigger("ajaxComplete",[x,f]),d&&!--e.active&&e.event.trigger("ajaxStop"),f.complete&&f.complete.call(f.context,x,i),X=!0,f.timeout&&clearTimeout(j),setTimeout(function(){f.iframeTarget?h.attr("src",f.iframeSrc):h.remove(),x.responseXML=null},100)}}}var u,c,f,d,m,h,v,x,y,b,T,j,w=p[0],S=e.Deferred();if(S.abort=function(e){x.abort(e)},r)for(c=0;c<g.length;c++)u=e(g[c]),o?u.prop("disabled",!1):u.removeAttr("disabled");(f=e.extend(!0,{},e.ajaxSettings,t)).context=f.context||f,m="jqFormIO"+(new Date).getTime();var k=w.ownerDocument,D=p.closest("body");if(f.iframeTarget?(b=(h=e(f.iframeTarget,k)).attr2("name"))?m=b:h.attr2("name",m):(h=e('<iframe name="'+m+'" src="'+f.iframeSrc+'" />',k)).css({position:"absolute",top:"-1000px",left:"-1000px"}),v=h[0],x={aborted:0,responseText:null,responseXML:null,status:0,statusText:"n/a",getAllResponseHeaders:function(){},getResponseHeader:function(){},setRequestHeader:function(){},abort:function(t){var r="timeout"===t?"timeout":"aborted";a("aborting upload... "+r),this.aborted=1;try{v.contentWindow.document.execCommand&&v.contentWindow.document.execCommand("Stop")}catch(e){}h.attr("src",f.iframeSrc),x.error=r,f.error&&f.error.call(f.context,x,r,t),d&&e.event.trigger("ajaxError",[x,f,r]),f.complete&&f.complete.call(f.context,x,r)}},(d=f.global)&&0==e.active++&&e.event.trigger("ajaxStart"),d&&e.event.trigger("ajaxSend",[x,f]),f.beforeSend&&!1===f.beforeSend.call(f.context,x,f))return f.global&&e.active--,S.reject(),S;if(x.aborted)return S.reject(),S;(y=w.clk)&&(b=y.name)&&!y.disabled&&(f.extraData=f.extraData||{},f.extraData[b]=y.value,"image"===y.type&&(f.extraData[b+".x"]=w.clk_x,f.extraData[b+".y"]=w.clk_y));var A=1,L=2,F=e("meta[name=csrf-token]").attr("content"),E=e("meta[name=csrf-param]").attr("content");E&&F&&(f.extraData=f.extraData||{},f.extraData[E]=F),f.forceSync?i():setTimeout(i,10);var M,O,X,C=50,q=e.parseXML||function(e,t){return window.ActiveXObject?((t=new ActiveXObject("Microsoft.XMLDOM")).async="false",t.loadXML(e)):t=(new DOMParser).parseFromString(e,"text/xml"),t&&t.documentElement&&"parsererror"!==t.documentElement.nodeName?t:null},_=e.parseJSON||function(e){return window.eval("("+e+")")},N=function(t,r,a){var n=t.getResponseHeader("content-type")||"",i=("xml"===r||!r)&&n.indexOf("xml")>=0,o=i?t.responseXML:t.responseText;return i&&"parsererror"===o.documentElement.nodeName&&e.error&&e.error("parsererror"),a&&a.dataFilter&&(o=a.dataFilter(o,r)),"string"==typeof o&&(("json"===r||!r)&&n.indexOf("json")>=0?o=_(o):("script"===r||!r)&&n.indexOf("javascript")>=0&&e.globalEval(o)),o};return S}if(!this.length)return a("ajaxSubmit: skipping submit process - no element selected"),this;var l,f,d,p=this;"function"==typeof t?t={success:t}:"string"==typeof t||!1===t&&arguments.length>0?(t={url:t,data:r,dataType:n},"function"==typeof s&&(t.success=s)):void 0===t&&(t={}),l=t.method||t.type||this.attr2("method"),(d=(d="string"==typeof(f=t.url||this.attr2("action"))?e.trim(f):"")||window.location.href||"")&&(d=(d.match(/^([^#]+)/)||[])[1]),t=e.extend(!0,{url:d,success:e.ajaxSettings.success,type:l||e.ajaxSettings.type,iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank"},t);var m={};if(this.trigger("form-pre-serialize",[this,t,m]),m.veto)return a("ajaxSubmit: submit vetoed via form-pre-serialize trigger"),this;if(t.beforeSerialize&&!1===t.beforeSerialize(this,t))return a("ajaxSubmit: submit aborted via beforeSerialize callback"),this;var h=t.traditional;void 0===h&&(h=e.ajaxSettings.traditional);var v,g=[],x=this.formToArray(t.semantic,g,t.filtering);if(t.data){var y=e.isFunction(t.data)?t.data(x):t.data;t.extraData=y,v=e.param(y,h)}if(t.beforeSubmit&&!1===t.beforeSubmit(x,this,t))return a("ajaxSubmit: submit aborted via beforeSubmit callback"),this;if(this.trigger("form-submit-validate",[x,this,t,m]),m.veto)return a("ajaxSubmit: submit vetoed via form-submit-validate trigger"),this;var b=e.param(x,h);v&&(b=b?b+"&"+v:v),"GET"===t.type.toUpperCase()?(t.url+=(t.url.indexOf("?")>=0?"&":"?")+b,t.data=null):t.data=b;var T=[];if(t.resetForm&&T.push(function(){p.resetForm()}),t.clearForm&&T.push(function(){p.clearForm(t.includeHidden)}),!t.dataType&&t.target){var j=t.success||function(){};T.push(function(r,a,n){var i=arguments,o=t.replaceTarget?"replaceWith":"html";e(t.target)[o](r).each(function(){j.apply(this,i)})})}else t.success&&(e.isArray(t.success)?e.merge(T,t.success):T.push(t.success));if(t.success=function(e,r,a){for(var n=t.context||this,i=0,o=T.length;i<o;i++)T[i].apply(n,[e,r,a||p,p])},t.error){var w=t.error;t.error=function(e,r,a){var n=t.context||this;w.apply(n,[e,r,a,p])}}if(t.complete){var S=t.complete;t.complete=function(e,r){var a=t.context||this;S.apply(a,[e,r,p])}}var k=e("input[type=file]:enabled",this).filter(function(){return""!==e(this).val()}).length>0,D="multipart/form-data",A=p.attr("enctype")===D||p.attr("encoding")===D,L=i.fileapi&&i.formdata;a("fileAPI :"+L);var F,E=(k||A)&&!L;!1!==t.iframe&&(t.iframe||E)?t.closeKeepAlive?e.get(t.closeKeepAlive,function(){F=c(x)}):F=c(x):F=(k||A)&&L?function(r){for(var a=new FormData,n=0;n<r.length;n++)a.append(r[n].name,r[n].value);if(t.extraData){var i=u(t.extraData);for(n=0;n<i.length;n++)i[n]&&a.append(i[n][0],i[n][1])}t.data=null;var o=e.extend(!0,{},e.ajaxSettings,t,{contentType:!1,processData:!1,cache:!1,type:l||"POST"});t.uploadProgress&&(o.xhr=function(){var r=e.ajaxSettings.xhr();return r.upload&&r.upload.addEventListener("progress",function(e){var r=0,a=e.loaded||e.position,n=e.total;e.lengthComputable&&(r=Math.ceil(a/n*100)),t.uploadProgress(e,a,n,r)},!1),r}),o.data=null;var s=o.beforeSend;return o.beforeSend=function(e,r){t.formData?r.data=t.formData:r.data=a,s&&s.call(this,e,r)},e.ajax(o)}(x):e.ajax(t),p.removeData("jqxhr").data("jqxhr",F);for(var M=0;M<g.length;M++)g[M]=null;return this.trigger("form-submit-notify",[this,t]),this},e.fn.ajaxForm=function(n,i,o,s){if(("string"==typeof n||!1===n&&arguments.length>0)&&(n={url:n,data:i,dataType:o},"function"==typeof s&&(n.success=s)),n=n||{},n.delegation=n.delegation&&e.isFunction(e.fn.on),!n.delegation&&0===this.length){var u={s:this.selector,c:this.context};return!e.isReady&&u.s?(a("DOM not ready, queuing ajaxForm"),e(function(){e(u.s,u.c).ajaxForm(n)}),this):(a("terminating; zero elements found by selector"+(e.isReady?"":" (DOM not ready)")),this)}return n.delegation?(e(document).off("submit.form-plugin",this.selector,t).off("click.form-plugin",this.selector,r).on("submit.form-plugin",this.selector,n,t).on("click.form-plugin",this.selector,n,r),this):this.ajaxFormUnbind().on("submit.form-plugin",n,t).on("click.form-plugin",n,r)},e.fn.ajaxFormUnbind=function(){return this.off("submit.form-plugin click.form-plugin")},e.fn.formToArray=function(t,r,a){var n=[];if(0===this.length)return n;var o,s=this[0],u=this.attr("id"),c=t||void 0===s.elements?s.getElementsByTagName("*"):s.elements;if(c&&(c=e.makeArray(c)),u&&(t||/(Edge|Trident)\//.test(navigator.userAgent))&&(o=e(':input[form="'+u+'"]').get()).length&&(c=(c||[]).concat(o)),!c||!c.length)return n;e.isFunction(a)&&(c=e.map(c,a));var l,f,d,p,m,h,v;for(l=0,h=c.length;l<h;l++)if(m=c[l],(d=m.name)&&!m.disabled)if(t&&s.clk&&"image"===m.type)s.clk===m&&(n.push({name:d,value:e(m).val(),type:m.type}),n.push({name:d+".x",value:s.clk_x},{name:d+".y",value:s.clk_y}));else if((p=e.fieldValue(m,!0))&&p.constructor===Array)for(r&&r.push(m),f=0,v=p.length;f<v;f++)n.push({name:d,value:p[f]});else if(i.fileapi&&"file"===m.type){r&&r.push(m);var g=m.files;if(g.length)for(f=0;f<g.length;f++)n.push({name:d,value:g[f],type:m.type});else n.push({name:d,value:"",type:m.type})}else null!==p&&void 0!==p&&(r&&r.push(m),n.push({name:d,value:p,type:m.type,required:m.required}));if(!t&&s.clk){var x=e(s.clk),y=x[0];(d=y.name)&&!y.disabled&&"image"===y.type&&(n.push({name:d,value:x.val()}),n.push({name:d+".x",value:s.clk_x},{name:d+".y",value:s.clk_y}))}return n},e.fn.formSerialize=function(t){return e.param(this.formToArray(t))},e.fn.fieldSerialize=function(t){var r=[];return this.each(function(){var a=this.name;if(a){var n=e.fieldValue(this,t);if(n&&n.constructor===Array)for(var i=0,o=n.length;i<o;i++)r.push({name:a,value:n[i]});else null!==n&&void 0!==n&&r.push({name:this.name,value:n})}}),e.param(r)},e.fn.fieldValue=function(t){for(var r=[],a=0,n=this.length;a<n;a++){var i=this[a],o=e.fieldValue(i,t);null===o||void 0===o||o.constructor===Array&&!o.length||(o.constructor===Array?e.merge(r,o):r.push(o))}return r},e.fieldValue=function(t,r){var a=t.name,i=t.type,o=t.tagName.toLowerCase();if(void 0===r&&(r=!0),r&&(!a||t.disabled||"reset"===i||"button"===i||("checkbox"===i||"radio"===i)&&!t.checked||("submit"===i||"image"===i)&&t.form&&t.form.clk!==t||"select"===o&&-1===t.selectedIndex))return null;if("select"===o){var s=t.selectedIndex;if(s<0)return null;for(var u=[],c=t.options,l="select-one"===i,f=l?s+1:c.length,d=l?s:0;d<f;d++){var p=c[d];if(p.selected&&!p.disabled){var m=p.value;if(m||(m=p.attributes&&p.attributes.value&&!p.attributes.value.specified?p.text:p.value),l)return m;u.push(m)}}return u}return e(t).val().replace(n,"\r\n")},e.fn.clearForm=function(t){return this.each(function(){e("input,select,textarea",this).clearFields(t)})},e.fn.clearFields=e.fn.clearInputs=function(t){var r=/^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;return this.each(function(){var a=this.type,n=this.tagName.toLowerCase();r.test(a)||"textarea"===n?this.value="":"checkbox"===a||"radio"===a?this.checked=!1:"select"===n?this.selectedIndex=-1:"file"===a?/MSIE/.test(navigator.userAgent)?e(this).replaceWith(e(this).clone(!0)):e(this).val(""):t&&(!0===t&&/hidden/.test(a)||"string"==typeof t&&e(this).is(t))&&(this.value="")})},e.fn.resetForm=function(){return this.each(function(){var t=e(this),r=this.tagName.toLowerCase();switch(r){case"input":this.checked=this.defaultChecked;case"textarea":return this.value=this.defaultValue,!0;case"option":case"optgroup":var a=t.parents("select");return a.length&&a[0].multiple?"option"===r?this.selected=this.defaultSelected:t.find("option").resetForm():a.resetForm(),!0;case"select":return t.find("option").each(function(e){if(this.selected=this.defaultSelected,this.defaultSelected&&!t[0].multiple)return t[0].selectedIndex=e,!1}),!0;case"label":var n=e(t.attr("for")),i=t.find("input,select,textarea");return n[0]&&i.unshift(n[0]),i.resetForm(),!0;case"form":return("function"==typeof this.reset||"object"==typeof this.reset&&!this.reset.nodeType)&&this.reset(),!0;default:return t.find("form,input,label,select,textarea").resetForm(),!0}})},e.fn.enable=function(e){return void 0===e&&(e=!0),this.each(function(){this.disabled=!e})},e.fn.selected=function(t){return void 0===t&&(t=!0),this.each(function(){var r=this.type;if("checkbox"===r||"radio"===r)this.checked=t;else if("option"===this.tagName.toLowerCase()){var a=e(this).parent("select");t&&a[0]&&"select-one"===a[0].type&&a.find("option").selected(!1),this.selected=t}})},e.fn.ajaxSubmit.debug=!1});
//# sourceMappingURL=jquery.form.min.js.map

(function(global,factory){typeof exports==="object"&&typeof module!=="undefined"?module.exports=factory(global):typeof define==="function"&&define.amd?define(factory):factory(global)})(typeof self!=="undefined"?self:typeof window!=="undefined"?window:typeof global!=="undefined"?global:this,function(global){"use strict";global=global||{};var _Base64=global.Base64;var version="2.5.1";var buffer;if(typeof module!=="undefined"&&module.exports){try{buffer=eval("require('buffer').Buffer")}catch(err){buffer=undefined}}var b64chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";var b64tab=function(bin){var t={};for(var i=0,l=bin.length;i<l;i++)t[bin.charAt(i)]=i;return t}(b64chars);var fromCharCode=String.fromCharCode;var cb_utob=function(c){if(c.length<2){var cc=c.charCodeAt(0);return cc<128?c:cc<2048?fromCharCode(192|cc>>>6)+fromCharCode(128|cc&63):fromCharCode(224|cc>>>12&15)+fromCharCode(128|cc>>>6&63)+fromCharCode(128|cc&63)}else{var cc=65536+(c.charCodeAt(0)-55296)*1024+(c.charCodeAt(1)-56320);return fromCharCode(240|cc>>>18&7)+fromCharCode(128|cc>>>12&63)+fromCharCode(128|cc>>>6&63)+fromCharCode(128|cc&63)}};var re_utob=/[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;var utob=function(u){return u.replace(re_utob,cb_utob)};var cb_encode=function(ccc){var padlen=[0,2,1][ccc.length%3],ord=ccc.charCodeAt(0)<<16|(ccc.length>1?ccc.charCodeAt(1):0)<<8|(ccc.length>2?ccc.charCodeAt(2):0),chars=[b64chars.charAt(ord>>>18),b64chars.charAt(ord>>>12&63),padlen>=2?"=":b64chars.charAt(ord>>>6&63),padlen>=1?"=":b64chars.charAt(ord&63)];return chars.join("")};var btoa=global.btoa?function(b){return global.btoa(b)}:function(b){return b.replace(/[\s\S]{1,3}/g,cb_encode)};var _encode=buffer?buffer.from&&Uint8Array&&buffer.from!==Uint8Array.from?function(u){return(u.constructor===buffer.constructor?u:buffer.from(u)).toString("base64")}:function(u){return(u.constructor===buffer.constructor?u:new buffer(u)).toString("base64")}:function(u){return btoa(utob(u))};var encode=function(u,urisafe){return!urisafe?_encode(String(u)):_encode(String(u)).replace(/[+\/]/g,function(m0){return m0=="+"?"-":"_"}).replace(/=/g,"")};var encodeURI=function(u){return encode(u,true)};var re_btou=new RegExp(["[À-ß][-¿]","[à-ï][-¿]{2}","[ð-÷][-¿]{3}"].join("|"),"g");var cb_btou=function(cccc){switch(cccc.length){case 4:var cp=(7&cccc.charCodeAt(0))<<18|(63&cccc.charCodeAt(1))<<12|(63&cccc.charCodeAt(2))<<6|63&cccc.charCodeAt(3),offset=cp-65536;return fromCharCode((offset>>>10)+55296)+fromCharCode((offset&1023)+56320);case 3:return fromCharCode((15&cccc.charCodeAt(0))<<12|(63&cccc.charCodeAt(1))<<6|63&cccc.charCodeAt(2));default:return fromCharCode((31&cccc.charCodeAt(0))<<6|63&cccc.charCodeAt(1))}};var btou=function(b){return b.replace(re_btou,cb_btou)};var cb_decode=function(cccc){var len=cccc.length,padlen=len%4,n=(len>0?b64tab[cccc.charAt(0)]<<18:0)|(len>1?b64tab[cccc.charAt(1)]<<12:0)|(len>2?b64tab[cccc.charAt(2)]<<6:0)|(len>3?b64tab[cccc.charAt(3)]:0),chars=[fromCharCode(n>>>16),fromCharCode(n>>>8&255),fromCharCode(n&255)];chars.length-=[0,0,2,1][padlen];return chars.join("")};var _atob=global.atob?function(a){return global.atob(a)}:function(a){return a.replace(/\S{1,4}/g,cb_decode)};var atob=function(a){return _atob(String(a).replace(/[^A-Za-z0-9\+\/]/g,""))};var _decode=buffer?buffer.from&&Uint8Array&&buffer.from!==Uint8Array.from?function(a){return(a.constructor===buffer.constructor?a:buffer.from(a,"base64")).toString()}:function(a){return(a.constructor===buffer.constructor?a:new buffer(a,"base64")).toString()}:function(a){return btou(_atob(a))};var decode=function(a){return _decode(String(a).replace(/[-_]/g,function(m0){return m0=="-"?"+":"/"}).replace(/[^A-Za-z0-9\+\/]/g,""))};var noConflict=function(){var Base64=global.Base64;global.Base64=_Base64;return Base64};global.Base64={VERSION:version,atob:atob,btoa:btoa,fromBase64:decode,toBase64:encode,utob:utob,encode:encode,encodeURI:encodeURI,btou:btou,decode:decode,noConflict:noConflict,__buffer__:buffer};if(typeof Object.defineProperty==="function"){var noEnum=function(v){return{value:v,enumerable:false,writable:true,configurable:true}};global.Base64.extendString=function(){Object.defineProperty(String.prototype,"fromBase64",noEnum(function(){return decode(this)}));Object.defineProperty(String.prototype,"toBase64",noEnum(function(urisafe){return encode(this,urisafe)}));Object.defineProperty(String.prototype,"toBase64URI",noEnum(function(){return encode(this,true)}))}}if(global["Meteor"]){Base64=global.Base64}if(typeof module!=="undefined"&&module.exports){module.exports.Base64=global.Base64}else if(typeof define==="function"&&define.amd){define([],function(){return global.Base64})}return{Base64:global.Base64}});
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.VMasker = factory();
  }
}(this, function() {
  var DIGIT = "9",
      ALPHA = "A",
      ALPHANUM = "S",
      BY_PASS_KEYS = [9, 16, 17, 18, 36, 37, 38, 39, 40, 91, 92, 93],
      isAllowedKeyCode = function(keyCode) {
        for (var i = 0, len = BY_PASS_KEYS.length; i < len; i++) {
          if (keyCode == BY_PASS_KEYS[i]) {
            return false;
          }
        }
        return true;
      },
      mergeMoneyOptions = function(opts) {
        opts = opts || {};
        opts = {
          delimiter: opts.delimiter || ".",
          lastOutput: opts.lastOutput,
          precision: opts.hasOwnProperty("precision") ? opts.precision : 2,
          separator: opts.separator || ",",
          showSignal: opts.showSignal,
          suffixUnit: opts.suffixUnit && (" " + opts.suffixUnit.replace(/[\s]/g,'')) || "",
          unit: opts.unit && (opts.unit.replace(/[\s]/g,'') + " ") || "",
          zeroCents: opts.zeroCents
        };
        opts.moneyPrecision = opts.zeroCents ? 0 : opts.precision;
        return opts;
      },
      // Fill wildcards past index in output with placeholder
      addPlaceholdersToOutput = function(output, index, placeholder) {
        for (; index < output.length; index++) {
          if(output[index] === DIGIT || output[index] === ALPHA || output[index] === ALPHANUM) {
            output[index] = placeholder;
          }
        }
        return output;
      }
  ;

  var VanillaMasker = function(elements) {
    this.elements = elements;
  };

  VanillaMasker.prototype.unbindElementToMask = function() {
    for (var i = 0, len = this.elements.length; i < len; i++) {
      this.elements[i].lastOutput = "";
      this.elements[i].onkeyup = false;
      this.elements[i].onkeydown = false;

      if (this.elements[i].value.length) {
        this.elements[i].value = this.elements[i].value.replace(/\D/g, '');
      }
    }
  };

  VanillaMasker.prototype.bindElementToMask = function(maskFunction) {
    var that = this,
        onType = function(e) {
          e = e || window.event;
          var source = e.target || e.srcElement;

          if (isAllowedKeyCode(e.keyCode)) {
            setTimeout(function() {
              that.opts.lastOutput = source.lastOutput;
              source.value = VMasker[maskFunction](source.value, that.opts);
              source.lastOutput = source.value;
              if (source.setSelectionRange && that.opts.suffixUnit) {
                source.setSelectionRange(source.value.length, (source.value.length - that.opts.suffixUnit.length));
              }
            }, 0);
          }
        }
    ;
    for (var i = 0, len = this.elements.length; i < len; i++) {
      this.elements[i].lastOutput = "";
      this.elements[i].onkeyup = onType;
      if (this.elements[i].value.length) {
        this.elements[i].value = VMasker[maskFunction](this.elements[i].value, this.opts);
      }
    }
  };

  VanillaMasker.prototype.maskMoney = function(opts) {
    this.opts = mergeMoneyOptions(opts);
    this.bindElementToMask("toMoney");
  };

  VanillaMasker.prototype.maskNumber = function() {
    this.opts = {};
    this.bindElementToMask("toNumber");
  };
  
  VanillaMasker.prototype.maskAlphaNum = function() {
    this.opts = {};
    this.bindElementToMask("toAlphaNumeric");
  };

  VanillaMasker.prototype.maskPattern = function(pattern) {
    this.opts = {pattern: pattern};
    this.bindElementToMask("toPattern");
  };

  VanillaMasker.prototype.unMask = function() {
    this.unbindElementToMask();
  };

  var VMasker = function(el) {
    if (!el) {
      throw new Error("VanillaMasker: There is no element to bind.");
    }
    var elements = ("length" in el) ? (el.length ? el : []) : [el];
    return new VanillaMasker(elements);
  };

  VMasker.toMoney = function(value, opts) {
    opts = mergeMoneyOptions(opts);
    if (opts.zeroCents) {
      opts.lastOutput = opts.lastOutput || "";
      var zeroMatcher = ("("+ opts.separator +"[0]{0,"+ opts.precision +"})"),
          zeroRegExp = new RegExp(zeroMatcher, "g"),
          digitsLength = value.toString().replace(/[\D]/g, "").length || 0,
          lastDigitLength = opts.lastOutput.toString().replace(/[\D]/g, "").length || 0
      ;
      value = value.toString().replace(zeroRegExp, "");
      if (digitsLength < lastDigitLength) {
        value = value.slice(0, value.length - 1);
      }
    }
    var number = value.toString().replace(/[\D]/g, ""),
        clearDelimiter = new RegExp("^(0|\\"+ opts.delimiter +")"),
        clearSeparator = new RegExp("(\\"+ opts.separator +")$"),
        money = number.substr(0, number.length - opts.moneyPrecision),
        masked = money.substr(0, money.length % 3),
        cents = new Array(opts.precision + 1).join("0")
    ;
    money = money.substr(money.length % 3, money.length);
    for (var i = 0, len = money.length; i < len; i++) {
      if (i % 3 === 0) {
        masked += opts.delimiter;
      }
      masked += money[i];
    }
    masked = masked.replace(clearDelimiter, "");
    masked = masked.length ? masked : "0";
    var signal = "";
    if(opts.showSignal === true) {
      signal = value < 0 || (value.startsWith && value.startsWith('-')) ? "-" :  "";
    }
    if (!opts.zeroCents) {
      var beginCents = number.length - opts.precision,
          centsValue = number.substr(beginCents, opts.precision),
          centsLength = centsValue.length,
          centsSliced = (opts.precision > centsLength) ? opts.precision : centsLength
      ;
      cents = (cents + centsValue).slice(-centsSliced);
    }
    var output = opts.unit + signal + masked + opts.separator + cents;
    return output.replace(clearSeparator, "") + opts.suffixUnit;
  };

  VMasker.toPattern = function(value, opts) {
    var pattern = (typeof opts === 'object' ? opts.pattern : opts),
        patternChars = pattern.replace(/\W/g, ''),
        output = pattern.split(""),
        values = value.toString().replace(/\W/g, ""),
        charsValues = values.replace(/\W/g, ''),
        index = 0,
        i,
        outputLength = output.length,
        placeholder = (typeof opts === 'object' ? opts.placeholder : undefined)
    ;
    
    for (i = 0; i < outputLength; i++) {
      // Reached the end of input
      if (index >= values.length) {
        if (patternChars.length == charsValues.length) {
          return output.join("");
        }
        else if ((placeholder !== undefined) && (patternChars.length > charsValues.length)) {
          return addPlaceholdersToOutput(output, i, placeholder).join("");
        }
        else {
          break;
        }
      }
      // Remaining chars in input
      else{
        if ((output[i] === DIGIT && values[index].match(/[0-9]/)) ||
            (output[i] === ALPHA && values[index].match(/[a-zA-Z]/)) ||
            (output[i] === ALPHANUM && values[index].match(/[0-9a-zA-Z]/))) {
          output[i] = values[index++];
        } else if (output[i] === DIGIT || output[i] === ALPHA || output[i] === ALPHANUM) {
          if(placeholder !== undefined){
            return addPlaceholdersToOutput(output, i, placeholder).join("");
          }
          else{
            return output.slice(0, i).join("");
          }
        }
      }
    }
    return output.join("").substr(0, i);
  };

  VMasker.toNumber = function(value) {
    return value.toString().replace(/(?!^-)[^0-9]/g, "");
  };
  
  VMasker.toAlphaNumeric = function(value) {
    return value.toString().replace(/[^a-z0-9 ]+/i, "");
  };

  return VMasker;
}));

(function ($) {

    /** Fire on document ready. */
    $(document).ready(function () {

        var flashlogin = window.localStorage.getItem('flashMessage') ? window.localStorage.getItem('flashMessage') : '';

        // Routes API
        var route = {
            login: baseUrlAPI + '/auth/login',
            logout: baseUrlAPI + '/auth/logout',
            register: baseUrlAPI + '/auth/register',
            product: baseUrlAPI + '/v1/product',
            user: baseUrlAPI + '/v1/user'
        };

        var formTextVal = {
            name: $('.help-name'),
            email: $('.help-email'),
            password: $('.help-password'),
            messageSuccess: $('.message-success'),
            reponseBox: $('.reponse')
        };

        var formFields = {
            name: $("#name"),
            email: $("#email"),
            password: $("#password")
        };

        var btnLoginReg = $('.btn-login-register');
        var color_variation = $("input[name='color_variation']");
        var colorVariationInputs = $('.colorVariationInputs');

        // Masks
        if ($('.money').length) {
            VMasker($('.money')).maskMoney({ separator: '.' });
        }

        if ($('.click-false').length) {
            $('.click-false').click(function () {
                return false;
            });
        }

        if ($("input[name='color_variation']:checked").val() == 'N') {
            colorVariationInputs.css("display", "none");
        }

        color_variation.click(function () {
            if ($("input[name='color_variation']:checked").val() == 'N') {
                colorVariationInputs.css("display", "none");
            } else {
                colorVariationInputs.css("display", "block");
            }
        });

        if (flashlogin.length) {
            var flash = JSON.parse(Base64.decode(flashlogin));
            if (window.location.href == route_site.login) {
                formFields.email.val(flash.data.email);
                formFields.password.val(flash.data.password);
                formTextVal.messageSuccess.fadeIn(function () {
                    formTextVal.reponseBox.empty().html(flash.message);
                });
            }
        }

        // Form Login
        $('#formLogin').submit(function (e) {
            e.preventDefault();

            $.ajax({
                url: route_site.user_login,
                data: $(this).serialize() + '&apiUrl=' + route.login,
                type: 'POST',
                cache: false,
                beforeSend: function beforeSend() {
                    clearTextValid(formTextVal);
                    onLoading(btnLoginReg);
                    formTextVal.messageSuccess.fadeOut(function () {
                        formTextVal.reponseBox.empty().html('');
                    });
                    if (flashlogin.length) {
                        window.localStorage.removeItem('flashMessage');
                    }
                    formTextVal.messageSuccess.fadeOut(function () {
                        formTextVal.reponseBox.empty().html('');
                    });
                },
                error: function error(xhr, status, _error) {
                    if (status == 'error') {
                        if (xhr.status == 500) {
                            responsetMsg(formTextVal, 'alert-warning alert-success', 'alert-danger', 'Error ' + xhr.status + ': No communication with API server.');
                        }

                        if (xhr.status == 401) {
                            responsetMsg(formTextVal, 'alert-warning alert-success', 'alert-danger', xhr.responseJSON.message);
                        }

                        if (xhr.status == 400) {
                            var strValues = '';
                            var span = ' <br/> <span class="glyphicon glyphicon-info-sign"></span>';
                            var message = xhr.responseJSON.message;
                            var key = Object.keys(message).length;
                            var count = key;

                            for (var _key in message) {
                                count--;
                                if (count == 0) {
                                    span = "";
                                }
                                strValues += message[_key] + span;

                                if (message.hasOwnProperty(_key)) {
                                    responsetMsg(formTextVal, 'alert-warning alert-success', 'alert-danger', strValues);
                                }
                            }
                        }

                        if (typeof xhr.responseJSON !== 'undefined') {
                            if (typeof xhr.responseJSON.hasOwnProperty('message') !== 'undefined') {
                                var msg = xhr.responseJSON.message;
                                if (typeof msg.url !== 'undefined') {
                                    responsetMsg(formTextVal, 'alert-warning alert-success', 'alert-danger', msg.url);
                                }
                            }
                        }
                    }
                },
                success: function success(response) {
                    if (response.code == 200) {
                        clearForm(formFields);
                        responsetMsg(formTextVal, 'alert-warning alert-danger', 'alert-success', 'Token generate success.');
                        setTimeout(function () {
                            window.location.href = route_site.home;
                        }, 3000);
                    }
                },
                complete: function complete() {
                    offLoading(btnLoginReg, 'Login');
                }
            });
        });

        // Form Register
        $('#formRegister').submit(function (e) {
            e.preventDefault();

            var dataForm = $(this).serialize();
            var name = $("#name");
            var email = $("#email");
            var password = $("#password");
            var objLogin = { 'name': name.val(), 'email': email.val(), 'password': password.val() };

            $.ajax({
                url: route.register,
                data: dataForm,
                type: 'POST',
                cache: false,
                beforeSend: function beforeSend() {
                    clearTextValid(formTextVal);
                    onLoading(btnLoginReg);
                },
                error: function error(xhr, status, _error2) {
                    if (xhr.status == 400) {
                        var resp = xhr.responseJSON.message;
                        if (resp.email) {
                            respValidation(formTextVal.email, resp.email);
                        }
                        if (resp.name) {
                            respValidation(formTextVal.name, resp.name);
                        }
                        if (resp.password) {
                            respValidation(formTextVal.password, resp.password);
                        }
                    } else {
                        if (status == 'error') {
                            responsetMsg(formTextVal, 'alert-warning alert-success', 'alert-danger', 'Error ' + xhr.status + ': No communication with API server.');
                        }
                    }
                },
                success: function success(response) {
                    if (response.code == 201) {
                        clearForm(formFields);
                        formTextVal.messageSuccess.fadeIn(function () {
                            formTextVal.reponseBox.empty().html(response.message);
                        });

                        setTimeout(function () {
                            var flashMessage = { 'message': 'Thank you for registering now login to generate token', 'data': objLogin };
                            localStorage.setItem("flashMessage", Base64.encode(JSON.stringify(flashMessage)));
                            window.location.href = route_site.login;
                        }, 3000);
                    }
                },
                complete: function complete() {
                    offLoading(btnLoginReg, 'Register');
                }
            });
        });

        // Delete product id
        $('.deleteProductId').click(function (e) {
            e.preventDefault();
            var idProdutct = $(this).attr("data-id");
            var urlDelete = $(this).attr("href");

            $('.formProductDelete').attr("action", urlDelete);

            if (confirm('Are you sure?')) {
                $('.formProductDelete').submit();
            }
        });

        // Table User
        var tabUser = $('#tablUser').DataTable({});

        // Table Product
        var tabProduct = $('#tabProduct').dataTable({
            dom: 'Bfrtip',
            buttons: [{
                'text': '<a class=""><span class="glyphicon glyphicon-plus-sign"></span> Create product</a>',
                'titleAttr': 'Criar evento',
                'action': function action() {
                    window.location.href = route_site.product_create;
                }
            }, {
                'extend': 'csvHtml5',
                'text': '<a class=""><span class="glyphicon glyphicon-save"></span> Export to csv</a>',
                'titleAttr': 'Export to csv'
            }]
        });
    });

    /**  Fires in document when all elements are loaded  (Jquery > 3.0) */
    $(window).on("load", function () {

        $('.loader-1').fadeOut('slow', function () {
            $('.table-hidden').css('visibility', 'visible');
        });
    });

    /**  Fires on document when visible on screen */
    // $(window).on('scroll', function() {
    // });
})(jQuery);

// Clear fields form
function clearForm(formFields) {
    $(formFields.name).val('');
    $(formFields.email).val('');
    $(formFields.password).val('');
}

// Clear texts validation
function clearTextValid(text) {
    $(text.name).find('strong').empty().html();
    $(text.email).find('strong').empty().html();
    $(text.password).find('strong').empty().html();
    $(text.messageSuccess).fadeOut();
}

// Response Validations
function respValidation(formTextVal, text) {
    formTextVal.find('strong').empty().html(text);
}

// Response
function responsetMsg(formTextVal, remove_class, add_class, resp_json) {
    $(formTextVal.messageSuccess).removeClass(remove_class).addClass(add_class).fadeIn(200, function () {
        return formTextVal.reponseBox.empty().html(resp_json);
    });
}

// Loading on
function onLoading(selector) {
    selector.delay(200).html('\n        <div class="sk-circle">\n            <div class="sk-circle1 sk-child"></div>\n            <div class="sk-circle2 sk-child"></div>\n            <div class="sk-circle3 sk-child"></div>\n            <div class="sk-circle4 sk-child"></div>\n            <div class="sk-circle5 sk-child"></div>\n            <div class="sk-circle6 sk-child"></div>\n            <div class="sk-circle7 sk-child"></div>\n            <div class="sk-circle8 sk-child"></div>\n            <div class="sk-circle9 sk-child"></div>\n            <div class="sk-circle10 sk-child"></div>\n            <div class="sk-circle11 sk-child"></div>\n            <div class="sk-circle12 sk-child"></div>\n        </div>  Loading...\n    ');
}

// Loading off
function offLoading(selector, txt) {
    selector.delay(200).html(txt);
}