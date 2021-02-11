import React from 'react';
import { useTranslation } from 'react-i18next';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ConfirmDialog({
  show, onConfirm, onCancel, title, text,
}) {
  const { t } = useTranslation();

  return (
    <Modal show={show} onHide={onCancel}>
      <Modal.Header closeButton>
        <Modal.Title>
          {title || t('confirmAction')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {text}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmDialog;
