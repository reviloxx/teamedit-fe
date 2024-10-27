import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import Editor from './Editor';
import '../styles/ItemList.css';

const baseUrl = "http://localhost:5251/documents/"

const ItemList = () => {
    var [items, setItems] = useState([]);
    const [currentItem, setCurrentItem] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [newItemName, setNewItemName] = useState('');

    useEffect(() => { fetchData(); });

    const fetchData = async () => {
        const data = await getItemsFromDb();
        setItems(data);
    }    

    const getItemsFromDb = async () => {
        let response = await fetch(baseUrl);

        if (!response.ok) {
            console.error("Error fetching items:", response.error);
            return;
        }

        return await response.json();                  
    };

    const storeItemToDb = async (item) => {
        try {
            await fetch(baseUrl + 'addOrUpdate', {
                mode: 'cors',
                method: "POST",
                body: JSON.stringify(item),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });        
        } catch (error) {
            console.error("Error storing item:", error);
        }
    }

    const deleteItemFromDb = async (itemId) => {
        try {
            await fetch(baseUrl + "?" + new URLSearchParams({ id: itemId }).toString(), {
                mode: 'cors',
                method: "DELETE"
            });
        } catch (error) {
            console.error("Error storing item:", error);
        }
    }

    const handleShowAddItem = () => {
        setIsAdding(true);
    };

    const handleAddItem = async () => {
        let newItem = { id: crypto.randomUUID(), title: newItemName, lastModifiedUtc: new Date().toISOString() };
        await storeItemToDb(newItem);
        setItems([...items, newItem]);
        setNewItemName('');
        setIsAdding(false);
    };

    const handleCancelAddItem = () => {
        setNewItemName('');
        setIsAdding(false);
    }
    
    const handleDeleteItem = async (itemId) => {
        await deleteItemFromDb(itemId);
        setItems(items.filter(item => item.id !== itemId));
    };
    
    const handleOpenItem = async (itemId) => {
        let item = items.find(x => x.id == itemId)

        if (item == null)
            return;

        setCurrentItem(item);
        setIsEditing(true);
    };
    
    const handleBackToList = async () => {
        await storeItemToDb(currentItem);
        setIsEditing(false);
    };

    return (
        <div className="container">
            {isEditing ? (
                <div className="editor-container">
                    <h5>{currentItem.title}</h5>
                    <Editor item={currentItem}></Editor>
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
                                value={newItemName}
                                onChange={(e) => setNewItemName(e.target.value)}
                                placeholder="Enter name"
                                className="input"
                            />
                                <button onClick={handleAddItem} className="action-button">Confirm</button>
                                <button onClick={handleCancelAddItem} className="action-button delete">Cancel</button>
                        </div>
                    ) : (
                        <button onClick={handleShowAddItem} className="action-button">Add Document</button>
                    )}
                        <ul className="list">
                            {items.sort((a, b) => a.title.localeCompare(b.title)).map(item => (
                                <li key={item.id} className="list-item">
                                    <span>{format(item.lastModifiedUtc, 'd.MM.yyyy, H:mm:ss')}</span>
                                    <span>{item.title}</span>                                    
                                <div>
                                    <button onClick={() => handleOpenItem(item.id)} className="action-button">Open</button>
                                    <button onClick={() => handleDeleteItem(item.id)} className="action-button delete">Delete</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ItemList;
