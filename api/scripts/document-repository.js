class DocumentRepositoy {
    static documents = [];

    static getDocuments() {
        return this.documents;
    }

    static getDocument(id) {
        return this.documents.find(x => x.id === id);
    }

    static addDocument(document) {

        this.documents = this.documents.filter(x => x.id !== document.id);
        this.documents.push(document);
    }

    static deleteDocument(document) {

        this.documents = this.documents.filter(x => x.id !== document.id);
    }
}

module.exports = DocumentRepositoy;