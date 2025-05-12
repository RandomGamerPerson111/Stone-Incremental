const updateinterval = 50

const baseplayer = {
  Stone: 0,
  SPS: 0,
  Magma: 0,
  MagmaToGain: 0,
  MagmaUnlocked: 0,
  StMlt: { // A list of stone multipliers
    Magma: 1,
    Total: 1
  }
}

player = baseplayer


function increaseSPS() {
  player.SPS += player.StMlt.Total
}

function magmareset() {
  if (player.MagmaToGain === 0) {return;}
  player.Magma += player.MagmaToGain
  player.SPS = 0
  player.Stone = 0
}

function runchecks() {
  if (player.MagmaUnlocked === 0 && player.Stone >= 1000) {player.MagmaUnlocked = 1}
  if (plaer.MagmaUnlocked === 0) {document.getElementById(MagmaTab).style.display = none} else {document.getElementById(MagmaTab).style.display = inline}
}

function update() {
  player.StMlt.Magma = Math.log(player.Magma + 1)+1
  player.StMlt.Total = player.StMlt.Magma
  player.Stone+=player.SPS/(1000/updateinterval)
  if (player.Stone >= 1000) {player.MagmaToGain = Math.floor(Math.cbrt(player.Stone/1000))} else {player.MagmaToGain = 0}
  document.getElementById("stone").textContent = player.Stone.toFixed(2) || "Error stone didn't load"
  document.getElementById("magma").textContent = player.Magma.toFixed(2) || "Error magma didn't load"
  document.getElementById("SPS").textContent = player.SPS.toFixed(2) || "Error SPS didn't load"
  if (player.MagmaToGain === 0) {document.getElementById("magmareset").textContent = "You need 1000 stone to reset" || "Error MagmaGain didn't load"}
  else {document.getElementById("magmareset").textContent = "Reset for " + player.MagmaToGain.toFixed(2) + " magma" || "Error MagmaGain didn't load"}
  
}

setInterval(update, updateinterval)
setInterval(runchecks, 500)
