import React, {
  useContext, useRef, useEffect, useState,
} from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import API from '../libs/api';
import AppContext from '../context';

function NewMessageForm({ className = '' }) {
  const { t } = useTranslation();
  const { nickname } = useContext(AppContext);
  const channelId = useSelector((state) => state.chat.currentChannelId);
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
      resetForm();
    } catch (e) {
      setError(t('networkError'));
    }

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
                placeholder={t('messagePlaceholder')}
                onChange={handleChange}
                value={values.body}
                isInvalid={error}
              />
              <InputGroup.Append>
                <Button
                  variant="primary"
                  type="submit"
                  disabled={isSubmitting || !values.body.trim()}
                >
                  {t('send')}
                </Button>
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
