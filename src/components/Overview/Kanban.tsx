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
  DragOverEvent, 
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
import TaskCard from "./TaskCard";


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
  const [activeTask, setActiveTask] = useState<TaskType | null>(null);
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
    setColumns((col) => col.filter((column)=> column.id != id));

    const newTasks = tasks.filter(t => t.columnID !== id);
    setTasks(newTasks);
  }

  const onDragStart = (event : DragStartEvent) => {
    if (event.active.data.current?.type === "ColumnType"){
      setActiveColumn(event.active.data.current?.column);
      return;
    }

    if (event.active.data.current?.type === "TaskType"){
      setActiveTask(event.active.data.current?.task);
      return
    }
  }

  const createTask = (columnID: UniqueIdentifier) => {
    const newTask: TaskType = {
      id: nanoid(),
      columnID,
      content: `Task ${tasks.length + 1}`
    }
    

    //console.log(`did click ${columnID} tasks count:${tasks.length}`)

    setTasks([...tasks, newTask]);
  }

  const deleteTask = (id: UniqueIdentifier) => {
    setTasks(tasks.filter(task => task.id !== id));
  }

  const updateTask = (id: UniqueIdentifier, content: string) => {
    const newTasks = tasks.map(task => {
      if (task.id !== id) return task;
      return {...task, content };
    });

    setTasks(newTasks);
  }

  const sensor = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3, //3px

      }
    })
  )

  const onDragEnd = (event : DragEndEvent) => {
    setActiveColumn(null);
    setActiveTask(null);
    const {active, over} = event;

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

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeTaskID = active.id;
    const overTaskID = over.id;

    if (activeTaskID === overTaskID) return;

    const isActiveATask = active.data.current?.type === "TaskType";
    const isOverATask = over.data.current?.type === "TaskType";

    if (!isActiveATask) return;

    if (isActiveATask && isOverATask){
      setTasks((tasks) => {
        const activeTaskIndex = tasks.findIndex((t) => t.id === activeTaskID);
        const overTaskIndex = tasks.findIndex((t) => t.id === overTaskID);
        
        tasks[activeTaskIndex].columnID = tasks[overTaskIndex].columnID;

        return arrayMove(tasks, activeTaskIndex, overTaskIndex);
      })
    }

    const isOverAColumn = over.data.current?.type === "ColumnType";

    if (isActiveATask && isOverAColumn){
      setTasks((tasks) => {
        const activeTaskIndex = tasks.findIndex((t) => t.id === activeTaskID);
        
        tasks[activeTaskIndex].columnID = overTaskID;

        return arrayMove(tasks, activeTaskIndex, activeTaskIndex);
      })
    }

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
      <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd} onDragOver={onDragOver} sensors={sensor}>
        <div className="flex flex-row gap-4 overflow-x-auto px-4">
          <SortableContext items={columnIDs}>
            {
              columns?.map((columnProps, index) => (
                <Column 
                  column={columnProps}
                  onDeleteColumn={removeColumn}
                  updateColumn={onUpdateColumn}
                  createTask={createTask}
                  onDeleteTask={deleteTask}
                  onUpdateTask={updateTask}
                  tasks={tasks.filter(grpedTasks => grpedTasks.columnID === columnProps.id)}
                  key={index}

                  className="h-fit"
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
        {createPortal (
          <DragOverlay>
          {
            activeColumn && 
            <Column 
              column={activeColumn} 
              updateColumn={onUpdateColumn} 
              onDeleteColumn={removeColumn}
              createTask={createTask}
              onDeleteTask={deleteTask}
              onUpdateTask={updateTask}
              tasks={tasks.filter(grpedTasks => grpedTasks.columnID === activeColumn.id)}
              className="h-fit"
            />
          }
          {
          activeTask && 
            <TaskCard 
              taskType={activeTask} 
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          }
        </DragOverlay>,document.body
      )}
 
      </DndContext> 
    </div>
  )
}

export default Kanban