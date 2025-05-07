const updateinterval = 50

const baseplayer = {
  stone: 0,
  SPS: 0
}

player = baseplayer

function increaseSPS() {
  player.SPS += 1
}

function update() {
  player.stone+=player.SPS/(1000/updateinterval)
  document.getElementById("stone").textContent = player.stone.toFixed(2) || "Error stone didn't load"
}

setInterval(update, updateinterval)
