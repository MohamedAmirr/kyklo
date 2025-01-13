import { repoFactory } from '../core/db/repo-factory'
import { SchoolEntity } from './school.entity'

export const schoolRepo = repoFactory(SchoolEntity)

export const schoolService = {
   
}