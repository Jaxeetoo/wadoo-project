import { useState, useMemo } from "react"

import {
  PlusIcon
} from "@radix-ui/react-icons"

import {
  Button
} from "@/components/ui/button";

import {
  Label
} from "@/components/ui/label";
import { 
  DndContext, 
  DragEndEvent, 
  DragOverlay, 
  DragStartEvent, 
  PointerSensor, 
  UniqueIdentifier, 
  useSensor, 
  useSensors
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";

import Column from "./Column";
import { ColumnType } from "./types/DndType";
import { createPortal } from "react-dom";
import { TaskType } from "./types/DndType";
import { nanoid } from "nanoid";
import { customAlphabet } from "nanoid";


const DEFAULT_COLUMNS = [
  {
    id: nanoid(5),
    title: "To Do",
    items: []
  },
  {
    id: nanoid(5),
    title: "In Progress",
    items: []
  },
  {
    id: nanoid(5),
    title: "Completed",
    items: []
  }
]

const Kanban = () => {

  const [columns, setColumns] = useState<ColumnType[]>(DEFAULT_COLUMNS);
  const [activeColumn, setActiveColumn] = useState<ColumnType | null >(null);
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const columnIDs = useMemo(() => columns.map(col=> col.id),[columns]); 
  
  const addColumn = () => {
    const nanoid = customAlphabet("1234567890abc", 5)
    const newColumn: ColumnType = {
      id: nanoid(), //* MAKE A FUNCTION FOR CREATING A UNIQUE ID
      title: "New Column",
      items: []
    }

    //TODO MAKE IT SO THAT IT WOULD MAKE THE USER INPUT SOMETHING

    setColumns([...columns, newColumn]);
  }

  const removeColumn = (id: UniqueIdentifier) => {
    setColumns((col) => col.filter((column)=> column.id != id))
  }

  const onDragStart = (event : DragStartEvent) => {
    if (event.active.data.current?.type === "ColumnType"){
      setActiveColumn(event.active.data.current?.column);
      return;
    }
  }

  const sensor = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3, //3px

      }
    })
  )

  const onDragEnd = (event : DragEndEvent) => {
    const {active, over } = event;

    if (!over) return;

    const activeColID = active.id;
    const overColID = over.id;

    if (activeColID === overColID) return;

    setColumns((columns) => {
      const activeColIndex = columns.findIndex(col => col.id === activeColID);
      const overColIndex = columns.findIndex(col => col.id === overColID);

      return arrayMove(columns, activeColIndex, overColIndex);
    })
  }
  
  const onUpdateColumn = (id: UniqueIdentifier, title: string) => {
    const newColumns = columns.map(col => {
      if (col.id !== id) return col;

      return {...col, title};
    })

    setColumns(newColumns);
  }

  return (
    <div>
        <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd} sensors={sensor}>
          <div className="flex flex-row gap-4 overflow-x-auto px-4">
            <SortableContext items={columnIDs}>
              {
                columns?.map((columnProps, index) => (
                  <Column 
                    column={columnProps}
                    onDeleteColumn={removeColumn}
                    updateColumn={onUpdateColumn}
                    key={index}
                  />
              ))
            }
            </SortableContext>
          
            <Button 
              className="p-4 rounded-[.5rem] justify-center w-56  min-w-56 max-w-96" 
              variant={"outline"}
              onClick={addColumn}
            > 
              <PlusIcon />
              <Label className="hidden sm:block">Add Column</Label>  
            </Button>
          </div>
          {createPortal (<DragOverlay>
            {
              activeColumn && <Column column={activeColumn} updateColumn={onUpdateColumn} onDeleteColumn={removeColumn}/>
            }
          </DragOverlay>,document.body
        )}
        </DndContext>
        
    </div>
  )
}

export default Kanban