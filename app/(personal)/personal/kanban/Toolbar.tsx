"use client";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { OPEN_FLOATING_COMPOSER_COMMAND } from "@liveblocks/react-lexical";

export function Toolbar() {
  const [editor] = useLexicalComposerContext();

  return (
    <div className="toolbar">
      <button
        className="add-comment"
        onClick={() =>
          editor.dispatchCommand(OPEN_FLOATING_COMPOSER_COMMAND, undefined)
        }
      >
        💬 New comment
      </button>
    </div>
  );
}