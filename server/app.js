import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import db from "./db/supabase.js"

dotenv.config()
const app = express()

app.use(express.json());

app.use(cors({
    origin: `http://localhost:${process.env.CLIENT_PORT}`
}))


app.listen(process.env.SERVER_PORT, () => {
    console.log(
        `Server is running on ${process.env.SERVER_PORT}`
    )
})

app.get('/:name', async (req, res) => {
    const { name } = req.params;
    const { data, error } = await db
        .from('person')
        .select('*')
        .ilike('name', name) // Filter where name matches

    if (error) {
        console.log("Error fetching data:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }

    if (!data || data.length === 0) {
        return res.status(404).json({ error: "User not found" });
    }

    res.json(data[0]); // Send first matching user
});

app.post("/add-user", async (req, res) => {
    try {
        const { name, year, description, fun_fact } = req.body; // Expecting JSON data

        // Insert into Supabase
        const { data, error } = await db
            .from("person") // Change "users" to your actual table name
            .insert([{ name, year, description, fun_fact }]);

        if (error) throw error;

        res.status(201).json({ message: "User added successfully", data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
