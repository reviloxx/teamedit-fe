import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import Editor from './Editor';
import '../styles/DocumentList.css';
import DocumentRepositoy from '../scripts/document-repository';

const DocumentList = () => {
    const [documents, setDocuments] = useState([]);
    const [currentDocument, setCurrentDocument] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [newDocumentName, setNewDocumentName] = useState('');

    useEffect(() => { fetchData(); }, []);

    const fetchData = async () => {
        const data = await DocumentRepositoy.getDocumentsFromDb();

        if (data != undefined)
            setDocuments(data);
    }        

    const handleShowAddDocument = () => {
        setIsAdding(true);
    };

    const handleCancelAddDocument = () => {
        setNewDocumentName('');
        setIsAdding(false);
    }

    const handleAddDocument = async () => {
        let newDocument = { id: crypto.randomUUID(), title: newDocumentName, lastModifiedUtc: new Date().toISOString() };
        await DocumentRepositoy.storeDocumentToDb(newDocument);
        setDocuments([...documents, newDocument]);
        setNewDocumentName('');
        setIsAdding(false);
    };    

    const handleOpenDocument = async (documentId) => {
        setCurrentDocument(document);
        setIsEditing(true);
    };
    
    const handleDeleteDocument = async (document) => {
        await DocumentRepositoy.deleteDocumentFromDb(document);
        setDocuments(documents.filter(x => x.id !== document.id));
    };       
    
    const handleBackToList = async () => {
        await DocumentRepositoy.storeDocumentToDb(currentDocument);
        setIsEditing(false);
    };

    return (
        <div className="container">
            {isEditing ? (
                <div className="editor-container">
                    <h5>{currentDocument.title}</h5>
                    <Editor document={currentDocument}></Editor>
                    <div className="button-container">
                        <button onClick={handleBackToList} className="button" style={{ backgroundColor: '#f0a500' }}>
                            Close
                        </button>
                    </div>
                </div>
            ) : (
                <div className="list-container">
                    {isAdding ? (
                        <div>
                            <input
                                type="text"
                                value={newDocumentName}
                                onChange={(e) => setNewDocumentName(e.target.value)}
                                placeholder="Enter document name"
                                className="input"
                            />
                                <button onClick={handleAddDocument} className="action-button">Confirm</button>
                                <button onClick={handleCancelAddDocument} className="action-button delete">Cancel</button>
                        </div>
                    ) : (
                        <button onClick={handleShowAddDocument} className="action-button">Add Document</button>
                    )}
                        <ul className="list">
                            {documents.sort((a, b) => a.title.localeCompare(b.title)).map(document => (
                                <li key={document.id} className="list-item">
                                    <span>{format(document.lastModifiedUtc, 'd.MM.yyyy, H:mm:ss')}</span>
                                    <span>{document.title}</span>                                    
                                <div>
                                    <button onClick={() => handleOpenDocument(document.id)} className="action-button">Open</button>
                                    <button onClick={() => handleDeleteDocument(document)} className="action-button delete">Delete</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DocumentList;
