const DataUriParser = require("datauri/parser.js");
const path = require("path");

const getDataUri = (file) => {
  const parser = new DataUriParser();
  const extName = path.extname(file.originalname).toString();
  return parser.format(extName, file.buffer);

  // const base64 = file.buffer.toString("base64");
  // const mimeType = file.mimetype;
  // const content = `data:${mimeType};base64,${base64}`;
  // return { content };
};

module.exports = getDataUri;
