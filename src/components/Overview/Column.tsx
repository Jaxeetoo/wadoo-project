import { useMemo, useState } from "react";

import {
  TrashIcon
} from "@radix-ui/react-icons";

import {
  Button
} from "@/components/ui/button";

import {
  Label
} from "@/components/ui/label";

import {
  Badge
} from "@/components/ui/badge";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter
} from "@/components/ui/card";

import {
  Input
} from "@/components/ui/input";

import {
  ColumnType
} from "./types/DndType";

import {
  TaskType
} from "./types/DndType";

import {
  SortableContext,
  useSortable
} from "@dnd-kit/sortable";

import {
  CSS
} from "@dnd-kit/utilities";

import {
  PlusIcon
} from "@radix-ui/react-icons";
import { UniqueIdentifier } from "@dnd-kit/core";
import TaskCard from "./TaskCard";
import { create } from "domain";

interface columnProps {
  column: ColumnType;
  onDeleteColumn: (id: UniqueIdentifier) => void;
  updateColumn: (id: UniqueIdentifier, title: string ) => void;

  createTask: (columnID: UniqueIdentifier) => void;
  onDeleteTask: (id: UniqueIdentifier) => void;
  onUpdateTask: (id: UniqueIdentifier, content: string) => void;
  tasks: TaskType[];

  className: string;
}

const Column = ({ column, onDeleteColumn, updateColumn, createTask, onDeleteTask, onUpdateTask, tasks, className} : columnProps) => {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  
  const [editMode, setEditMode] = useState<boolean>(false);
  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: column.id,
    data: {
      type: "ColumnType",
      column
    },
    disabled: editMode
  });

  const taskIDs = useMemo(() => {
    return tasks.map(task => task.id);
  }, [tasks]);

  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  }

  if (isDragging)
  {
    return(
    <div
      className="min-h-72 min-w-72 max-w-96 rounded-[5px] bg-gray-300 border-cyan-950 opacity-50"
      ref={setNodeRef}
      style={style}>
    </div>
    );
  }

  return (
    <Card className={`relative flex flex-col my-4   justify-between min-w-72 max-w-96 rounded-[8px] bg-gray-100 ${className}`}
      ref={setNodeRef}
      style={style}
      
    >
      <CardHeader className="flex flex-row justify-between m-1 gap-4 rounded-[.35rem] bg-slate-950 text-white"
        {...attributes}
        {...listeners}
        onClick={() => {
          setEditMode(true);
        }}
      >
        <Badge variant={"task_counter"} className="flex-none">{tasks.length}</Badge>
        <Label className="grow font-bold py-2 text-balance align-middle">
          {!editMode && column.title}
          {editMode && 
          <Input 
            value={column.title}
            onChange={e=> updateColumn(column.id, e.target.value)}
            maxLength={12}
            autoFocus={true}
            onBlur={() => {
              setEditMode(false)
            }}
            onKeyDown={e => {
              if (e.key !== "Enter") return;
              setEditMode(false)
            }}
            />}

        </Label>
        <Button
          className="flex-none mt-1 mr-1 overflow-hidden "
          size={"icon"}
          variant={"kanban_delete_dark"}
          onClick={() => onDeleteColumn(column.id)}
          
          >
          <TrashIcon />
        </Button>
      </CardHeader>
      <CardContent className="p-2 max-h-full overflow-y-auto">
        <div className="flex flex-col gap-2">
        <SortableContext items={taskIDs}>
          {tasks.map((item, index) => (
              <TaskCard 
                taskType = {item}
                deleteTask = {onDeleteTask}
                updateTask = {onUpdateTask}
                key={index}
              />
            ))
          }
        </SortableContext>  
        
        </div>
      </CardContent>
      <CardFooter className="justify-start flex grow bottom-0 p-2">
        <Button 
          variant={"kanban_addition"} 
          onClick={() => {
            createTask(column.id)
          }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className={`w-full transition-all duration-75 ease-in-out ${isHovering ? 'animate-shadow-inner' : 'animate-shadow-inner-leave'} hover:shadow-inner `}>
          <PlusIcon className="m-1"/>
          <Label className="text-left">Add Task</Label> 
        </Button>
      </CardFooter>
    </Card>
  )
}

export default Column