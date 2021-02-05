import React from 'react';
import { Formik } from 'formik';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Cookies from 'js-cookie';
import API from '../libs/api';

function NewMessageForm({ className = '' }) {
  const nickname = Cookies.get('nickname');

  const onSubmit = async ({ body }, { setSubmitting, resetForm }) => {
    try {
      await API.request('createMessage', {
        id: 1,
        body,
        channelId: 1,
        nickname,
      });
    } catch (e) {
      console.error(e);
    }

    resetForm();
    setSubmitting(false);
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
                type="text"
                name="body"
                placeholder="Message..."
                onChange={handleChange}
                value={values.body}
              />
              <InputGroup.Append>
                <Button variant="primary" type="submit" disabled={isSubmitting}>Send</Button>
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>
        </Form>
      )}
    </Formik>
  );
}

export default NewMessageForm;
