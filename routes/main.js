
const { Router } = require('express');

const { MainController } = require('../controllers');

const mainController = new MainController();

const router = Router();

router.post('/data', mainController.postExpressions);
router.get('/result', mainController.getExpressions);

module.exports = router;