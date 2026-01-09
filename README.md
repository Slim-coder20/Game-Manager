# 🎮 Game Manager

Application web complète de gestion de jeux vidéo développée avec React et Express.js. Cette application permet de créer, lire, mettre à jour et supprimer des jeux (CRUD complet) avec une interface utilisateur moderne et responsive, incluant un système de thème sombre/clair.

## 📋 Table des matières

- [Vue d'ensemble](#vue-densemble)
- [Architecture](#architecture)
- [Technologies utilisées](#technologies-utilisées)
- [Structure du projet](#structure-du-projet)
- [Installation](#installation)
- [Utilisation](#utilisation)
- [Fonctionnalités CRUD](#fonctionnalités-crud)
- [React Query (TanStack Query)](#react-query-tanstack-query)
- [Zustand](#zustand)
- [API REST](#api-rest)

## 🎯 Vue d'ensemble

Game Manager est une application de gestion de collection de jeux vidéo permettant aux utilisateurs de :
- ✅ Visualiser tous leurs jeux dans une grille responsive
- ➕ Ajouter de nouveaux jeux à leur collection
- ✏️ Modifier les informations d'un jeu existant
- 🗑️ Supprimer des jeux de leur collection
- 🌙 Basculer entre le mode clair et sombre (thème persistant)

## 🏗️ Architecture

Le projet suit une **architecture client/serveur** séparée :

```
Game-manager/
├── client/          # Frontend React (port 5173)
│   ├── src/
│   │   ├── components/    # Composants réutilisables
│   │   ├── pages/         # Pages de l'application
│   │   ├── store/         # Store Zustand (gestion d'état)
│   │   └── App.jsx        # Point d'entrée de l'app
│   └── package.json
│
└── server/          # Backend Express.js (port 3000)
    ├── index.js     # Serveur Express avec routes API
    ├── fakeDB.js    # Base de données en mémoire
    └── package.json
```

### Communication Client ↔ Serveur

- **Client** : Application React qui consomme l'API REST via `fetch`
- **Serveur** : API Express.js qui expose des endpoints REST
- **Communication** : HTTP/JSON avec CORS activé pour permettre les requêtes cross-origin

## 🛠️ Technologies utilisées

### Frontend (Client)
- **React 19.1.0** : Bibliothèque UI
- **React Router DOM 7.12.0** : Routage côté client
- **Vite 6.3.5** : Build tool et serveur de développement
- **@tanstack/react-query 5.90.16** : Gestion des requêtes serveur et cache
- **Zustand 5.0.9** : Gestion d'état globale légère
- **React Hook Form 7.70.0** : Gestion des formulaires
- **CSS3** : Styles avec variables CSS pour les thèmes

### Backend (Serveur)
- **Express.js 5.2.1** : Framework web Node.js
- **CORS 2.8.5** : Middleware pour les requêtes cross-origin
- **Nodemon 3.1.11** : Auto-reload en développement

## 📁 Structure du projet

```
client/src/
├── components/
│   ├── GameList.jsx      # Composant affichant la liste des jeux
│   └── Navbar.jsx        # Barre de navigation avec toggle de thème
├── pages/
│   ├── Home.jsx          # Page d'accueil (liste des jeux)
│   ├── CreateGame.jsx    # Formulaire de création de jeu
│   ├── UpdateGame.jsx    # Formulaire de modification de jeu
│   └── NotFound.jsx      # Page 404
├── store/
│   └── useThemeStore.js  # Store Zustand pour le thème dark/light
├── App.jsx               # Composant racine avec routing
├── App.css               # Styles globaux et thèmes
└── main.jsx              # Point d'entrée React avec providers

server/
├── index.js              # Serveur Express avec toutes les routes API
└── fakeDB.js             # Base de données en mémoire (array de jeux)
```

## 🚀 Installation

### Prérequis
- Node.js (version 16 ou supérieure)
- npm ou yarn

### Étapes d'installation

1. **Cloner le dépôt**
```bash
git clone <url-du-repo>
cd Game-manager
```

2. **Installer les dépendances du serveur**
```bash
cd server
npm install
```

3. **Installer les dépendances du client**
```bash
cd ../client
npm install
```

## 💻 Utilisation

### Démarrage du serveur (Backend)

```bash
cd server
npm run dev
```

Le serveur démarre sur `http://localhost:3000`

### Démarrage du client (Frontend)

```bash
cd client
npm run dev
```

L'application s'ouvre sur `http://localhost:5173`

> ⚠️ **Important** : Le serveur doit être démarré avant le client pour que les requêtes API fonctionnent.

## 📝 Fonctionnalités CRUD

### Create (Créer) - `POST /api/games`

**Endpoint** : `POST http://localhost:3000/api/games`

**Body** :
```json
{
  "name": "Nom du jeu",
  "platform": "PC",
  "genre": "Action"
}
```

**Implémentation** :
- Page : `CreateGame.jsx`
- Utilise `useMutation` de React Query
- Redirection automatique vers la page d'accueil après création
- Invalidation du cache pour rafraîchir la liste

### Read (Lire) - `GET /api/games` et `GET /api/games/:id`

**Endpoints** :
- `GET http://localhost:3000/api/games` : Liste tous les jeux
- `GET http://localhost:3000/api/games/:id` : Récupère un jeu par ID

**Implémentation** :
- Page : `Home.jsx` (liste) et `UpdateGame.jsx` (détail)
- Utilise `useQuery` de React Query avec mise en cache automatique
- Gestion des états de chargement et d'erreur

### Update (Mettre à jour) - `PUT /api/games/:id`

**Endpoint** : `PUT http://localhost:3000/api/games/:id`

**Body** :
```json
{
  "name": "Nouveau nom",
  "platform": "Xbox",
  "genre": "Shooter"
}
```

**Implémentation** :
- Page : `UpdateGame.jsx`
- Utilise `useMutation` de React Query
- Pré-remplissage du formulaire avec les données existantes
- Protection contre l'écrasement de propriétés avec `undefined`
- Redirection automatique après mise à jour

### Delete (Supprimer) - `DELETE /api/games/:id`

**Endpoint** : `DELETE http://localhost:3000/api/games/:id`

**Implémentation** :
- Composant : `GameList.jsx`
- Utilise `useMutation` de React Query
- Confirmation avant suppression (window.confirm)
- Invalidation automatique du cache après suppression

## 🔄 React Query (TanStack Query)

React Query est utilisé pour **gérer toutes les interactions avec le serveur** et le **cache des données**.

### Configuration

Dans `main.jsx` :
```javascript
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
```

### Utilisation de `useQuery` (Lecture)

**Exemple dans `Home.jsx`** :
```javascript
const { data, isLoading } = useQuery({
  queryKey: ["games"],
  queryFn: fetchGames,
});
```

**Avantages** :
- ✅ Cache automatique des données
- ✅ Gestion automatique de l'état de chargement
- ✅ Gestion automatique des erreurs
- ✅ Re-fetch automatique en cas de perte de focus
- ✅ Déduplication des requêtes

### Utilisation de `useMutation` (Écriture)

**Exemple dans `CreateGame.jsx`** :
```javascript
const { mutate, isPending, isError, error } = useMutation({
  mutationFn: createGame,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["games"] });
    navigate("/");
  },
  onError: (error) => {
    console.error("Erreur:", error);
  },
});
```

**Avantages** :
- ✅ Gestion des états `isPending`, `isError`
- ✅ Callbacks `onSuccess` et `onError`
- ✅ Invalidation automatique des caches liés
- ✅ Optimistic updates possibles

### Invalidation de cache

Après chaque mutation (create, update, delete), le cache est invalidé pour rafraîchir automatiquement les données :

```javascript
queryClient.invalidateQueries({ queryKey: ["games"] });
```

### Query Keys

- `["games"]` : Liste de tous les jeux
- `["game", id]` : Détails d'un jeu spécifique

## 🐻 Zustand

Zustand est utilisé pour la **gestion d'état globale légère**, spécifiquement pour le **thème dark/light**.

### Store du thème (`useThemeStore.js`)

```javascript
export const useThemeStore = create(
  persist(
    (set) => ({
      theme: "light",
      toggleTheme: () => set((state) => ({ 
        theme: state.theme === "light" ? "dark" : "light" 
      })),
    }),
    {
      name: "theme-storage",
      storage: createJSONStorage(() => localStorage),
    },
  )
);
```

### Fonctionnalités

1. **État global** : Le thème est accessible depuis n'importe quel composant
2. **Persistance** : Le thème est sauvegardé dans le `localStorage` grâce au middleware `persist`
3. **Simplicité** : API minimale et intuitive

### Utilisation dans les composants

**Dans `Navbar.jsx`** :
```javascript
const { theme, toggleTheme } = useThemeStore();
const isDarkMode = theme === "dark";
```

**Dans `App.jsx`** :
```javascript
const { theme } = useThemeStore();

useEffect(() => {
  document.documentElement.classList.remove("light-mode", "dark-mode");
  document.documentElement.classList.add(`${theme}-mode`);
}, [theme]);
```

### Pourquoi Zustand au lieu de Context API ?

- ✅ **Plus léger** : Pas de provider wrapper nécessaire
- ✅ **Plus simple** : Moins de boilerplate
- ✅ **Performant** : Re-render seulement des composants qui utilisent le store
- ✅ **Middleware** : Support natif pour la persistance (localStorage)

## 🌐 API REST

### Base URL
```
http://localhost:3000/api
```

### Endpoints disponibles

| Méthode | Endpoint | Description | Body |
|---------|----------|-------------|------|
| `GET` | `/games` | Récupère tous les jeux | - |
| `GET` | `/games/:id` | Récupère un jeu par ID | - |
| `POST` | `/games` | Crée un nouveau jeu | `{ name, platform, genre }` |
| `PUT` | `/games/:id` | Met à jour un jeu | `{ name, platform, genre }` |
| `DELETE` | `/games/:id` | Supprime un jeu | - |

### Exemple de réponse

**GET /api/games** :
```json
[
  {
    "id": 1,
    "name": "The Legend of Zelda: Breath of the Wild",
    "platform": "Nintendo Switch",
    "genre": "Action-Adventure"
  },
  {
    "id": 2,
    "name": "Elden Ring",
    "platform": "PC",
    "genre": "Action RPG"
  }
]
```

### Gestion des erreurs

Toutes les routes renvoient des erreurs JSON standardisées :
```json
{
  "message": "Game not found"
}
```

## 🎨 Système de thème

Le projet utilise des **variables CSS** pour gérer les thèmes clair et sombre :

```css
:root {
  --color-bg: #ffffff;
  --color-text: #333333;
  --color-accent: #0cc669;
  --color-card: transparent;
}

.dark-mode {
  --color-bg: #080808;
  --color-text: #c2c1c9;
  --color-card: transparent;
}
```

Le thème est appliqué dynamiquement via JavaScript en ajoutant/retirant la classe `dark-mode` sur l'élément `<html>`.

## 🚧 Améliorations futures possibles

- [ ] Connexion à une vraie base de données (MongoDB, PostgreSQL)
- [ ] Authentification utilisateur
- [ ] Recherche et filtres (par plateforme, genre)
- [ ] Pagination pour les grandes listes
- [ ] Upload d'images pour les jeux
- [ ] Système de favoris
- [ ] Notes/évaluations des jeux

## 📄 Licence

Ce projet est un projet éducatif.

## 👨‍💻 Auteur

Développé dans le cadre d'une formation React.

---

**Note** : Ce projet utilise une base de données en mémoire (`fakeDB.js`). Les données sont perdues lors du redémarrage du serveur. Pour une utilisation en production, connectez-vous à une vraie base de données.

