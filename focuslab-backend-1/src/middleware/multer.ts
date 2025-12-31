import multer from 'multer';

const stroage = multer.memoryStorage();

const upload = multer({ storage: stroage });

export default upload;      