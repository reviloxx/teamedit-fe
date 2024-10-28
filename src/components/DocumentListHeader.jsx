import React, { Component } from 'react';

class DocumentListHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            documentName: '',
        };
    }

    handleInputChange = (event) => {
        const value = event.target.value;
        this.setState({ documentName: value });
    };

    handleAddDocument = () => {
        this.props.onAddDocument(this.state.documentName);
        this.setState({ documentName: '' });
    };

    render() {
        const { isAdding, onCancelAddDocument, onShowAddDocument } = this.props;

        return (
            <div>
                {isAdding ? (
                    <div>
                        <input
                            type="text"
                            value={this.state.documentName}
                            onChange={this.handleInputChange}
                            placeholder="Enter document name"
                            className="input"
                        />
                        <button onClick={this.handleAddDocument} className="action-button">Confirm</button>
                        <button onClick={onCancelAddDocument} className="action-button delete">Cancel</button>
                    </div>
                ) : (
                    <button onClick={onShowAddDocument} className="action-button">Add Document</button>
                )}
            </div>
        );
    }
}

export default DocumentListHeader;
