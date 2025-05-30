"use strict";

const updateinterval = 50

let Au = 1

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
  LavaUnlocked: 0,
  Lava: 0,
  LPS: 0,
  MTR: 0, //mine tier requirements
  StMlt: { // A list of stone multipliers
    Magma: 1,
    Total: 1,
	CStone: 1,
	MT: 1,
	SBUno: 1,
	LvMlt: 1
  },
  MgMlt: {
	MT: 1,
	Total: 1,
	SBDos: 1,
    MPSP: 1,
	LvMlt: 1
  },
  CSMlt: {
	MT: 1,
	Total: 1,
	SBTres: 1,
	Req: 10000
  },
  SB: {
	Uno: {Amount: 0, Cost: 10},
	Dos: {Amount: 0, Cost: 5000},
	Tres: {Amount: 0, Cost: 500},
	Quatro: {Amount: 0, Cost: 10000}
  },
  AuMlt: {
	Rate: 0,
	SBQuatro: 0,
	Pow: 1
  }
}

var player = baseplayer
var gamepower = 1


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
  player.Lava = 0
}

function compressreset() {
  if (player.CSU === 0 || player.CSG === 0) {return;}
  player.Stone = 0
  player.SPS = 0
  player.CStone += player.CSG
}

function tierreset() {
	if (player.MineTier === 3) {return;}
	if ((player.MineTier === 0 && player.Stone >= 25000 && player.Magma >= 15) || (player.MineTier === 1 && player.Stone >= 1e8 && player.Magma >= 1e3) || (player.MineTier === 2 && player.Stone >= 1e11 && player.Magma >= 1e6)) {
		player.MineTier += 1
		player.Stone = 0
		player.SPS = 0
		player.Magma = 0
		player.CStone = 0
		player.MagmaUnlocked = 0
		player.SB.Uno.Amount = 0
		player.SB.Dos.Amount = 0
		player.SB.Tres.Amount = 0
		player.SB.Quatro.Amount = 0
		player.CSU = 0
	    player.Lava = 0
	}
}

function switchTabs(tab) {
  switch(tab) {
    case 1:
	  document.getElementById('Tab1').style.display = 'block'
	  document.getElementById('Tab2').style.display = 'none'
	  document.getElementById('Tab3').style.display = 'none'
	  break;
	case 2:
	  document.getElementById('Tab1').style.display = 'none'
	  document.getElementById('Tab2').style.display = 'block'
	  document.getElementById('Tab3').style.display = 'none'
	  break;
	case 3:
	  document.getElementById('Tab1').style.display = 'none'
	  document.getElementById('Tab2').style.display = 'none'
	  document.getElementById('Tab3').style.display = 'block'
	  break;
  }
}


function runchecks() {
  if (player.MagmaUnlocked === 0 && player.Stone >= 25) {player.MagmaUnlocked = 1}
  if (player.MagmaUnlocked === 0) {document.getElementById("MagmaTab").style.display = 'none'} else {document.getElementById("MagmaTab").style.display = 'inline'}
	
  if (player.CSU === 0 && player.Stone >= 5000) {player.CSU = 1}
  if (player.CSU === 0) {document.getElementById("CSinfo").style.display = 'none'} else {document.getElementById("CSinfo").style.display = 'inline'}

	if (player.MTU === 0 && player.Stone >= 15000 && player.Magma >= 10) {player.MTU = 1}
	if (player.MTU === 0) {document.getElementById("TierTab").style.display = 'none'} else {document.getElementById("TierTab").style.display = 'inline'}

	if (player.LavaUnlocked === 0 && player.MineTier >= 3 && player.MagmaUnlocked === 1) {player.LavaUnlocked = 1}
	if (player.LavaUnlocked === 0) {document.getElementById("LavaTab").style.display = 'none'} else {document.getElementById("LavaTab").style.display = 'inline'}





	if (player.MagmaUnlocked === 1) {document.getElementById("InfoMagma").style.display = 'block'} else {document.getElementById("InfoMagma").style.display = 'none'}
	if (player.CSU === 1) {document.getElementById("InfoCstone").style.display = 'block'} else {document.getElementById("InfoCStone").style.display = 'none'}
	if (player.MTU === 1) {document.getElementById("InfoMT").style.display = 'block'} else {document.getElementById("InfoMT").style.display = 'none'}
	if (player.LavaUnlocked === 1) {document.getElementById("InfoLava").style.display = 'block'} else {document.getElementById("InfoLava").style.display = 'none'}
}

