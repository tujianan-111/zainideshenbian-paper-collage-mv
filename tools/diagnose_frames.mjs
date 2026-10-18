import {openPage} from './page.mjs';
import {writeFileSync} from 'node:fs';
const {browser,page}=await openPage();
try{
  for(let i=0;i<4;i++){
    const url=await page.evaluate(async i=>{if(i)await window.renderAt(1.23);return window.renderAt(.5)},i);
    writeFileSync(`out/check/repeat_${i}.png`,Buffer.from(url.split(',')[1],'base64'));
  }
  console.log(await page.evaluate(()=>({fontStatus:document.fonts.status,fontLoaded:document.fonts.check('700 60px "NotoSerifSC"'),context:C.getContextAttributes()})));
}finally{await browser.close()}
