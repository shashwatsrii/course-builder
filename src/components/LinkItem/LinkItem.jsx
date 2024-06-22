// src/components/LinkItem/LinkItem.jsx
import React from 'react';
import { FaLink, FaEllipsisV } from 'react-icons/fa';
import styles from './LinkItem.module.css';

const LinkItem = ({ link, onEdit, onDelete }) => {
  return (
    <div className={styles.linkItem}>
      <div className={styles.linkIcon}>
        <FaLink />
      </div>
      <div className={styles.linkInfo}>
        <a href={link.url} target="_blank" rel="noopener noreferrer">
          {link.displayName}
        </a>
        <span>Link</span>
      </div>
      <div className={styles.linkActions}>
        <FaEllipsisV />
        <div className={styles.dropdown}>
          <p onClick={onEdit}>Edit</p>
          <p onClick={onDelete}>Delete</p>
        </div>
      </div>
    </div>
  );
};

export default LinkItem;
