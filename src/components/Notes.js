import { useEffect, useState } from "react";
import axios from "axios";
import "./Notes.css";
import { useHistory } from "react-router-dom";

const Loading = () => <div>Loading...</div>

const Notes = () => {

    const [notes, setNotes] = useState({});
    const [copyNotes, setCopyNotes] = useState({});
    const history = useHistory();

    useEffect(() => {
        axios.get("http://localhost:3500/notes")
            .then(res => {
                const tempNotes = {};
                res.data.forEach(note => {
                    tempNotes[note.id] = {
                        title: note.title,
                        description: note.description,
                        author: note.author,
                        status: note.status
                    }
                });
                setNotes(tempNotes);
                setCopyNotes(res.data);
            })
            .catch(err => console.error(err));
    }, []);

    const createNoteHandler = () => history.push("create-note");

    const editHandler = id => history.push({
        pathname: "create-note",
        state: { id: id }
    });

    const deleteHandler = id => {
        axios.delete("http://localhost:3500/notes/" + id)
            .then(_ => {
                const tempNotes = Object.fromEntries(Object.entries(notes).filter(([key, _]) => key !== id));
                setNotes(tempNotes);
            })
            .catch(err => console.error(err));
    }

    const searchHandler = (e) => {
        const search = e.target.value;
        const toSearchNotes = copyNotes.map(note => {
            return {
                ...note,
                status: note.status ? "done" : "pending"
            }
        });
        const searchedNotes = toSearchNotes.filter(note => note.id.toString().includes(search) || note.author.includes(search) || note.status.includes(search));
        const tempNotes = {};
        searchedNotes.forEach(note => {
            tempNotes[note.id] = {
                title: note.title,
                description: note.description,
                author: note.author,
                status: note.status
            }
        });
        setNotes(tempNotes);
    }

    return <div>
        <button onClick={createNoteHandler}>Create Note</button>
        <input type="text" onChange={searchHandler} />
        <div>All Notes</div>
        {
            notes && Object.entries(notes).length ? <div>
                <table>
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Author</th>
                            <th>Status</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(notes).map(([key, note], index) => <tr key={key}>
                            <td>{index + 1}</td>
                            <td>{key}</td>
                            <td>{note.title}</td>
                            <td>{note.description}</td>
                            <td>{note.author}</td>
                            <td>{note.status ? "Done" : "Pending"}</td>
                            <td><i className="material-icons" onClick={() => editHandler(key)}>edit</i></td>
                            <td><i className="material-icons" onClick={() => deleteHandler(key)}>delete</i></td>
                        </tr>)}
                    </tbody>
                </table>
            </div> : <Loading />
        }
    </div>
}

export default Notes;