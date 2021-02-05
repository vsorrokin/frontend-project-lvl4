import React from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

function NewMessageForm({ className = '' }) {
  return (
    <Form.Group className={className}>
      <InputGroup>
        <Form.Control type="text" placeholder="Message..." />
        <InputGroup.Append>
          <Button variant="primary" type="submit">Send</Button>
        </InputGroup.Append>
      </InputGroup>
    </Form.Group>
  );
}

export default NewMessageForm;
