import React from 'react';
import { format } from 'date-fns';
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const DocumentList = ({ documents, onOpenDocument, onDeleteDocument }) => {
    return (
        <ul className="list">
            {documents.sort((a, b) => a.title.localeCompare(b.title)).map(document => (
                <li key={document.id} className="list-item" onClick={() => onOpenDocument(document.id)}>
                    <span>{format(new Date(document.createdUtc), 'd.MM.yyyy, H:mm:ss')}</span>
                    <span>{document.title}</span>
                    <div>
                        <IconButton
                        className="delete-button"
                            onClick={(e) => {
                                e.stopPropagation();
                                onDeleteDocument(document);
                            }}
                            color='error'
                        >
                            <DeleteForeverIcon/>
                        </IconButton>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default DocumentList;