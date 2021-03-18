const { result } = require('../models');
const { calculate } = require('../libs/expressions');

class MainController {
    getExpressions(req, res, next) {
        try {
            result.find((err, results) => {
                if (err) {
                    next(err);
                }

                res.status(200).send({
                    results,
                });
            });
        } catch (err) {
            next(err);
        }
    }

    postExpressions(req, res, next) {
        try {
            if (!req.body.expressions) {
                result.update([], (err) => {
                    if (err) {
                        next(err);
                    }

                    res.sendStatus(400);
                });

                return;
            }

            let results = [];
            for (let expressionStr of req.body.expressions) {
                let y = calculate(expressionStr);

                if (y === undefined) {
                    result.update([], (err) => {
                        if (err) {
                            next(err);
                        }

                        res.sendStatus(400);
                    });

                    return;
                }

                results.push(y);
            }

            result.update(results, (err) => {
                if (err) {
                    next(err);
                }

                res.sendStatus(200);
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = MainController;