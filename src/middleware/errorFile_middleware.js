const errorFIleMiddleware = (err, req, res, next) => {
  if (err.code === "UNSUPPORTED_MEDIA_TYPE") {
    // Tangkap error fileFilter dan kirimkan respons kesalahan yang sesuai
    res.status(415).json({ status: false, error: "Format file tidak valid" });
    return;
  }
  return next();
};

export default errorFIleMiddleware;