function buystonebuyable(n) {
	if (n === 1) {
		if (player.Stone >= player.SB.Uno.Cost) {
		  player.SB.Uno.Amount += 1
		  player.Stone -= player.SB.Uno.Cost
		}
	}
	else if (n === 2) {
        if (player.Stone >= player.SB.Dos.Cost && player.SB.Dos.Amount < 9) {
		  player.SB.Dos.Amount += 1
		  player.Stone -= player.SB.Dos.Cost
		}
	}
	else if (n === 3) {
		if (player.Stone >= player.SB.Tres.Cost) {
		  player.SB.Tres.Amount += 1
		  player.Stone -= player.SB.Tres.Cost
		}
	}
	else if (n === 4) {
		if (player.Stone >= player.SB.Quatro.Cost && player.SB.Quatro.Amount < 5) {
		  player.SB.Quatro.Amount += 1
		  player.Stone -= player.SB.Quatro.Cost
		}
	}
}

function update() {


	
  switch (player.MineTier) {
	case 0:
	  player.StMlt.MT = 1
	  player.MgMlt.MT = 1
	  player.CSMlt.MT = 1
	  player.MTR = "50K stone and 20 magma"
	  document.getElementById("MT0").style.display = 'inline'
	  document.getElementById("MT1").style.display = 'none'
	  document.getElementById("MT2").style.display = 'none'
	  document.getElementById("MT3").style.display = 'none'
	  document.getElementById('MT1SU').style.display = 'none'
	  document.getElementById('MT2SU').style.display = 'none'
	  break;
	case 1:
	  player.StMlt.MT = 10
	  player.MgMlt.MT = 2
	  player.CSMlt.MT = 1
	  player.MTR = "100M stone and 1K magma"
	  document.getElementById("MT0").style.display = 'none'
	  document.getElementById("MT1").style.display = 'inline'
	  document.getElementById("MT2").style.display = 'none'
	  document.getElementById("MT3").style.display = 'none'
	  document.getElementById('MT1SU').style.display = 'block'
   	  document.getElementById('MT2SU').style.display = 'none'
	  break;
    case 2:
	  player.StMlt.MT = 100
	  player.MgMlt.MT = 5
	  player.CSMlt.MT = 2
	  player.MTR = "100B stone and 1M magma"
	  document.getElementById("MT0").style.display = 'none'
	  document.getElementById("MT1").style.display = 'none'
	  document.getElementById("MT2").style.display = 'inline'
	  document.getElementById("MT3").style.display = 'none'
	  document.getElementById('MT1SU').style.display = 'block'
	  document.getElementById('MT2SU').style.display = 'block'
	  break;
    case 3:
	  player.StMlt.MT = 1000
	  player.MgMlt.MT = 25
	  player.CSMlt.MT = 4
	  player.MTR = "Not defined yet"
	  document.getElementById("MT0").style.display = 'none'
	  document.getElementById("MT1").style.display = 'none'
	  document.getElementById("MT2").style.display = 'none'
	  document.getElementById("MT3").style.display = 'inline'
	  document.getElementById('MT1SU').style.display = 'block'
	  document.getElementById('MT2SU').style.display = 'block'
	  break;
	

  }


	
  player.StMlt.Magma = (Math.log(player.Magma + 1)**2)+1
  player.StMlt.CStone = (Math.log(player.CStone + 1))+1
  
  player.CSG = Math.floor((player.Stone/player.CSMlt.Req)*player.CSMlt.Total)
  if (player.Stone >= 100) {player.MagmaToGain = Math.floor((Math.sqrt(player.Stone/100))*player.MgMlt.Total)} else {player.MagmaToGain = 0}
	
  player.SB.Uno.Cost = 10*(1.5**player.SB.Uno.Amount)
  player.StMlt.SBUno = 1 + player.SB.Uno.Amount
  player.SB.Dos.Cost = 5000*(2**player.SB.Dos.Amount)
  player.CSMlt.SBDos = 1000 * player.SB.Dos.Amount
  player.SB.Tres.Cost = 500*(1.5**player.SB.Tres.Amount)
  player.MgMlt.SBTres = 1 + (player.SB.Tres.Amount/10)
  player.SB.Quatro.Cost = 50000*(5**player.SB.Quatro.Amount)
  player.AuMlt.SBQuatro = 2 ** player.SB.Quatro.Amount


  player.StMlt.Total = player.StMlt.Magma * player.StMlt.CStone * player.StMlt.MT * gamepower * player.StMlt.SBUno * player.StMlt.LvMlt
  player.MgMlt.Total = player.MgMlt.MT * gamepower * player.MgMlt.SBTres * player.MgMlt.LvMlt
  player.CSMlt.Total = player.CSMlt.MT * gamepower
  player.CSMlt.Req = 10000 - player.CSMlt.SBDos
  player.AuMlt.Rate = player.AuMlt.SBQuatro
  player.StMlt.LvMlt = ((Math.log(player.Lava+1))**2)+1
  player.MgMlt.LvMlt = Math.log(player.Lava+1)+1
  player.MgMlt.MPSP = Math.log(player.Lava+1)/10

  if (player.LavaUnlocked === 1) {player.Magma += (player.MagmaToGain * player.MgMlt.MPSP / 100)}


	
  Au += updateinterval
  if (Au >= ((32*updateinterval)/player.AuMlt.Rate) && player.MineTier >= 2) {
	player.SPS += player.StMlt.Total
	Au = 1
  }
	

	

	

document.addEventListener('keydown', function(event) {
  if (event.shiftKey) {
    document.getElementById("Hshift1").style.display = 'none'
	document.getElementById("Hshift2").style.display = 'none'
	document.getElementById("Hshift3").style.display = 'none'
	document.getElementById("Hshift4").style.display = 'none'
	document.getElementById("Sshift1").style.display = 'inline'
	document.getElementById("Sshift2").style.display = 'inline'
	document.getElementById("Sshift3").style.display = 'inline'
	document.getElementById("Sshift4").style.display = 'inline'
  } else if (event.ctrlKey) {
    document.getElementById("Sshift1").style.display = 'none'
	document.getElementById("Sshift2").style.display = 'none'
	document.getElementById("Sshift3").style.display = 'none'
	document.getElementById("Sshift4").style.display = 'none'
	document.getElementById("Hshift1").style.display = 'inline'
	document.getElementById("Hshift2").style.display = 'inline'
	document.getElementById("Hshift3").style.display = 'inline'
	document.getElementById("Hshift4").style.display = 'inline'
  }
});




	if (player.SB.Dos.Amount >= 9) {document.getElementById('Hs2').textContent = 'Max level reached'; document.getElementById('SU2S').style.display = 'none'}
	else {document.getElementById('Hs2').textContent = 'Decrease cost of compressed stone, cost:'; document.getElementById('SU2S').style.display = 'inline'}
	if (player.SB.Quatro.Amount >= 5) {document.getElementById('Hs4').textContent = 'Max level reached'; document.getElementById('SU4S').style.display = 'none'}
	else {document.getElementById('Hs4').textContent = 'Doubles autoclick rate, cost:'; document.getElementById('SU4S').style.display = 'inline'}


  player.LPS = Math.floor(Math.cbrt(player.Magma))


	
  player.Stone += player.SPS/(1000/updateinterval)
  if (player.LavaUnlocked === 1) {player.Lava += player.LPS/(1000/updateinterval)}


  document.getElementById("stone").textContent = fullformat(player.Stone) || "Error stone didn't load"
  document.getElementById("magma").textContent = fullformat(player.Magma) ||"Error magma didn't load"
  document.getElementById("SPS").textContent = fullformat(player.SPS) || "Error SPS didn't load"
  document.getElementById("CStone").textContent = fullformat(player.CStone) ||"Error CStone didn't load"
  document.getElementById("SU1S").textContent = fullformat(player.SB.Uno.Cost) ||"Error SU1 didn't load"
  document.getElementById("SU2S").textContent = fullformat(player.SB.Dos.Cost) ||"Error SU2 didn't load"	
  document.getElementById("SU3S").textContent = fullformat(player.SB.Tres.Cost) ||"Error SU3 didn't load"		
  document.getElementById("MineTier").textContent = fullformat(player.MineTier) || "Error mine tier didn't load"
  document.getElementById("SU4S").textContent = fullformat(player.SB.Quatro.Cost) ||"Error SU4 didn't load"
  document.getElementById("Lava").textContent = fullformat(player.Lava) ||"Error lava didn't load"
  document.getElementById("LPS").textContent = fullformat(player.LPS) ||"Error LPS didn't load"
  document.getElementById("LvStMlt").textContent = "Stone mutliplier: x" + fullformat(player.StMlt.LvMlt) ||"Error LPS didn't load" 
  document.getElementById("LvMgMlt").textContent = "Magma multiplier: x" + fullformat(player.MgMlt.LvMlt) ||"Error LPS didn't load"
  document.getElementById("MPSP").textContent = "Auto magma gain: " + fullformat(player.MgMlt.MPSP) + "%" ||"Error LPS didn't load"		

  
  if (player.MagmaToGain === 0) {document.getElementById("magmareset").textContent = "You need 100 stone to reset" || "Error MagmaGain didn't load"}
  else {document.getElementById("magmareset").textContent = "Reset for " + fullformat(player.MagmaToGain) + " magma" || "Error MagmaGain didn't load"}
  if (player.CSG === 0) {document.getElementById("CSbtn").textContent = "You need " + fullformat(player.CSMlt.Req) + " stone to compress stone" || "Error CS didn't load"}
  else {document.getElementById("CSbtn").textContent = "Compress " + fullformat(player.Stone) + " stone into " + fullformat(player.CSG) + " compressed stone"|| "Error CS didn't load"}
  if (player.MineTier === 3) {document.getElementById("tierreset").textContent = "Max tier reached"}
  else if ((player.MineTier === 0 && player.Stone >= 25000 && player.Magma >= 15) || (player.MineTier === 1 && player.Stone >= 1e8 && player.Magma >= 1e3) || (player.MineTier === 2 && player.Stone >= 1e11 && player.Magma >= 1e6)) {document.getElementById("tierreset").textContent ="Reset to increse mine tier"}
  else {document.getElementById("tierreset").textContent = "You need " + player.MTR + " to reset"}

  
  
}

