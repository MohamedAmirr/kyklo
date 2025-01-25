import { repoFactory } from '../core/db/repo-factory'
import { StudentEntity } from './student.entity'

export const studentRepo = repoFactory(StudentEntity)

export const studentService = {}
