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
        this.setState({ isAdding: true });
    };

    handleCancelAddDocument = () => {
        this.setState({ isAdding: false });
    };

    handleAddDocument = async (newDocumentName) => {
        const { documents } = this.state;
        const newDocument = { id: crypto.randomUUID(), title: newDocumentName, lastModifiedUtc: new Date().toISOString(), ydoc: new Y.Doc() };
        await DocumentApiService.storeDocument(newDocument);
        
        this.setState({
            documents: [...documents, newDocument],
            isAdding: false
        });
    };

    handleOpenDocument = async (id) => {
        if (!await DocumentApiService.documentExists(id)) {
            this.setState(prevState => ({
                documents: prevState.documents.filter(doc => doc.id !== id)
            }));

            return;
        }

        const document = await DocumentApiService.getDocument(id);
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

        if (await DocumentApiService.documentExists(currentDocument.id)) {
            await DocumentApiService.storeDocument(currentDocument);
        }
        
        await this.fetchData();
        this.setState({ isEditing: false });
    };

    render() {
        const { documents, currentDocument, isEditing, isAdding } = this.state;

        return (
            <div className="container">
                {isEditing ? (
                    <DocumentEditor 
                        document={currentDocument}
                        onClose={this.handleCloseEditor} 
                    />
                ) : (
                    <div className="list-container">
                        <DocumentListHeader 
                            isAdding={isAdding}
                            onAddDocument={this.handleAddDocument}
                            onCancelAddDocument={this.handleCancelAddDocument}
                            onShowAddDocument={this.handleShowAddDocument}
                            onRefresh={this.fetchData}
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