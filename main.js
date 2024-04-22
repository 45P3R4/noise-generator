const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.fillRect(0, 0, 256, 256);


const img = new Image(canvas.width, canvas.height);

const whiteBtn = document.getElementById("white-btn");
whiteBtn.addEventListener("click", white_noise);

const perlinBtn = document.getElementById("perlin-btn");
perlinBtn.addEventListener("click", perlin_noise);

const sizeBtn = document.getElementById("size-btn");
sizeBtn.addEventListener("click", change_size);

function perlin_noise() {
  white_noise();
  let _zoom = document.getElementById("zoom").value;
  let blur = document.getElementById("blur").value;
  if (_zoom <= 0) {_zoom = 1;}
  if (blur < 0) {blur = 0;}

  let zoomCount = 0;
  zoomout();
  for (let i = 0; i < _zoom; i++) {zoom();}
  for (let i = 0; i < blur; i++) {zoomout(); zoom();}
  
}

function white_noise() {
  const ctx = canvas.getContext("2d");
  let max = document.getElementById("max").value;
  let min = document.getElementById("min").value;
  if(min == 0 || min < 0) { min = 0; }
  if(max == 0 || max > 255) { max = 255; }

  max = parseInt(max);
  min = parseInt(min);

  for (let pixelw = 0; pixelw < canvas.width; pixelw++) {
    for (let pixelh = 0; pixelh < canvas.height; pixelh++) {
      let random = Math.random() * (max - min) + min;
      random = Math.round(random);
      ctx.fillStyle = "#" + random.toString(16) + random.toString(16) + random.toString(16);
      ctx.fillRect(pixelw, pixelh, 1, 1);
    }
  }
}

function change_size() {
  const width = document.getElementById("width").value;
  const height = document.getElementById("height").value;

  
  ctx.drawImage(canvas, 0, 0);
  

  canvas.width = width <= 1024 && width > 0 ? width : 128;
  canvas.height = height <= 1024 && height > 0 ? height : 128;
}


function zoom() {
  
  ctx.save();
  ctx.scale(2, 2);
  ctx.drawImage(canvas, 0, 0);
  ctx.restore();
}

function zoomout() {
  ctx.restore();
  ctx.save();
  ctx.scale(0.5, 0.5);
  ctx.drawImage(canvas, 0, 0);
  ctx.restore();
}