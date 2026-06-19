import type { Language } from "../types/caseTypes";

// UI label dictionary. English is the source of truth and must be complete.
// Italian and Albanian may be partial — missing keys fall back to English.

export type UIKey =
  | "appName"
  | "tagline"
  | "start"
  | "language"
  | "startInvestigation"
  | "continue"
  | "continueToArchive"
  | "loading"
  | "loadError"
  | "home"
  | "archive"
  | "chapters"
  | "timeline"
  | "suspects"
  | "finalAccusation"
  | "objective"
  | "progress"
  | "evidenceViewed"
  | "recommendedFirstRead"
  | "briefingTitle"
  | "briefingIntro"
  | "search"
  | "searchPlaceholder"
  | "filterCategory"
  | "filterChapter"
  | "filterStatus"
  | "allCategories"
  | "allChapters"
  | "all"
  | "viewed"
  | "notViewed"
  | "noResults"
  | "backToArchive"
  | "backToHome"
  | "back"
  | "openEvidence"
  | "viewedBadge"
  | "category"
  | "chapter"
  | "openPdfNewTab"
  | "openImageNewTab"
  | "openLinkNewTab"
  | "downloadFile"
  | "transcript"
  | "reliability"
  | "confirmed"
  | "probable"
  | "disputed"
  | "role"
  | "origin"
  | "motive"
  | "declaredAlibi"
  | "evidenceFor"
  | "evidenceAgainst"
  | "statusWitness"
  | "statusSuspect"
  | "statusStrongSuspect"
  | "locked"
  | "unlocked"
  | "enterPassword"
  | "passwordPlaceholder"
  | "unlock"
  | "wrongPassword"
  | "hint"
  | "chapterObjective"
  | "discussionQuestion"
  | "unlocksNext"
  | "finalLocked"
  | "finalLockedHelp"
  | "finalUnlockPassword"
  | "submitAccusation"
  | "yourAccusation"
  | "selectSuspect"
  | "answerSaved"
  | "editAnswer"
  | "viewSolution"
  | "solutionWarning"
  | "caseSolved"
  | "wrongAccusation"
  | "showSolution"
  | "contrastNormal"
  | "contrastHigh"
  | "contrastInverted"
  | "contrast"
  | "resetProgress"
  | "resetConfirm"
  | "confidence"
  | "low"
  | "medium"
  | "high"
  | "evidenceInChapter"
  | "relatedSuspects"
  | "importance"
  | "chapterLocked"
  | "chapterLockedHelp"
  | "attachments"
  | "openAttachment"
  | "suspectDetailsLocked";

type Dictionary = Record<UIKey, string>;

