import { initNoteModel, Note } from "./noteModel";
import { initUserModel, User } from "./userModel";
import { initUserSessionModel, UserSession } from "./userSessionModel";

export function initModels() {
    initUserModel();
    initNoteModel();
    initUserSessionModel();

    User.hasMany(Note);
    User.hasMany(UserSession);
    Note.belongsTo(User);
    UserSession.belongsTo(User);
}