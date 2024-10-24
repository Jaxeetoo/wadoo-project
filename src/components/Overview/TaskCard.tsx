import {useState} from "react";

import {
  Card,
  CardContent,
  CardTitle,
  CardHeader
} from "@/components/ui/card";

import {
  TaskType
} from "./types/DndType";

import {
  CSS
} from "@dnd-kit/utilities";

import { Button } from "@/components/ui/button";
import { TrashIcon } from "@radix-ui/react-icons";
import { UniqueIdentifier } from "@dnd-kit/core";
import { Textarea } from "@/components/ui/textarea";
import { useSortable } from "@dnd-kit/sortable";
interface taskProps {
  taskType: TaskType;
  deleteTask: (id: UniqueIdentifier) => void;
  updateTask: (id: UniqueIdentifier, content: string) => void;
}

const TaskCard = ({ taskType, deleteTask, updateTask } : taskProps) => {
  const [isMouseOver, setIsMouseOver] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: taskType.id,
    data: {
      type: "TaskType",
      taskType
    },
    disabled: editMode
  });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  }

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setIsMouseOver(false);
  }

  if (isDragging){
    return (
    <Card ref={setNodeRef} style={style} >
      dragging</Card>
    );
  }

  if (editMode){
    return (
      <Card 
        className="rounded-[.15rem]"
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
      >
        <CardContent className="relative p-4 min-h-fit max-h-36">
          <Textarea 
            maxLength={100}
            placeholder="Insert Task"
            rows={3}
            className="resize-none rounded-[.15rem] bg-transparent focus:outline-none"
            autoFocus
            value={taskType.content}
            onBlur={toggleEditMode}
            onKeyDown={(e) => {
              if (e.key === "Enter") toggleEditMode();
            }}
            onChange={(e) => {
              updateTask(taskType.id, e.target.value);
            }}
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card 
      
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => {toggleEditMode()}}
      onMouseEnter={() => {
        setIsMouseOver(true);
      }}
      onMouseLeave={() => {
        setIsMouseOver(false);
      }}

      className="w-full rounded-[.15rem] hover:outline-8 hover:shadow-inner hover:border-cyan-500 "
    >
      <CardContent className="relative flex justify-between p-4 min-h-fit max-h-fit">
        <p className="grow">
          {taskType.content}
        </p>
        
          <Button
            className={isMouseOver ? "absolute top-1/2 -translate-y-1/2 right-4 justify-center h-4" : "hidden" }
            size={"icon"}
            variant={"kanban_delete"}
            onClick={() => {
              deleteTask(taskType.id);
            }}
          >
            <TrashIcon />
          </Button>
        {/* )} */}
      </CardContent>
    </Card>
  )
}

export default TaskCard