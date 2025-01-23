import { repoFactory } from '../core/db/repo-factory'
import { ClassroomEntity } from './classroom.entity'

export const classroomRepo = repoFactory(ClassroomEntity)

export const classroomService = {
   
}