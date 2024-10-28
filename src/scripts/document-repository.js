const baseUrl = "/api/documents/"

class DocumentRepositoy {   

    static async getDocument(id) {
        try {
            let response = await fetch(baseUrl + 'byId?' + new URLSearchParams({
                id: id
            }).toString())

            return await response.json(); 
        } catch (error) {
            console.error("Error fetching documents:", error);
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

    static async storeDocument(document) {
        try {
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

    /* static async deleteDocumentFromDb(documentId) {
        try {
            await fetch(baseUrl + "?" + new URLSearchParams({ id: documentId }).toString(), {
                mode: 'cors',
                method: "DELETE"
            });
        } catch (error) {
            console.error("Error storing document:", error);
        }
    } */
}

export default DocumentRepositoy;