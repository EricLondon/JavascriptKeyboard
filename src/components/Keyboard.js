import React from "react"

import {
  KEY_HEIGHT_WHITE,
  KEY_WIDTH_WHITE,
  KEY_WIDTH_BLACK,
} from "../constants/music";

import { ApplyNoteColors } from '../../src/lib/NoteCalculator'

const Keyboard = ({ notesInRange, noteColors }) => {
  // debug
  // console.log("notesInRange", notesInRange);
  // console.log("noteColors", noteColors);

  const coloredNotes = ApplyNoteColors(notesInRange, noteColors);

  const renderKeyLabel = (note) => {
    let left = null;

    if (note.natural) {
      left = KEY_WIDTH_WHITE / 2;
    } else {
      left = KEY_WIDTH_BLACK / 2;
    }
    left = left - 10;

    const style = {
      position: "absolute",
      bottom: 0,
      left: left,
    };

    return (
      <div style={style}>
        {note.note}
      </div>
    );
  };

  const renderKey = (note) => {
    return (
      <div
        className={`key key-${note.color} ${note.className}`}
        key={note.index}
        style={note.style}
      >
        {renderKeyLabel(note)}
      </div>
    );
  };

  return (
    <div
      className="keyboard"
      style={{ position: "relative", marginBottom: `${KEY_HEIGHT_WHITE}px` }}
    >
      {coloredNotes.map((note) => renderKey(note))}
    </div>
  );
};

export default Keyboard
