import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import styles from './EditModuleModal.module.css';

Modal.setAppElement('#root');

const EditModuleModal = ({ isOpen, onRequestClose, onEdit, initialName }) => {
    const [moduleName, setModuleName] = useState(initialName);

    useEffect(() => {
        setModuleName(initialName);
    }, [initialName]);

    const handleEdit = () => {
        if (moduleName.trim()) {
            onEdit(moduleName);
            onRequestClose();
        }
    };
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className={styles.modal}
            overlayClassName={styles.overlay}
        >
            <div className={styles.container}>
                <h2>Edit module</h2>
                <input
                    type="text"
                    value={moduleName}
                    onChange={(e) => setModuleName(e.target.value)}
                    placeholder="Module name"
                />
                <div className={styles.buttons}>
                    <button onClick={onRequestClose} className={styles.cancelButton}>Cancel</button>
                    <button onClick={handleEdit} className={styles.createButton}>Edit</button>
                </div>
            </div>
        </Modal>
    );
};

export default EditModuleModal;
