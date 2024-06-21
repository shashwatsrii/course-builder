import React, { useState } from 'react';
import Header from '../Header/Header';
import Module from '../Module/Module';
import styles from './Landing.module.css';

function Landing() {
  const [modules, setModules] = useState([]);

  const handleCreateModule = (moduleName) => {
    setModules([...modules, { id: Date.now(), name: moduleName }]);
  };

  const handleEditModule = (id, newName) => {
    setModules(modules.map((module) => 
      module.id === id ? { ...module, name: newName } : module
    ));
  };

  const handleDeleteModule = (id) => {
    setModules(modules.filter((module) => module.id !== id));
  };

  return (
    <div className={styles.Landing}>
      <Header onCreateModule={handleCreateModule} />
      <div className={styles.content}>
        {modules.length === 0 ? (
          <div className={styles.emptyState}>
            <img src="path_to_image" alt="Empty state" />
            <h2>Nothing added here yet</h2>
            <p>Click on the [+] Add button to add items to this course</p>
          </div>
        ) : (
          modules.map((module) => (
            <Module
              key={module.id}
              module={module}
              onEditModule={handleEditModule}
              onDeleteModule={handleDeleteModule}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Landing;
