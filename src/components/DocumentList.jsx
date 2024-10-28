import React from 'react';
import { format } from 'date-fns';

const DocumentList = ({ documents, onOpenDocument, onDeleteDocument }) => {
    return (
        <ul className="list">
            {documents.sort((a, b) => a.title.localeCompare(b.title)).map(document => (
                <li key={document.id} className="list-item">
                    <span>{format(new Date(document.lastModifiedUtc), 'd.MM.yyyy, H:mm:ss')}</span>
                    <span>{document.title}</span>
                    <div>
                        <button onClick={() => onOpenDocument(document.id)} className="action-button">Open</button>
                        <button onClick={() => onDeleteDocument(document)} className="action-button delete">Delete</button>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default DocumentList;