const router = require('express').Router();
const { dogsQueue } = require('../db/queueModule');

// get first item in the queue
const peek = queue => {
  console.log(`First node: ${queue.first.value}`);
  return queue.first.value;
};

/* ========== GET/READ DOGS PROFILES ========== */
router.get('/', function(req, res, next) {
  console.log('DOG get endpoint rendered');
  res.json(peek(dogsQueue));

});

/* ========== DELETE DOGS PROFILES ========== */
router.delete('/', function(req, res, next) {
  console.log('DOG delete endpoint rendered');
  // dequeue first item from the queue and store in the variable
  const firstNode = dogsQueue.dequeue();

  // enqueue removed item to the queue
  // we do it only for the demo purposes
  dogsQueue.enqueue(firstNode);

  res.status(204).end();

});

module.exports = router;