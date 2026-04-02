 @'
  (function(){
    const canvas = document.createElement("canvas");
    canvas.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100
  %;pointer-events:none;z-index:9999;";
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    let sparks = [];
    const COLOR = "#61A6AB", SIZE = 10, RADIUS = 15, COUNT = 8, DURATION =
  400;
    function resize(){ canvas.width=window.innerWidth;
  canvas.height=window.innerHeight; }
    resize(); window.addEventListener("resize", resize);
    function easeOut(t){ return t*(2-t); }
    document.addEventListener("click", function(e){
      const now = performance.now();
      for(let i=0;i<COUNT;i++)
        sparks.push({x:e.clientX,y:e.clientY,angle:(2*Math.PI*i)/COUNT,startT
  ime:now});
    });
    function draw(ts){
      ctx.clearRect(0,0,canvas.width,canvas.height);
      sparks=sparks.filter(function(s){
        const elapsed=ts-s.startTime;
        if(elapsed>=DURATION) return false;
        const p=elapsed/DURATION, e=easeOut(p);
        const d=e*RADIUS, l=SIZE*(1-e);
        const x1=s.x+d*Math.cos(s.angle), y1=s.y+d*Math.sin(s.angle);
        const x2=s.x+(d+l)*Math.cos(s.angle), y2=s.y+(d+l)*Math.sin(s.angle);
        ctx.strokeStyle=COLOR; ctx.lineWidth=2; ctx.globalAlpha=1-p;
        ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke();
        ctx.globalAlpha=1;
        return true;
      });
      requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);
  })();
  '@ | Out-File -FilePath click-spark.js -Encoding utf8