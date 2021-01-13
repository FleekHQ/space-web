export default (buffer, mimeType) => URL.createObjectURL(new Blob(buffer, { type: mimeType }));
