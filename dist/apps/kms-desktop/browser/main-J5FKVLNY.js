import{a as f,b as C,c as ee}from"./chunk-XMPMKECR.js";import{a as re}from"./chunk-MG5G4BKY.js";import{C as ne,b as G,c as Y,d as W,f as X,i as J,j as K,q as Q,r as $,v as te}from"./chunk-UHDG3LV6.js";import{$a as l,Cb as H,Db as V,Fa as F,Ib as U,Ka as h,Ma as w,Mb as B,Na as D,Oa as E,Ra as L,S as P,U as M,X as S,Ya as y,Zb as z,_ as m,ca as c,db as i,eb as a,fb as p,ga as I,gb as T,gc as Z,hb as x,ib as N,ic as q,jb as u,kb as j,ma as O,na as b,wa as k,ya as R,za as _,zb as g}from"./chunk-T6VZZ3TQ.js";var oe=[{path:"",redirectTo:"projects",pathMatch:"full"},{path:"login",loadComponent:()=>import("./chunk-ZAQZ5P32.js").then(r=>r.LoginComponent)},{path:"register",loadComponent:()=>import("./chunk-BZEJ7OFY.js").then(r=>r.RegisterComponent)},{path:"projects",loadComponent:()=>import("./chunk-TDXZ4EW7.js").then(r=>r.ProjectsComponent),canActivate:[C]},{path:"projects/:projectSlug",loadComponent:()=>import("./chunk-ZCNY5I4W.js").then(r=>r.BoardComponent),canActivate:[C]}];var v={production:!0,api_url:"http://localhost:3000/api",static_url:"http://localhost:3000/static"};var me="@",ce=(()=>{class r{constructor(e,n,o,s,d){this.doc=e,this.delegate=n,this.zone=o,this.animationType=s,this.moduleImpl=d,this._rendererFactoryPromise=null,this.scheduler=m(D,{optional:!0}),this.loadingSchedulerFn=m(he,{optional:!0})}ngOnDestroy(){this._engine?.flush()}loadImpl(){let e=()=>this.moduleImpl??import("./chunk-DJASXOS3.js").then(o=>o),n;return this.loadingSchedulerFn?n=this.loadingSchedulerFn(e):n=e(),n.catch(o=>{throw new P(5300,!1)}).then(({\u0275createEngine:o,\u0275AnimationRendererFactory:s})=>{this._engine=o(this.animationType,this.doc);let d=new s(this.delegate,this._engine,this.zone);return this.delegate=d,d})}createRenderer(e,n){let o=this.delegate.createRenderer(e,n);if(o.\u0275type===0)return o;typeof o.throwOnSyntheticProps=="boolean"&&(o.throwOnSyntheticProps=!1);let s=new A(o);return n?.data?.animation&&!this._rendererFactoryPromise&&(this._rendererFactoryPromise=this.loadImpl()),this._rendererFactoryPromise?.then(d=>{let pe=d.createRenderer(e,n);s.use(pe),this.scheduler?.notify(10)}).catch(d=>{s.use(o)}),s}begin(){this.delegate.begin?.()}end(){this.delegate.end?.()}whenRenderingDone(){return this.delegate.whenRenderingDone?.()??Promise.resolve()}static{this.\u0275fac=function(n){w()}}static{this.\u0275prov=M({token:r,factory:r.\u0275fac})}}return r})(),A=class{constructor(t){this.delegate=t,this.replay=[],this.\u0275type=1}use(t){if(this.delegate=t,this.replay!==null){for(let e of this.replay)e(t);this.replay=null}}get data(){return this.delegate.data}destroy(){this.replay=null,this.delegate.destroy()}createElement(t,e){return this.delegate.createElement(t,e)}createComment(t){return this.delegate.createComment(t)}createText(t){return this.delegate.createText(t)}get destroyNode(){return this.delegate.destroyNode}appendChild(t,e){this.delegate.appendChild(t,e)}insertBefore(t,e,n,o){this.delegate.insertBefore(t,e,n,o)}removeChild(t,e,n){this.delegate.removeChild(t,e,n)}selectRootElement(t,e){return this.delegate.selectRootElement(t,e)}parentNode(t){return this.delegate.parentNode(t)}nextSibling(t){return this.delegate.nextSibling(t)}setAttribute(t,e,n,o){this.delegate.setAttribute(t,e,n,o)}removeAttribute(t,e,n){this.delegate.removeAttribute(t,e,n)}addClass(t,e){this.delegate.addClass(t,e)}removeClass(t,e){this.delegate.removeClass(t,e)}setStyle(t,e,n,o){this.delegate.setStyle(t,e,n,o)}removeStyle(t,e,n){this.delegate.removeStyle(t,e,n)}setProperty(t,e,n){this.shouldReplay(e)&&this.replay.push(o=>o.setProperty(t,e,n)),this.delegate.setProperty(t,e,n)}setValue(t,e){this.delegate.setValue(t,e)}listen(t,e,n){return this.shouldReplay(e)&&this.replay.push(o=>o.listen(t,e,n)),this.delegate.listen(t,e,n)}shouldReplay(t){return this.replay!==null&&t.startsWith(me)}},he=new S("");function ae(r="animations"){return L("NgAsyncAnimations"),I([{provide:E,useFactory:(t,e,n)=>new ce(t,e,n,r),deps:[z,Y,k]},{provide:F,useValue:r==="noop"?"NoopAnimations":"BrowserAnimations"}])}var se={providers:[B(),G(),J(oe),{provide:Q,useValue:v.api_url},{provide:$,useValue:v.static_url},{provide:U,useFactory:ee,deps:[f],multi:!0},ae()]};function ue(r,t){r&1&&(i(0,"div",7),p(1,"kms-button",8),a())}function ge(r,t){if(r&1){let e=N();T(0),i(1,"kms-button",9),u("onClick",function(){O(e);let o=j();return b(o.onLogout())}),a(),p(2,"kms-avatar",10),H(3,"avatarUrl"),x()}if(r&2){let e=t.ngIf;h(2),l("image",V(3,1,e.avatar))}}var de=(()=>{class r{user=_.required();isAuthenticated=_.required();handleLogout=R();onLogout(){this.handleLogout.emit()}static \u0275fac=function(n){return new(n||r)};static \u0275cmp=c({type:r,selectors:[["kms-header"]],inputs:{user:[1,"user"],isAuthenticated:[1,"isAuthenticated"]},outputs:{handleLogout:"handleLogout"},standalone:!0,features:[g],decls:7,vars:2,consts:[[1,"header"],[1,"header__start"],["class","header__menu",4,"ngIf"],[1,"header__middle"],[1,"header__logo"],[1,"header__end"],[4,"ngIf"],[1,"header__menu"],["label","Projects","link","/projects","plain",""],["label","Logout",3,"onClick"],[3,"image"]],template:function(n,o){n&1&&(i(0,"div",0)(1,"div",1),y(2,ue,2,0,"div",2),a(),i(3,"div",3),p(4,"div",4),a(),i(5,"div",5),y(6,ge,4,3,"ng-container",6),a()()),n&2&&(h(2),l("ngIf",o.isAuthenticated()),h(4),l("ngIf",o.user()))},dependencies:[te,q,Z,re,ne],styles:["[_nghost-%COMP%]{display:block;position:fixed;z-index:10;width:100%;background-color:var(--greyLight-1);height:7rem;padding:1rem 2rem 2rem;mask-image:linear-gradient(0deg,transparent 0%,#000 20%,#000 100%)}[_nghost-%COMP%]   .header[_ngcontent-%COMP%]{padding:0rem 1rem;border-radius:.5rem;background-color:var(--greyLight-1);display:grid;grid-template-columns:repeat(3,1fr);box-shadow:.8rem .8rem 1.4rem var(--greyLight-2),-.2rem -.2rem 1.8rem var(--white);gap:2rem;align-items:center;width:100%;height:100%}[_nghost-%COMP%]   .header[_ngcontent-%COMP%]   .header__start[_ngcontent-%COMP%]{justify-self:start}[_nghost-%COMP%]   .header[_ngcontent-%COMP%]   .header__middle[_ngcontent-%COMP%]{justify-self:center}[_nghost-%COMP%]   .header[_ngcontent-%COMP%]   .header__middle[_ngcontent-%COMP%]   .header__logo[_ngcontent-%COMP%]{background-color:var(--greyDark);height:56px;width:200px;mask-image:url(/assets/logo-full.png);mask-position:center;mask-size:contain;mask-repeat:no-repeat}[_nghost-%COMP%]   .header[_ngcontent-%COMP%]   .header__end[_ngcontent-%COMP%]{justify-self:end;display:flex;align-items:center;gap:1rem}"],changeDetection:0})}return r})();var le=(()=>{class r{authStore=m(f);static \u0275fac=function(n){return new(n||r)};static \u0275cmp=c({type:r,selectors:[["kms-root"]],standalone:!0,features:[g],decls:3,vars:2,consts:[[3,"handleLogout","isAuthenticated","user"],[1,"main-app-container"]],template:function(n,o){n&1&&(i(0,"kms-header",0),u("handleLogout",function(){return o.authStore.logout({})}),a(),i(1,"div",1),p(2,"router-outlet"),a()),n&2&&l("isAuthenticated",o.authStore.isAuthenticated())("user",o.authStore.user())},dependencies:[K,X,de],styles:["[_nghost-%COMP%]   .main-app-container[_ngcontent-%COMP%]{padding-top:8rem}"],changeDetection:0})}return r})();W(le,se).catch(r=>console.error(r));
