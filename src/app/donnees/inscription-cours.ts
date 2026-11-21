export interface InscriptionCours {
  id: number;
  utilisateur: string;
  coursId: number;
  nom: string;
  email: string;
  niveau: string;
  date: string;
}

export type NouvelleInscription =
  Omit<InscriptionCours, 'id' | 'utilisateur'>;