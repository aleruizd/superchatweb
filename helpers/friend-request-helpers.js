const errorMessage = (res,message) => {
    res.send({
        ok: false,
        message
    })
}

module.exports = {
    errorMessage
}