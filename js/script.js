(function(){
  var sectionIds = ['top','about','work','satgate','projects','writing','contact'];
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function currentIndex(){
    var mid = window.scrollY + window.innerHeight / 3;
    var idx = 0;
    for (var i = 0; i < sectionIds.length; i++){
      var el = document.getElementById(sectionIds[i]);
      if (el && el.offsetTop <= mid) idx = i;
    }
    return idx;
  }

  function flipTo(targetId){
    var target = document.getElementById(targetId);
    if (!target) return;

    if (reduced){
      target.scrollIntoView({behavior:'smooth'});
      return;
    }

    var leaf = document.createElement('div');
    leaf.className = 'page-flip-leaf';
    document.body.appendChild(leaf);

    window.setTimeout(function(){
      target.scrollIntoView({behavior:'auto'});
    }, 320);

    leaf.addEventListener('animationend', function(){
      leaf.remove();
    });
  }

  document.getElementById('flip-next').addEventListener('click', function(){
    var idx = currentIndex();
    var next = sectionIds[Math.min(idx + 1, sectionIds.length - 1)];
    flipTo(next);
  });

  document.getElementById('flip-prev').addEventListener('click', function(){
    var idx = currentIndex();
    var prev = sectionIds[Math.max(idx - 1, 0)];
    flipTo(prev);
  });
})();
