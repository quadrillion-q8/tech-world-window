export type Author = {
  id: string;
  name: string;
  role: string;
  bio: string;
  url: string;
  expertise: string[];
  approach: string;
  experience: string;
};

export const authors: Record<string, Author> = {
  imranNatiq: {
    id: 'imran-natiq',
    name: 'Imran Natiq',
    role: 'Hardware Repair Engineer & Technology Writer',
    bio: 'A hands-on hardware repair engineer focused on PC and laptop troubleshooting, Windows diagnostics, gaming performance, storage health and practical technology education.',
    url: '/authors/imran-natiq',
    approach: 'Classify the symptom, collect a baseline, isolate the likely cause, change one variable and verify the result. Distinguish documented facts, first-hand observations and technical analysis.',
    experience: 'Practical PC and laptop repair work informs the diagnostic approach. The repair-bench gallery documents examples of hardware inspection, cooling maintenance, storage and memory upgrades; those photos are not controlled benchmark results.',
    expertise: [
      'PC and laptop hardware troubleshooting',
      'Windows diagnostics and recovery',
      'PC gaming performance and frame-time analysis',
      'SSD, RAM and storage health',
      'Practical hardware testing and repair methodology',
    ],
  },
};
