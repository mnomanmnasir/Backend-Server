const testController = (req, res) => {
    res.status(200).send({
        message: "Welcome to backend project",
        success: true
    })
}

module.exports = { testController }