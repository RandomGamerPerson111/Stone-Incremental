export {abbrev, formatnumber, abbreviations}
abbreviations = ['K', 'M', 'B', 'T', 'Qa', 'Qn', 'Sx', 'Sp', 'Oc', 'No', 'Dc','UDc', 'DDc', 'TDc', 'QaDc', 'QnDc', 'SxDc', 'SpDc', 'ODc', 'NDc', 'Vg','UVg', 'DVg', 'TVg', 'QaVg', 'QnVg', 'SxVg', 'SpVg', 'OVg', 'NVg', 'Tg','UTg', 'DTg', 'TTg', 'QaTg', 'QnTg', 'SxTg', 'SpTg', 'OTg', 'NTg', 'Qg','UQg', 'DQg', 'TQg', 'QaQg', 'QnQg', 'SxQg', 'SpQg', 'OQg', 'NQg', 'Qi','UQi', 'DQi', 'TQi', 'QaQi', 'QnQi', 'SxQi', 'SpQi', 'OQi', 'NQi', 'Se','USe', 'DSe', 'TSe', 'QaSe', 'QnSe', 'SxSe', 'SpSe', 'OSe', 'NSe', 'Sg','USg', 'DSg', 'TSg', 'QaSg', 'QnSg', 'SxSg', 'SpSg', 'OSg', 'NSg', 'Og','UOg', 'DOg', 'TOg', 'QaOg', 'QnOg', 'SxOg', 'SpOg', 'OOg', 'NOg', 'Ng','UNg', 'DNg', 'TNg', 'QaNg', 'QnNg', 'SxNg', 'SpNg', 'ONg', 'NNg', 'Ce']
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
