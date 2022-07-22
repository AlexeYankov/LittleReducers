import {TodolistType} from '../App'
import {v1} from "uuid";

type ActionType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: string
}


export const todolistReducer = (state: TodolistType[], action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            const newTodolist = state.filter(el=> el.id !== action.id)
            return newTodolist
        case 'ADD-TODOLIST':
            const newID = v1()
            const newTodolists: TodolistType = {id: newID, title: action.title, filter: 'all'}
            return [...state, newTodolists]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(el=>el.id===action["id"] ? {...el, title: action["title"]} : el)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(el=>el.id===action["id"] ? {...el, filter: action["filter"]} : el)
        default:
            throw new Error('I don\'t understand this type')
    }
}

export const RemoveTodolistAC = (id: string): RemoveTodolistActionType => {
    return {type:'REMOVE-TODOLIST', id}
}
export const AddTodolistAC = (title: string): AddTodolistActionType => {
    return {type:'ADD-TODOLIST', title}
}
export const CorrectTodolistAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type:'CHANGE-TODOLIST-TITLE', id, title}
}
export const CorrectFilterTodolistAC = (id: string, filter: string): ChangeTodolistFilterActionType => {
    return {type:'CHANGE-TODOLIST-FILTER', id, filter}
}