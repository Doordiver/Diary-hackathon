const { Router } = require('express');
const diaryController = require('../2.Controller/diary')

const diaryRouter = Router();

diaryRouter.get("/", diaryController.index);
diaryRouter.get("/:id", diaryController.show);

diaryRouter.post("/", diaryController.create);
diaryRouter.patch("/:id", diaryController.update);
diaryRouter.delete("/:id", diaryController.destroy);

module.exports = diaryRouter;