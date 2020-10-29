/*! modernizr 3.11.3 (Custom Build) | MIT *
 * https://modernizr.com/download/?-mq-setclasses !*/
!function(e,n,t,o){function a(e,n){return typeof e===n}function s(){return"function"!=typeof t.createElement?t.createElement(arguments[0]):p?t.createElementNS.call(t,"http://www.w3.org/2000/svg",arguments[0]):t.createElement.apply(t,arguments)}function r(){var e=t.body;return e||(e=s(p?"svg":"body"),e.fake=!0),e}function i(e,n,o,a){var i,l,f,c,d="modernizr",p=s("div"),m=r();if(parseInt(o,10))for(;o--;)f=s("div"),f.id=a?a[o]:d+(o+1),p.appendChild(f);return i=s("style"),i.type="text/css",i.id="s"+d,(m.fake?m:p).appendChild(i),m.appendChild(p),i.styleSheet?i.styleSheet.cssText=e:i.appendChild(t.createTextNode(e)),p.id=d,m.fake&&(m.style.background="",m.style.overflow="hidden",c=u.style.overflow,u.style.overflow="hidden",u.appendChild(m)),l=n(p,e),m.fake?(m.parentNode.removeChild(m),u.style.overflow=c,u.offsetHeight):p.parentNode.removeChild(p),!!l}function l(e,t,o){var a;if("getComputedStyle"in n){a=getComputedStyle.call(n,e,t);var s=n.console;if(null!==a)o&&(a=a.getPropertyValue(o));else if(s){var r=s.error?"error":"log";s[r].call(s,"getComputedStyle returning null, its possible modernizr test results are inaccurate")}}else a=!t&&e.currentStyle&&e.currentStyle[o];return a}var f=[],c={_version:"3.11.3",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var t=this;setTimeout(function(){n(t[e])},0)},addTest:function(e,n,t){f.push({name:e,fn:n,options:t})},addAsyncTest:function(e){f.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=c,Modernizr=new Modernizr;var d=[],u=t.documentElement,p="svg"===u.nodeName.toLowerCase(),m=function(){var e=n.matchMedia||n.msMatchMedia;return e?function(n){var t=e(n);return t&&t.matches||!1}:function(e){var n=!1;return i("@media "+e+" { #modernizr { position: absolute; } }",function(e){n="absolute"===l(e,null,"position")}),n}}();c.mq=m,function(){var e,n,t,o,s,r,i;for(var l in f)if(f.hasOwnProperty(l)){if(e=[],n=f[l],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(t=0;t<n.options.aliases.length;t++)e.push(n.options.aliases[t].toLowerCase());for(o=a(n.fn,"function")?n.fn():n.fn,s=0;s<e.length;s++)r=e[s],i=r.split("."),1===i.length?Modernizr[i[0]]=o:(Modernizr[i[0]]&&(!Modernizr[i[0]]||Modernizr[i[0]]instanceof Boolean)||(Modernizr[i[0]]=new Boolean(Modernizr[i[0]])),Modernizr[i[0]][i[1]]=o),d.push((o?"":"no-")+i.join("-"))}}(),function(e){var n=u.className,t=Modernizr._config.classPrefix||"";if(p&&(n=n.baseVal),Modernizr._config.enableJSClass){var o=new RegExp("(^|\\s)"+t+"no-js(\\s|$)");n=n.replace(o,"$1"+t+"js$2")}Modernizr._config.enableClasses&&(e.length>0&&(n+=" "+t+e.join(" "+t)),p?u.className.baseVal=n:u.className=n)}(d),delete c.addTest,delete c.addAsyncTest;for(var h=0;h<Modernizr._q.length;h++)Modernizr._q[h]();e.Modernizr=Modernizr}(window,window,document);