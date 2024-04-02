
const getValidValueFromBuffer = (object) => {

    if (Buffer.isBuffer(object)) {
        return JSON.parse(object.toString())
    }
    return object
}

module.exports = getValidValueFromBuffer