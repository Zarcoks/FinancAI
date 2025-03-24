TODO:
Vérifier la qualité du code et faire des tests

Pour lancer le code:
> node test

Pour faire varier certaines variables, le guide est ici:
1. Varier le nombre d'entraînement: /test.js --> env.loop(x)
2. Varier l'argent de base donné à l'agent: /test.js --> const env = new EnvirronmentManager(x)
3. Modifier l'importance d'un entrainement dans un algo: /components/Agent/Brain.js --> update()
4. Modifier Epsilon (vitesse d'apprentissage): /components/AgentManager.js --> applySomeDecision()
5. Modifier la portée de la vision de l'agent (= % de variation de l'action): /components/Agent/StateService --> calculateState() --> x