var m=function(r){return function(e,n,t){return r(e,n,t)*t}},g=function(r,e){if(r)throw Error("Invalid sort config: "+e)},s=function(r){var e=r||{},n=e.asc,t=e.desc,u=n?1:-1,i=n||t;g(!i,"Expected `asc` or `desc` property"),g(n&&t,"Ambiguous object with `asc` and `desc` config properties");var a=r.comparer&&m(r.comparer);return{order:u,sortBy:i,comparer:a}},P=function(r){return function e(n,t,u,i,a,f,c){var o,l;if(typeof n=="string")o=f[n],l=c[n];else if(typeof n=="function")o=n(f),l=n(c);else{var v=s(n);return e(v.sortBy,t,u,v.order,v.comparer||r,f,c)}var d=a(o,l,i);return(d===0||o==null&&l==null)&&t.length>u?e(t[u],t,u+1,i,a,f,c):d}};function A(r,e,n){if(r===void 0||r===!0)return function(i,a){return e(i,a,n)};if(typeof r=="string")return g(r.includes("."),"String syntax not allowed for nested properties."),function(i,a){return e(i[r],a[r],n)};if(typeof r=="function")return function(i,a){return e(r(i),r(a),n)};if(Array.isArray(r)){var t=P(e);return function(i,a){return t(r[0],r,1,n,e,i,a)}}var u=s(r);return A(u.sortBy,u.comparer||e,u.order)}var p=function(r,e,n,t){var u;return Array.isArray(e)?(Array.isArray(n)&&n.length<2&&(u=n,n=u[0]),e.sort(A(n,t,r))):e};function S(r){var e=m(r.comparer);return function(n){var t=Array.isArray(n)&&!r.inPlaceSorting?n.slice():n;return{asc:function(u){return p(1,t,u,e)},desc:function(u){return p(-1,t,u,e)},by:function(u){return p(1,t,u,e)}}}}var w=function(r,e,n){return r==null?n:e==null?-n:r<e?-1:r>e?1:0},I=S({comparer:w});S({comparer:w,inPlaceSorting:!0});export{I as s};
