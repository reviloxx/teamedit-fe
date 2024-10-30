import * as Y from 'yjs';
import * as base64 from "byte-base64";

const baseUrl = "/api/documents/"

class DocumentApiService {   

    static async getDocument(id) {
        try {
            let response = await fetch(baseUrl + 'byId?' + new URLSearchParams({ id }).toString());
            
            if (!response.ok) {
                console.error("Error fetching document: Status", response.status);
                return null;
            }
    
            let data = await response.json().catch(() => null);

            const loadedYDoc = new Y.Doc()
            Y.applyUpdate(loadedYDoc, base64.base64ToBytes(data.ydoc))

            data.ydoc = loadedYDoc;
    
            return data && Object.keys(data).length ? data : null;
        } catch (error) {
            console.error("Error fetching document:", error);
            return null;
        }
    };    

    static async getAllDocuments() {
        try {
            let response = await fetch(baseUrl);
            return await response.json(); 
        } catch (error) {
            console.error("Error fetching documents:", error);
        }                          
    };

    static async documentExists(id) {
        const document = await DocumentApiService.getDocument(id);
        return document !== null;
    }

    static async storeDocument(document) {
        try {
            document.ydoc = base64.bytesToBase64(Y.encodeStateAsUpdate(document.ydoc));

            await fetch(baseUrl, {
                mode: 'cors',
                method: "POST",
                body: JSON.stringify(document),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });        
        } catch (error) {
            console.error("Error storing document:", error);
        }
    }

    static async deleteDocument(document) {
        try {
            await fetch(baseUrl, {
                mode: 'cors',
                method: "DELETE",
                body: JSON.stringify(document),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
        } catch (error) {
            console.error("Error deleting document:", error);
        }
    }
}

export default DocumentApiService;