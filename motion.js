/* DigitalBySonali motion: scroll reveal, hero words, tilt, count-up, sticky nav. No libraries. */
(function(){
  var d=document,root=d.documentElement;window.__mo=1;
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  var top=d.querySelector('.top');
  function onScroll(){if(top)top.classList.toggle('scrolled',(window.scrollY||0)>8)}
  addEventListener('scroll',onScroll,{passive:true});onScroll();
  if(reduce||!('IntersectionObserver' in window)){root.classList.remove('mo');return}
  var blobs=d.createElement('div');blobs.className='blobs';blobs.setAttribute('aria-hidden','true');blobs.innerHTML='<i></i><i></i><i></i>';
  var hero=d.querySelector('.hero');if(hero)hero.insertBefore(blobs,hero.firstChild);
  var h1=d.querySelector('.hero h1'),n=0;
  if(h1){(function walk(el){[].slice.call(el.childNodes).forEach(function(c){
    if(c.nodeType===3){var parts=c.textContent.split(/(\s+)/),f=d.createDocumentFragment();
      parts.forEach(function(p){if(!p)return;if(/^\s+$/.test(p)){f.appendChild(d.createTextNode(p))}else{var s=d.createElement('span');s.className='w';s.style.setProperty('--d',(120+n++*85)+'ms');s.textContent=p;f.appendChild(s)}});
      el.replaceChild(f,c)}else if(c.nodeType===1)walk(c)})})(h1)}
  var sel='main .sec .eyebrow,main .sec h2,main .sec .h2,main .sec .sub,main .sec .note,.svc,.go,.ft,.pf,.bw,.pk,.fx,.fx-title,.steps li,.faq details,.chips li,.contact-row,.web-sample,.final .btn,.bw-cta .btn,.about p,.lead-dark,.ws-desk,.ws-phone';
  var els=[].slice.call(d.querySelectorAll(sel)).filter(function(e){return !e.closest('.hero')});
  els.forEach(function(e){e.classList.add('rv');
    if(e.classList.contains('ws-desk'))e.classList.add('rv-l');
    if(e.classList.contains('ws-phone'))e.classList.add('rv-r');
    var sib=[].slice.call(e.parentNode.children).filter(function(x){return x.matches(sel)});
    var i=sib.indexOf(e);if(sib.length>2&&i>0)e.style.setProperty('--d',Math.min(i,8)*80+'ms');
    if(e.classList.contains('ws-phone'))e.style.setProperty('--d','220ms')});
  var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target);count(x.target)}})},{rootMargin:'0px 0px -8% 0px',threshold:.12});
  els.forEach(function(e){io.observe(e)});
  /* count-up on existing prices only; the final text is restored exactly */
  function count(card,list){(list||[].slice.call(card.querySelectorAll('.price,.fx-price'))).forEach(function(p){
    [].slice.call(p.childNodes).forEach(function(t){if(t.nodeType!==3)return;var m=t.textContent.match(/₹([\d,]+)/);if(!m)return;
      var orig=t.textContent,target=+m[1].replace(/,/g,''),t0=null,dur=900;
      function fmt(v){return v.toLocaleString('en-IN')}
      if(fmt(target)!==m[1])return;
      function step(ts){if(!t0)t0=ts;var k=Math.min((ts-t0)/dur,1),e=1-Math.pow(1-k,3);
        t.textContent=orig.replace(m[1],fmt(Math.round(target*e)));if(k<1)requestAnimationFrame(step);else t.textContent=orig}
      requestAnimationFrame(step)})})}
  var wc=d.querySelector('.web-chip b');if(wc)setTimeout(function(){count(null,[wc])},750);
  /* subtle tilt on cards, desktop with a mouse only */
  if(matchMedia('(hover:hover) and (min-width:900px)').matches){
    [].slice.call(d.querySelectorAll('.go,.svc,.pk,.fx')).forEach(function(c){c.classList.add('tilt');
      c.addEventListener('mousemove',function(ev){var r=c.getBoundingClientRect(),x=(ev.clientX-r.left)/r.width-.5,y=(ev.clientY-r.top)/r.height-.5;
        c.style.setProperty('--ry',(x*7).toFixed(2)+'deg');c.style.setProperty('--rx',(-y*7).toFixed(2)+'deg')});
      c.addEventListener('mouseleave',function(){c.style.setProperty('--ry','0deg');c.style.setProperty('--rx','0deg')})})}
})();
