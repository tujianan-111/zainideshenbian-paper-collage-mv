$ErrorActionPreference = 'Stop'
$projectRoot = $PSScriptRoot
$setupRoot = Split-Path -Parent $projectRoot
$env:CHROME_PATH = Join-Path $setupRoot 'tools\browsers\chromium-1234\chrome-win64\chrome.exe'
$env:Path = (Join-Path $setupRoot 'tools\bin') + ';' + $env:Path
Push-Location -LiteralPath $projectRoot
try {
    node render.mjs --frames --workers=3
    if ($LASTEXITCODE -ne 0) { throw '画面渲染失败' }
    node render.mjs --encode '--out=out/在你的身边_立体书版.mp4' --audio=assets/song.wav
    if ($LASTEXITCODE -ne 0) { throw '视频合成失败' }
} finally {
    Pop-Location
}
