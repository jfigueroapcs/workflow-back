import cors from 'cors'

const ACCEPTED_ORIGINS = [
    'http://localhost:3000',
    'http://localhost:1337',
    'http://localhost:5173',
    'http://127.0.0.1:5173',
]

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors({
  origin: (origin, callback) => {
    //   console.log(origin, acceptedOrigins)
      if (acceptedOrigins.includes(origin)) {
        // console.log('existe')
        return callback(null, true)
    }
    
    if (!origin) {
        // console.log('no existe')
        return callback(null, true)
    }
    
    // console.log('se salto todo')
    return callback(new Error('Not allowed by CORS'))
  }
})