const en: Dictionary = {
  appName: "Detective for a Day",
  tagline: "Read the evidence. Trust the mosaic, not a single clue.",
  start: "Start",
  language: "Language",
  startInvestigation: "Start the investigation",
  continue: "Continue",
  continueToArchive: "Continue to the case",
  loading: "Loading the case…",
  loadError: "The case could not be loaded. Please refresh the page.",
  home: "Home",
  archive: "Evidence",
  chapters: "Chapters",
  timeline: "Timeline",
  suspects: "Suspects",
  finalAccusation: "Final Accusation",
  objective: "Objective",
  progress: "Progress",
  evidenceViewed: "Evidence viewed",
  recommendedFirstRead: "Recommended first read",
  briefingTitle: "Confidential Briefing",
  briefingIntro:
    "Before you open the archive, read the message from the police liaison office.",
  search: "Search",
  searchPlaceholder: "Search evidence…",
  filterCategory: "Category",
  filterChapter: "Chapter",
  filterStatus: "Status",
  allCategories: "All categories",
  allChapters: "All chapters",
  all: "All",
  viewed: "Viewed",
  notViewed: "Not viewed",
  noResults: "No evidence matches your filters.",
  backToArchive: "Back to evidence",
  backToHome: "Back to home",
  back: "Back",
  openEvidence: "Open",
  viewedBadge: "Viewed",
  category: "Category",
  chapter: "Chapter",
  openPdfNewTab: "Open PDF in new tab",
  openImageNewTab: "Open image in new tab",
  openLinkNewTab: "Open link in new tab",
  downloadFile: "Download file",
  transcript: "Transcript",
  reliability: "Reliability",
  confirmed: "Confirmed",
  probable: "Probable",
  disputed: "Disputed",
  role: "Role",
  origin: "Origin",
  motive: "Possible motive",
  declaredAlibi: "Declared alibi",
  evidenceFor: "Points in their favour",
  evidenceAgainst: "Points against them",
  statusWitness: "Witness",
  statusSuspect: "Person of interest",
  statusStrongSuspect: "Strong suspect",
  locked: "Locked",
  unlocked: "Unlocked",
  enterPassword: "Enter the password to unlock the next chapter",
  passwordPlaceholder: "Password…",
  unlock: "Unlock",
  wrongPassword: "That is not the right answer. Keep reading the evidence.",
  hint: "Hint",
  chapterObjective: "Your objective",
  discussionQuestion: "Discuss as a team",
  unlocksNext: "Solve this to unlock the next chapter.",
  finalLocked: "The final accusation box is locked",
  finalLockedHelp:
    "Work through all four chapters. The final password is hidden in the last chapter's evidence.",
  finalUnlockPassword: "Enter the final password",
  submitAccusation: "Submit accusation",
  yourAccusation: "Your accusation",
  selectSuspect: "Select a suspect…",
  answerSaved: "Your accusation has been recorded on this device.",
  editAnswer: "Edit my answer",
  viewSolution: "Reveal the solution",
  solutionWarning:
    "Only open this once your team has finished the investigation.",
  caseSolved: "Case solved",
  wrongAccusation: "Wrong accusation",
  showSolution: "Show the full solution",
  contrastNormal: "Normal",
  contrastHigh: "High contrast",
  contrastInverted: "Inverted",
  contrast: "Contrast",
  resetProgress: "Reset progress",
  resetConfirm:
    "Reset all local progress on this device (viewed evidence, unlocked chapters, final answer)?",
  confidence: "Confidence",
  low: "Low",
  medium: "Medium",
  high: "High",
  evidenceInChapter: "Evidence in this chapter",
  relatedSuspects: "Related suspects",
  importance: "Importance",
  chapterLocked: "This chapter is locked",
  chapterLockedHelp:
    "Answer the question from the previous chapter's evidence to unlock it.",
  attachments: "Attachments",
  openAttachment: "Open attachment",
  suspectDetailsLocked:
    "More points for and against this person become available as you unlock later chapters.",
};

