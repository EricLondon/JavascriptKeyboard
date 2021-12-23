
import {
  NOTES,
  SCALES,
  COLOR_CLASSES,
  KEY_HEIGHT_WHITE,
  KEY_HEIGHT_BLACK,
  KEY_WIDTH_WHITE,
  KEY_WIDTH_BLACK
} from "../constants/music"

// @param [Object] note
//
// @return [Object]
// - keys:
//   - position
//   - height
//   - width
//   - boxSizing
//   - border
//   - top
//   - left
//   - zIndex
const DefaultKeyStyle = (note) => {
  let left = null;
  let keyHeight = null;
  let keyWidth = null;

  if (note.color === "white") {
    keyHeight = KEY_HEIGHT_WHITE;
    keyWidth = KEY_WIDTH_WHITE;

    left = KEY_WIDTH_WHITE * note.typeKeyCount - KEY_WIDTH_WHITE;
  } else {
    keyHeight = KEY_HEIGHT_BLACK;
    keyWidth = KEY_WIDTH_BLACK;

    switch (note.noteInOctave) {
      case 2:
        left = 35;
        break;
      case 4:
        left = 93;
        break;
      case 7:
        left = 203;
        break;
      case 9:
        left = 260;
        break;
      case 11:
        left = 317;
        break;
      default:
    }

    left += KEY_WIDTH_WHITE * 7 * (note.octave - 1);
  }

  return {
    position: "absolute",
    height: `${keyHeight}px`,
    width: `${keyWidth}px`,
    boxSizing: "border-box",
    border: "3px solid black",
    top: 0,
    left: left,
    zIndex: note.natural ? 0 : 1,
  };
};

// @param [Integer] keyCount
//
// @return [Array<Object>]
export const NotesInRange = (keyCount) => {
  let keyboardNotes = [...NOTES];
  while (keyboardNotes.length < keyCount) {
    keyboardNotes.push(...NOTES);
  }
  keyboardNotes = keyboardNotes.splice(0, keyCount);

  let whiteKeyCount = 0;
  let blackKeyCount = 0;
  let currentOctave = null;
  let noteInOctave = null;

  const notesWithOctave = keyboardNotes.map((note, index) => {
    const octave = Math.floor(index / NOTES.length) + 1;

    if (currentOctave !== octave) {
      currentOctave = octave;
      noteInOctave = 0;
    }
    noteInOctave += 1;

    const natural = !/#$/.test(note);
    if (natural) {
      whiteKeyCount += 1;
    } else {
      blackKeyCount += 1;
    }

    const noteData = {
      note: note,
      index: index + 1,
      octave: octave,
      noteInOctave: noteInOctave,
      natural: natural,
      color: natural ? "white" : "black",
      typeKeyCount: natural ? whiteKeyCount : blackKeyCount,
      className: natural ? "bg-white" : "bg-secondary",
    };

    // set default key style
    const style = DefaultKeyStyle(noteData);
    noteData.style = style;

    return noteData;
  });
  return notesWithOctave;
};

// @param [String] rootNote
// @param [String] scaleName
//
// @return [Array<String>]
export const NotesInScale = (rootNote, scaleName) => {
  if (!scaleName) return null

  const scale = SCALES.find((entry) => entry.name === scaleName)
  if (!scale) return null

  const scaleSteps = scale.steps
  if (!scaleSteps) return null

  const notesInScale = [rootNote]
  let noteIndex = NOTES.indexOf(rootNote)
  scaleSteps.forEach((scaleStep) => {
    noteIndex += scaleStep
    if (noteIndex >= NOTES.length) {
      noteIndex -= NOTES.length
    }
    notesInScale.push(NOTES[noteIndex])
  })

  return notesInScale
}

// @param [String] props.rootNote
// @param [String] props.scaleName
//
// @retun [Array<Object>]
// - object keys:
//   - colorClass [String]
//   - notes: [Array<String>]
export const NoteColors = (props) => {

  const { rootNote, scaleName } = props

  let colorClassCount = 0
  const data = []

  const notesInScale = NotesInScale(rootNote, scaleName)
  if (notesInScale) {
    data.push({
      notes: notesInScale,
      colorClass: COLOR_CLASSES[colorClassCount]
    })
    colorClassCount += 1
  }

  return data
}

const applyNoteColor = (notes, notesToColor, colorClass) => {
  let greatestIndexColored = -1
  notes.forEach(note => {
    if (note.colorApplied === true) {
      greatestIndexColored = note.index
    }
  })

  notesToColor.forEach(noteToColor => {
    let noteToColorApplied = false
    notes.forEach(note => {
      if (noteToColorApplied) {
        // skip
      } else if (note.index <= greatestIndexColored) {
        // skip
      } else if (note.colorApplied) {
        // skip
      } else if (note.note === noteToColor) {
        note.className = `bg-${colorClass}`;
        note.colorApplied = true;
        greatestIndexColored = note.index;
        noteToColorApplied = true
      }
    })
  });
};

export const ApplyNoteColors = (notesInRange, noteColors) => {
  const notes = JSON.parse(JSON.stringify(notesInRange));
  noteColors.forEach(noteColorData => {
    const { colorClass, notes: notesToColor } = noteColorData;
    applyNoteColor(notes, notesToColor, colorClass);
  })
  return notes
};
