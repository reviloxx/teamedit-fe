import * as Y from 'yjs';
import * as base64 from "byte-base64";

class YdocCompressionUtils {
    static toBase64(ydoc) {
        return base64.bytesToBase64(Y.encodeStateAsUpdate(ydoc));
    }

    static fromBase64(ydoc) {
        const loadedYDoc = new Y.Doc();
        Y.applyUpdate(loadedYDoc, base64.base64ToBytes(ydoc));
        return loadedYDoc;
    }
}

export default YdocCompressionUtils;