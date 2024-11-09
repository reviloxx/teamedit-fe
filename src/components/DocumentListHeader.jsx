import React, { Component } from 'react';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import CachedIcon from '@mui/icons-material/Cached';
import { Tooltip } from '@mui/material';

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
                <h2>Documents</h2>
                {isAdding ? (
                    <div>
                        <input
                            type="text"
                            value={this.state.documentName}
                            onChange={this.handleInputChange}
                            placeholder="Document name"
                            className="input"
                            maxLength={50}
                        />
                        <Tooltip title='Confirm'>
                            <IconButton onClick={this.handleAddDocument} color='success'><CheckCircleIcon/></IconButton>
                        </Tooltip>
                        <Tooltip title='Cancel'>
                            <IconButton onClick={onCancelAddDocument} color='error'><CancelIcon/></IconButton>
                        </Tooltip>
                    </div>
                ) : (
                    <div>
                        <Tooltip title='Add document'>
                            <IconButton onClick={onShowAddDocument} color='success'><NoteAddIcon/></IconButton>
                        </Tooltip>
                        <Tooltip title='Refresh list'>
                            <IconButton onClick={onRefresh} color='secondary'><CachedIcon/></IconButton>
                        </Tooltip>
                    </div>
                )}
            </div>
        );
    }
}

export default DocumentListHeader;