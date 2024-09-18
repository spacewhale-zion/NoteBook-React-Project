
const express=require('express');
const router=express.Router();
const fetchuser= require('../midddleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult, matchedData } = require('express-validator');




// ROUTE 1: GET all the notes
router.get('/fetchallnotes',fetchuser, async(req,res)=>{
    const notes=await Notes.find({user:req.user.id})
    res.json(notes);
    
})


// ROUTE 2: Add new note

router.post('/addnotes',
    [
        body('title', 'Name should be more than 3 characters').isLength({ min: 3 }).escape(),
        body('description', 'Enter a valid Email').isLength({ min: 5 }).escape(),
],fetchuser, async(req,res)=>{
    try {
        const result = validationResult(req);
        const { title,description,tag } = req.body;
      
        if (!result.isEmpty()) {
           return res.status(400).json({ errors: result.array() });
        }
        const note=new Notes({
          title,description,tag,user:req.user.id
        })
        const saveNote = await note.save();
        res.json(saveNote); 
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');   
    }
 
})

// ROUTE 3: Update an existing note
router.put('/updatenotes/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;

    const newNote = {};
    if (title) { newNote.title = title };
    if (description) { newNote.description = description };
    if (tag) { newNote.tag = tag };

    try {
        let note = await Notes.findById(req.params.id);

        if (!note) {
            return res.status(404).send('Note not found');
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(403).send("Not Allowed");
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });

        res.json({ note });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});



// ROUTE 3: Delete an existing note
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;


    try {
        let note = await Notes.findById(req.params.id);

        if (!note) {
            return res.status(404).send('Note not found');
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(403).send("Not Allowed");
        }

        note = await Notes.findByIdAndDelete(req.params.id);

        res.json({ "Success" :" Note Has been deleted"});
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error',note);
    }
});

module.exports = router;