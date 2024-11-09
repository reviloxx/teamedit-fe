import React from 'react';
import { format } from 'date-fns';
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Tooltip } from '@mui/material';

const DocumentList = ({ documents, onOpenDocument, onDeleteDocument }) => {
    return (
        <ul className="list">
            {documents
                .sort((a, b) => new Date(b.createdUtc) - new Date(a.createdUtc))
                .map(document => (
                    <li key={document.id} className="list-item" onClick={() => onOpenDocument(document.id)}>
                        <span>{format(new Date(document.createdUtc), 'dd.MM.yyyy, HH:mm:ss')}</span>
                        <span>{document.title}</span>
                        <div>
                            <Tooltip title='Delete'>
                                <IconButton
                                    className="delete-button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDeleteDocument(document);
                                    }}
                                    color='error'
                                >
                                    <DeleteForeverIcon />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </li>
                ))
            }
        </ul>
    );
};

export default DocumentList;