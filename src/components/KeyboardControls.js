import React, { useState } from "react"

import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import { FloatingLabel } from "react-bootstrap"

import { NOTES, SCALES } from "../constants/music"

const KeyboardControls = ({ handleControlsChange }) => {
  const [rootNote, setRootNote] = useState(null)
  const [scale, setScale] = useState(null)

  const handleChangeRootNote = (event) => {
    setRootNote(event.target.value)
  }

  const handleChangeScale = (event) => {
    setScale(event.target.value)
  }

  const handleShowClick = (event) => {
    event.preventDefault()
    handleControlsChange({
      rootNote: rootNote,
      scaleName: scale
    })
  }

  return (
    <>

      <Row className="mt-3">

        <Col>
          <FloatingLabel label="Root Note">
            <Form.Select value={rootNote} onChange={handleChangeRootNote}>
              <option value="">-</option>
              {NOTES.map(note =>
                <option value={note}>{note}</option>
              )}
            </Form.Select>
          </FloatingLabel>
        </Col>

        <Col>
          <FloatingLabel label="Scale">
            <Form.Select value={scale} onChange={handleChangeScale}>
              <option value="">-</option>
              {SCALES.map(scale =>
                <option value={scale.name}>{scale.name}</option>
              )}
            </Form.Select>
          </FloatingLabel>
        </Col>

      </Row>

      <Row className="mt-3">
        <Col>
          <Button onClick={handleShowClick}>Show</Button>
        </Col>
      </Row>

    </>
  )
}

export default KeyboardControls