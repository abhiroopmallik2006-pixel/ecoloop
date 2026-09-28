import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs/promises';

const browserErrors=new WeakMap<object,string[]>();
test.beforeEach(async({page})=>{const errors:string[]=[];browserErrors.set(page,errors);page.on('pageerror',error=>errors.push(error.message));page.on('console',message=>{if(message.type()==='error'&&!message.text().includes('Failed to load resource'))errors.push(message.text())});});
test.afterEach(async({page})=>{expect(browserErrors.get(page)??[],'No browser runtime/hydration errors').toEqual([])});

test('public pages render, all homepage destinations resolve, and unknown routes return 404',async({page,request})=>{
 for(const route of ['/','/how-it-works','/solutions/campuses','/solutions/rwas','/pilot']){
  const response=await page.goto(route);expect(response?.status()).toBe(200);
  await expect(page.locator('main')).toHaveCount(1);await expect(page.locator('h1')).toHaveCount(1);
 }
 const response=await request.get('/unknown-page');expect(response.status()).toBe(404);
 const checklist=await request.get('/pilot-checklist.txt');expect(await checklist.text()).toContain('does not submit an application');
});

test('date selection changes metric and chart data; site selection removes unconfigured and unrelated data',async({page})=>{
 await page.goto('/demo');
 await expect(page.getByRole('link',{name:/SIMULATED Food waste recorded 148.5/})).toBeVisible();
 await page.getByLabel('Reporting period',{exact:true}).selectOption('day');
 await expect(page.getByRole('link',{name:/SIMULATED Food waste recorded 16\s*kg/})).toBeVisible();
 await page.getByRole('button',{name:'View data table',exact:true}).click();
 await expect(page.getByRole('table').first().locator('tbody tr')).toHaveCount(1);
 await page.getByLabel('Select site',{exact:true}).selectOption('community');
 await expect(page.getByRole('link',{name:/SIMULATED Food waste recorded.*Module not configured/})).toBeVisible();
 await expect(page.getByRole('link',{name:/SIMULATED Water reused 6,200/})).toBeVisible();
 await expect(page.getByRole('heading',{name:'Give campus compost its next chapter.'})).toHaveCount(0);
 await expect(page.getByRole('heading',{name:'No resource passports yet'})).toBeVisible();
});

test('recommendation dialog exposes evidence and restores focus after Escape',async({page})=>{
 await page.goto('/demo?view=autopilot');
 const trigger=page.getByRole('button',{name:'View recommendation: Prepare a little less. Serve just enough.'});
 await trigger.click();
 await expect(page.getByRole('dialog')).toBeVisible();
 await expect(page.getByText(/Confidence interval unavailable/)).toBeVisible();
 await page.keyboard.press('Escape');await expect(page.getByRole('dialog')).not.toBeVisible();await expect(trigger).toBeFocused();
 await page.getByRole('button',{name:'View recommendation: Check water quality before the next loop.'}).click();
 await expect(page.getByRole('dialog')).toContainText('Route unavailable.');
});

test('passport search, empty state and history reflect the selected resource',async({page})=>{
 await page.goto('/demo?view=resources');
 await page.getByLabel('Search passports',{exact:true}).fill('missing-resource');
 await expect(page.getByRole('heading',{name:'No matching resources'})).toBeVisible();
 await page.getByRole('button',{name:'Clear filters'}).click();
 await page.getByLabel('Filter resource type',{exact:true}).selectOption('Cardboard');
 await expect(page.locator('tbody tr')).toHaveCount(1);
 await page.getByRole('button',{name:'Open passport ECO-0041'}).click();
 await expect(page.getByRole('dialog')).toContainText('Receipt confirmed');
});

test('CSV export is scoped to selected site/period and explicitly simulated',async({page})=>{
 await page.goto('/demo?view=reports&site=community&period=day');
 const downloadPromise=page.waitForEvent('download');
 await page.getByRole('button',{name:'Export simulated report'}).click();
 const download=await downloadPromise;
 const path=await download.path();expect(path).not.toBeNull();
 const csv=await fs.readFile(path!,'utf8');
 expect(csv).toContain('"Demo Community","2026-09-28","Water reused","1000","L","simulated"');
 expect(csv).not.toContain('Demo Campus');expect(csv).not.toContain('Solar generated');
 expect(csv.trim().split('\r\n')).toHaveLength(3);
});

test('mobile layout has no horizontal page overflow and drawer contains keyboard focus',async({page})=>{
 for(const width of [320,360,768,1280,1440]){
  await page.setViewportSize({width,height:900});
  for(const route of ['/','/demo']){
   await page.goto(route);await page.getByRole('heading',{level:1,name:route==='/'?'Less waste. More possibility.':'A good day to close the loop.'}).waitFor();
   if(route==='/demo')await expect(page.locator('.dashboard')).toHaveAttribute('data-ready','true');
   const overflow=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,elements:Array.from(document.querySelectorAll('main *')).filter(el=>el.getBoundingClientRect().right>innerWidth+1).map(el=>el.className).filter(Boolean)}));
   expect(overflow.scroll,JSON.stringify({route,...overflow})).toBeLessThanOrEqual(width);
   if(width===1440||width===360){await fs.mkdir('artifacts',{recursive:true});await page.screenshot({path:`artifacts/${route==='/'?'home':'demo'}-${width}.png`,fullPage:width===360});}
  }
 }
 await page.setViewportSize({width:360,height:800});await page.goto('/demo');
 const opener=page.getByRole('button',{name:'Open navigation'});await opener.click();
 const close=page.getByRole('complementary',{name:'Workspace sidebar'}).getByRole('button',{name:'Close navigation'});await expect(close).toBeFocused();
 await page.keyboard.press('Shift+Tab');await page.keyboard.press('Shift+Tab');await expect(page.getByRole('link',{name:'Back to EcoLoop'})).toBeFocused();
 await page.keyboard.press('Tab');await expect(page.getByRole('link',{name:'EcoLoop AI home'})).toBeFocused();
 await page.keyboard.press('Escape');await expect(opener).toBeFocused();
 await expect(page.locator('.sidebar')).toHaveAttribute('inert','');
});

test('public and demo views have no automated WCAG A/AA violations',async({page})=>{
 test.setTimeout(60000);
 const findings:unknown[]=[];
 for(const route of ['/','/how-it-works','/solutions/campuses','/pilot','/demo','/demo?view=points','/demo?view=hub','/demo?view=reports']){
  await page.goto(route);await page.getByRole('heading',{level:1}).filter({hasNotText:'Loading'}).waitFor();
  if(route.startsWith('/demo'))await expect(page.locator('.dashboard')).toHaveAttribute('data-ready','true');
  const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
  findings.push(...result.violations.map(v=>({route,id:v.id,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))})));
 }
 expect(findings).toEqual([]);
});
