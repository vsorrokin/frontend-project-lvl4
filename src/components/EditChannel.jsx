import React, { useState } from 'react';
import { Formik } from 'formik';
import { connect } from 'react-redux';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import API from '../libs/api';
import { addChannel, setChannel } from '../store';

const mapDispatchToProps = { addChannel, setChannel };

const mapStateToProps = (state) => ({
  ...state,
});

function EditChannel({
  className = '', addChannel, setChannel,
}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const validate = ({ name }) => {
    const errors = {};
    if (!name) {
      errors.name = 'Channel name is required';
    }
    if (name.length < 3) {
      errors.name = 'Channel name can\'t be less 3 symbols';
    }
    return errors;
  };

  const onSubmit = async ({ name }, { setSubmitting, resetForm }) => {
    try {
      const { data: { data: { attributes: createdChannel } } } = await API.request('createChannel', {
        name,
      });
      addChannel(createdChannel);
      setChannel(createdChannel.id);
      handleClose();
    } catch (e) {
      console.error(e);
    }

    resetForm();
    setSubmitting(false);
  };

  return (
    <>
      <Button variant="link" className={`${className} p-0`} size="sm" onClick={handleShow}>
        New channel
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Formik
          initialValues={{ name: '' }}
          onSubmit={onSubmit}
          validate={validate}
        >
          {({
            values,
            errors,
            handleChange,
            handleSubmit,
            handleBlur,
            isSubmitting,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Modal.Header closeButton>
                <Modal.Title>New channel</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter channel name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  isInvalid={errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  Save
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(EditChannel);
