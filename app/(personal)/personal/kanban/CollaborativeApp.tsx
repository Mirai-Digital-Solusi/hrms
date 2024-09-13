"use client";

import { useOthers } from "@liveblocks/react/suspense";
import { Textarea } from "@/components/ui/textarea"
import React from 'react';

export const CollaborativeApp: React.FC = () => {
  const others = useOthers();
  const userCount = others.length;
  return (<div>There are {userCount} other user(s) online</div>);
}