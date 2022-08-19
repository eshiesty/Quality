const express = require("express");
const router = express.Router();
const ToDo = require("../models/ToDo");
const requiresAuth = require("../middleware/permissions");
const validateToDoInput = require("../validation/toDoValidation");
// @route       GET /api/todos/test
// @desc Test the todos route
// @acess Public
router.get("/test", (req, res) => {
  res.send("ToDo's route working");
});

// @route       Post /api/todos/new
// @desc Create a new todo
// @acess Private
router.post("/new", requiresAuth, async (req, res) => {
  try {
    //isValed and errors are destructured from validateToDoInput
    const { isValid, errors } = validateToDoInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    //create a new todo
    const newToDo = new ToDo({
      user: req.user._id,
      content: req.body.content,
      complete: false,
    });

    //save todo to db
    await newToDo.save();
    return res.json(newToDo);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
});

// @route       GET /api/todos/current
// @desc Current users todos
// @acess Private
router.get("/current", requiresAuth, async (req, res) => {
  try {
    const completeToDos = await ToDo.find({
      user: req.user._id,
      complete: true,
    }).sort({ completedAt: -1 });

    const incompleteToDos = await ToDo.find({
      user: req.user._id,
      complete: false,
    }).sort({ createdAt: -1 });

    return res.json({ incomplete: incompleteToDos, complete: completeToDos });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
});

// @route       PUT /api/todos/:toDoId/complete
// @desc Mark a todo as complete
// @acess Private
router.put("/:toDoId/complete", requiresAuth, async (req, res) => {
  try {
    const toDo = await ToDo.findOne({
      user: req.user._id,
      _id: req.params.toDoId,
    });
    if (!toDo) {
      return res.status(404).json({ error: "Could not find ToDo" });
    }

    if (toDo.complete) {
      return res.status(400).json({ error: "ToDo is already complete" });
    }
    const updatedToDo = await ToDo.findOneAndUpdate(
      {
        user: req.user._id,
        _id: req.params.toDoId,
      },
      {
        complete: true,
        completedAt: new Date(),
      },
      {
        new: true,
      }
    );
    return res.json(updatedToDo);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
});

// @route       PUT /api/todos/:toDoId/incomplete
// @desc Mark a todo as incomplete
// @acess Private
router.put("/:toDoId/incomplete", requiresAuth, async (req, res) => {
  try {
    const toDo = await ToDo.findOne({
      user: req.user._id,
      _id: req.params.toDoId,
    });

    if (!toDo) {
      return res.status(404).json({ error: "Could not find ToDo" });
    }

    if (!toDo.complete) {
      return res.status(400).json({ error: "ToDo is already incomplete" });
    }

    const updatedToDo = await ToDo.findOneAndUpdate(
      {
        user: req.user._id,
        _id: req.params.toDoId,
      },
      {
        complete: false,
        completedAt: null,
      },
      {
        new: true,
      }
    );
    return res.json(updatedToDo);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
});

// @route       PUT /api/todos/:toDoId
// @desc Update a todo
// @acess Private
router.put("/:toDoId", requiresAuth, async (req, res) => {
  try {
    const toDo = await ToDo.findOne({
      user: req.user._id,
      _id: req.params.toDoId,
    });
    if (!toDo) {
      return res.status(404).json({ error: "Could not find ToDo" });
    }

    const { isValid, errors } = validateToDoInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const updatedToDo = await ToDo.findOneAndUpdate(
      {
        user: req.user._id,
        _id: req.params.toDoId,
      },
      {
        content: req.body.content,
      },
      {
        new: true,
      }
    );
    return res.json(updatedToDo);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
});

// @route       PUT /api/todos/:toDoId
// @desc Delete a todo
// @acess Private
router.delete("/:toDoId", requiresAuth, async (req, res) => {
  try {
    const toDo = await ToDo.findOne({
      user: req.user._id,
      _id: req.params.toDoId,
    });

    if (!toDo) {
      return res.status(404).json({ error: "could not find ToDo" });
    }

    await ToDo.findOneAndRemove({
      user: req.user._id,
      _id: req.params.toDoId,
    });
    return res.json({ sucess: true });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
});

module.exports = router;
