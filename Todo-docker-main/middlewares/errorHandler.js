const errorHandler = (err, req, res, next) => {

  console.log(err)

  if(err.name === "ErrorNotFound") {
      res.status(404).json({message: "Error Not Found"})
  } else if(err.name === "SequelizeValidationError") {
      res.status(400).json({
          name: err.name,
          message: err.message
      })
  } 
  
  else {
      res.status(500).json({message: "Internal Server Error"})
  }
}

module.exports = errorHandler