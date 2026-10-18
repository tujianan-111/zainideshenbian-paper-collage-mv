// All props and textures are drawn on the canvas, using the upstream paper engine.
function leaf(x,y,s,rot,col='#d79c57',seed=700){
  C.save();C.translate(x,y);C.rotate(rot);C.scale(s,s);
  piece([[0,-36],[12,-23],[24,-18],[18,-8],[31,0],[16,8],[17,23],[5,18],[0,32],[-6,16],[-20,22],[-17,6],[-29,-1],[-17,-9],[-23,-23],[-9,-20]],col,{seed,border:2,lift:.75,grain:.6});
  line([[0,32],[0,-27]],1.3,'#a66b47');line([[0,4],[15,-8]],1,'#af784d');line([[0,12],[-15,-2]],1,'#af784d');C.restore();
}
function petalBranch(x,y,s,t,seed=1){
  C.save();C.translate(x,y);C.scale(s,s);C.rotate(sway(t,.025,.16,seed));
  piece([[-13,160],[-9,-40],[7,-165],[20,-162],[12,-38],[13,160]],'#a37962',{seed:seed+900,border:3,lift:1});
  for(let i=0;i<8;i++){
    const sd=i%2?1:-1,yy=-140+i*38;
    line([[0,yy+25],[sd*70,yy-8]],7,'#a37962');
    leaf(sd*50,yy-10,.85,sd*.7, i%3?'#edc16f':'#d9916b',seed+950+i);
  }C.restore();
}
function bench(x,y,s){
  C.save();C.translate(x,y);C.scale(s,s);
  for(const sd of [-1,1]){
    piece(rrP(sd*150-9,-62,18,106,5),'#6a7773',{seed:801+sd,border:2,lift:.8});
    piece(rrP(sd*150-30,31,60,10,5),'#6a7773',{seed:805+sd,border:1.8,lift:.8});
  }
  for(let i=0;i<3;i++){
    piece(rrP(-210,-136+i*29,420,23,7),i===1?'#d6a474':'#c39065',{seed:810+i,border:3,lift:1});
    for(const xx of [-176,176])piece(ellP(xx,-124+i*29,2.3,2.3,12),'#9a735c',{seed:815+i,border:0,lift:0});
  }
  piece(rrP(-228,-51,456,29,7),'#e2b887',{seed:820,border:3,lift:1.1});
  line([[-202,-42],[202,-42]],1.2,'#bb8b61');C.restore();
}
function lamppost(x,y,s,t){
  C.save();C.translate(x,y);C.scale(s,s);
  piece(rrP(-8,-270,16,270,4),'#7d8d89',{seed:825,border:2,lift:.8});
  piece(rrP(-25,-12,50,15,6),'#7d8d89',{seed:826,border:2,lift:.8});
  piece([[-32,-305],[32,-305],[25,-253],[-25,-253]],'#f9e7b0',{seed:827,border:3,lift:.9});
  piece([[-40,-307],[0,-328],[40,-307]],'#708782',{seed:828,border:2,lift:.8});
  line([[-12,-302],[-10,-258]],2,'#d3b786');line([[12,-302],[10,-258]],2,'#d3b786');
  glow(0,-280,70,'#fff5ca',.35+.06*Math.sin(t*.8));C.restore();
}
function photoMini(t,x,y,w,h,duo=true){
  C.save();C.translate(x,y);C.scale(w/540,h/350);
  piece(rrP(-270,-175,540,350,5),'#f5e4ba',{seed:840,border:1,lift:.3,grain:.4});
  C.save();C.beginPath();C.rect(-263,-167,526,334);C.clip();
  wash(-270,-175,540,350,[[0,'#edc8b7'],[1,'#f6dc9d']],{seed:80,stains:3,stainA:.07});
  piece(ellP(130,-95,47,47,36),'#faeab7',{seed:842,border:2,lift:.5});
  piece([[-300,65],[-80,8],[110,56],[270,8],[300,170],[-300,175]],'#b4bb8e',{seed:843,border:2,lift:.4});
  puppet(BOY,duo?-65:0,150,.83,{t,turn:duo?.18:0,face:[[0,'soft']],aR:duo?1.3:.2});
  if(duo)puppet(GIRL,62,150,.83,{t,turn:-.2,lean:-.05,face:[[0,'happy']],aL:.3});
  C.restore();C.restore();
}
function album(x,y,s,k,t,duo=true,inside=null,hidePhoto=false){
  C.save();C.translate(x,y);C.scale(s,s);
  piece(rrP(-330,-210,660,420,15),'#986b61',{seed:850,border:5,lift:1.6});
  piece(rrP(-316,-197,632,394,10),'#fff4de',{seed:851,border:2,lift:.6});
  line([[0,-190],[0,190]],3,'#d2ba9a');
  for(let i=0;i<5;i++)line([[-320,-140+i*70],[-301,-140+i*70]],5,'#bd8d72');
  if(k>.02){
    piece(rrP(18,-163,274,286,5),'#fffaf0',{seed:852,border:3,lift:.8});
    if(!hidePhoto){
      if(inside)C.drawImage(inside,30,-110,250,140.625);
      else photoMini(t,155,-40,250,140.625,duo);
    }
    piece(rrP(-288,-158,245,155,4),'#f6ead3',{seed:853,border:2,lift:.5});
    leaf(-170,-90,1.25,-.4,'#d59d62',855);
    for(let i=0;i<3;i++)line([[-264,50+i*23],[-75-(i%2)*30,50+i*23]],3,'#d1b695');
    for(const [xx,yy] of [[26,-151],[278,-151],[26,106],[278,106]]){
      piece([[xx,yy],[xx+16,yy],[xx,yy+16]],'#c6a680',{seed:856+xx+yy,border:1,lift:.2});
    }
  }
  // The cover hinges along its left edge, revealing physical pages underneath.
  if(k<.985)flap(-330,0,660,420,k*.49,'#a76f63',{
    axis:'left',backCol:'#f4e6ca',
    front:()=>{
      C.save();C.translate(0,-210);
      piece(rrP(40,35,580,350,11),'#b78070',{seed:860,border:2,lift:.3});
      piece(rrP(175,92,310,235,6),'#ecd9bb',{seed:861,border:3,lift:.7});
      leaf(330,202,1.7,.35,'#ba785e',862);
      line([[62,30],[62,389]],4,'#e6c39d');
      C.restore();
    }
  });C.restore();
}
function propsSheet(t){
  camK(t,[[0,960,540,1]]);wash(0,0,W,H,[[0,'#fff8e8'],[1,'#efdcbf']],{seed:89,stains:5,stainA:.08});
  album(480,285,.9,0,t);album(1380,285,.9,1,t);
  bench(450,875,1.3);lamppost(960,925,1.2,t);leaf(1250,760,2.2,-.3);petalBranch(1580,850,.8,t,9);
  post(t,{vigA:.12,tone:'#ffdaa3',toneA:.08});
}
LOOPS.props=propsSheet;LOOPS.props.len=1;
