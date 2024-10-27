const baseUrl = "http://localhost:5251/api/documents/"

class DocumentRepositoy {   

    static async getDocumentsFromDb() {
        try {
            let response = await fetch(baseUrl);
            return await response.json(); 
        } catch (error) {
            console.error("Error fetching documents:", error);
        }                          
    };

    static async storeDocumentToDb(document) {
        try {
            await fetch(baseUrl + 'addOrUpdate', {
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

    static async deleteDocumentFromDb(documentId) {
        try {
            await fetch(baseUrl + "?" + new URLSearchParams({ id: documentId }).toString(), {
                mode: 'cors',
                method: "DELETE"
            });
        } catch (error) {
            console.error("Error storing document:", error);
        }
    }
}

export default DocumentRepositoy;