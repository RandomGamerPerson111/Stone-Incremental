const baseplayer{
  stone: 0
  SPS: 0
}

player = baseplayer

function update() {
  player.stone+=player.SPS/20
  document.getElementById("stone").textContent = player.stone.toFixed(2)
}

setInterval(update, 50)
