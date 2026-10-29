#!/bin/zsh
# Render each job's HTML to PNG at exact pixel size with headless Chrome.
CH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
node -e 'for (const j of require(process.argv[1])) console.log([j.html,j.out,j.w,j.h,j.transparent?1:0].join("\t"))' "$1" | while IFS=$'\t' read html out w h t; do
  bg=(); [[ $t == 1 ]] && bg=(--default-background-color=00000000)
  "$CH" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 --window-size=$w,$h $bg --screenshot="$out" "file://$html" >/dev/null 2>&1
  echo "$(sips -g pixelWidth -g pixelHeight "$out" | awk '/pixel/{printf "%s ",$2}') ${out##*/brand/}"
done
