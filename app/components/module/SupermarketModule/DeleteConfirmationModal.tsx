import React from 'react';
import Modal from 'react-modal';



type DeleteConfirmationModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  onConfirm: () => void;
};

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onRequestClose,
  onConfirm,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Delete Confirmation"
      className="modal"
      overlayClassName="overlay"
    >
      <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
      <p className="mb-4">Are you sure you want to delete this supermarket?</p>
      <div className="flex justify-end gap-2">
        <button
          onClick={onRequestClose}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;
