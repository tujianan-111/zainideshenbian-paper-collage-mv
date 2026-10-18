import puppeteer from 'puppeteer-core';
import {writeFileSync,readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import {openPage} from './page.mjs';
const {browser,page}=await openPage();
const deterministic=[];
try{
  for(const t of [.5,2.8,5.8,15.5,20.8,22.75,24,33.5,34.5,35.2]){
    const delta=await page.evaluate(async t=>{
      // GPU raster-cache warm-up can change a handful of channels by 1/255.
      // Test the actual pixels and frame-order independence, rather than PNG byte identity.
      await window.renderAt(t);await window.renderAt(t);
      const first=C.getImageData(0,0,W,H).data;
      await window.renderAt(1.23);await window.renderAt(t);
      const again=C.getImageData(0,0,W,H).data;
      let max=0,sum=0;for(let i=0;i<first.length;i++){const d=Math.abs(first[i]-again[i]);max=Math.max(max,d);sum+=d;}
      return {max_channel_delta:max,mean_channel_delta:sum/first.length};
    },t);
    if(delta.max_channel_delta>1||delta.mean_channel_delta>.005)throw new Error(`Frame-order dependence at ${t}: ${JSON.stringify(delta)}`);
    deterministic.push({time:t,...delta});
  }
}finally{await browser.close()}
const player=await puppeteer.launch({executablePath:process.env.CHROME_PATH,headless:true,args:['--allow-file-access-from-files','--autoplay-policy=no-user-gesture-required']});
try{
  const p=await player.newPage();await p.setViewport({width:1360,height:900});
  await p.goto(pathToFileURL(resolve('播放.html')).href,{waitUntil:'load'});
  await p.waitForFunction(()=>document.querySelector('video').readyState>=2,{timeout:30000});
  await p.evaluate(async()=>{const v=document.querySelector('video');v.muted=true;await v.play()});
  await p.waitForFunction(()=>document.querySelector('video').currentTime>.5,{timeout:15000});
  await p.evaluate(()=>{const v=document.querySelector('video');v.pause();v.currentTime=20.8});
  await p.waitForFunction(()=>{const v=document.querySelector('video');return Math.abs(v.currentTime-20.8)<.1&&v.readyState>=2},{timeout:15000});
  await new Promise(r=>setTimeout(r,350));
  const state=await p.evaluate(()=>{const v=document.querySelector('video');return {duration:v.duration,width:v.videoWidth,height:v.videoHeight,readyState:v.readyState,error:v.error?.message||null,currentTime:v.currentTime}});
  if(state.error||state.width!==1920||state.height!==1080||Math.abs(state.duration-35.5)>.1)throw new Error(JSON.stringify(state));
  await p.screenshot({path:'out/check/播放验证.png'});
  const report={video_sha256:createHash('sha256').update(readFileSync('out/在你的身边_立体书版.mp4')).digest('hex'),deterministic_frames:deterministic,playback_started:true,seek_ok:true,player:state};
  writeFileSync('out/check/browser_check.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report));
}finally{await player.close()}
