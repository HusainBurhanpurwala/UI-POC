export interface MemoryNote {
  id: string;
  title: string;
  content: string;
  date?: string;
  tag?: string;
}

export interface EmptyFrame {
  id: string;
  title: string;
  subtext: string;
}

export interface StoryConfig {
  dates: {
    firstConversation: string; // ISO 8601 string
    askedOut: string;          // ISO 8601 string
    meetingStart: string;      // ISO 8601 string
    conceptualized: string;    // ISO 8601 string
    timezone: string;
  };
  meetingLengthDays: number;
  climaxHindiText: string;
  letter: {
    salutation: string;
    paragraphs: string[];
    closing: string;
    postscriptIntro: string;
    postscriptContent: string;
    stamps: {
      date: string;
      label: string;
      city: string;
    }[];
  };
  unsaidEnvelopes: MemoryNote[];
  smallMemories: {
    text: string;
    subtext?: string;
    accent?: string;
  }[];
  forgottenMemories: {
    text: string;
    detail: string;
  }[];
  emptyFrames: EmptyFrame[];
  easterEgg: {
    hint: string;
    secretTitle: string;
    secretMessage: string;
  };
}

export const STORY_CONFIG: StoryConfig = {
  dates: {
    // 28 June 2026 - When we started talking (The beginning)
    firstConversation: '2026-06-28T18:30:00+05:30',
    // 1 September 2026 - When he asked me out (The turning point)
    askedOut: '2026-09-01T21:15:00+05:30',
    // Actual meeting date - When we spent 3 days together
    meetingStart: '2026-09-24T10:00:00+05:30',
    // 1 October 2026 - Conceptualized date
    conceptualized: '2026-10-01T22:30:00+05:30',
    timezone: 'Asia/Kolkata',
  },
  meetingLengthDays: 3,
  climaxHindiText: 'ये दिल सिर्फ़ आपके लिए धड़कता है।',
  letter: {
    salutation: 'Dear',
    paragraphs: [
      "I don't know the exact hour talking to you stopped being a casual part of my day and quietly became the thing I looked forward to the most.",
      "Before September 1st, we were already becoming something real. But that evening gave us a name, and every hesitation I ever had simply evaporated when you asked.",
      "And then those three days arrived. Before they started, seventy-two hours felt like a generous amount of time. But inside them, every minute slipped away like sand through open fingers.",
      "What stayed with me isn't just the places we walked or the laughter we shared in the silence between conversations. It's the unmistakable feeling that, wherever you are, that is where I belong."
    ],
    closing: 'Always, with all my love.',
    postscriptIntro: "There's one more thing...",
    postscriptContent: "Even on the days we don't say much, every quiet thought still leads back to you.",
    stamps: [
      { date: '28.06.2026', label: 'THE FIRST WORDS', city: 'CHAPTER 01' },
      { date: '01.09.2026', label: 'THE TURNING POINT', city: 'CHAPTER 02' },
      { date: '24.09.2026', label: 'THE THREE DAYS', city: 'CHAPTER 03' },
    ]
  },
  unsaidEnvelopes: [
    {
      id: 'env-1',
      title: 'The late night calls',
      content: 'I used to check my phone twice before sleeping, just in case you said goodnight.',
      tag: '01:14 AM'
    },
    {
      id: 'env-2',
      title: 'The first second I saw you',
      content: 'I had prepared so many things to say. Then you smiled, and I forgot every single word.',
      tag: 'Day One'
    },
    {
      id: 'env-3',
      title: 'The silence between us',
      content: 'With you, silence never felt empty or awkward. It felt like coming home after a very long journey.',
      tag: 'Day Two'
    },
    {
      id: 'env-4',
      title: 'The moment before saying goodbye',
      content: 'I knew the days were ending while we were still inside them. I held on for an extra second just to remember.',
      tag: 'Day Three'
    }
  ],
  smallMemories: [
    { text: 'The way you pause right before you laugh.' },
    { text: 'That specific expression you make when you think no one is watching.' },
    { text: 'How you explain things you care about with effortless passion.' },
    { text: 'The exact tone of your voice when you say my name.' },
    { text: 'The way you remembered a tiny detail I only mentioned once weeks ago.' },
  ],
  forgottenMemories: [
    {
      text: 'You probably don\'t remember this.',
      detail: 'The way you looked back once right before turning the corner.'
    },
    {
      text: 'You probably don\'t remember this.',
      detail: 'The gentle hesitation in your voice when you asked if you could hold my hand.'
    },
    {
      text: 'You probably don\'t remember this.',
      detail: 'How we lost track of three hours sitting together without looking at a single screen.'
    }
  ],
  emptyFrames: [
    { id: 'frame-1', title: 'Next Laugh', subtext: 'The one that catches us completely off guard' },
    { id: 'frame-2', title: 'Next Trip', subtext: 'Where we forget about departure times and maps' },
    { id: 'frame-3', title: 'Next Photograph', subtext: 'Blurry, unposed, and perfectly genuine' },
    { id: 'frame-4', title: 'Next Stupid Argument', subtext: 'The one we laugh about five minutes later' },
    { id: 'frame-5', title: 'Next Three Days', subtext: 'And every week and year that follows after' },
    { id: 'frame-6', title: 'Next Memory', subtext: 'Waiting for us just around the bend' }
  ],
  easterEgg: {
    hint: 'A secret kept in the margins',
    secretTitle: 'You found the quiet note',
    secretMessage: 'If you are seeing this, know that every single line of this was created with you in mind. ❤️'
  }
};
