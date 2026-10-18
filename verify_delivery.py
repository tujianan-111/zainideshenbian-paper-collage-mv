"""Validate the actual encoded delivery, not merely the source canvas."""
import json,pathlib,re,subprocess,hashlib,sys
from PIL import Image,ImageOps,ImageDraw
import numpy as np

root=pathlib.Path(__file__).resolve().parent
ffmpeg=root.parent/'tools/bin/ffmpeg.exe'
ffprobe=root.parent/'tools/bin/ffprobe.exe'
video=root/'out/在你的身边_立体书版.mp4'
check=root/'out/check';check.mkdir(parents=True,exist_ok=True)
def run(args):return subprocess.run([str(a) for a in args],capture_output=True,text=True,encoding='utf-8',errors='replace',check=True)
meta=json.loads(run([ffprobe,'-v','error','-show_streams','-show_format','-of','json',video]).stdout)
v=next(s for s in meta['streams'] if s['codec_type']=='video')
a=next(s for s in meta['streams'] if s['codec_type']=='audio')
assert (v['width'],v['height'],v['r_frame_rate'])==(1920,1080,'24/1'),v
assert v['codec_name']=='h264' and a['codec_name']=='aac',(v,a)
assert int(v['nb_frames'])==852,v
assert abs(float(meta['format']['duration'])-35.5)<.05,meta['format']['duration']
decode=run([ffmpeg,'-hide_banner','-i',video,'-vf','blackdetect=d=0.05:pix_th=0.03','-af','volumedetect','-f','null','-'])
(check/'decode.log').write_text(decode.stderr,encoding='utf-8')
black=re.findall(r'black_start:([\d.]+)',decode.stderr)
assert not black,black
peak=re.search(r'max_volume:\s*([\-\d.]+) dB',decode.stderr)
mean=re.search(r'mean_volume:\s*([\-\d.]+) dB',decode.stderr)
assert peak and float(peak[1])<0,peak
assert mean and float(mean[1])>-40,mean
lyr=json.loads((root/'assets/lyrics_timing.json').read_text(encoding='utf-8'))
assert len(lyr['lines'])==6,len(lyr['lines'])
assert all('MMS_FA' in l['source'] for l in lyr['lines'])
for line in lyr['lines']:
    ts=[c['t'] for c in line['chars']]
    assert ts and all(0<=t<35.5 for t in ts),line
    assert all(x<y for x,y in zip(ts,ts[1:])),line
    assert ''.join(c['c'] for c in line['chars'])==line['line'],line
times=[.3,1.8,4.1,5.9,9.8,12.8,16.5,20.8,23.3,26.4,30.7,32.3,33.7,34.5,35.3]
thumbs=[]
for t in times:
    f=check/f'encoded_{t:05.2f}.jpg'
    run([ffmpeg,'-y','-v','error','-ss',t,'-i',video,'-frames:v','1','-q:v','2',f])
    im=Image.open(f).convert('RGB')
    assert np.asarray(im).mean()>40,(t,'unusually dark frame')
    thumb=im.resize((480,270),Image.Resampling.LANCZOS)
    d=ImageDraw.Draw(thumb);d.rectangle((0,0,80,25),fill=(40,30,30));d.text((7,6),f'{t:.2f}s',fill='white')
    thumbs.append(thumb)
sheet=Image.new('RGB',(1920,270*4),(255,247,229))
for i,thumb in enumerate(thumbs):sheet.paste(thumb,((i%4)*480,(i//4)*270))
sheet.save(check/'成片抽帧.jpg',quality=93)
poster=Image.open(check/'encoded_32.30.jpg');poster.save(root/'out/预览.jpg',quality=95)
report={'video':str(video),'duration_seconds':float(meta['format']['duration']),
        'width':v['width'],'height':v['height'],'fps':v['r_frame_rate'],'frames':int(v['nb_frames']),
        'video_codec':v['codec_name'],'audio_codec':a['codec_name'],'audio_channels':a['channels'],
        'audio_sample_rate':int(a['sample_rate']),'full_decode_ok':True,'black_intervals':black,
        'peak_dbfs':float(peak[1]),'mean_dbfs':float(mean[1]),'lyric_lines':len(lyr['lines']),
        'lyric_characters':sum(len(l['chars']) for l in lyr['lines']),
        'alignment_review_flags':[{'line':l['line'],'flags':l.get('flags',[])} for l in lyr['lines'] if l.get('flags')],
        'size_bytes':video.stat().st_size,'sha256':hashlib.sha256(video.read_bytes()).hexdigest(),
        'note':'Automated validation and decoded-frame inspection; no claim of independent human listening.'}
(check/'verification.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(report,ensure_ascii=False,indent=2))
