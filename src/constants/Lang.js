// ES6 module syntax
import LocalizedStrings from 'react-native-localization';

// CommonJS syntax
// let LocalizedStrings  = require ('react-native-localization');

export let strings = new LocalizedStrings({
  
//  "en-US":{
//    how:"How do you want your egg today?",
//    boiledEgg:"Boiled egg",
//    softBoiledEgg:"Soft-boiled egg",
//    choice:"How to choose the egg"
//  },

 //English
 en:{
  hello       : "Hello World!",
    
  nocont      : "No Contacts",
  nocontdata  : "There are no Contacts at this time",
  noinv       : "No Invitation",
  noinvdata   : "There are no Invitation at this time",
  noreq       : "No Request",
  noreqdata   :  "There are no Request at this time"
 },
//Arabic
 ar: {
  hello       : "أهلاً بالعالم",
    
  nocont      : "لا اتصالات",
  nocontdata  : "لا توجد جهات اتصال في هذا الوقت",
  noinv       : "أي دعوة",
  noinvdata   : "لا توجد دعوة في هذا الوقت",
  noreq       : "لا يوجد طلب",
  noreqdata   :  "لا يوجد طلب في هذا الوقت"
 },
//France
 fr: {
  hello       : "Salut le Monde!",
    
  nocont      : "Pas de contacts",
  nocontdata  : "Il n'y a aucun contact pour le moment",
  noinv       : "Aucune invitation",
  noinvdata   : "Il n'y a pas d'invitation en ce moment",
  noreq       : "Pas de requête",
  noreqdata   : "Il n'y a pas de demande en ce moment"
 }
});