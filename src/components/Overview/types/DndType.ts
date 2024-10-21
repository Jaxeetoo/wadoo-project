import {
  UniqueIdentifier
} from "@dnd-kit/core"

export type ColumnType = {
  id:UniqueIdentifier,
  title: string,
  items: TaskType[]
}

export type TaskType = {
  id: UniqueIdentifier,
  columnID: UniqueIdentifier,
  task: string,
  //TODO: Stage 2 of project. be able to assign to a person
}