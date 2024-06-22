import React from 'react';
import { useDrag } from 'react-dnd';
import { FaLink, FaEllipsisV } from 'react-icons/fa';
import styles from './LinkItem.module.css';

const LinkItem = ({ link, onEdit, onDelete, isPartOfModule }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'link',
    item: { id: link.id, type: 'link' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.4 : 1;

  return (
    <div ref={!isPartOfModule ? drag : null} className={styles.linkItem} style={{ opacity }}>
      <div className={styles.linkIcon}>
        <FaLink />
      </div>
      <div className={styles.linkInfo}>
        <a href={link.url} target="_blank" rel="noopener noreferrer">
          {link.displayName}
        </a>
        <span>Link</span>
      </div>
      {!isPartOfModule && (
        <div className={styles.linkActions}>
          <FaEllipsisV />
          <div className={styles.dropdown}>
            <p onClick={onEdit}>Edit</p>
            <p onClick={onDelete}>Delete</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LinkItem;
