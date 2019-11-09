let express = require('express');
let router = express.Router();

router.get('/', async(req, res) => {
   return res.render('api_info', {layout: 'layout'})
});

module.exports = router;