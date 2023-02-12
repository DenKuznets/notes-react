import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import { data } from "./data";
import Split from "react-split";
import { nanoid } from "nanoid";

export default function App() {
  const localStorageKey = "notes";
  // localStorage.setItem('myCat', 'Tom');
  // const cat = localStorage.getItem("myCat");
  // localStorage.removeItem('myCat');
  // localStorage.clear();
  // JSON.stringify() - превратить данные в строку
  // JSON.parse() - вытащить данные из строки

  const [notes, setNotes] = useState(() => {
    return JSON.parse(localStorage.getItem(localStorageKey)) || [];
  });
  const [currentNoteId, setCurrentNoteId] = useState(
    (notes[0] && notes[0].id) || ""
  );

  useEffect(() => {
    if (notes.length > 0) {
      const myJSON = JSON.stringify(notes);
      localStorage.setItem(localStorageKey, myJSON);
    } else {
      console.log("no notes");
    }
  }, [notes]);

  function createNewNote() {
    const newNote = {
      id: nanoid(),
      body: "# Type your markdown note's title here",
    };
    updateNotesList(newNote, true);
    setCurrentNoteId(newNote.id);
  }
  
  function updateNotesList(note, isNew) {
    if(isNew) setNotes((prevNotes) => [note, ...prevNotes]);
    else {
      setNotes((prevNotes => {
        // нужно удалить обновленную заметку из старого списка
        let newArr = prevNotes.filter((item) => !(item.id === note.id));
        // и поместить ее в начале массива
        return [note, ...newArr];
      }))
    }
  }

  function updateNote(text) {
    setNotes((oldNotes) =>
      oldNotes.map((oldNote) => {
        let currentNote = oldNote;
        if (oldNote.id === currentNoteId) {
          currentNote = { ...oldNote, body: text };
          updateNotesList(currentNote, false);
        }
        return currentNote;
      })
    );
  }

  function findCurrentNote() {
    return (
      notes.find((note) => {
        return note.id === currentNoteId;
      }) || notes[0]
    );
  }

  return (
    <main>
      {notes.length > 0 ? (
        <Split sizes={[30, 70]} direction="horizontal" className="split">
          <Sidebar
            notes={notes}
            currentNote={findCurrentNote()}
            setCurrentNoteId={setCurrentNoteId}
            newNote={createNewNote}
          />
          {currentNoteId && notes.length > 0 && (
            <Editor currentNote={findCurrentNote()} updateNote={updateNote} />
          )}
        </Split>
      ) : (
        <div className="no-notes">
          <h1>You have no notes</h1>
          <button className="first-note" onClick={createNewNote}>
            Create one now
          </button>
        </div>
      )}
    </main>
  );
}
