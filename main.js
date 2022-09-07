const url = "https://pokeapi.co/api/v2/pokemon/"

const lista = document.getElementById("lista")

const atras = document.getElementById("anterior")
var previous = ""

const adelante = document.getElementById("siguiente")
var next = ""


atras.addEventListener('click', () => {
    lista.innerHTML = ""
    obtenerData(previous)
})

adelante.addEventListener('click', () => {
    lista.innerHTML = ""
    obtenerData(next)
})


const obtenerData = async (url) => {
    var datos = []
    datos = await fetch(url)
    var data = await datos.json()
    next = data.next
    previous = data.previous
    var habilidades = ""
    if (previous == undefined) {
        atras.hidden = true
    } else {
        atras.hidden = false
    }

    for (var list of data.results) {
        var result = await fetch(list.url)
        var pok = await result.json()

        for (var h of pok.abilities) {
            habilidades += `<p class="card-text" >${h.ability.name}</p>`
        }
        lista.innerHTML += `
   <div class="card col-12 col-md-3 mx-auto my-3" style="width: 18rem;">
  <img src=${pok.sprites.front_shiny} class="card-img-top" alt=${list.name}>
  <div class="card-body">
    <h5 class="card-title">${list.name}</h5>
    <div class="card-header">
    Habilidades
  </div>
    <ul class="list-group list-group-flush">
    <li class="list-group-item">${habilidades}</li>
  </ul>
  </div>
</div>`
        habilidades = ""
    }
}
obtenerData(url)
{/* <td><img src=${item.sprites.other.official-artwork['front_default']}/></td> */ }
