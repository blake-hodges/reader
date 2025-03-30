
const handleServerError = (res, err, context = 'Internal Server Error') => {
    const timestamp = new Date().toISOString()
    const errorMessage = `[ERROR] ${timestamp}: ${err.message}`
    console.log(errorMessage)
    return res.status(500).json({
        message: context
    })
}

module.exports = handleServerError