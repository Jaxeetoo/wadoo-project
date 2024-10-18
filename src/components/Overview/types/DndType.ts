import {
  UniqueIdentifier
} from "@dnd-kit/core"

type DNDType = {
  id:UniqueIdentifier,
  title: string,
  items: {
    id: UniqueIdentifier,
    title: string
  }[]
}

type cardContent = {
  id: UniqueIdentifier,
  task: string,
  state: string,
  //TODO: Stage 2 of project. be able to assign to a person
}