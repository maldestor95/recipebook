# Maldestor95 Application

## V0.1.1 - 29/05/2020
* Nouveau applet "Cave" et "Boisson" toujours en cours de développement
* Documentation sur deploiement Elastic Beanstalk 
* creation d'un store Vuex pour les authentications

## V0.1.0 - 27/05/2020
* Menu et applet visible dans About.vue géré par vuejs router

# Développement

## méthodologie
 * Gestion des tickets avec [JIRA](https://maldestor95.atlassian.net/secure/RapidBoard.jspa?rapidView=1&projectKey=NODE)
 * utilise le process [Git Flow](https://www.atlassian.com/fr/git/tutorials/comparing-workflows/gitflow-workflow)
   
   <img src="https://wac-cdn.atlassian.com/dam/jcr:a9cea7b7-23c3-41a7-a4e0-affa053d9ea7/04%20(1).svg?cdnVersion=1040" width="800">

 * pour deployer en production, cela se fait avec `EB CLI`d'ElasticBeanStalk dans la branche `master`

## Arborescence
Le répertoire `src` est composé de composants pour le server expressJS ou pour le client VueJS
* src
    * server  
    * client
    * common


## Packages server
* production
    * `npm run start` démarre le serveur express en production
* developpement
    * `npm run dev` 
*  lancements des tests unitaires
    * pour le projet `src/server` il faut lancer le serveur en mode développement avec `npm run dev` 
    * `npm run test` `démarre le serveur en mode de test  (base de donnée dynmoDB en local)

## Packages client
Ce package est principalement constitués de packages vuejs. Les commandes sont:
*  `npm run serve`  => lance vueJS en développement qui compile à la volée. Si besoin d'accès au serveurs, les commandes REST sont redirigées vers le port 3000.
*  `npm run build`  => lance un build
    * après avoir fait un build, il peut être utile de tester localement avec `serve -s dist`    
* le projet Vue peut être aussi revu/mise à jour avec la GUI de Vue  `vue ui`

* [documentation pour creer une feature, voir la](./doc/createfeature.md)

## methode non opérationnelle - A corriger 
Elle permettrait de ne pas commiter le code buildé du client VUEJS lors de l'envoi vers Elastic Beanstalk

A la racine du projet, exécuter `gulp --tasks`pour voir les taches disponible. Parmi elles:
* `gulp clean`  nettoyage du répertoire dist
* `gulp build` préparation du répertoire dist
* `gulp test`  test du build; on démarre un serveur local
* `gulp zip`  Création du ZIP prêt à être déposé sur Elastic Beanstalk


## Installation

### Faire les étapes suivantes si besoin
    
* Installation générale
  * [nodejs](https://nodejs.org/en/)
  * [npm](https://www.npmjs.com/) 
  * [gulp](https://gulpjs.com/)
* une fois le repo copié, executer en ligne de commande `npm install`
* [installer dynamoDB en local](https://docs.aws.amazon.com/fr_fr/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html)
    * copier les credentials IAM (amazon) donnés par l'admin

## Ressources

* [EC2](https://docs.aws.amazon.com/fr_fr/ec2/?id=docs_gateway)
* [dynamoDB](https://docs.aws.amazon.com/fr_fr/dynamodb/?id=docs_gateway)
* [ElasticBeanStalk](https://docs.aws.amazon.com/fr_fr/elastic-beanstalk/?id=docs_gateway)
* [ExpressJS](https://expressjs.com/)
* [serve](https://www.npmjs.com/package/serve)
* [Vuejs](https://vuejs.org/)
* [Vue Router](https://router.vuejs.org/)
* [Vuex](https://vuex.vuejs.org/)
* [Vuetify](https://vuetifyjs.com/en/getting-started/quick-start/)
* [jsdoc-vuejs](https://www.npmjs.com/package/jsdoc-vuejs)
* [jsdoc](https://jsdoc.app/)