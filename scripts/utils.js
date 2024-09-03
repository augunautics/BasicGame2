
//util.js

export function getAspectRatioScale(baseSize, targetSize) {
  return targetSize / baseSize;
}

export function loadImage(src) {  // Fix the syntax error
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
