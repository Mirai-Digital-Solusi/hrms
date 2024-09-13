"use client";

import { useThreads } from "@liveblocks/react/suspense";
import { Thread } from "@liveblocks/react-ui";

export function Threads() {
  const { threads } = useThreads();

  return (
    <div className="threads">
      {threads.map((thread) => (
        <Thread key={thread.id} thread={thread} className="thread" />
      ))}
    </div>
  );
}