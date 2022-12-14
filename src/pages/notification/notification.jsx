import React from "react";
import "../notification/notification.css";
import { Notifications } from "@material-ui/icons/Lock";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import SendIcon from "@material-ui/icons/Send";
function NotificationPage() {
  return (
    <div className="newUser">
      <form>
        <div class="alignbutton">
          <div>
            <button className="UserTitle">
              <SendIcon />
              <div>send</div>
            </button>
          </div>
          <div>
            <div class="UserItem">
              <label class="label">From</label>
              <input
                className="notifyInput"
                type="email"
                placeholder=""
                // value={name}
                // onChange={changeName}
                required
              />
            </div>
            <div class="UserItem">
              <label class="label">To</label>
              <input
                className="notifyInput"
                type="email"
                placeholder=""
                // value={name}
                // onChange={changeName}
                required
              />
            </div>{" "}
            <div class="UserItem">
              <label class="label">Cc</label>
              <input
                className="notifyInput"
                type="email"
                placeholder=""
                // value={name}
                // onChange={changeName}
                required
              />
            </div>
            <div class="UserItem">
              <label class="label">Bcc</label>
              <input
                className="notifyInput"
                type="email"
                placeholder=""
                // value={name}
                // onChange={changeName}
                required
              />
            </div>
            <div class="UserItem">
              <label class="labelSubject">Subject</label>
              <input
                className="notifyInput"
                type="email"
                placeholder=""
                // value={name}
                // onChange={changeName}
                required
              />
            </div>
          </div>
        </div>
        <Editor
        //   editorState={editorState}
        //   onEditorStateChange={this.onEditorStateChange}
        />
      </form>
    </div>
  );
}
export default NotificationPage;
