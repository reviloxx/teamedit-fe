import React, { Component } from 'react';
import * as Y from 'yjs';
import DocumentApiService from '../scripts/document-api-service';
import DocumentEditor from './DocumentEditor';
import DocumentList from './DocumentList';
import DocumentListHeader from './DocumentListHeader';
import '../styles/DocumentManager.css';


class DocumentManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            documents: [],
            currentDocument: null,
            isEditing: false,
            isAdding: false
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        const data = await DocumentApiService.getAllDocuments();
        if (data) {
            this.setState({ documents: data });
        }
    };

    handleShowAddDocument = async () => {
        await this.fetchData();
        this.setState({ isAdding: true });
    };

    handleCancelAddDocument = () => {
        this.setState({ isAdding: false });
    };

    handleAddDocument = async (newDocumentName) => {
        const { documents } = this.state;
        const newDocument = { id: crypto.randomUUID(), title: newDocumentName, lastModifiedUtc: new Date().toISOString() };
        await DocumentApiService.storeDocument(newDocument);
        this.setState({
            documents: [...documents, newDocument],
            isAdding: false
        });
    };

    handleOpenDocument = async (id) => {
        const document = await DocumentApiService.getDocument(id);

        if (await this.documentWasDeleted(id)) {
            this.removeDocumentFromList(id);
            return;
        }

        this.setState({ currentDocument: document, isEditing: true });
    };

    handleDeleteDocument = async (document) => {
        await DocumentApiService.deleteDocument(document);
        this.setState(prevState => ({
            documents: prevState.documents.filter(doc => doc.id !== document.id)
        }));
    };

    handleCloseEditor = async () => {        
        const { currentDocument } = this.state;

        if (!await this.documentWasDeleted(currentDocument.id)) {
            await DocumentApiService.storeDocument(currentDocument);
        }
        
        await this.fetchData();
        this.setState({ isEditing: false });
    };

    async documentWasDeleted(id) {
        const document = await DocumentApiService.getDocument(id);
        return document === null;
    }

    removeDocumentFromList(id) {
        this.setState(prevState => ({
            documents: prevState.documents.filter(doc => doc.id !== id)
        }));
    }

    render() {
        const { documents, currentDocument, isEditing, isAdding } = this.state;

        return (
            <div className="container">
                {isEditing ? (
                    <DocumentEditor 
                        document={currentDocument}                         
                        yDoc={new Y.Doc()} 
                        onClose={this.handleCloseEditor} 
                    />
                ) : (
                    <div className="list-container">
                        <DocumentListHeader 
                            isAdding={isAdding}
                            onAddDocument={this.handleAddDocument}
                            onCancelAddDocument={this.handleCancelAddDocument}
                            onShowAddDocument={this.handleShowAddDocument}
                        />
                        <DocumentList 
                            documents={documents} 
                            onOpenDocument={this.handleOpenDocument} 
                            onDeleteDocument={this.handleDeleteDocument}
                        />
                    </div>
                )}
            </div>
        );
    }
}

export default DocumentManager;