import React, { useState } from "react";

import { Container } from 'react-bootstrap'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import Keyboard from "../components/Keyboard"
import KeyboardControls from '../components/KeyboardControls'

import { NotesInRange, NoteColors } from "../lib/NoteCalculator";

const KeyboardScreen = props => {

  const keyCount = 37

  const [notesInRange, setNotesInRange] = useState(NotesInRange(keyCount))
  const [noteColors, setNoteColors] = useState([])
  const [controlsData, setControlsData] = useState({})

  const handleControlsChange = (data) => {
    setControlsData(data)
    setNoteColors(NoteColors(data))
  }

  return (
    <Container>
      <Row>
        <Col>
          <Keyboard
            notesInRange={notesInRange}
            noteColors={noteColors}
          />
        </Col>
      </Row>

      <KeyboardControls handleControlsChange={handleControlsChange} />
    </Container>
  );

}

export default KeyboardScreen
