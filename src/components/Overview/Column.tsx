import { useState } from "react";

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
} from "./types/ColumnType";

import {
  useSortable
} from "@dnd-kit/sortable";

import {
  CSS
} from "@dnd-kit/utilities";

import {
  PlusIcon
} from "@radix-ui/react-icons";

interface columnProps {
  column: ColumnType;
  onDeleteColumn: (id: number) => void;
  updateColumn: (id: number, title:string ) => void
}

const Column = (props : columnProps) => {
  const {column, onDeleteColumn, updateColumn}  = props;
  const [editMode, setEditMode] = useState<boolean>(false);
  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: column.id,
    data: {
      type: "ColumnType",
      column
    },
    disabled: editMode
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  }

  if (isDragging)
  {
    return(
    <div
      className="w-56 min-h-72 min-w-56 max-w-96 rounded-[5px] bg-red-300 border-cyan-950 opacity-50"
      ref={setNodeRef}
      style={style}>
    </div>
    );
  }

  return (
    <Card className="bg-gray-100 w-56 min-h-80 min-w-64 max-w-96 rounded-[8px]"
      ref={setNodeRef}
      style={style}
      onClick={() => 
        {setEditMode(true)}
      }
    >
      <CardHeader className="flex flex-row justify-between m-2 gap-4"
        {...attributes}
        {...listeners}
      >
        <Badge variant={"task_counter"} className="flex-none">0</Badge>
        <Label className="grow font-bold py-2 text-balance align-middle">
          {!editMode && column.title}
          {editMode && 
          <Input 
            value={column.title}
            onChange={e=> updateColumn(column.id, e.target.value)}
            maxLength={12}
            autoFocus={true}
            onBlur={() => {setEditMode(false)}}
            onKeyDown={e => {
              if (e.key !== "Enter") return;
              setEditMode(false)
            }}
            />}

        </Label>
        <Button
          className="flex-none mt-1 mr-1 overflow-hidden "
          size={"icon"}
          variant={"kanban_delete"}
          onClick={() => onDeleteColumn(column.id)}
          
          >
          <TrashIcon />
        </Button>
      </CardHeader>
      <CardContent className="">
        Content
      </CardContent>
      <CardFooter className="justify-center">
        <Button variant={"kanban_addition"}>
          <PlusIcon className="m-0"/>
          <Label>Add Column</Label> 
        </Button>
      </CardFooter>
    </Card>
  )
}

export default Column