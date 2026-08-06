// playwright lives in the app's node_modules ("Figma files"), not next to this
// script, so resolve it from there. Lets this run from any working directory.
const path=require('path'); const fs=require('fs');
const { createRequire } = require('module');
const appRequire = createRequire(path.join(__dirname, '..', '..', '..', 'Figma files', 'package.json'));
const { chromium } = appRequire('playwright');
const BASE='http://localhost:3001/incident-tracker/';
const OUT = path.join(__dirname, '..', 'raw');
fs.mkdirSync(OUT,{recursive:true});
const shot=async(p,n)=>{await p.waitForTimeout(900);await p.screenshot({path:path.join(OUT,n+'.png')});console.log('shot',n);};
const nav=async(p,label)=>{await p.click('[aria-label="Menu"]');await p.waitForTimeout(700);
  await p.locator(`forge-list-item:has-text("${label}")`).first().click();await p.waitForTimeout(1600);};
(async()=>{
  const b=await chromium.launch();
  const p=await b.newPage({viewport:{width:1500,height:880},deviceScaleFactor:2});
  await p.goto(BASE,{waitUntil:'domcontentloaded'});
  await p.evaluate(()=>sessionStorage.setItem('site-auth','true'));
  await p.goto(BASE,{waitUntil:'networkidle'}).catch(()=>{});
  await p.waitForTimeout(2600);
  const safe=async(n,f)=>{try{await f()}catch(e){console.log('SKIP',n,e.message.split('\n')[0])}};

  await safe('dashboard',async()=>{await p.keyboard.press('Escape');await shot(p,'dashboard')});

  await safe('incidents',async()=>{await nav(p,'Incidents');await p.keyboard.press('Escape');await p.waitForTimeout(500);await shot(p,'incidents')});

  await safe('detail',async()=>{
    const s=p.locator('input[placeholder*="Search" i]').first();
    await s.fill('INC-2025-0059'); await p.waitForTimeout(1400);
    console.log('rows after search:', await p.locator('text=/INC-2025-0059/').count());
    await p.locator('text=/INC-2025-0059/').first().click({timeout:6000});
    await p.waitForTimeout(1900);
    console.log('DETAIL TEXT:', (await p.evaluate(()=>document.body.innerText)).slice(0,900).replace(/\n+/g,' | '));
    await shot(p,'detail-multistudent');
  });

  await safe('workflowtab',async()=>{
    await p.locator('button:has-text("Workflow"), [role="tab"]:has-text("Workflow"), forge-tab:has-text("Workflow")').first().click({timeout:6000});
    await p.waitForTimeout(1500); await shot(p,'detail-workflow');
  });

  await safe('workflows',async()=>{await nav(p,'Workflows');await p.keyboard.press('Escape');await p.waitForTimeout(600);await shot(p,'workflows')});

  await safe('admin',async()=>{await nav(p,'Admin');await p.keyboard.press('Escape');await p.waitForTimeout(600);await shot(p,'admin')});
  await safe('perms',async()=>{
    await p.locator('button:has-text("Permission"), [role="tab"]:has-text("Permission"), forge-tab:has-text("Permission")').first().click({timeout:6000});
    await p.waitForTimeout(1400); await shot(p,'permissions');
  });
  await b.close();
  console.log('FILES', fs.readdirSync(OUT).join(', '));
})();
