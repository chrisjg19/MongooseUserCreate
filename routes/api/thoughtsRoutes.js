const router = require('express').Router();

const {
    getThoughts,
    getThoughtId,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction,
} = require ('../../controllers/thoughtsController');

router.route('/').get(getThoughts).post(createThought);

router
    .route('/:thoughtId')
    .get(getThoughtId)
    .put(updateThought)
    .delete(deleteThought);

router
    .route('/:thoughtId/reactions').post(addReaction);

router
    .route('/:thoughtId.reactions/:reactionId').delete(removeReaction);

module.exports = router;

