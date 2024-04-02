
const apiResponse = (success, message, data = null) => {
    
    const apiResponse = {
        success: success,
        message: message,
        data
    }

    console.log('apiResponse: ', apiResponse)
    return apiResponse
}

module.exports = {
    apiResponse
}
