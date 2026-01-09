import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

/** Ce fichier contient le store pour la gestion du thème dark mode avec Zustand*/ 
export const useThemeStore = create(
  /** Utilisation du middleware persist pour persister le thème dans le localStorage */
  persist(
    /** Fonction pour créer le store */
    (set) => ({
      theme: "light", 
      /** Fonction pour basculer le thème */
      toggleTheme: () => set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })), 
    }),
    /** Options pour le middleware persist */
    {
      /** Nom de la clé pour le localStorage */
      name: "theme-storage",
      /** Stockage dans le localStorage */
      storage: createJSONStorage(() => localStorage),
      /** Options de persistance */
      partialize: (state) => ({ theme: state.theme }),
    },
  )
)

