const updateinterval = 50

const baseplayer = {
  Stone: 0,
  SPS: 0,
  Magma: 0,
  MagmaToGain: 0,
  MagmaUnlocked: 0,
  CStone: 0,
  CSG: 0,
  CSU: 0,
  MineTier: 0,
  MTU: 0,
  MTR: 0, //mine tier requirements
  StMlt: { // A list of stone multipliers
    Magma: 1,
    Total: 1,
	CStone: 1,
	MT: 1
  },
  MgMlt: {
	MT: 1,
	Total: 1
  },
  CSMlt: {
	MT: 1,
	Total: 1
  }
}

player = baseplayer
gamepower = 1

function round2(input) {
  return String(Math.round(input*100)/100)
}

function increaseSPS() {
  player.SPS += player.StMlt.Total
}

function magmareset() {
  if (player.MagmaToGain === 0) {return;}
  player.Magma += player.MagmaToGain
  player.SPS = 0
  player.Stone = 0
}

function compressreset() {
  if (player.CSU === 0 || player.CSG === 0) {return;}
  player.Stone = 0
  player.SPS = 0
  player.CStone += player.CSG
}

function tierreset() {
	if (player.MineTier === 2) {return;}
	if ((player.MineTier === 0 && player.Stone >= 50000 && player.Magma >= 30) || (player.MineTier === 1 && player.Stone >= 1e6 && player.Magma >= 250)) {
		player.MineTier += 1
		player.Stone = 0
		player.SPS = 0
		player.Magma = 0
		player.CStone = 0
		player.MagmaUnlocked = 0
		player.CSU = 0}

}

function runchecks() {
  if (player.MagmaUnlocked === 0 && player.Stone >= 500) {player.MagmaUnlocked = 1}
  if (player.MagmaUnlocked === 0) {document.getElementById("MagmaTab").style.display = 'none'} else {document.getElementById("MagmaTab").style.display = 'inline'}
	
  if (player.CSU === 0 && player.Stone >= 10000) {player.CSU = 1}
  if (player.CSU === 0) {document.getElementById("CSinfo").style.display = 'none'} else {document.getElementById("CSinfo").style.display = 'inline'}

	if (player.MTU === 0 && player.Stone >= 30000 && player.Magma >= 25 && player.CStone >= 50) {player.MTU = 1}
	if (player.MTU === 0) {document.getElementById("TierTab").style.display = 'none'} else {document.getElementById("TierTab").style.display = 'inline'}
}

function MTveiw() {

}

function update() {

  switch (player.MineTier) {
	case 0:
	  player.StMlt.MT = 1
	  player.MgMlt.MT = 1
	  player.CSMlt.MT = 1
	  player.MTR = "50K stone and 30 magma"
	  document.getElementById("MT0").style.display = 'inline'
	  document.getElementById("MT1").style.display = 'none'
	  document.getElementById("MT2").style.display = 'none'
	  break;
	case 1:
	  player.StMlt.MT = 10
	  player.MgMlt.MT = 2
	  player.CSMlt.MT = 1
	  player.MTR = "1M stone and 250 magma"
	  document.getElementById("MT0").style.display = 'none'
	  document.getElementById("MT1").style.display = 'inline'
	  document.getElementById("MT2").style.display = 'none'
	  break;
    case 2:
	  player.StMlt.MT = 100
	  player.MgMlt.MT = 5
	  player.CSMlt.MT = 2
	  player.MTR = "Not defined yet"
	  document.getElementById("MT0").style.display = 'none'
	  document.getElementById("MT1").style.display = 'none'
	  document.getElementById("MT2").style.display = 'inline'
	  break;

  }
  
  player.StMlt.Magma = (Math.log(player.Magma + 1)**2)+1
  player.StMlt.CStone = (Math.log(player.CStone + 1))+1
  
  player.CSG = Math.floor((player.Stone/10000)*player.CSMlt.Total)
  if (player.Stone >= 500) {player.MagmaToGain = Math.floor((Math.cbrt(player.Stone/500))*player.MgMlt.Total)} else {player.MagmaToGain = 0}
  
  player.StMlt.Total = player.StMlt.Magma * player.StMlt.CStone * player.StMlt.MT * gamepower
  player.MgMlt.Total = player.MgMlt.MT * gamepower
  player.CSMlt.Total = player.CSMlt.MT * gamepower
  
  player.Stone+=player.SPS/(1000/updateinterval)
  document.getElementById("stone").textContent = round2(player.Stone) || "Error stone didn't load"
  document.getElementById("magma").textContent = round2(player.Magma) ||"Error magma didn't load"
  document.getElementById("SPS").textContent = round2(player.SPS) || "Error SPS didn't load"
  document.getElementById("CStone").textContent = round2(player.CStone) ||"Error CStone didn't load"
  if (player.MagmaToGain === 0) {document.getElementById("magmareset").textContent = "You need 500 stone to reset" || "Error MagmaGain didn't load"}
  else {document.getElementById("magmareset").textContent = "Reset for " + round2(player.MagmaToGain) + " magma" || "Error MagmaGain didn't load"}
  if (player.CSG === 0) {document.getElementById("CSbtn").textContent = "You need 10000 stone to compress stone" || "Error CS didn't load"}
  else {document.getElementById("CSbtn").textContent = "Compress " + round2(player.Stone) + " stone into " + round2(player.CSG) + " compressed stone"|| "Error CS didn't load"}
  
  
}

setInterval(update, updateinterval)
setInterval(runchecks, 500)
