import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useHistory } from "react-router-dom";

const CreateNote = () => {

    const { state } = useLocation();
    const history = useHistory();
    const [note, setNote] = useState({
        title: "",
        description: "",
        author: "",
        status: false
    });

    useEffect(() => {
        if (state?.id) {
            axios.get("http://localhost:3500/notes/" + state?.id)
                .then(res => {
                    setNote({
                        title: res.data.title,
                        description: res.data.description,
                        author: res.data.author,
                        status: res.data.status
                    });
                })
                .catch(err => console.error(err));
        }
    }, [state?.id]);

    const changeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.type == 'text' ? event.target.value : event.target.checked;
        setNote(note => {
            return {
                ...note,
                [name]: value
            }
        });
    }

    const submitHandler = (event) => {
        event.preventDefault();
        const id = state?.id ? state?.id : Math.floor((Math.random() * 999999999) + 111111111);
        const noteToCreate = {
            id: id,
            ...note
        }

        if (state?.id) {
            axios.put("http://localhost:3500/notes/" + state?.id, noteToCreate)
                .then(res => {
                    if (res.status == 200) {
                        history.push("/notes");
                    }
                })
                .catch(err => console.error(err));
        } else {
            axios.post("http://localhost:3500/notes", noteToCreate)
                .then(res => {
                    if (res.status == 201) {
                        history.push("/notes");
                    }
                })
                .catch(err => console.error(err));
        }
    }

    const cancelHandler = () => history.push("/");

    return <div>Create note
        <form>
            <label>Title</label>
            <input type="text" name="title" onChange={changeHandler} value={note.title} />
            <br />

            <label>Description</label>
            <input type="text" name="description" onChange={changeHandler} value={note.description} />
            <br />

            <label>Author</label>
            <input type="text" name="author" onChange={changeHandler} value={note.author} />
            <br />

            <label>Status</label>
            <input type="checkbox" name="status" value={note.status} checked={note.status} onChange={changeHandler} />
            <br />

            <button onClick={submitHandler}>{state?.id ? "Update" : "Submit"}</button>
            <button onClick={cancelHandler}>Cancel</button>
        </form>
    </div>
}

export default CreateNote;