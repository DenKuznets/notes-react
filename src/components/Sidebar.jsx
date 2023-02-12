import React from "react";

export default function Sidebar(props) {
  const noteElements = props.notes.map((note, index) => {
    let separateLines = note.body.split(/\r?\n|\r|\n/g);
    // если тело записки пустое, separateLines будет содержать только одну пустую строку. 
    let title =
      separateLines[0] === "" ? `Note ${index + 1}` : separateLines[0];
    return (
      <div key={note.id}>
        <div
          className={`title ${
            note.id === props.currentNote.id ? "selected-note" : ""
          }`}
          onClick={() => props.setCurrentNoteId(note.id)}
        >
          <h4 className="text-snippet">{title}</h4>
        </div>
      </div>
    );
  });

  return (
    <section className="pane sidebar">
      <div className="sidebar--header">
        <h3>Notes</h3>
        <button className="new-note" onClick={props.newNote}>
          +
        </button>
      </div>
      {noteElements}
    </section>
  );
}
