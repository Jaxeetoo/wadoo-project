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
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";

import Column from "./Column";
import { ColumnType } from "./types/ColumnType";
import { createPortal } from "react-dom";
import { TaskType } from "./types/TaskType";

const Kanban = () => {

  const [columns, setColumns] = useState<ColumnType[]>([]);
  const [activeColumn, setActiveColumn] = useState<ColumnType | null >(null);
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const columnIDs = useMemo(() => columns.map(col=> col.id),[columns]);
  
  const addColumn = () => {
    const newColumn: ColumnType = {
      id: columns.length + 1, 
      title: "test"
    }

    //TODO MAKE IT SO THAT IT WOULD MAKE THE USER INPUT SOMETHING

    setColumns([...columns, newColumn]);
  }

  const removeColumn = (id: number) => {
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
  
  const onUpdateColumn = (id: number, title: string) => {
    const newColumns = columns.map(col => {
      if (col.id !== id) return col;

      return {...col, title};
    })

    setColumns(newColumns);
  }

  return (
    <div className="bg-slate-200 ">
      <div className="flex flex-row justify-between px-4 py-2">
        <Label className="text-lg">Title</Label>

      </div>
        <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd} sensors={sensor}>
          <div className="flex flex-row gap-4 overflow-x-auto bg-green-500 px-4">
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
              className="flex flex-row items-start pt-4 rounded-[.25rem] justify-center w-56 min-h-72 min-w-56 max-w-96" 
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