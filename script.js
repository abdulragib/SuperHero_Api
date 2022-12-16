const SUPERHERO_TOKEN='10223569763528853'
const BASE_URL=`https://superheroapi.com/api.php/${SUPERHERO_TOKEN}`

const getSuperHero = (id) => {
  fetch(`${BASE_URL}/${id}`)
  .then(response => response.json())
  .then(json => {
    //console.log(json)
    console.log(json.powerstats)
   

    const intelligence = `🧠 Intelligence: ${json.powerstats.intelligence}`

    const strength = `💪 Strength: ${json.powerstats.strength}`
     const stats=getStatsHtml(json)
    document.querySelector('#NewHero')
    .innerHTML =
    `<h1>${json.name}</h1>
    <img src="${json.image.url}" width=200
     height=200/>
     <br><br>
     ${stats}`
  })
}

const statToEmoji = {
  intelligence : '🧠',
  strength: '💪',
  speed: '⚡',
  durability: '🏋️‍♀️',
  power: '👊',
  combat: '⚔️'
}

const getStatsHtml = (character) => {
  const stats = Object.keys(character.powerstats).map(stat =>
    {
      return `<p>${statToEmoji[stat]} ${stat.toUpperCase()}: ${character.powerstats[stat]} </p>`
    })

  console.log(stats.join(''))
  return stats.join('')
}

const getSearchSuperHero = (name) => {
  fetch(`${BASE_URL}/search/${name}`)
  .then(response => response.json())
  .then(json => {
    
    const hero= json.results[0]
    const powerStats=hero.powerstats
    //console.log(here)
    console.log(powerStats)
    
    document.querySelector('#NewHero')
    .innerHTML = `<h1>${hero.name}</h1>
    <img src="${hero.image.url}" width=200
     height=200/>`
  })
}

const GetNewHero = document.getElementById('New')
const searchInput = document.getElementById('searchInput')
const searchButton=document.getElementById('searchButton')

searchButton.onclick = () => getSearchSuperHero(searchInput.value)

GetNewHero.onclick= () => getSuperHero(Math.ceil(Math.random() * 731))
