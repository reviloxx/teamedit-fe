import React, { Component } from 'react';

class DocumentListHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            documentName: ''
        }
    }

    handleInputChange = (event) => {
        const value = event.target.value;
        this.setState({ documentName: value });
    }

    handleAddDocument = () => {
        this.props.onAddDocument(this.state.documentName);
        this.setState({ documentName: '' });
    }

    render() {
        const { isAdding, onCancelAddDocument, onShowAddDocument, onRefresh } = this.props;

        return (
            <div className='list-header-container'>
                {isAdding ? (
                    <div>
                        <input
                            type="text"
                            value={this.state.documentName}
                            onChange={this.handleInputChange}
                            placeholder="Document name"
                            className="input"
                        />
                        <button onClick={this.handleAddDocument} className="action-button">Confirm</button>
                        <button onClick={onCancelAddDocument} className="action-button cancel">Cancel</button>
                    </div>
                ) : (
                    <div>
                        <button onClick={onShowAddDocument} className="action-button add">New</button>
                        <button onClick={onRefresh} className="action-button">Reload</button>
                    </div>
                )}
            </div>
        );
    }
}

export default DocumentListHeader;
