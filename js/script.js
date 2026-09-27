(function(){
  var CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!<>-_/[]{}—=+*^?#';
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function scramble(el){
    var target = el.getAttribute('data-text') || el.textContent;
    var len = target.length;
    var frame = 0;
    var totalFrames = 14 + Math.floor(len * 1.6);
    if (el._scrambleTimer) clearInterval(el._scrambleTimer);

    el._scrambleTimer = setInterval(function(){
      frame++;
      var resolved = Math.floor((frame / totalFrames) * len);
      var out = '';
      for (var i = 0; i < len; i++){
        if (i < resolved){
          out += target[i];
        } else if (target[i] === ' '){
          out += ' ';
        } else {
          out += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }
      el.textContent = out;
      if (frame >= totalFrames){
        el.textContent = target;
        clearInterval(el._scrambleTimer);
      }
    }, 28);
  }

  document.querySelectorAll('.scramble').forEach(function(el){
    if (!el.getAttribute('data-text')) el.setAttribute('data-text', el.textContent);
    if (reduced) return;
    el.addEventListener('mouseenter', function(){ scramble(el); });
  });
})();

(function(){
  var PEN_SVG = '<svg viewBox="0 0 24 24"><path d="M3 21 L14 10 L17.5 13.5 L6.5 24 Z" fill="var(--stamp)"/>' +
    '<path d="M14 10 L17 6 L21 10 L17.5 13.5 Z" fill="var(--stamp-soft)"/>' +
    '<path d="M3 21 L5 19.3 L4.7 21.3 Z" fill="var(--ink)"/></svg>';

  function makePen(){
    var span = document.createElement('span');
    span.className = 'pen-cursor';
    span.innerHTML = PEN_SVG;
    return span;
  }

  // shared typewriter renderer with a real animated ink-pen cursor
  function typeEl(item, done){
    var el = item.el, full = item.full, speed = item.speed;
    el.style.visibility = 'visible';
    el.textContent = '';
    var pen = makePen();
    el.appendChild(pen);
    var i = 0;
    (function type(){
      el.textContent = full.slice(0, i);
      el.appendChild(pen);
      i++;
      if(i <= full.length){ setTimeout(type, speed); }
      else{ pen.remove(); if(done) done(); }
    })();
  }

  // sequential queue — only one line writes at a time, ever
  var queue = [];
  var writing = false;
  function enqueue(el, speed){
    // capture and blank the real text the instant we know about this element,
    // so nothing sits fully visible waiting for its turn
    var full = el.textContent;
    el.textContent = '';
    queue.push({el:el, full:full, speed:speed});
    processQueue();
  }
  function processQueue(){
    if(writing || queue.length === 0) return;
    writing = true;
    var next = queue.shift();
    typeEl(next, function(){
      writing = false;
      processQueue();
    });
  }

  // hero lede writes first, immediately on load
  var lede = document.querySelector('.hero p.lede');
  if(lede) enqueue(lede, 16);

  // every other paragraph queues up to write itself as it scrolls into view
  var scrollTargets = document.querySelectorAll('.about-grid p:not(.tag), .env-card p, .wcard p, .resume-row .org');
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(en.isIntersecting){
          enqueue(en.target, 10);
          io.unobserve(en.target);
        }
      });
    }, {threshold:.35});
    scrollTargets.forEach(function(el){ io.observe(el); });
  }

  // highlighter trail over body text
  var lastTime = 0;
  document.addEventListener('mousemove', function(e){
    var now = Date.now();
    if(now - lastTime < 40) return;
    var el = document.elementFromPoint(e.clientX, e.clientY);
    if(!el || !el.closest('p, li')) return;
    lastTime = now;
    var d = document.createElement('div');
    d.style.position = 'fixed';
    d.style.left = (e.clientX - 23) + 'px';
    d.style.top = (e.clientY - 7) + 'px';
    d.style.width = '46px';
    d.style.height = '14px';
    d.style.background = 'rgba(255,225,60,.55)';
    d.style.borderRadius = '3px';
    d.style.pointerEvents = 'none';
    d.style.zIndex = '999';
    d.style.transition = 'opacity 1s ease';
    d.style.mixBlendMode = 'multiply';
    document.body.appendChild(d);
    requestAnimationFrame(function(){
      setTimeout(function(){ d.style.opacity = '0'; }, 120);
    });
    setTimeout(function(){ d.remove(); }, 1300);
  });
})();