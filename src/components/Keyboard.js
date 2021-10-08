import React from "react"

import { NOTES } from "../constants/keyboard"

const Keyboard = ({ keyCount}) => {

  const keyHeightWhite = 240
  const keyHeightBlack = keyHeightWhite * 6/10
  const keyWidthWhite = 60
  const keyWidthBlack = 40

  const notesInRange = () => {
    let keyboardNotes = [...NOTES]
    while (keyboardNotes.length < keyCount) {
      keyboardNotes.push(...NOTES)
    }
    keyboardNotes = keyboardNotes.splice(0, keyCount)

    let whiteKeyCount = 0
    let blackKeyCount = 0
    let currentOctave = null
    let noteInOctave = null

    const notesWithOctave = keyboardNotes.map((note, index) => {
      const octave = Math.floor(index / NOTES.length) + 1

      if (currentOctave !== octave) {
        currentOctave = octave
        noteInOctave = 0
      }
      noteInOctave += 1

      const natural = !/#$/.test(note)
      if (natural) {
        whiteKeyCount += 1
      } else {
        blackKeyCount += 1
      }

      return {
        note: note,
        index: index + 1,
        octave: octave,
        noteInOctave: noteInOctave,
        natural: natural,
        color: natural ? 'white' : 'black',
        typeKeyCount: natural ? whiteKeyCount : blackKeyCount
      }
    })
    return notesWithOctave
  }

  const renderKey = (note) => {
    return(
      <div className={`key key-${note.color}`} key={note.index} style={keyStyle(note)}>
        {renderKeyLabel(note)}
      </div>
    )
  }

  const keyStyle = (note) => {
    let left = null
    let keyHeight = null
    let keyWidth = null

    if (note.color === 'white') {
      keyHeight = keyHeightWhite
      keyWidth = keyWidthWhite

      left = keyWidthWhite * note.typeKeyCount - keyWidthWhite
    } else {
      keyHeight = keyHeightBlack
      keyWidth = keyWidthBlack

      switch (note.noteInOctave) {
        case 2:
          left = 40
          break;
        case 4:
          left = 100
          break;
        case 7:
          left = 220
          break;
        case 9:
          left = 280
          break;
        case 11:
          left = 340
          break;
        default:
      }

      left += (keyWidthWhite * 7) * (note.octave - 1)
    }

    return {
      position: 'absolute',
      height: `${keyHeight}px`,
      width: `${keyWidth}px`,
      boxSizing: 'border-box',
      border: '3px solid black',
      backgroundColor: (note.color === 'white' ? '' : 'gray'),
      top: 0,
      left: left,
      zIndex: note.natural ? 0 : 1
    }
  }

  const renderKeyLabel = (note) => {
    let left = null

    if (note.natural) {
      left = keyWidthWhite / 2
    } else {
      left = keyWidthBlack / 2
    }
    left = left - 10

    const style = {
      position: 'absolute',
      bottom: 0,
      left: left
    }

    return (
      <div style={style}>
        {note.note}
      </div>
    )
  }

  return (
    <div className="keyboard" style={{ position: 'relative' }}>
      {notesInRange().map((note) =>
        renderKey(note)
      )}
    </div>
  )

}

export default Keyboard
