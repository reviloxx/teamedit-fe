import React, { Component } from 'react';
import * as Y from 'yjs';
import ApiClient from '../scripts/api-client';
import DocumentEditor from './DocumentEditor';
import DocumentList from './DocumentList';
import DocumentListHeader from './DocumentListHeader';
import UserGenerator from '../scripts/user-generator';

class CollaborationApp extends Component {
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
        const data = await ApiClient.getAll();
        if (data) {
            this.setState({ documents: data });
        }
    };

    handleShowAddDocument = () => { this.setState({ isAdding: true }); };
    
    handleCancelAddDocument = () => { this.setState({ isAdding: false }); };

    handleAddDocument = async (newDocumentName) => {
        const { documents } = this.state;
        const newDocument = { id: crypto.randomUUID(), title: newDocumentName, createdUtc: new Date().toISOString(), ydoc: new Y.Doc() };
        await ApiClient.create(newDocument);
        
        this.setState({
            documents: [...documents, newDocument],
            isAdding: false
        });
    };

    handleOpenDocument = async (id) => {
        const document = await ApiClient.getById(id);

        if (document === null) {
            this.setState(prevState => ({ documents: prevState.documents.filter(doc => doc.id !== id) }));
            return;
        }

        this.setState({ currentDocument: document, isEditing: true });
    };

    handleDeleteDocument = async (document) => {
        await ApiClient.delete(document);
        this.setState(prevState => ({
            documents: prevState.documents.filter(doc => doc.id !== document.id)
        }));
    };

    handleCloseEditor = async () => {        
        const { currentDocument } = this.state;
        const document = await ApiClient.getById(currentDocument.id);

        // only update if the document was not deleted in the meantime
        if (document !== null) {
            await ApiClient.update(currentDocument);
        } else {
            await ApiClient.create(currentDocument);
        }
        
        this.setState({ isEditing: false });
    };

    render() {
        const { documents, currentDocument, isEditing, isAdding } = this.state;
        const { currentUser } = this.props;

        return (
            <div className="container">
                {isEditing ? (
                    <DocumentEditor 
                        currentUser={currentUser}
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

export default CollaborationApp;