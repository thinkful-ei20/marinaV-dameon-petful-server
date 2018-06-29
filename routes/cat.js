const router = require('express').Router();
const { catsData } = require('../db/seedData');
const { catsQueue } = require('../db/queueModule');

// get first item in the queue
const peek = queue => {
  console.log(`First node: ${queue.first.value}`);
  return queue.first.value;
};

/* ========== GET/READ CAT PROFILE ========== */
router.get('/', function(req, res, next) {
  console.log('CAT get endpoint rendered');

  res.json(peek(catsQueue));

});

/* ========== DELETE CATS PROFILES ========== */
router.delete('/', function(req, res, next) {
  console.log('CAT delete endpoint rendered');

  // dequeue first item from the queue and store in the variable
  const firstNode = catsQueue.dequeue();

  // enqueue removed item to the queue
  // we do it only for the demo purposes
  catsQueue.enqueue(firstNode);

  res.status(204).end();
});

module.exports = router;