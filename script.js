const productos = [
  {
    id: "vodka",
    nombre: "Vodka Tonic",
    precio: 17500,
    imagen: "img/vodka.jpg",
    descripcion: "Mini Absolut + Tónica + Hielo"
  },
  {
    id: "gin",
    nombre: "Gin Selva",
    precio: 23000,
    imagen: "img/gin.jpg",
    descripcion: "Mini Gin Selva + Tónica + Hielo"
  },
  {
    id: "jager",
    nombre: "Jäger Bull",
    precio: 18000,
    imagen: "img/jager.jpg",
    descripcion: "Mini Jäger + Red Bull + Hielo"
  }
];

// SI ESTAMOS EN INDEX
if(document.getElementById("productos")){
  const contenedor = document.getElementById("productos");

  productos.forEach(p=>{
    contenedor.innerHTML += `
      <div class="card">
        <img src="${p.imagen}">
        <h3>${p.nombre}</h3>
        <p>${p.descripcion}</p>
        <h4>$${p.precio.toLocaleString()}</h4>
        <button onclick="verProducto('${p.id}')">Ver más</button>
      </div>
    `;
  });
}

function verProducto(id){
  window.location.href = "producto.html?id=" + id;
}

// SI ESTAMOS EN PRODUCTO
if(document.getElementById("detalle")){
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const producto = productos.find(p=>p.id===id);

  if(producto){
    document.getElementById("detalle").innerHTML = `
      <img src="${producto.imagen}">
      <h2>${producto.nombre}</h2>
      <p>${producto.descripcion}</p>
      <h3>$${producto.precio.toLocaleString()}</h3>
      <a href="https://wa.me/573132659873?text=Hola quiero pedir ${producto.nombre}">
        <button>Pedir por WhatsApp</button>
      </a>
    `;
  }
}
/* ===== MÚSICA ===== */
function toggleMusic(){
  const music = document.getElementById("bgMusic");
  if(music.paused){
    music.play();
  }else{
    music.pause();
  }
}

/* ===== PARTÍCULAS ===== */
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

class Particle{
  constructor(){
    this.x = Math.random()*canvas.width;
    this.y = Math.random()*canvas.height;
    this.size = Math.random()*3+1;
    this.speedY = Math.random()*1+0.5;
  }
  update(){
    this.y += this.speedY;
    if(this.y > canvas.height){
      this.y = 0;
      this.x = Math.random()*canvas.width;
    }
  }
  draw(){
    ctx.fillStyle = "rgba(0,255,255,0.7)";
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
    ctx.fill();
  }
}

function init(){
  for(let i=0;i<100;i++){
    particlesArray.push(new Particle());
  }
}

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particlesArray.forEach(p=>{
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}

init();
animate();
