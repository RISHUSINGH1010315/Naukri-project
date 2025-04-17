import DataURIParser from "datauri/parser.js";
import path from "path";

const getDataUri = (file) => {
    const parser = new DataURIParser();
    const extname = path.extname(file.originalname).toString(); // ✅ fixed
    return parser.format(extname, file.buffer); // also fix: extName → extname
};

export default getDataUri;
