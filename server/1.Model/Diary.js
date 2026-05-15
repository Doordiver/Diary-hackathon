const db = require("../DB/connect")

class Diary {
    constructor({ entry_id, entry_date, entry_body, category }) {
        this.entry_id = entry_id
        this.entry_date = entry_date
        this.entry_body = entry_body
        this.category = category
    }

    static async getAll() {
        const response = await db.query("SELECT * FROM diary;")

        if(response.rows.length === 0) {
            throw new Error("No diary entries found")
        }

        return response.rows.map(d => new Diary(d))
    }

    static async getOneByEntryId(entry_id) {
        const response = await db.query("SELECT * FROM diary WHERE entry_id = $1;", [entry_id])

        if(response.rows.length === 0) {
            throw new Error("No diary entry found with that id")
        }

        return new Diary(response.rows[0])
    }

    static async getOneByCategory(category) {
        const response = await db.query("SELECT * FROM diary WHERE category = $1;", [category])

        if(response.rows.length === 0) {
            throw new Error("No diary entry found with that category")
        }

        return new Diary(response.rows[0])
    }

    static async getOneByEntryDate(entry_date) {
        const response = await db.query("SELECT * FROM diary WHERE entry_date = $1;", [entry_date])

        if(response.rows.length === 0) {
            throw new Error("No diary entry with that date")
        }

        return new Diary(response.rows[0])
    }

    static async create(data) {
        const { entry_date, entry_body, category } = data
        const response = await db.query("INSERT INTO snacks (entry_date, entry_body, category) VALUES ($1, $2, $3) RETURNING *;", [entry_date, entry_body, category])
        const entryId = response.rows[0].entry_id
        const newEntry = await Diary.getOneByEntryId(entryId)
        return newEntry
    }

    async update(data) {
        const response = await db.query("UPDATE diary SET entry_body = $1 WHERE entry_id = $2 RETURNING *;", 
            [data.entry_body, this.entry_id])
        
        if (response.rows.lenght != 1) {
            throw new Error("Unable to update diary entry")
        }
        return new Diary(response.rows[0])
    }

    async destroy() {
        const response = await db.query('DELETE FROM diary WHERE entry_id = $1 RETURNING *;', [this.entry_id]);

        if (response.rows.length != 1) {
          throw new Error("Unable to delete diary entry.")
        }

        return new Diary(response.rows[0]);
    }
}

module.exports = Diary

 