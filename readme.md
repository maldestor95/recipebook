# About

- [ExpressJS](https://expressjs.com/) server Maldestor95 Application

# developpement

 Gestion des tickets avec [JIRA](https://maldestor95.atlassian.net/secure/RapidBoard.jspa?rapidView=1&projectKey=NODE)
 
## Arborescence
Le répertoire `src` est composé de composants pour le server expressJS ou pour le client VueJS
* src
    * server  
    * client
    * common



## *production*
* `npm run start` démarre le serveur express en production

## *developpement*
* `npm run dev` 

### lancements des tests unitaires
* pour le projet `src/server` il faut lancer le serveur en mode développement avec `npm run dev` 
* `npm run test` `démarre le serveur en mode de test  (base de donnée dynmoDB en local)


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