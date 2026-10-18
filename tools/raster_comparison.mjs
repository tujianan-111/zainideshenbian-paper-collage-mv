import puppeteer from 'puppeteer-core';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import {writeFileSync} from 'node:fs';
const report=[];
for(const software of [false,true]){
 const browser=await puppeteer.launch({executablePath:process.env.CHROME_PATH,headless:true,args:['--allow-file-access-from-files','--use-angle=d3d11',...(software?['--disable-accelerated-2d-canvas']:[])]});
 try{
  const p=await browser.newPage();await p.goto(pathToFileURL(resolve('studio.html')).href+'?render',{waitUntil:'networkidle0'});await p.waitForFunction('window.ready');
  for(const t of [.5,2.8,15.5]){
   const delta=await p.evaluate(async t=>{
    await renderAt(t);await renderAt(t);const a=C.getImageData(0,0,W,H).data,ds=[];
    for(let j=0;j<5;j++){
     await renderAt(1.23);await renderAt(t);const b=C.getImageData(0,0,W,H).data;let max=0,sum=0,n=0;
     for(let i=0;i<a.length;i++){const d=Math.abs(a[i]-b[i]);if(d){n++;max=Math.max(max,d);sum+=d;}}
     ds.push({max,mean:sum/a.length,changed_channels:n});
    }
    return ds;
   },t);report.push({software,time:t,delta});
  }
 }finally{await browser.close();}
}
writeFileSync('out/check/raster_comparison.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report));
