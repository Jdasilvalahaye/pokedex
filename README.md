Première réponse du fetch après await : cf img PokApi response
Le body est illisible il faut le convertir en Json : cf pokApi body illisible
Après conversion on a nos infos : cf pokApi apres conversion JSON
En cours de route on a changé d'API pour utiliser une en français. Je garde ici le détail avec pokeApi car le principe est le même

Ici la version JS basique avec commentaire.
Ensuite on va améliorer l'app.js en ajoutant des éléments :)

```js
// Note : Ca ne sert à rien de lancer le script ici. Le document doit s'executer sur le navigateur. Pour faire mes tests, je dois aller sur la page
// executer mes actions sur la page et examiner la console pour avoir le résultat

// On veut lancer une requête dès qu'on clic sur notre bouton donc première étape, on récupère le bouton :
let button = document.getElementById("button");
// Une fois qu'on a fait notre requête et qu'on a converti en JSON on va savoir quels éléments récupérer
// Les getElement suivant ont été ajouté après avoir fait notre fetch donc (rappel : entre () l'id du html)
let image = document.getElementById("image");
let pokeNumber = document.getElementById("number");
let pokeName = document.getElementById("name");

// C'est dans cette fonction changePokemon qu'on va faire un call API
const changePokemon = async () => {
  // 1 : générer un nombre aléatoire.
  // Math.random donne un chiffre entre 0 et 1 donc on multipli par le nb de pkm possible (ex 151).
  // On l'englobe dans math.ceil pour arrondir à la valeur au dessus, mais on veut exclure le 0, donc on diminue la valeur max de 1 et up la min de 1
  let randomNumber = Math.ceil(Math.random() * 150) + 1;

  // On génère dynamiquement notre URL entre `` pour utiliser randomNumber
  let requestString = `https://pokeapi.co/api/v2/pokemon/${randomNumber}`;

  // La fonction fetch sert à faire une requête. Elle va chercher la réponse et la renvoyer. On stock la réponse (requestString) dans une var data.
  // On a du code asynchrnone (qui va mettre un temps de réponse non predictible (plus ou moins long)). Donc on veut attendre le fetch avant de consolelog
  // Donc on vient d'ajouter await devant le fetch ET async dans notre fonction
  let data = await fetch(requestString);
  console.log(data);

  // On converti le resultat de la réponse en JSON pour qu'il soit lisible
  let response = await data.json();
  console.log(response);

  // Ici on va changer la source de l'image dans notre html. Comme pour hubspot on va faire le nom de la variable (response)
  // Puis . le chemin indiqué sur la console ici sprites.front_default
  image.src = response.sprites.front_default;
  // On fait pareil pour son numéro et son nom. Ici c'est la fonction .textContent en nodeJs qui permet d'afficher le texte sur la page
  // Juste pour son numéro on le rend dynamique pour ajouter du texte avant, ici un #
  pokeNumber.textContent = `#${response.id}`;
  pokeName.textContent = response.name;
};
// Meme si le js ne s'execute pas sur VSC, on appelle la fonction pour qu'il y ait un pkm dès qu'on arrive sur la page
changePokemon();
// On va écouter l'évènement du clic sur le boutton : on prend la var button et .addEventListener("Click").
// Quand on click on appelle la fonction changePokemon qu'on créer plus haut.
button.addEventListener("click", changePokemon);
```

Différence entre padding et margin. En gros le padding c'est à l'intérieur de l'élément
Par exemple sur mon bloc pkm description cf screen
