// Original cast: a reserved boy and a warm, gently teasing girl.
const BOY = {
  seed:18,skin:'#f6d6b9',hair:'#413a48',brow:'#453840',coat:'#638798',coatDk:'#456878',
  sleeve:'#789ba8',cuff:'#ede5d2',leg:'#555061',shoe:'#9c6554',sock:'#ece2ce',top:77,bot:103,
  hairFront:turn=>{
    const sh=turn*7,p=[];
    for(let i=0;i<=26;i++){const a=Math.PI*(1.03+.94*i/26);p.push([Math.cos(a)*60+sh*.3,Math.sin(a)*59-4]);}
    return p.concat([[55+sh,2],[43+sh,-15],[30+sh,-7],[16+sh,-24],[1+sh,-14],[-17+sh,-29],[-34+sh,-14],[-49+sh,-21],[-57+sh,6]]);
  },
  coatDetail:(a,b,turn)=>{
    piece([[-32,a+7],[-5,a+30],[3,a+11]],'#f6efdb',{seed:319,border:1.2,lift:.3});
    piece([[32,a+7],[9,a+29],[3,a+11]],'#f6efdb',{seed:320,border:1.2,lift:.3});
    line([[3,a+27],[4,b-4]],1.8,'#4c6e7e');
    for(let i=0;i<3;i++)piece(ellP(-5,a+40+i*18,2.8,2.8,12),'#e8c176',{seed:321+i,border:0,lift:.1});
    piece(rrP(17,b-33,22,17,3),'#91aeb4',{seed:325,border:1.5,lift:.4});
    line([[20,b-26],[35,b-26]],1,'#e5e4d3');
  }
};
const GIRL = {
  seed:31,skin:'#f8d8bd',hair:'#694743',brow:'#68423f',coat:'#e4b674',coatDk:'#c28a59',
  sleeve:'#f7e4c6',cuff:'#dfc6a2',leg:'#6d5861',shoe:'#b66755',sock:'#f4ead7',top:69,bot:125,
  hairBack:turn=>rrP(-61+turn*5,-42,122,117,37),
  hairFront:turn=>{
    const sh=turn*6,p=[];
    for(let i=0;i<=24;i++){const a=Math.PI*(1.01+.98*i/24);p.push([Math.cos(a)*61+sh*.25,Math.sin(a)*60-4]);}
    return p.concat([[58+sh,35],[47+sh,41],[46+sh,-6],[31+sh,-10],[16+sh,-22],[4+sh,-13],[-10+sh,-25],[-26+sh,-11],[-44+sh,-18],[-48+sh,42],[-59+sh,35]]);
  },
  head:(P,turn)=>{
    C.save();C.translate(-43+turn*5,-19);C.rotate(-.35);
    piece(rrP(-10,-4,22,8,4),'#a75d52',{seed:340,border:1.6,lift:.5});
    piece(ellP(7,0,2.5,2.5,12),'#f9e4a6',{seed:341,border:0,lift:0});C.restore();
  },
  coatDetail:(a,b)=>{
    piece([[-29,a+7],[0,a+24],[29,a+7],[17,a+30],[-16,a+30]],'#f9efda',{seed:345,border:1.5,lift:.4});
    line([[0,a+28],[0,b-5]],1.6,'#bf8c5c');
    for(let i=0;i<3;i++)piece(ellP(-7,a+40+i*18,2.6,2.6,12),'#fcf1d7',{seed:346+i,border:0,lift:.1});
    for(let i=0;i<6;i++)line([[-48+i*19,b-14],[-44+i*17,b-7]],1.3,'#f4d6a2');
    piece(rrP(18,b-35,23,17,4),'#eecb90',{seed:354,border:1.6,lift:.5});
  }
};
function castSheet(t){
  camK(t,[[0,960,540,1]]);
  wash(0,0,W,H,[[0,'#fff7e8'],[1,'#e8d8c1']],{seed:49,stains:5,stainA:.07});
  const poses=['stand','reach','shy','cover','slump','heart'];
  const faces=['soft','surprised','shy','closed','sad','love'];
  for(let i=0;i<6;i++){
    const x=180+i*310;
    groundShadow(x,486,1.25,.10);groundShadow(x,962,1.25,.10);
    puppet(BOY,x,486,1.3,{t,pose:poses[i],...act(t,[[0,{pose:poses[i],face:faces[i],turn:i===1?.65:0}]])});
    puppet(GIRL,x,962,1.3,{t,...act(t,[[0,{pose:poses[i],dir:-1,face:faces[i],turn:i===1?-.65:0}]])});
  }
  post(t,{tone:'#ffd49b',toneA:.08,vigA:.13,grain:.10});
}
LOOPS.sheet=castSheet;LOOPS.sheet.len=1;
