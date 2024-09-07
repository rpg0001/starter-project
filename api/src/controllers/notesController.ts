export function getNote(req: any, res: any) {
    res.status(200).json({ "note": "Hello world!"});
}

export function listNotes(req: any, res: any) {
    res.status(200).json([{ "note": "Hello world!"}]);
}

export function createNote(req: any, res: any) {
    res.status(201).json({ "note": "Hello world!"});
}

export function updateNote(req: any, res: any) {
    res.status(204).json({ "note": "Hello updated world!"});
}

export function deleteNote(req: any, res: any) {
    res.status(204).json({});
}