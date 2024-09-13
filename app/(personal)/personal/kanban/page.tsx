import { Room } from "@/app/Room";
import BreadCrumb from '@/components/breadcrumb';
// import { KanbanBoard } from '@/components/kanban/kanban-board';
// import NewTaskDialog from '@/components/kanban/new-task-dialog';
import { Heading } from '@/components/ui/heading';
import { ScrollArea } from '@/components/ui/scroll-area';

import { CollaborativeApp } from "./CollaborativeApp";
import { Editor } from "./Editor";
import { Textarea } from "@/components/ui/textarea"

const breadcrumbItems = [{ title: 'Kanban', link: '/dashboard/kanban' }];
export default function page() {
  return (
    <Room>
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <div className="flex items-start justify-between">
          <Heading title={`Kanban`} description="Manage tasks by dnd" />
          {/* <NewTaskDialog /> */}
        </div>
        {/* <KanbanBoard /> */}
        <CollaborativeApp />
      </div>
      </ScrollArea>
      </Room>
  );
}
