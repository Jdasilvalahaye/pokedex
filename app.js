// Elements du côté front :
let button = document.getElementById("button");
let mainImage = document.getElementById("main-image");
let pokeNumber = document.getElementById("number");
let pokeName = document.getElementById("name");
let pokeType1 = document.getElementById("type1");
let imgPokeType1 = document.getElementById("img_type1");
let pokeType2 = document.getElementById("type2");
let imgPokeType2 = document.getElementById("img_type2");
let pokeDescription = document.getElementById("Pkm_description");
// Elements du côté back :
let stats_hp = document.getElementById("stats_hp");
let stats_attack = document.getElementById("stats_attack");
let stats_defense = document.getElementById("stats_defense");
let stats_special_attk = document.getElementById("stats_special_attk");
let stats_special_def = document.getElementById("stats_special_def");
let stats_speed = document.getElementById("stats_speed");
let frontSprite = document.getElementById("front-sprite");
let backSprite = document.getElementById("back-sprite");

// C'est dans cette fonction changePokemon qu'on va faire un call API
const changePokemon = async () => {
  // générer un nombre aléatoire.
  let randomNumber = Math.ceil(Math.random() * 800) + 1;

  // On génère dynamiquement notre URL entre `` pour utiliser randomNumber
  let requestPkm = `https://pokebuildapi.fr/api/v1/pokemon/${randomNumber}`;
  let requestPkmSprite = `https://pokeapi.co/api/v2/pokemon/${randomNumber}`;
  let resquestPkmOther = `https://pokeapi.co/api/v2/pokemon-species/${randomNumber}`;

  // La fonction fetch sert à faire une requête. Elle va chercher la réponse et la renvoyer. On stock la réponse (request) dans une var (data).
  // On a du code asynchrnone (qui va mettre un temps de réponse non predictible (plus ou moins long)). Donc on veut attendre le fetch avant de consolelog
  let dataPkm = await fetch(requestPkm);
  let dataPkmSprite = await fetch(requestPkmSprite);
  let dataPkmOther = await fetch(resquestPkmOther);

  // On converti le resultat de la réponse en JSON pour qu'il soit lisible
  let responsePkm = await dataPkm.json();
  console.log(responsePkm);
  let responsePkmSprite = await dataPkmSprite.json();
  console.log(responsePkmSprite);
  let responsePkmOther = await dataPkmOther.json();
  console.log(responsePkmOther);

  // L'API pokeapi species propose plusieurs descriptions dans plusieurs langues.
  // On ne sait jamais à l'avance la position des langues. Donc on va récupérer toutes les descriptions fr et sortir la première
  // La description est beaucoup trop longue. Du coup on isole 1 description (via un .)
  let frenchDescription = [];
  for (let i = 0; i < responsePkmOther.flavor_text_entries.length; i++) {
    if (responsePkmOther.flavor_text_entries[i].language.name == "fr") {
      frenchDescription.push(responsePkmOther.flavor_text_entries[i].flavor_text);
    }
  }
  frenchDescription = frenchDescription[0].slice(".");
  console.log(frenchDescription);

  // On va stocket le ou les types pour pouvoir les réutiliser et les rendre dynamiques (d'ailleurs on peut essayer le dynamique)
  let pokeTypeName = [];
  let pokeTypeImg = [];
  for (let a = 0; a < responsePkm.apiTypes.length; a++) {
    pokeTypeName.push(responsePkm.apiTypes[a].name);
    pokeTypeImg.push(responsePkm.apiTypes[a].image);
  }

  // Ici on charge les img et les infos textes qu'on vient de récupérer via les API

  // Front Side
  mainImage.src = responsePkm.image;
  pokeNumber.textContent = `#${responsePkm.id}`;
  pokeName.textContent = responsePkm.name;
  pokeDescription.textContent = frenchDescription;
  pokeType1.textContent = pokeTypeName[0];
  imgPokeType1.src = pokeTypeImg[0];
  // On doit vider les champs si pas de second type car sinon garde en mémoire celui du pkm précédent
  if (pokeTypeName.length < 2) {
    pokeType2.textContent = "";
    imgPokeType2.src = "./imgReadMe/whitesquare.png";
  } else if (pokeTypeName.length > 1) {
    pokeType2.textContent = pokeTypeName[1];
    imgPokeType2.src = pokeTypeImg[1];
  }

  // Back Side
  stats_hp.textContent = responsePkm.stats.HP;
  stats_attack.textContent = +responsePkm.stats.attack;
  stats_defense.textContent = responsePkm.stats.defense;
  stats_special_attk.textContent = responsePkm.stats.special_attack;
  stats_special_def.textContent = responsePkm.stats.special_defense;
  stats_speed.textContent = responsePkm.stats.speed;
  frontSprite.src = responsePkmSprite.sprites.front_default;
  backSprite.src = responsePkmSprite.sprites.back_default;
};
// Meme si le js ne s'execute pas sur VSC, on appelle la fonction pour qu'il y ait un pkm dès qu'on arrive sur la page
changePokemon();
// On va écouter l'évènement du clic sur le boutton : on prend la var button et .addEventListener("Click").
// Quand on click on appelle la fonction changePokemon qu'on créer plus haut.
button.addEventListener("click", changePokemon);
