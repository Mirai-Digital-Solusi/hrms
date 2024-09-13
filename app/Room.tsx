"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";

export function Room({ children }: { children: ReactNode }) {
  return (
    <LiveblocksProvider publicApiKey={"pk_dev_s6JJCd5xB9QT3Zn2uxu3o9nS_fVNe6SHUHGJLl1Q2cXCnlgqQQUmJkRLd1F5eYs5"}>
      <RoomProvider id="my-room">
        <ClientSideSuspense fallback={<div>Please Wait</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}