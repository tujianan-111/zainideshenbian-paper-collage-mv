// A continuous physical pop-up book; every elevation has a scored paper foot.
const BOOK_CAM=[[0,1050,585,.92],[1.5,1050,585,.92],[3.8,1030,570,1.16],[6.3,1050,550,1.28],[9.6,1000,566,1.60],[11.4,1010,550,1.60],[15.4,1115,591,3.15],[17.1,1115,591,3.15],[20.4,1020,537,1.88],[22.5,1020,537,1.88],[24.2,980,555,1.16],[27.7,1000,558,1.26],[31.6,1010,570,1.58],[32.5,1010,570,1.58],[34.6,1050,585,.92],[35.5,1050,585,.92]];
const grow=(t,a,b)=>ease(seg(t,a,b));
const BOOK_OPEN=t=>grow(t,.35,1.75)*(1-grow(t,34.3,35.24));
const FOLD_BACK=t=>1-grow(t,33.15,34.25);
function room(t){
 layer(1);wash(-2000,-1000,6000,3400,[[0,'#fff3db'],[1,'#dfbea2']],{seed:2,stains:8,stainA:.055});
 piece(rrP(1350,-120,620,680,12),'#bc9c82',{seed:3,border:5,lift:1});piece(rrP(1370,-100,580,640,8),'#f7ddb3',{seed:4,border:3,lift:.4});glow(1590,195,430,'#fff9d8',.7);
 for(const x of [1370,1650,1935])piece(rectP(x,-100,14,640),'#fff3df',{seed:x,border:2,lift:.5});piece(rectP(1370,235,580,14),'#fff3df',{seed:9,border:2,lift:.5});
 for(let i=0;i<4;i++)piece(rrP(1260+i*17,-130,29,710,5),'#e6bc9f',{seed:12+i,border:2,lift:.4});
 piece([[-2200,600],[4100,600],[4500,2200],[-2600,2200]],'#c79873',{seed:30,border:4,lift:.8});
 for(let i=0;i<13;i++){const yy=628+i*65;line([[-2200,yy],[4200,yy]],2,'#b98966');}
 rays(1650,160,2.5,1.1,6,2400,'#fff2c4',.12,t,7);
}
function pageGround(t){
 const k=BOOK_OPEN(t),lx=x=>lerp(960,x,k);piece([[lx(155),607],[960,562],[1775,607],[1900,1000],[960,1041],[lx(25),1000]],'#9c6f60',{seed:61,border:5,lift:1.8});
 for(let i=4;i>=0;i--){const yy=i*4;piece([[lx(175),600-yy],[960,565-yy],[1755,600-yy],[1864,980-yy],[960,1021-yy],[lx(61),980-yy]],i%2?'#dfcdb1':'#f8ecd4',{seed:65+i,border:1.4,lift:.15});}
 if(k>.005)piece([[lx(181),588],[960,554],[960,1000],[lx(82),960]],'#fff2d8',{seed:73,border:3,lift:.55});piece([[960,554],[1740,588],[1845,960],[960,1000]],'#fcf3dc',{seed:74,border:3,lift:.55});
 piece([[948,557],[960,550],[975,558],[976,1003],[960,1011],[946,1000]],'#d3bc9c',{seed:75,border:0,lift:0,grain:.3});line([[960,557],[960,1004]],1.5,'#f6e7cc');
 for(const side of [-1,1])if(side===1||k>.5)line([[960+side*37,592],[960+side*70,974]],1,'#e9d9bb');
 if(t<33)bookCover(t);
}
function bookCover(t){
 const k=BOOK_OPEN(t);
 if(k<.999){const a=Math.PI*k,ex=960+800*Math.cos(a),dy=-275*Math.sin(a);piece([[960,555],[ex,590+dy],[ex+104*Math.cos(a),965+dy],[960,1004]],k>.5?'#f6e8cc':'#ab7867',{seed:80,border:5,lift:1.3});
 if(k<.47){C.save();C.transform(Math.cos(a),0,.18,1,1020,630+dy);piece(rrP(70,35,540,240,11),'#dcbf99',{seed:81,border:3,lift:.6});leaf(335,155,1.9,.2,'#b67c59',82);line([[24,0],[24,315]],3,'#e5c7a2');C.restore();}}
}
function tab(x,y,w,k,seed=1){
 if(k<.02)return;const d=30+20*(1-k);piece([[x-w/2,y],[x+w/2,y],[x+w*.38,y+d],[x-w*.4,y+d]],'#ead8b8',{seed:seed+6000,border:1.6,lift:.3});line([[x-w*.4,y+4],[x+w*.4,y+4]],1,'#c9ad87');piece([[x-w*.2,y],[x,y-28*k],[x+w*.18,y+17]],'#f4e5c9',{seed:seed+6100,border:1.3,lift:.5});
}
function hinge(x,y,w,k,seed,draw,dir=1){
 tab(x,y,w,k,seed);const a=k*Math.PI/2;C.save();C.translate(x,y);C.transform(1,0,dir*.24*Math.cos(a),Math.sin(a)+.28*Math.cos(a),0,0);draw();C.restore();
}
function bookBackdrop(t){
 const k=grow(t,1.8,3.8)*(1-grow(t,33.7,34.25));hinge(960,675,1320,k,100,()=>{
 piece([[-740,0],[-710,-408],[-270,-470],[0,-430],[290,-470],[710,-408],[740,0]],'#f6d3b6',{seed:101,border:5,lift:1});
 wash(-695,-400,1390,400,[[0,'#fff4d5'],[1,t>22.6?'#edc691':'#f4c7b5']],{seed:102,stains:7,stainA:.08});line([[0,-430],[0,0]],2,'#dec0a1');
 const sy=-245+64*grow(t,4.4,9.3);glow(252,sy,250,'#fff1b4',.65);piece(ellP(252,sy,92,92,60),'#ffe6a5',{seed:105,border:3,lift:.4});
 for(let i=0;i<4;i++)piece(cloudP(-540+i*345,-335+(i%2)*63,235,45,112+i),'#fff6e3',{seed:112+i,border:2,lift:.6});
 piece([[-710,0],[-710,-95],[-510,-163],[-280,-85],[-65,-155],[205,-105],[440,-186],[710,-104],[710,0]],'#bbc5a2',{seed:120,border:3,lift:.8});piece([[-710,0],[-710,-57],[-400,-108],[-45,-69],[250,-115],[710,-53],[710,0]],'#d1c18d',{seed:121,border:3,lift:.8});});
}
function paperHouse(x,y,s,k,seed){hinge(x,y,105*s,k,seed,()=>{C.scale(s,s);piece(rectP(-65,-150,130,150),'#e6c9b0',{seed,border:3,lift:.8});piece([[-79,-150],[0,-200],[79,-150]],'#b98d82',{seed:seed+1,border:3,lift:1});for(const xx of [-36,17])piece(rrP(xx,-122,23,36,3),'#fdf0cc',{seed:seed+xx,border:2,lift:.5});piece(rrP(-16,-55,32,55,3),'#be9c80',{seed:seed+5,border:2,lift:.6});line([[-70,0],[70,0]],1,'#baa17e');});}
function paperDoor(t,k){hinge(1450,780,155,k,233,()=>{
 piece([[-91,0],[-87,-294],[-75,-314],[76,-314],[89,-294],[91,0]],'#e2bea2',{seed:234,border:4,lift:1});piece(rrP(-67,-284,134,284,8),'#ad967f',{seed:235,border:2,lift:.4});
 flap(-64,-142,128,280,grow(t,5.05,6.0)*.43,'#eac9a2',{axis:'left',front:()=>{piece(rrP(15,-111,100,218,4),'#efd7b0',{seed:237,border:2,lift:.6});piece(ellP(108,5,5,5,16),'#ba8b62',{seed:238,border:1,lift:.4});}});});}
