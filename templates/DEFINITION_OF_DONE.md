# Definition of Done (DoD)

Une User Story est **terminée** quand :

## ✅ Checklist

### Code
- [ ] Le code est écrit et respecte les conventions du projet
- [ ] Le code est self-documented (noms clairs, commentaires si nécessaire)
- [ ] Pas de console.log / debug code oublié
- [ ] Les TODO sont résolus ou transformés en issues

### Tests
- [ ] Tests unitaires écrits et passent
- [ ] Tests d'intégration écrits (si applicable)
- [ ] Tests manuels effectués sur les critères d'acceptation
- [ ] Pas de régression sur les features existantes

### Review
- [ ] Code review effectuée par au moins 1 autre dev
- [ ] Commentaires de review adressés
- [ ] PR approuvée

### Documentation
- [ ] README mis à jour (si changement d'install/config)
- [ ] API documentée (si nouveau endpoint)
- [ ] Changelog mis à jour

### Déploiement
- [ ] Mergé sur la branche principale
- [ ] Déployé en staging/preview
- [ ] Testé en staging
- [ ] Variables d'environnement ajoutées (si applicable)

### Validation
- [ ] Demo au PO
- [ ] PO valide que les critères d'acceptation sont remplis
- [ ] Déployé en production (ou prêt à l'être)

---

## 🏆 Bonus (Nice to have)

- [ ] Metrics/Analytics ajoutés pour mesurer l'usage
- [ ] Feature flag pour rollout progressif
- [ ] Documentation utilisateur mise à jour
