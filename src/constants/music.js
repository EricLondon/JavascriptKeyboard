export const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

export const SCALES = [
  {
    name: "Major",
    steps: [2, 2, 1, 2, 2, 2, 1],
  },
  {
    name: "Minor",
    steps: [2, 1, 2, 2, 1, 2, 2],
  },
  {
    name: "Major Pentatonic",
    steps: [2, 2, 3, 2, 3],
  },
  {
    name: "Minor Pentatonic",
    steps: [3, 2, 2, 3, 2],
  },
  {
    name: "Ionian (i) [Major]",
    steps: [2, 2, 1, 2, 2, 2, 1],
  },
  {
    name: "Dorian (ii)",
    steps: [2, 1, 2, 2, 2, 1, 2],
  },
  {
    name: "Phrygian (iii)",
    steps: [1, 2, 2, 2, 1, 2, 2],
  },
  {
    name: "Lydian (iv)",
    steps: [2, 2, 2, 1, 2, 2, 1],
  },
  {
    name: "Mixolydian (v)",
    steps: [2, 2, 1, 2, 2, 1, 2],
  },
  {
    name: "Aeolian (vi) [Natural Minor]",
    steps: [2, 1, 2, 2, 1, 2, 2],
  },
  {
    name: "Locrian (vii)",
    steps: [1, 2, 2, 1, 2, 2, 2],
  }
];

export const COLOR_CLASSES = [
  'primary', // blue
  'success', // green
  'danger', // red
]

export const KEY_HEIGHT_WHITE = 240;
export const KEY_HEIGHT_BLACK = (KEY_HEIGHT_WHITE * 6) / 10;
export const KEY_WIDTH_WHITE = 56;
export const KEY_WIDTH_BLACK = 40;


/*

A major
A, B, C#, D, E, F#, G#, A

A minor
A, B, C, D, E, F, G, A

A major pentatonic
A, B, C#, E, F#, A
(1st, 2, 3, 5, 6)
2-2-3-2-3

A minor pentatonic
A, C, D, E, G, A

*/