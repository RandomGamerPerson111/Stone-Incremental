const updateinterval = 50

const baseplayer = {
  Stone: 0,
  SPS: 0,
  Magma: 0,
  MagmaToGain: 0,
  MagmaUnlocked: 0
}

player = baseplayer

function increaseSPS() {
  player.SPS += 1
}

function runchecks() {
  if (player.MagmaUnlocked === 0 && player.Stone >= 1000) {player.MagmaUnlocked = 1}
}

function update() {
  player.Stone+=player.SPS/(1000/updateinterval)
  if (player.Stone >= 1000) {player.MagmaToGain = Math.floor(Math.cbrt(player.Stone/1000))} else {player.MagmaToGain = 0}
  document.getElementById("stone").textContent = player.Stone.toFixed(2) || "Error stone didn't load"
}

setInterval(update, updateinterval)
setInterval(runchecks, 500)
