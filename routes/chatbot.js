const router = require("express").Router()
const axios = require("axios")
router.post('/chat', (req, res) => {
    axios({
        method: 'post',
        url: `http://api.brainshop.ai/get?bid=169448&key=qRBpQyxeVdL5lEUS&uid=[uid]&msg=${req.body.msg}`
    }).then((data) => {
        res.json({
            success: true,
            msg: data.data.cnt
        })
    }).catch((err) => {
        res.json({
            success: false,
            reason: err.code
        })
    })
})
module.exports = router
