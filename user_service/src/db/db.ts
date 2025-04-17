import mongoose from 'mongoose'
import ENV from '../config/env'


const moongoURL = ENV.mongoURL as string



export default (async () => {
    try {
        await mongoose.connect(moongoURL)
        console.log('mongo db connect')
    } catch (error) {
        console.log('error:', error)
        process.exit(1);
    }
})()