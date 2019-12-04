export const INITIALIZE_CARDS_STORE = 'INITIALIZE_CARDS_STORE';

export const initializeCardsStore = card => {
  return {type: INITIALIZE_CARDS_STORE, card};
};
