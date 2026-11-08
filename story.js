(function(){
var story=document.getElementById('rs');if(!story)return;
var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
var intro=document.getElementById('rs-intro');
if(intro){var seen=false;try{seen=sessionStorage.getItem('rsIntro')==='1';sessionStorage.setItem('rsIntro','1')}catch(e){}
  setTimeout(function(){intro.classList.add('out')},(reduce||seen)?0:1500)}
var phone=document.getElementById('rs-phone'),ghost=document.getElementById('rs-ghost');
var texts=[].slice.call(story.querySelectorAll('.rs-text')),dots=[].slice.call(story.querySelectorAll('.rs-dots i'));
var imgs=[0,1,2].map(function(i){return document.getElementById('rs-i'+i)});
story.querySelectorAll('.rs-big').forEach(function(h){var n=0;(function walk(el){[].slice.call(el.childNodes).forEach(function(nd){
  if(nd.nodeType===3){var frag=document.createDocumentFragment();nd.textContent.split(/(\s+)/).forEach(function(part){if(!part)return;if(/^\s+$/.test(part)){frag.appendChild(document.createTextNode(' '));return}
    var w=document.createElement('span');w.className='w';part.split('').forEach(function(ch){var c=document.createElement('span');c.className='c';c.textContent=ch;c.style.transitionDelay=(n++*0.025)+'s';w.appendChild(c)});frag.appendChild(w)});nd.parentNode.replaceChild(frag,nd)}
  else if(nd.nodeType===1&&nd.tagName!=='BR')walk(nd)})})(h)});
var cv=document.getElementById('rs-fx'),ctx=cv.getContext('2d'),W=0,H=0;
function size(){var d=Math.min(2,window.devicePixelRatio||1),r=cv.getBoundingClientRect();W=r.width;H=r.height;cv.width=W*d;cv.height=H*d;ctx.setTransform(d,0,0,d,0,0)}
size();addEventListener('resize',size);
var leaves=[];for(var i=0;i<22;i++)leaves.push({a:i/22*Math.PI*2,r:.55+((i*37)%10)/22,s:.6+((i*13)%7)/10,rot:i,c:i%3});
function prog(){var r=story.getBoundingClientRect(),tot=story.offsetHeight-innerHeight;return Math.min(1,Math.max(0,-r.top/tot))}
function ease(t){return t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2}
var last=-1,sp=0;
function draw(t){
  var target=prog();sp+=reduce?(target-sp):(target-sp)*0.09;var p=sp,seg=p*4,s=Math.min(3,Math.floor(seg)),f=seg-s;
  if(s!==last){texts.forEach(function(el,i){el.classList.toggle('on',i===s)});dots.forEach(function(d,i){d.classList.toggle('on',i===s)});last=s;var k=s===0?0:s-1;imgs.forEach(function(im,i){im.style.opacity=i===k?1:0})}
  var rx=0,ry=0,rz=0,sc=1,ty=0;
  if(s===0){var e=ease(f);ry=-28*(1-e);rx=10*(1-e);rz=-8*(1-e);sc=.82+.18*e;ty=60*(1-e)}
  else if(s===2){ry=Math.sin(f*Math.PI)*-14;rz=Math.sin(f*Math.PI)*4}
  else if(s===3){ry=14*ease(f);rz=-5*ease(f);sc=1-.06*ease(f)}
  phone.style.transform='perspective(1200px) translateY('+ty+'px) rotateX('+rx+'deg) rotateY('+ry+'deg) rotateZ('+rz+'deg) scale('+sc+')';
  ghost.style.transform='translate('+(-p*45)+'vw,-50%)';
  ctx.clearRect(0,0,W,H);var cx=W/2,cy=H/2,R=Math.min(W,H),time=reduce?0:t/1000;
  if(s===0){var e0=ease(f),n=260;ctx.lineWidth=Math.max(6,R*.022);ctx.lineCap='round';var g=ctx.createLinearGradient(cx-R*.3,0,cx+R*.3,0);g.addColorStop(0,'#8E4A5E');g.addColorStop(.5,'#E8CF9F');g.addColorStop(1,'#C9A46A');ctx.strokeStyle=g;ctx.beginPath();
    for(var i=0;i<=n*Math.max(.02,1-e0*.55);i++){var u=i/n,ang=u*Math.PI*6+time*.6,rad=R*(.42-u*.3)*(1-e0*.25),x=cx+Math.cos(ang)*rad,y=cy-R*.45+u*R*.9+Math.sin(ang*1.3)*R*.03;i?ctx.lineTo(x,y):ctx.moveTo(x,y)}
    ctx.globalAlpha=1-e0*.6;ctx.stroke();ctx.globalAlpha=1}
  else if(s===1){var e1=ease(Math.min(1,f*1.3));ctx.lineWidth=Math.max(5,R*.014);ctx.lineCap='round';ctx.strokeStyle='#622D3D';ctx.beginPath();
    for(var j=0;j<=120*e1;j++){var v=j/120,x1=cx-R*.48+v*R*.96,y1=cy-R*.18+v*R*.28+Math.sin(v*9)*R*.035;j?ctx.lineTo(x1,y1):ctx.moveTo(x1,y1)}
    ctx.stroke();ctx.setLineDash([10,10]);ctx.lineWidth=2;ctx.strokeStyle='#9AAB99';ctx.beginPath();ctx.moveTo(cx-R*.48,cy+R*.16);ctx.lineTo(cx-R*.48+R*.96*e1,cy+R*.16);ctx.stroke();ctx.setLineDash([])}
  else if(s===2){leaves.forEach(function(l){var a=l.a+time*.35*l.s+f*2.5,rad=R*.34*l.r,x=cx+Math.cos(a)*rad*1.15,y=cy+Math.sin(a)*rad*.8;ctx.save();ctx.translate(x,y);ctx.rotate(a+l.rot);ctx.fillStyle=['#9AAB99','#C9D6C8','#E8CF9F'][l.c];ctx.globalAlpha=.85;ctx.beginPath();ctx.ellipse(0,0,R*.03*l.s,R*.012*l.s,0,0,7);ctx.fill();ctx.restore()})}
  else{for(var k2=0;k2<4;k2++){var rr=R*(.25+k2*.09)*(.6+.4*ease(f));ctx.strokeStyle=k2%2?'#E8CF9F':'#622D3D';ctx.globalAlpha=.25+.12*(3-k2);ctx.lineWidth=2;ctx.beginPath();ctx.arc(cx,cy,rr,0,7);ctx.stroke()}ctx.globalAlpha=1}
  requestAnimationFrame(draw)}
requestAnimationFrame(draw);
})();
