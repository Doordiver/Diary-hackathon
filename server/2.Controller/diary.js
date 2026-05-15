const Diary = require('../1.Model/Diary');

async function index(req, res) {
    try {
        const diaries = await Diary.getAll();
        res.status(200).json(diaries);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function showEntry(req, res) {
    try {
        let id = req.params.id;
        const diary = await Diary.getOneByEntryId(id);
        res.status(200).json(diary);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

async function showCategory(req, res) {
    try {
        let category = req.params.category;
        const diary = await Diary.getOneByCategory(category);
        res.status(200).json(diary);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

async function showDate(req, res) {
    try {
        let date = req.params.date;
        const diary = await Diary.getOneByEntryDate(date);
        res.status(200).json(diary);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

async function create(req, res) {
    try {
        const data = req.body;
        const newDiary = await Diary.create(data);
        res.status(201).json(newDiary);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

async function update(req, res) {
    try {
        const id = req.params.id;
        const data = req.body;
        const diary = await Diary.getOneByEntryId(id);
        const result = await diary.update(data);
        res.status(200).json(result);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

async function destroy(req, res) {
    try {
        const id = req.params.id;
        const diary = await Diary.getOneById(id);
        const result = await diary.destroy();
        res.status(204).end();
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};

module.exports = { index, showEntry, showCategory, showDate, create, update, destroy }