const it: Partial<Dictionary> = {
  appName: "Detective for a Day",
  tagline: "Leggi le prove. Fidati del mosaico, non di un singolo indizio.",
  start: "Inizia",
  language: "Lingua",
  startInvestigation: "Inizia l'indagine",
  continue: "Continua",
  continueToArchive: "Continua al caso",
  loading: "Caricamento del caso…",
  loadError: "Impossibile caricare il caso. Aggiorna la pagina.",
  home: "Home",
  archive: "Prove",
  chapters: "Capitoli",
  timeline: "Timeline",
  suspects: "Sospetti",
  finalAccusation: "Accusa finale",
  objective: "Obiettivo",
  progress: "Avanzamento",
  evidenceViewed: "Prove viste",
  recommendedFirstRead: "Da leggere per primo",
  briefingTitle: "Briefing riservato",
  briefingIntro:
    "Prima di aprire l'archivio, leggi il messaggio dell'ufficio di collegamento della polizia.",
  search: "Cerca",
  searchPlaceholder: "Cerca tra le prove…",
  filterCategory: "Categoria",
  filterChapter: "Capitolo",
  filterStatus: "Stato",
  allCategories: "Tutte le categorie",
  allChapters: "Tutti i capitoli",
  all: "Tutte",
  viewed: "Viste",
  notViewed: "Non viste",
  noResults: "Nessuna prova corrisponde ai filtri.",
  backToArchive: "Torna alle prove",
  backToHome: "Torna alla home",
  back: "Indietro",
  openEvidence: "Apri",
  viewedBadge: "Vista",
  category: "Categoria",
  chapter: "Capitolo",
  openPdfNewTab: "Apri il PDF in una nuova scheda",
  openImageNewTab: "Apri l'immagine in una nuova scheda",
  openLinkNewTab: "Apri il link in una nuova scheda",
  downloadFile: "Scarica il file",
  transcript: "Trascrizione",
  reliability: "Affidabilità",
  confirmed: "Confermato",
  probable: "Probabile",
  disputed: "Contestato",
  role: "Ruolo",
  origin: "Provenienza",
  motive: "Possibile movente",
  declaredAlibi: "Alibi dichiarato",
  evidenceFor: "Elementi a favore",
  evidenceAgainst: "Elementi contro",
  statusWitness: "Testimone",
  statusSuspect: "Persona di interesse",
  statusStrongSuspect: "Sospetto forte",
  locked: "Bloccato",
  unlocked: "Sbloccato",
  enterPassword: "Inserisci la password per sbloccare il capitolo successivo",
  passwordPlaceholder: "Password…",
  unlock: "Sblocca",
  wrongPassword: "Non è la risposta giusta. Continua a leggere le prove.",
  hint: "Indizio",
  chapterObjective: "Il tuo obiettivo",
  discussionQuestion: "Discutete in squadra",
  unlocksNext: "Risolvi questo enigma per sbloccare il capitolo successivo.",
  finalLocked: "Il box dell'accusa finale è bloccato",
  finalLockedHelp:
    "Completa tutti e quattro i capitoli. La password finale è nascosta nelle prove dell'ultimo capitolo.",
  finalUnlockPassword: "Inserisci la password finale",
  submitAccusation: "Invia l'accusa",
  yourAccusation: "La tua accusa",
  selectSuspect: "Seleziona un sospetto…",
  answerSaved: "La tua accusa è stata registrata su questo dispositivo.",
  editAnswer: "Modifica la risposta",
  viewSolution: "Rivela la soluzione",
  solutionWarning:
    "Apri solo quando la squadra ha terminato l'indagine.",
  caseSolved: "Caso risolto",
  wrongAccusation: "Accusa errata",
  showSolution: "Mostra la soluzione completa",
  contrastNormal: "Normale",
  contrastHigh: "Alto contrasto",
  contrastInverted: "Invertito",
  contrast: "Contrasto",
  resetProgress: "Azzera i progressi",
  resetConfirm:
    "Azzerare tutti i progressi locali su questo dispositivo (prove viste, capitoli sbloccati, accusa finale)?",
  confidence: "Confidenza",
  low: "Bassa",
  medium: "Media",
  high: "Alta",
  evidenceInChapter: "Prove di questo capitolo",
  relatedSuspects: "Sospetti collegati",
  importance: "Importanza",
  chapterLocked: "Questo capitolo è bloccato",
  chapterLockedHelp:
    "Rispondi alla domanda partendo dalle prove del capitolo precedente per sbloccarlo.",
  attachments: "Allegati",
  openAttachment: "Apri allegato",
  suspectDetailsLocked:
    "Altri elementi a favore e contro questa persona si sbloccano man mano che avanzi nei capitoli.",
};

