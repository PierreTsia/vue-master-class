# vue-master-class

## Project setup

### Créer un projet Vue

- installer `vue-cli` :

```

npm install -g @vue/cli
# OR
yarn global add @vue/cli

```

- créer un projet et ajouter les dépendances, plugins ou autres options de configuration :

Soit depuis le terminal `vue create mon-projet` ou en utilisant le GUI `vue ui`

> **Ressources:** [doc vue cli](https://cli.vuejs.org/)

### Installer Vue Dev Tools

> **Ressources :** [vue dev tools doc](https://github.com/vuejs/vue-devtools)

### Development

```
yarn serve
# OR
npm run serve
```

## Consignes

L'exercice consiste à créer une app très simple qui permet à un utilisateur
de saisir une `note` au format markdown,
de la sauvegarder, de l'afficher sur une page qui liste
l'ensemble des notes sauvegardées, de les trier par catégories...

Voir la demo ici : [exemple](https://sad-dijkstra-6e82e1.netlify.com)

>Dans l'exemple ci-dessus, l'app est cablée à un projet firebase pour persister les données. 
Le but de cet exercice étant de comprendre et appliquer les concepts de base de **Vue.js**, 
il n'est pas utile (en tous cas dans un premier temps) d'aller jusque là. 
On pourra par exemple se contenter du `localStorage` du navigateur pour stocker et récupérer 
les données :
```$xslt
    //stocker un array de notes sous la clé 'notes'
    localStorage.setItem('notes', ['note1', 'note2'])
    
    //recupérer les notes depuis le localStorage
    localStorage.getItem('notes') 
``` 

### Objectifs

- une note doit avoir : un `title`, une `creationDate`, une `description`, une ou plusieurs `categories`, un `content`

- la page d'accueil (`/`) doit afficher une liste de notes (sous forme de cards ou d'un tableau)
  triées par date (les plus récentes en premier)
  en affichant titre, description, date et catégories (mais pas le content)
  
- je dois pouvoir effacer une note en cliquant sur un bouton ou une icone

- lorsque je clique sur une note, je dois pouvoir ouvrir une page avec une url de type
  `/note/IREnHaISIHCgAMkfYaTT` représentant l'`id` de la note
  
- sur la page `/note/IREnHaISIHCgAMkfYaTT` je dois voir l'ensemble du contenu de ma note. Si le `content`
est au format `markdown`, celui-ci doit être 'parsé' pour que le contenu soit interprété par le navigateur comme
du HTML (pour ça, on utilisera une lib comme [marked](https://github.com/markedjs/marked) et la directive `v-html`)
  


- je dois pouvoir cliquer sur un bouton `Add new note` qui ouvre une nouvelle page (`/note/create` par exemple)

- lorsque je crée une nouvelle note ou édite une note déjà existante : mon écran doit être divisé en 2 :
d'un coté les `input`, `textarea`... dans lesquels je peux saisir le contenu de ma note, et de l'autre
une prévisualisation du résultat 


