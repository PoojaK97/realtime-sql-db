import { useState } from "react";
import { BASE_URL } from './constants'

function Cell({
    value,
    name,
    rowId,
    onEditColumn,
    isEditing,
    onChange,
    handleSave
}) {
    return (
        <td>
            {!isEditing && <>
                <span className="value">{value  ?? ''}</span>
                <button onClick={() => onEditColumn(rowId)}>Edit</button>
            </>}
            {isEditing && <>
                <input name={name} defaultValue={value ?? ''} onChange={onChange} />
                <button onClick={handleSave}>Save</button>
            </>}
        </td>
    )
}

export default function Table({pitches}) {
    const [editRowId, setEditRowId] = useState(null)
    const [newPitch, setNewPitch] = useState(null)

    const onEditColumn = (rowId) => {
        setEditRowId(rowId)
        setNewPitch(pitches.find(p => p.id === rowId))
    }

    const onChange = (e) => {
        const p = {
            ...newPitch,
            [e.target.name]: e.target.value
        }

        setNewPitch(p)
    }

    const handleCreate = () => {
        const newId = pitches.length + 1
        const p = {id: newId, isNew: true}
        pitches.push(p)
        setNewPitch(p)
        setEditRowId(newId)
    }

    const handleSave = () => {
        setEditRowId(null)
        if (newPitch === null) return

        const method = newPitch.isNew ? 'POST' : 'PATCH'

        fetch(`${BASE_URL}/pitches`, {
            method,
            body: JSON.stringify(newPitch),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => setNewPitch(null))
    }

    return (
        <>
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Pitch Title</th>
                    <th>Entrepreneur</th>
                    <th>Pitch Idea</th>
                    <th>Ask amount</th>
                    <th>Equity</th>
                </tr>
            </thead>
            <tbody>
                {
                    pitches.map(p => {
                        const isEditing = editRowId === p.id
                        return <tr key={p.id}>
                            <Cell
                                value={p.id}
                                rowId={p.id}
                                name="id"
                                onEditColumn={onEditColumn}
                                handleSave={handleSave}
                            />
                            <Cell
                                value={p.title}
                                rowId={p.id}
                                name="title"
                                onEditColumn={onEditColumn}
                                handleSave={handleSave}
                                isEditing={isEditing}
                                onChange={onChange}
                            />
                            <Cell
                                value={p.entrepreneur}
                                rowId={p.id}
                                name="entrepreneur"
                                onEditColumn={onEditColumn}
                                handleSave={handleSave}
                                isEditing={isEditing}
                                onChange={onChange}
                            />
                            <Cell
                                value={p.idea}
                                rowId={p.id}
                                name="idea"
                                onEditColumn={onEditColumn}
                                handleSave={handleSave}
                                isEditing={isEditing}
                                onChange={onChange}
                            />
                            <Cell
                                value={p.askAmount}
                                rowId={p.id}
                                name="askAmount"
                                onEditColumn={onEditColumn}
                                handleSave={handleSave}
                                isEditing={isEditing}
                                onChange={onChange}
                            />
                            <Cell
                                value={p.equity}
                                rowId={p.id}
                                name="equity"
                                onEditColumn={onEditColumn}
                                handleSave={handleSave}
                                isEditing={isEditing}
                                onChange={onChange}
                            />
                        </tr>
                    })
                }
            </tbody>
        </table>
        <button onClick={handleCreate} className="create">Create</button>
        </>
    );
}