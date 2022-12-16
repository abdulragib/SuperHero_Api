const SUPERHERO_TOKEN='10223569763528853'
const BASE_URL=`https://superheroapi.com/api.php/${SUPERHERO_TOKEN}`

const GetNewHero = document.getElementById('New')
const searchInput = document.getElementById('searchInput')
const searchButton=document.getElementById('searchButton')
const display=document.querySelector('#NewHero')

const getSuperHero = (id) => {
  fetch(`${BASE_URL}/${id}`)
  .then(response => response.json())
  .then(json => {
    //console.log(json)
    console.log(json.powerstats)
   

    const intelligence = `🧠 Intelligence: ${json.powerstats.intelligence}`

    const strength = `💪 Strength: ${json.powerstats.strength}`
     const stats=showStatsHtml(json)
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

const getSearchSuperHero = (name) => {
  fetch(`${BASE_URL}/search/${name}`)
  .then(response => response.json())
  .then(json => {
    
    const hero= json.results[0]
    showStatsHtml(hero)
  })
}

const showStatsHtml = (character) => {
    const name=`<h2>${character.name}</h2>`
  
    const img=`<img src="${character.image.url}" height="200" width="200"/>`

  //Object.keys(character.powerstats) use to convert object to array
  const stats = Object.keys(character.powerstats).map(stat =>
    {
      return `<p>${statToEmoji[stat]} ${stat.toUpperCase()}: 
      ${character.powerstats[stat]} </p>`
    }).join('')

display.innerHTML=`${name} ${img} ${stats}`
console.log(stats)
}
    
searchButton.onclick = () => getSearchSuperHero(searchInput.value)

GetNewHero.onclick= () => getSuperHero(Math.ceil(Math.random() * 731))
