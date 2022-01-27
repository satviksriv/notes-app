const fs = require("fs");
const chalk = require("chalk");

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find((note) => note.title === title);

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body
    });
    saveNotes(notes);
    console.log(chalk.green.inverse("New note added!"));
  } else {
    console.log(chalk.red.inverse("Note tile taken!"));
  }

}

const removeNote = (title) => {
  const notes = loadNotes();
  const macthedNotes = notes.filter((note) => note.title !== title);

  if (notes.length > macthedNotes.length) {
    saveNotes(macthedNotes);
    console.log(chalk.green.inverse("Note removed!"));
  } else {
    console.log(chalk.red.inverse("No note found!"));
  }
}

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.inverse("Your notes..."));
  notes.forEach((note) => console.log(note.title));
}

const readNote = (title) => {
  const notes = loadNotes();
  const matchedNote = notes.find((note) => note.title === title);
  if (matchedNote) {
    console.log(chalk.inverse(matchedNote.title));
    console.log(matchedNote.body);
  } else {
    console.log(chalk.inverse.red("No note found!"));
  }
}

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
}

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
}

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
};
