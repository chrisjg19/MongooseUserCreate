const {  User, Thought } = require('../models');


module.exports = {
    getAllUsers(req, res){
        Thought.find()
        .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
    },
    getUserId(req,res){
        Thought.findOne({_id: req.params.userId})
        .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
    },
    createUser(req, res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => {
          console.log(err); 
          return res.status(500).json(err);
        }); 
    },
    updateUser(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.usertId },
          { $set: req.body },
          { runValidators: true, New: true }
        )
        
          .then((user) =>  
            !user 
              ? res.status(404).json({ message: "No User found with this ID!" })
              : res.json(user) 
          )
          .catch((err) => res.status(500).json(err));
      },
      deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
          .then((user) =>
            !user
              ? res.status(404).json({ message: "No user found with this ID!" })
              : Thought.deleteMany({_id: {$in: user.thoughts}})
          )
          .then((result) =>
        !result
          ? res.json({ message: 'User and thought deleted' })
          : null
      )
          .catch((err) => res.status(500).json(err));
      },
      addFriend(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $addToSet: { friends: req.params.friendId } }, 
          { runValidators: true, new: true }
        )
          .then((user) =>
            !user
              ? res.status(404).json({ message: "No thought found with this ID!" })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      },
    removeFriend(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $pull: { reactions: req.params.friendId  } },
          { runValidators: true, new: true }
        )
       
          .then((user) =>
            !user
              ? res.status(404).json({ message: "No user found with this ID!" })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      }
};