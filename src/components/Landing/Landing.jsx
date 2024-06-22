import React, { useState } from 'react';
import Header from '../Header/Header';
import Module from '../Module/Module';
import Resource from '../Resource/Resource';
import LinkItem from '../LinkItem/LinkItem';
import AddLinkModal from '../AddLinkModal/AddLinkModal';
import styles from './Landing.module.css';
import box from '../../assets/box.png';

function Landing() {
    const [modules, setModules] = useState([]);
    const [resources, setResources] = useState([]);
    const [links, setLinks] = useState([]);
    const [linkModalOpen, setLinkModalOpen] = useState(false);
    const [currentLink, setCurrentLink] = useState(null);
    const [modalMode, setModalMode] = useState('add');

    const handleCreateModule = (moduleName) => {
        setModules([...modules, { id: Date.now(), name: moduleName, resources: [] }]);
    };

    const handleEditModule = (id, newName) => {
        setModules(modules.map((module) =>
            module.id === id ? { ...module, name: newName } : module
        ));
    };

    const handleDeleteModule = (id) => {
        setModules(modules.filter((module) => module.id !== id));
    };

    const handleUpload = (file) => {
        setResources([...resources, { id: Date.now(), name: file.name, file }]);
    };

    const handleRenameResource = (id, newName) => {
        setResources(resources.map(resource =>
            resource.id === id ? { ...resource, name: newName } : resource
        ));
    };

    const handleDeleteResource = (id) => {
        setResources(resources.filter(resource => resource.id !== id));
    };

    const handleDownloadResource = (file) => {
        const url = URL.createObjectURL(file);
        const a = document.createElement('a');
        a.href = url;
        a.download = file.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const handleAddLink = (link) => {
        setLinks([...links, { id: Date.now(), ...link }]);
    };

    const handleEditLink = (id, newLink) => {
        setLinks(links.map(link => (link.id === id ? { ...link, ...newLink } : link)));
    };

    const handleDeleteLink = (id) => {
        setLinks(links.filter(link => link.id !== id));
    };

    const openAddLinkModal = () => {
        setCurrentLink(null);
        setModalMode('add');
        setLinkModalOpen(true);
    };

    const openEditLinkModal = (link) => {
        setCurrentLink(link);
        setModalMode('edit');
        setLinkModalOpen(true);
    };

    return (
        <div className={styles.Landing}>
            <Header
                onCreateModule={handleCreateModule}
                onUpload={handleUpload}
                onAddLink={openAddLinkModal}
            />
            <div className={styles.content}>
                {modules.length === 0 && resources.length === 0 && links.length === 0 ? (
                    <div className={styles.emptyState}>
                        <img src={box} alt="Empty state" />
                        <h2>Nothing added here yet</h2>
                        <p>Click on the [+] Add button to add items to this course</p>
                    </div>
                ) : (
                    <>
                        {modules.map((module) => (
                            <Module
                                key={module.id}
                                module={module}
                                onEditModule={handleEditModule}
                                onDeleteModule={handleDeleteModule}
                            />
                        ))}
                        {resources.map((resource) => (
                            <Resource
                                key={resource.id}
                                resource={resource}
                                onRename={handleRenameResource}
                                onDownload={handleDownloadResource}
                                onDelete={handleDeleteResource}
                            />
                        ))}
                        {links.map((link) => (
                            <LinkItem
                                key={link.id}
                                link={link}
                                onEdit={() => openEditLinkModal(link)}
                                onDelete={() => handleDeleteLink(link.id)}
                            />
                        ))}
                    </>
                )}
            </div>
            <AddLinkModal
                isOpen={linkModalOpen}
                onRequestClose={() => setLinkModalOpen(false)}
                onSubmit={modalMode === 'add' ? handleAddLink : (link) => handleEditLink(currentLink.id, link)}
                initialUrl={currentLink ? currentLink.url : ''}
                initialDisplayName={currentLink ? currentLink.displayName : ''}
                mode={modalMode}
            />
        </div>
    );
}

export default Landing;
