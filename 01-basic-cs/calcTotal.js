const calcTotal = function (data= []){
  const hats = []
  const Sombreros = {}
  const  Numeros = []
  data.forEach(element => {

    if(element.hats.length > 0){
      element.hats.forEach(hat => {
        hats.push(hat)
      });

    }

  });

    hats.forEach((hat, index, array) => {
      if(Sombreros[hat.id]>0){
        Sombreros[hat.id] = Sombreros[hat.id] + 1

      }else{
        Sombreros[hat.id] = 1
      }

   });

  for (const key in Sombreros) {
    if (Sombreros.hasOwnProperty(key)) {
          Numeros.push(Sombreros[key])
    }
  }

  const numeroOrdenados = Numeros.sort((a,b)=> b - a)
  const ultimosTres = numeroOrdenados.slice(0,3)


  let total = 0 
  ultimosTres.forEach(item => {
    total = total + item
  });

  return total
}

module.exports = calcTotal