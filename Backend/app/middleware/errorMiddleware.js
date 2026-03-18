const errorMiddleware = (err, req, res, next) => {
  console.error('Error occurred:', err);
  
  res.status(500).json({ 
    error: 'Server error occurred',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
};

module.exports = errorMiddleware;