function plazaMechanisms(t){
 const close=FOLD_BACK(t),forest=1-grow(t,23.1,24.2);for(let i=0;i<6;i++)paperHouse(340+i*245,676,.75+(i%2)*.16,grow(t,3+i*.17,4.3+i*.17)*close,140+i*10);
 for(const [x,a] of [[402,3.8],[1550,4.35]])hinge(x,815,65,grow(t,a,a+.9)*close,200+x,()=>lamppost(0,0,.8,t));if(forest>.001)paperDoor(t,grow(t,4.0,4.8)*forest*close);
 piece([[407,703],[1498,703],[1628,903],[294,903]],t<23?'#e6c9a8':'#cbd0a2',{seed:224,border:3,lift:.45});for(let i=0;i<5;i++)line([[377-i*17,735+i*35],[1520+i*17,735+i*35]],1.2,'#cfb38c');for(let i=0;i<8;i++)line([[490+i*133,705],[410+i*156,902]],1,'#d4b890');
}
function paperTree(x,y,s,k,seed,t){hinge(x,y,105*s,k,seed,()=>{
 C.scale(s,s);piece([[-16,0],[-13,-300],[6,-340],[22,-315],[13,0]],'#a78062',{seed,border:3,lift:1});
 for(let j=0;j<3;j++){const spread=.72+.28*grow(t,23.3+j*.19,24.4+j*.19);C.save();C.translate([-54,-8,58][j],[-273,-333,-275][j]);C.scale(spread,1);piece(ellP(0,0,94,90,45),['#d7ac67','#e3bf78','#efd49a'][j],{seed:seed+5+j,border:3,lift:1.1});C.restore();}
 line([[0,-145],[-59,-234]],5,'#aa8361');line([[0,-190],[55,-270]],5,'#aa8361');});}
