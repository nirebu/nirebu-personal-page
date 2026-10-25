// Conference talks. The same talk is often given at more than one conference,
// so a talk holds a list of appearances — each with its own recording.
// Recordings live on YouTube: only `youtube_id` is needed to build the
// thumbnail, the watch URL and the embed URL.

export interface TalkAppearance {
  conference: string;
  /** Conference website, if there is one. */
  conferenceUrl?: string;
  /** Date of the talk, ISO 8601 (YYYY-MM-DD). */
  date: string;
  location: string;
  youtube_id: string;
  /** Date the recording was published on YouTube, ISO 8601. */
  published?: string;
}

export interface Talk {
  /** Used as the section anchor on /talks/. */
  slug: string;
  title: string;
  abstract: string;
  /** Newest first. */
  appearances: TalkAppearance[];
}

export const talks: Talk[] = [
  {
    slug: 'accidentally-building-a-neural-network',
    title:
      'Accidentally building a neural network: A Ruby product recommendation journey',
    abstract:
      'Machine learning often feels like a black box reserved for Python data scientists. But what happens when you solve a complex product recommendation problem with Plain Old Ruby Objects — and discover you have unknowingly rebuilt the architecture of a neural network? This talk deconstructs a real-world recommendation engine that processes thousands of orders per week, and shows that you do not need heavy external services to solve AI problems. You need Ruby.',
    appearances: [
      {
        conference: 'tiny ruby {conf} 2026',
        conferenceUrl: 'https://tinyruby.fi',
        date: '2026-10-01',
        location: 'Helsinki, Finland',
        youtube_id: 'EX6f666G0HA',
        published: '2026-10-23',
      },
      {
        conference: 'wroclove.rb 2026',
        conferenceUrl: 'https://wrocloverb.com',
        date: '2026-04-18',
        location: 'Wrocław, Poland',
        youtube_id: 'vdA2o1lP1Y4',
        published: '2026-04-22',
      },
    ],
  },
];
