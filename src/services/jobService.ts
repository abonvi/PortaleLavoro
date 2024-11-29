import type { JobPosition } from '../types';

// Mock data per demo
let positions: JobPosition[] = [
  {
    id: '1',
    code: 'DEV-247',
    title: 'Sviluppatore Frontend React',
    category: 'development',
    description: `
      <h3>Chi siamo</h3>
      <p>Siamo un'azienda tecnologica in rapida crescita che sviluppa soluzioni innovative nel campo del fintech. Il nostro team di sviluppo è composto da professionisti appassionati che lavorano su progetti sfidanti utilizzando le più moderne tecnologie.</p>

      <h3>Chi stiamo cercando</h3>
      <p>Cerchiamo uno sviluppatore Frontend con esperienza in React per unirsi al nostro team di sviluppo. La persona che stiamo cercando sarà responsabile dello sviluppo di nuove funzionalità e del miglioramento continuo delle nostre applicazioni web, collaborando a stretto contatto con il team di UX/UI e backend.</p>
      
      <h3>Responsabilità principali</h3>
      <ul>
        <li>Sviluppo di nuove funzionalità per le nostre applicazioni web utilizzando React e TypeScript</li>
        <li>Ottimizzazione delle performance e della user experience</li>
        <li>Collaborazione con il team di design per implementare interfacce utente responsive e accessibili</li>
        <li>Partecipazione alle code review e al miglioramento continuo delle nostre pratiche di sviluppo</li>
        <li>Mentoring di sviluppatori junior e contributo alla crescita del team</li>
      </ul>

      <h3>Requisiti essenziali</h3>
      <ul>
        <li>Esperienza di almeno 3 anni con React e il suo ecosistema</li>
        <li>Ottima conoscenza di TypeScript e delle moderne pratiche di sviluppo frontend</li>
        <li>Familiarità con i moderni strumenti di sviluppo frontend (Vite, Webpack, ESLint, ecc.)</li>
        <li>Esperienza con lo state management (Redux, Zustand, React Query)</li>
        <li>Conoscenza approfondita di HTML5, CSS3 e delle moderne tecniche di styling</li>
        <li>Esperienza con il testing (Jest, React Testing Library)</li>
      </ul>

      <h3>Requisiti preferenziali</h3>
      <ul>
        <li>Esperienza con Next.js o altri framework React-based</li>
        <li>Conoscenza di GraphQL e delle relative implementazioni in React</li>
        <li>Contributi a progetti open source</li>
        <li>Esperienza con metodologie Agile/Scrum</li>
        <li>Conoscenza base di Node.js e architetture backend</li>
      </ul>

      <h3>Cosa offriamo</h3>
      <ul>
        <li>Ambiente di lavoro stimolante e in continua evoluzione</li>
        <li>Possibilità di smart working e orario flessibile</li>
        <li>Budget annuale per formazione e conferenze</li>
        <li>Assicurazione sanitaria integrativa</li>
        <li>Piano di crescita professionale personalizzato</li>
        <li>Progetti innovativi e tecnologicamente all'avanguardia</li>
      </ul>
    `,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    code: 'AMM-583',
    title: 'Assistente Amministrativo Senior',
    category: 'administration',
    description: `
      <h3>Chi siamo</h3>
      <p>Siamo una realtà consolidata nel settore dei servizi alle imprese, con oltre 20 anni di esperienza e una presenza capillare sul territorio nazionale. Il nostro team amministrativo gestisce con precisione e professionalità le attività finanziarie e contabili di numerosi clienti nazionali e internazionali.</p>

      <h3>Chi stiamo cercando</h3>
      <p>Cerchiamo un Assistente Amministrativo Senior per supportare il team amministrativo nella gestione delle attività quotidiane. La risorsa si occuperà di coordinare i processi amministrativi e contabili, garantendo accuratezza e rispetto delle scadenze.</p>
      
      <h3>Responsabilità principali</h3>
      <ul>
        <li>Gestione completa della contabilità generale e analitica</li>
        <li>Supervisione del ciclo attivo e passivo</li>
        <li>Elaborazione e verifica fatture clienti e fornitori</li>
        <li>Gestione dei rapporti con banche, fornitori e clienti</li>
        <li>Preparazione della documentazione per il bilancio</li>
        <li>Supporto nella redazione di report finanziari periodici</li>
        <li>Gestione delle riconciliazioni bancarie</li>
        <li>Coordinamento con consulenti esterni (commercialisti, revisori)</li>
      </ul>

      <h3>Requisiti essenziali</h3>
      <ul>
        <li>Laurea in Economia, Finanza o discipline affini</li>
        <li>Esperienza di almeno 5 anni in ruolo analogo</li>
        <li>Ottima conoscenza della contabilità generale e dei principi contabili</li>
        <li>Padronanza del pacchetto Office, in particolare Excel avanzato</li>
        <li>Esperienza con software gestionali ERP</li>
        <li>Capacità di gestione delle scadenze e delle priorità</li>
        <li>Precisione e attenzione ai dettagli</li>
      </ul>

      <h3>Requisiti preferenziali</h3>
      <ul>
        <li>Conoscenza della lingua inglese (livello B2)</li>
        <li>Esperienza in società di revisione o studi commercialisti</li>
        <li>Familiarità con la normativa fiscale e tributaria</li>
        <li>Conoscenza di SAP o altri ERP di primaria importanza</li>
      </ul>

      <h3>Competenze trasversali</h3>
      <ul>
        <li>Ottime capacità organizzative e di pianificazione</li>
        <li>Spiccate doti analitiche e di problem solving</li>
        <li>Capacità di lavorare in autonomia e in team</li>
        <li>Orientamento al risultato e rispetto delle scadenze</li>
        <li>Riservatezza e professionalità nella gestione delle informazioni</li>
      </ul>

      <h3>Cosa offriamo</h3>
      <ul>
        <li>Contratto a tempo indeterminato</li>
        <li>Pacchetto retributivo competitivo</li>
        <li>Welfare aziendale</li>
        <li>Formazione continua e aggiornamento professionale</li>
        <li>Ambiente di lavoro dinamico e strutturato</li>
      </ul>
    `,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '3',
    code: 'COM-159',
    title: 'Account Manager Commerciale',
    category: 'sales',
    description: `
      <h3>Chi siamo</h3>
      <p>Siamo una società leader nel settore delle soluzioni B2B per l'innovazione digitale, con un portfolio clienti che include alcune delle più importanti aziende nazionali e internazionali. La nostra missione è supportare le aziende nel loro percorso di trasformazione digitale, fornendo soluzioni personalizzate e all'avanguardia.</p>

      <h3>Chi stiamo cercando</h3>
      <p>Ricerchiamo un Account Manager Commerciale dinamico e orientato ai risultati per sviluppare il nostro portfolio clienti. La figura si occuperà di gestire e sviluppare le relazioni commerciali con i clienti esistenti e di acquisire nuove opportunità di business nel mercato B2B.</p>
      
      <h3>Responsabilità principali</h3>
      <ul>
        <li>Gestione e sviluppo strategico del portafoglio clienti assegnato</li>
        <li>Analisi dei bisogni dei clienti e proposta di soluzioni personalizzate</li>
        <li>Negoziazione e finalizzazione di contratti commerciali complessi</li>
        <li>Sviluppo di nuove opportunità di business e ampliamento del mercato</li>
        <li>Preparazione di offerte commerciali e presentazioni tecniche</li>
        <li>Monitoraggio delle performance di vendita e reporting periodico</li>
        <li>Partecipazione a fiere ed eventi di settore</li>
        <li>Collaborazione con i team tecnici per la definizione delle soluzioni</li>
      </ul>

      <h3>Requisiti essenziali</h3>
      <ul>
        <li>Esperienza di almeno 4 anni nella vendita B2B di servizi o soluzioni tecnologiche</li>
        <li>Comprovata capacità di raggiungimento degli obiettivi di vendita</li>
        <li>Ottima conoscenza del mercato IT e delle tecnologie digitali</li>
        <li>Eccellenti capacità relazionali e di negoziazione</li>
        <li>Forte orientamento al cliente e al risultato</li>
        <li>Ottima conoscenza della lingua inglese (livello C1)</li>
        <li>Disponibilità a trasferte sul territorio nazionale (40% del tempo)</li>
      </ul>

      <h3>Requisiti preferenziali</h3>
      <ul>
        <li>Laurea in discipline economiche o tecniche</li>
        <li>Esperienza pregressa nel settore IT/Digital</li>
        <li>Conoscenza di metodologie di vendita consultiva</li>
        <li>Portfolio di relazioni nel settore</li>
        <li>Certificazioni commerciali o tecniche pertinenti</li>
      </ul>

      <h3>Competenze richieste</h3>
      <ul>
        <li>Eccellenti capacità di presentazione e public speaking</li>
        <li>Forte capacità di analisi e problem solving</li>
        <li>Abilità di gestione di progetti complessi</li>
        <li>Capacità di lavorare per obiettivi in autonomia</li>
        <li>Ottima padronanza del pacchetto Office e dei CRM</li>
      </ul>

      <h3>Cosa offriamo</h3>
      <ul>
        <li>Retribuzione competitiva (RAL + bonus significativo legato ai risultati)</li>
        <li>Auto aziendale e strumenti di lavoro</li>
        <li>Piano di incentivi e commissioni attrattivo</li>
        <li>Formazione continua e percorsi di crescita professionale</li>
        <li>Ambiente di lavoro dinamico e stimolante</li>
        <li>Benefits aziendali (assicurazione sanitaria, flexible benefits)</li>
      </ul>
    `,
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    updatedAt: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: '4',
    code: 'HR-426',
    title: 'HR Specialist - Selezione e Sviluppo',
    category: 'hr',
    description: `
      <h3>Chi siamo</h3>
      <p>Siamo un'azienda in forte crescita nel settore tecnologico, con una cultura aziendale basata sull'innovazione e sulla valorizzazione dei talenti. Il nostro team HR gioca un ruolo fondamentale nel supportare la crescita dell'azienda attraverso l'attrazione e lo sviluppo dei migliori talenti.</p>

      <h3>Chi stiamo cercando</h3>
      <p>Cerchiamo un HR Specialist da inserire nel nostro team Risorse Umane, con focus su selezione e sviluppo del personale. La risorsa si occuperà di gestire l'intero processo di recruiting e di implementare programmi di sviluppo per i dipendenti.</p>
      
      <h3>Responsabilità principali</h3>
      <ul>
        <li>Gestione completa del processo di selezione, dall'analisi dei fabbisogni all'onboarding</li>
        <li>Sviluppo e implementazione di programmi formativi e di sviluppo</li>
        <li>Gestione delle relazioni con università e società di recruiting</li>
        <li>Organizzazione di assessment center e colloqui di selezione</li>
        <li>Implementazione di programmi di talent management</li>
        <li>Gestione della comunicazione interna e del clima aziendale</li>
        <li>Supporto nella definizione di percorsi di carriera</li>
        <li>Analisi dei KPI di selezione e sviluppo</li>
      </ul>

      <h3>Requisiti essenziali</h3>
      <ul>
        <li>Laurea in Psicologia del Lavoro, Risorse Umane o discipline affini</li>
        <li>Esperienza di almeno 3 anni nel ruolo, preferibilmente in contesti tecnologici</li>
        <li>Ottima conoscenza degli strumenti e delle metodologie di recruiting</li>
        <li>Esperienza nella progettazione e gestione di percorsi formativi</li>
        <li>Conoscenza delle principali metodologie di assessment</li>
        <li>Ottima conoscenza della lingua inglese (livello B2/C1)</li>
        <li>Padronanza degli strumenti digitali per HR</li>
      </ul>

      <h3>Requisiti preferenziali</h3>
      <ul>
        <li>Master in Risorse Umane o specializzazioni pertinenti</li>
        <li>Certificazioni in ambito HR o formazione</li>
        <li>Esperienza in progetti di Employer Branding</li>
        <li>Conoscenza di una seconda lingua straniera</li>
        <li>Esperienza nell'utilizzo di ATS e HRIS</li>
      </ul>

      <h3>Competenze trasversali</h3>
      <ul>
        <li>Eccellenti capacità di comunicazione e ascolto</li>
        <li>Spiccate doti organizzative e di pianificazione</li>
        <li>Capacità di gestire più progetti contemporaneamente</li>
        <li>Orientamento al risultato e al problem solving</li>
        <li>Empatia e capacità di lavorare in team</li>
      </ul>

      <h3>Cosa offriamo</h3>
      <ul>
        <li>Contratto a tempo indeterminato</li>
        <li>Retribuzione competitiva basata sull'esperienza</li>
        <li>Smart working e flessibilità oraria</li>
        <li>Formazione continua e certificazioni</li>
        <li>Ambiente giovane e dinamico</li>
        <li>Benefits aziendali (assicurazione sanitaria, buoni pasto, etc.)</li>
      </ul>

      <h3>Sede di lavoro</h3>
      <p>La posizione è basata presso la nostra sede di Milano, con possibilità di smart working fino a 3 giorni a settimana. Sono previste occasionali trasferte presso le altre sedi del gruppo.</p>
    `,
    createdAt: new Date(Date.now() - 259200000).toISOString(),
    updatedAt: new Date(Date.now() - 259200000).toISOString(),
  }
];

export async function getAllJobPositions(): Promise<JobPosition[]> {
  // Simula una chiamata API
  await new Promise(resolve => setTimeout(resolve, 500));
  return positions;
}

export async function getJobPosition(id: string): Promise<JobPosition | null> {
  await new Promise(resolve => setTimeout(resolve, 300));
  return positions.find(p => p.id === id) || null;
}

export async function createJobPosition(data: Omit<JobPosition, 'id' | 'createdAt' | 'updatedAt'>): Promise<JobPosition> {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const newPosition: JobPosition = {
    ...data,
    id: Math.random().toString(36).substring(2),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  positions.push(newPosition);
  return newPosition;
}

export async function updateJobPosition(id: string, data: Partial<JobPosition>): Promise<JobPosition> {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const index = positions.findIndex(p => p.id === id);
  if (index === -1) throw new Error('Posizione non trovata');
  
  positions[index] = {
    ...positions[index],
    ...data,
    updatedAt: new Date().toISOString(),
  };
  
  return positions[index];
}

export async function deleteJobPosition(id: string): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 500));
  positions = positions.filter(p => p.id !== id);
}