setInterval(update, updateinterval)
setInterval(runchecks, 500)

/*

s

p

a

c

e

r

*/
function abbrev(num) {
  const abbreviationssimple = ["K", "M", "B", "T", "Qa", "Qn", "Sx", "Sp", "Oc", "No"]
  const Complex1 = ["","U","D","T","Qa","Qn","Sx","Sp","O","N"]
  const Complex2 = ["", "Dc", "Vg", "Tg", "Qg", "Qi", "Se", "Sg", "Ot", "Nn",]
  const Complex3 = ["","Ce", "Du", "Tr", "Qu", "Qt", "Sc", "St", "Og", "Ng"]
  if (num < 10) {return(abbreviationssimple[num])}
  else { 
    const var1 = num%10
    const var2 = (Math.floor((num%100)/10))
    const var3 = (Math.floor((num%1000)/100))
    const output = ((Complex1[var1])+(Complex2[var2])+(Complex3[var3]))
    return output
  }

}

var absnum = 0
var tier = 0
var suffex = 0
var scaled = 0
var roundedscaled = 0

function formatnumber(num) {
    absnum = Math.abs(num)
    if (absnum < 1000) {return num.toString()}
    tier = (Math.floor(Math.log10(absnum)/3)-1)
    suffex = abbrev(tier) || ''
    scaled = (num/(10**(3*tier+3)))
    switch(Math.floor(Math.log10(Math.abs(scaled)))) {
        case 0: 
            roundedscaled = (Math.round(100*scaled))/100
            break;
        case 1:
            roundedscaled = (Math.round(10*scaled))/10
            break;
        case 2:
            roundedscaled = Math.round(scaled)
            break;
        default:
            console.log('switch is broken')
            console.log(Math.round(Math.log10(scaled)))
            console.log(scaled)
    }
    return roundedscaled+suffex
}


function fullformat(num) {
	if (Number(num) < 1000) {return round2(Number(num))} else {return formatnumber(Number(num))}
}