const sq: Partial<Dictionary> = {
  appName: "Detective for a Day",
  tagline: "Lexo provat. Beso mozaikun, jo një gjurmë të vetme.",
  start: "Fillo",
  language: "Gjuha",
  startInvestigation: "Fillo hetimin",
  continue: "Vazhdo",
  continueToArchive: "Vazhdo te rasti",
  loading: "Po ngarkohet rasti…",
  loadError: "Rasti nuk u ngarkua dot. Të lutem rifresko faqen.",
  home: "Ballina",
  archive: "Provat",
  chapters: "Kapitujt",
  timeline: "Kronologjia",
  suspects: "Të dyshuarit",
  finalAccusation: "Akuza përfundimtare",
  objective: "Objektivi",
  progress: "Përparimi",
  evidenceViewed: "Prova të para",
  recommendedFirstRead: "Lexo së pari",
  briefingTitle: "Brifing konfidencial",
  briefingIntro:
    "Para se të hapësh arkivin, lexo mesazhin nga zyra ndërlidhëse e policisë.",
  search: "Kërko",
  searchPlaceholder: "Kërko në prova…",
  filterCategory: "Kategoria",
  filterChapter: "Kapitulli",
  filterStatus: "Statusi",
  allCategories: "Të gjitha kategoritë",
  allChapters: "Të gjithë kapitujt",
  all: "Të gjitha",
  viewed: "Të para",
  notViewed: "Të pashikuara",
  noResults: "Asnjë provë nuk përputhet me filtrat.",
  backToArchive: "Kthehu te provat",
  backToHome: "Kthehu te ballina",
  back: "Mbrapa",
  openEvidence: "Hap",
  viewedBadge: "E parë",
  category: "Kategoria",
  chapter: "Kapitulli",
  openPdfNewTab: "Hap PDF-në në skedë të re",
  openImageNewTab: "Hap imazhin në skedë të re",
  openLinkNewTab: "Hap lidhjen në skedë të re",
  downloadFile: "Shkarko skedarin",
  transcript: "Transkripti",
  reliability: "Besueshmëria",
  confirmed: "E konfirmuar",
  probable: "E mundshme",
  disputed: "E kontestuar",
  role: "Roli",
  origin: "Origjina",
  motive: "Motivi i mundshëm",
  declaredAlibi: "Alibia e deklaruar",
  evidenceFor: "Në favor të tyre",
  evidenceAgainst: "Kundër tyre",
  statusWitness: "Dëshmitar",
  statusSuspect: "Person me interes",
  statusStrongSuspect: "I dyshuar i fortë",
  locked: "I kyçur",
  unlocked: "I shkyçur",
  enterPassword: "Shkruaj fjalëkalimin për të shkyçur kapitullin tjetër",
  passwordPlaceholder: "Fjalëkalimi…",
  unlock: "Shkyç",
  wrongPassword: "Nuk është përgjigja e duhur. Vazhdo të lexosh provat.",
  hint: "Ndihmesë",
  chapterObjective: "Objektivi yt",
  discussionQuestion: "Diskutoni si ekip",
  unlocksNext: "Zgjidhe këtë për të shkyçur kapitullin tjetër.",
  finalLocked: "Kutia e akuzës përfundimtare është e kyçur",
  finalLockedHelp:
    "Kalo nëpër të katër kapitujt. Fjalëkalimi përfundimtar fshihet te provat e kapitullit të fundit.",
  finalUnlockPassword: "Shkruaj fjalëkalimin përfundimtar",
  submitAccusation: "Dërgo akuzën",
  yourAccusation: "Akuza juaj",
  selectSuspect: "Zgjidh një të dyshuar…",
  answerSaved: "Akuza juaj u regjistrua në këtë pajisje.",
  editAnswer: "Ndrysho përgjigjen",
  viewSolution: "Zbulo zgjidhjen",
  solutionWarning:
    "Hape vetëm kur ekipi ka përfunduar hetimin.",
  caseSolved: "Rasti u zgjidh",
  wrongAccusation: "Akuzë e gabuar",
  showSolution: "Shfaq zgjidhjen e plotë",
  contrastNormal: "Normal",
  contrastHigh: "Kontrast i lartë",
  contrastInverted: "I përmbysur",
  contrast: "Kontrasti",
  resetProgress: "Rivendos përparimin",
  resetConfirm:
    "Të rivendosen të gjitha të dhënat lokale në këtë pajisje (provat e para, kapitujt e shkyçur, akuza përfundimtare)?",
  confidence: "Besimi",
  low: "I ulët",
  medium: "Mesatar",
  high: "I lartë",
  evidenceInChapter: "Provat në këtë kapitull",
  relatedSuspects: "Të dyshuar të lidhur",
  importance: "Rëndësia",
  chapterLocked: "Ky kapitull është i kyçur",
  chapterLockedHelp:
    "Përgjigju pyetjes duke u nisur nga provat e kapitullit të mëparshëm për ta shkyçur.",
  attachments: "Bashkëngjitjet",
  openAttachment: "Hap bashkëngjitjen",
  suspectDetailsLocked:
    "Më shumë pika në favor dhe kundër këtij personi shfaqen ndërsa shkyç kapitujt e mëvonshëm.",
};

const dictionaries: Record<Language, Partial<Dictionary>> = { en, it, sq };

/** Translate a UI key, falling back to English when a translation is missing. */
export function t(language: Language, key: UIKey): string {
  return dictionaries[language]?.[key] ?? en[key];
}
