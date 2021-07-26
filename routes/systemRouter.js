import express from 'express';

const systemRouter = express.Router();

systemRouter.route('/')
.get((req,res,next) => {
    systems.find({})
    .then((systems) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(systems);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    systems.create(req.body)
    .then((system) => {
        console.log('system Created ', system);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(system);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    systems.findByIdAndUpdate(req.body._id, {
        $push: { temperature: req.body.temperature }
    }, { new: true })
    .then((system) => {
        console.log('system Created ', system);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(system);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    systems.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

export default systemRouter;