function autumnMechanisms(t){
 if(t<22.55)return;const k=FOLD_BACK(t);for(let i=0;i<6;i++){const x=[285,540,1525,1745,670,1320][i],y=[805,715,730,870,684,684][i];paperTree(x,y,i<4?1:.7,grow(t,22.9+i*.18,24.05+i*.18)*k,400+i*13,t);}
 for(let i=0;i<5;i++){const q=grow(t,23.35+i*.13,24.1+i*.13)*k,yy=717+i*31;if(q>.005)hinge(990,yy,90+i*30,q,500+i,()=>piece([[-45-i*15,0],[-40-i*12,-31],[41+i*12,-31],[45+i*15,0]],'#f2d7a8',{seed:500+i,border:1.5,lift:.3}));}
}
function photograph(t){if(t>3.8)return;const q=grow(t,1.25,2.9);C.save();C.translate(640,770);C.rotate(-.12);C.scale(1,Math.abs(Math.cos(q*Math.PI))*.45+.04);piece(rrP(-160,-120,320,240,6),'#fff8e7',{seed:270,border:3,lift:1});if(q<.5)photoMini(t,0,-7,291,195,true);else{line([[-105,-30],[105,-30]],2,'#ddc7a4');line([[-105,0],[60,0]],2,'#ddc7a4');}C.restore();}
function cheekSleeve(a,b,w,seed){const dx=b[0]-a[0],dy=b[1]-a[1],L=Math.hypot(dx,dy),nx=-dy/L*w/2,ny=dx/L*w/2;actor(()=>{piece([[a[0]+nx,a[1]+ny],[b[0]+nx,b[1]+ny],[b[0]-nx,b[1]-ny],[a[0]-nx,a[1]-ny]],'#789ba8',{seed,border:3,lift:1});piece(ellP(b[0],b[1]+15,w*.57,10,32),'#f3e8d1',{seed:seed+1,border:2,lift:.5});hand(b[0],b[1],2,seed+2);});}
function characters(t){
 if(t<2.75)return;const k=grow(t,2.75,3.85)*(1-grow(t,33.0,33.9));
 const boy=act(t,[[2.75,{x:780,y:840,s:1.45,pose:'slump',face:'sad',turn:.4}],[5.3,{pose:'slump'}],[5.7,{pose:'startle',face:'surprised',turn:.65},'out'],[6.4,{pose:'stand',face:'soft',tilt:-.04}],[7.5,{pose:'reach',aR:1.4,lean:.08}],[9.0,{x:850,pose:'offer',aR:1.45,face:'happy'}],[10.7,{pose:'offer'}],[12.1,{x:770,pose:'reach',aR:1.4,face:'soft'}],[13.6,{x:630,pose:'stand',aR:.15,face:'soft',tilt:.06}],[17.2,{x:630,pose:'reach'}],[19.0,{x:830,pose:'stand',aR:.15,turn:.55,face:'love'}],[21.2,{pose:'stand',face:'happy',tilt:.07}],[23.6,{x:790,y:900,s:1.65,pose:'peek',face:'surprised',turn:.4}],[24.8,{pose:'point',aR:1.6,face:'soft'}],[26.4,{pose:'reach',aR:1.8,face:'soft'}],[28.3,{x:890,y:858,s:1.5,pose:'heart',face:'love'}],[29.8,{x:870,y:838,s:1.45,pose:'stand',sit:0,face:'soft',aR:.2}],[30.4,{pose:'crouch',sit:0,face:'soft'}],[30.95,{pose:'stand',sit:1,face:'happy'},'out'],[31.8,{sit:1,aR:1.3,face:'soft',lean:.04}],[34.3,{sit:1,aR:1.3,face:'soft',lean:.04}]]);
 const girl=act(t,[[2.75,{x:1500,y:802,s:1.45,pose:'peek',dir:-1,face:'soft',turn:-.5}],[5.2,{x:1500}],[5.85,{x:1370,pose:'peek',face:'happy'},'out'],[7.0,{x:1220,y:802,s:1.3,pose:'stand',face:'happy',turn:-.4}],[7.8,{pose:'offer',aL:1.5,face:'soft'}],[9.2,{x:1115,y:900,s:1.65,pose:'offer',aL:1.5}],[10.0,{pose:'shy',face:'shy'}],[11.6,{pose:'stand',aL:.12,aR:.12,face:'soft',turn:-.25}],[13.4,{face:'surprised',tilt:.03}],[15.0,{face:'shy',tilt:.08}],[16.2,{face:'soft',lean:-.04,tilt:.12}],[18.5,{face:'soft',lean:-.04,tilt:.12}],[19.3,{aL:.12,aR:.12,turn:-.3,tilt:-.035,face:'soft'}],[20.5,{face:'love',tilt:-.06}],[21.8,{face:'happy',tilt:-.09}],[23.5,{x:1200,y:804,s:1.3,pose:'point',aL:2.0,face:'surprised'}],[24.7,{pose:'crouch',face:'surprised'}],[25.3,{pose:'reach',aL:2.35,face:'soft'},'out'],[26.35,{pose:'offer',aL:1.6,face:'happy'}],[27.8,{x:1110,y:850,s:1.45,pose:'stand',aL:.12,aR:.12,face:'soft'}],[29.8,{x:1170,y:838,s:1.45,pose:'stand',sit:0,face:'happy'}],[30.9,{x:1110,pose:'crouch',sit:0,face:'soft'}],[31.4,{pose:'stand',sit:1,face:'soft'},'out'],[32.0,{x:1055,sit:1,lean:-.16,tilt:-.04,face:'closed'},'out'],[34.3,{x:1055,sit:1,lean:-.16,face:'closed'}]]);
 // Eye contact follows the release of the palms; pupils and face turn agree.
 const mutual=grow(t,18.75,19.8)*(1-grow(t,21.7,22.2));
 if(mutual>0){boy.turn=lerp(boy.turn,.8,mutual);girl.turn=lerp(girl.turn,-.85,mutual);boy.F=face(t,boy.face,18,{look:[mutual,0]});girl.F=face(t,girl.face,31,{look:[-mutual,-.1*mutual]});}
 let B,G;
 if(t>=5.16)hinge(girl.x,girl.y,80,k*grow(t,5.16,5.65),302,()=>{C.translate(-girl.x,-girl.y);G=puppet(GIRL,girl.x,girl.y,girl.s,{t,...girl});});hinge(boy.x,boy.y,80,k,300,()=>{C.translate(-boy.x,-boy.y);B=puppet(BOY,boy.x,boy.y,boy.s,{t,...boy});});
 if(t>7.6&&t<11.0&&G&&B){const a=grow(t,8.0,8.85);leaf(lerp(G.handL[0],B.handR[0],a),lerp(G.handL[1]-10,B.handR[1]-10,a),.75,-.4,'#d79c57',350);}
 if(t>11.4&&t<22.8){const r=grow(t,11.4,12.8)*(1-grow(t,21.8,22.8));for(const x of [girl.x,boy.x]){piece([[x-85,860],[x-70,860-24*r],[x+70,860-24*r],[x+85,860]],'#f1d6ba',{seed:360+x,border:2,lift:.4});line([[x-70,860-24*r],[x+70,860-24*r]],1,'#d1ad8e');}
 const touch=grow(t,12.4,14.7)*(1-grow(t,17.35,19.0));if(touch>.001){const cy=girl.y-188*girl.s;cheekSleeve([916,835],[lerp(918,girl.x-88,touch),lerp(810,cy+43,touch)],40,365);cheekSleeve([1325,835],[lerp(1310,girl.x+88,touch),lerp(810,cy+45,touch)],40,369);}}
 if(t>=23.2&&t<29.7&&G&&B){const a=grow(t,24.7,25.35),give=grow(t,27.0,27.65),hx=lerp(G.handL[0],B.handR[0],give),hy=lerp(G.handL[1],B.handR[1],give)-12;leaf(lerp(970,hx,a),lerp(300+Math.max(0,t-23.2)*135,hy,a),.9,.6+Math.max(0,25-t),'#ddaa60',375);}
}
function foregroundPetals(t){if(t<16.7||t>22.9)return;const q=grow(t,16.7,18.8)*(1-grow(t,21.8,22.9));for(const sd of [-1,1])hinge(960+sd*560,900,180,q,620+sd,()=>{piece([[0,0],[-160*sd,-82],[-195*sd,-255],[-100*sd,-375],[5,-330],[45*sd,-145]],'#f2cabb',{seed:622+sd,border:4,lift:1});line([[0,0],[-100*sd,-330]],2,'#d8a9a0');},sd);}
function benchMechanism(t){if(t<28.75)return;hinge(1000,873,610,grow(t,28.75,29.9)*(1-grow(t,33.6,34.15)),640,()=>bench(0,0,1.25));}
function openingBoy(t){if(t>3&&t<34.12)return;const x=t>34?lerp(450,745,grow(t,34.12,34.9)):lerp(745,-100,grow(t,1.6,3));puppet(BOY,x,780,1.95,{t,...act(t,[[0,{pose:'slump',face:'sad',turn:.3}],[.65,{pose:'reach',face:'soft',aR:1.6}],[1.8,{pose:'reach',face:'surprised',aR:1.6}],[34.1,{pose:'reach',face:'soft',aR:1.65}],[35.25,{pose:'heart',face:'closed',tilt:.08}]])});}
function bookmark(t){if(t<.8)return;if(t<4){const q=grow(t,1,3.1);leaf(lerp(960,850,q),lerp(680,788,q),.88,lerp(.1,-.8,q),'#d79c57',700);}if(t>33.1){const q=grow(t,33.1,34);leaf(lerp(1100,1540,q),lerp(800,982,q),.9,lerp(.1,-.4,q),'#d79c57',700);}}
function closeLeaf(t){if(t<22.18||t>23.25)return;layer(1);const q=grow(t,22.18,22.83),out=grow(t,22.83,23.25);leaf(lerp(lerp(950,1100,q),4300,out),lerp(705,510,q),lerp(lerp(.85,40,q),35,out),-.4+.55*q,'#e7bd79',710);}
function pageLyrics(t){
 screen();const i=LYR.lines.findIndex((l,i)=>t>=lyricAt(i,0)-.04&&t<(LYR.lines[i+1]?lyricAt(i+1,0)-.08:35.5));if(i<0)return;
 piece([[175,934],[960,921],[1745,934],[1780,1050],[960,1063],[140,1050]],'#fff2d8',{seed:721,border:3,lift:.8});line([[960,925],[960,1060]],1.5,'#dfc9a7');
 const L=LYR.lines[i],s=i===5?70:60,gap=s*1.08,x0=960-(L.chars.length-1)*gap/2;L.chars.forEach((c,j)=>{const age=t-lyricAt(i,j);if(age<0)return;const q=grow(age,0,.13);card(c.c,x0+j*gap,991-14*(1-q),s,{rot:(hash(i*17+j)-.5)*.04,k:1+.15*(1-q),bg:'#fff8e9',col:'#59403b',lift:.28,border:1.4,seed:800+i*17+j});lyricMark(i,j);});
}
function mv(t){
 camK(t,BOOK_CAM);room(t);openingBoy(t);pageGround(t);
 if(t>1.65&&t<35.24){C.save();const fold=grow(t,34.1,35.24);C.translate(960,0);C.scale(1-fold,1);C.translate(-960,0);bookBackdrop(t);plazaMechanisms(t);autumnMechanisms(t);photograph(t);benchMechanism(t);characters(t);foregroundPetals(t);C.restore();}
 if(t>=33)bookCover(t);
 bookmark(t);closeLeaf(t);screen();motes(t,12,[0,0,W,H],'#fff4ce',.3,72,.6);pageLyrics(t);post(t,{tone:'#ffdfae',toneA:.08,vigA:.13,grain:.095});
}
shots([[0,mv]]);
LOOPS.props=t=>{
 camK(t,[[0,960,540,1]]);wash(0,0,W,H,[[0,'#fff5de'],[1,'#e9cfaf']],{seed:901,stains:6,stainA:.06});
 [0,.42,1].forEach((k,i)=>{C.save();C.translate(310+i*650,415);C.scale(.64,.64);piece([[-410,0],[410,0],[470,180],[-470,180]],'#fff4d9',{seed:902+i,border:4,lift:1});line([[0,0],[0,180]],2,'#c9ad8a');hinge(0,70,240,k,920+i,()=>bench(0,0,.8));paperTree(-230,75,.7,k,930+i,24.8);paperHouse(240,65,.7,k,950+i);C.restore();});
 leaf(320,800,2,.1);leaf(620,800,2,-.7);paperDoor(6,1);for(let i=0;i<2;i++)hinge(930+i*300,860,140,i?.95:.2,980+i,()=>piece([[-100,0],[-100,-200],[100,-200],[100,0]],'#f0c9b8',{seed:983+i,border:4,lift:1}));post(t,{vigA:.1,grain:.09});
};LOOPS.props.len=1;
