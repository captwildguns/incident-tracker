const { chromium } = require('playwright');
const fs=require('fs'); const path=require('path');
const OUT='C:/Users/Gabe.guzman/.local/gclaude/incidents-tedfinal/Presentation/launch-kickoff/raw/slides';
fs.mkdirSync(OUT,{recursive:true});
(async()=>{
  const b=await chromium.launch();
  const p=await b.newPage({viewport:{width:1600,height:900},deviceScaleFactor:2});
  await p.goto('http://127.0.0.1:8899/index.html',{waitUntil:'networkidle'});
  await p.waitForTimeout(1500);
  // remove chrome so slides export clean, and pin scale to 1
  await p.addStyleTag({content:'#progress,#hint{display:none!important} #deck{transform:none!important;box-shadow:none!important} body{background:#fff!important;overflow:hidden}'});
  const n=await p.evaluate(()=>document.querySelectorAll('.slide').length);
  const deck=await p.locator('#deck');
  for(let i=0;i<n;i++){
    await p.evaluate(k=>{const s=[...document.querySelectorAll('.slide')];s.forEach(x=>x.classList.remove('active'));s[k].classList.add('active');},i);
    await p.waitForTimeout(450);
    await deck.screenshot({path:path.join(OUT,String(i+1).padStart(2,'0')+'.png')});
  }
  await b.close();
  console.log('slides exported:',n);
})();
