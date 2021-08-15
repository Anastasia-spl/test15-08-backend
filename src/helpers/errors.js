class ClientError extends Error {
  constructor(message) {
    super(message)
    this.status = 400
  }
}

class ValidationError extends ClientError {
  constructor(message) {
    super(message)
    this.status = 400
  }
}

class WrongParametersError extends ClientError {
 constructor(message) {
    super(message)
    this.status = 400
  }
}

class QueryError extends ClientError {
  constructor(message) {
    super(message)
    this.status = 400;
  }
}


module.exports = {
  ClientError,
  ValidationError,
  WrongParametersError,
  QueryError,
}