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
    <Card className="bg-red-300 w-56 min-h-72 min-w-56 max-w-96 rounded-[5px]"
      ref={setNodeRef}
      style={style}
      onClick={() => 
        {setEditMode(true)}
      }
    >
      <CardHeader className="flex flex-row justify-between bg-green-200 m-1"
        {...attributes}
        {...listeners}
      >
        <Badge variant={"outline"} className="flex-none">0</Badge>
        <Label className="grow font-bold justify-center bg-blue-200">
          {!editMode && column.title}
          {editMode && 
          <Input 
            value={column.title}
            onChange={e=> updateColumn(column.id, e.target.value)}
            autoFocus={true}
            onBlur={() => {setEditMode(false)}}
            onKeyDown={e => {
              if (e.key !== "Enter") return;
              setEditMode(false)
            }}
            />}

        </Label>
        <Button
          className="flex-none mt-1 mr-1 overflow-hidden rounded-[5px]"
          size={"icon"}
          variant={"ghost"}
          onClick={() => onDeleteColumn(column.id)}
          
          >
          <TrashIcon />
        </Button>
      </CardHeader>
      <CardContent className="bg-amber-500">
        Content
      </CardContent>
      <CardFooter className="justify-center">
        <Button size={"sm"} variant={"ghost"} className="p-1">
          <PlusIcon className="m-0"/>
          <Label>Add Column</Label> 
        </Button>
      </CardFooter>
    </Card>
  )
}

export default Column