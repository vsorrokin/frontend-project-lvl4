import React, {
  useContext, useRef, useEffect, useState,
} from 'react';
import { Formik } from 'formik';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import API from '../libs/api';
import AppContext from '../context';

function NewMessageForm({ className = '' }) {
  const { nickname, currentChannelId: channelId } = useContext(AppContext);
  const [error, setError] = useState(null);
  const input = useRef(null);
  useEffect(() => {
    input.current.focus();
  }, [channelId]);

  const onSubmit = async ({ body }, { setSubmitting, resetForm }) => {
    try {
      await API.request('createMessage', {
        body,
        channelId,
        nickname,
      });
      setError(null);
    } catch (e) {
      setError('Network error');
    }

    resetForm();
    setSubmitting(false);
    input.current.focus();
  };

  return (
    <Formik initialValues={{ body: '' }} onSubmit={onSubmit}>
      {({
        values,
        handleChange,
        handleSubmit,
        isSubmitting,
      }) => (
        <Form className={className} onSubmit={handleSubmit}>
          <Form.Group>
            <InputGroup>
              <Form.Control
                ref={input}
                disabled={isSubmitting}
                autoFocus
                type="text"
                name="body"
                placeholder="Message..."
                onChange={handleChange}
                value={values.body}
                isInvalid={error}
              />
              <InputGroup.Append>
                <Button variant="primary" type="submit" disabled={isSubmitting}>Send</Button>
              </InputGroup.Append>
              <Form.Control.Feedback type="invalid">
                {error}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Form>
      )}
    </Formik>
  );
}

export default NewMessageForm;
