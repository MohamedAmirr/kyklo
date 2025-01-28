import { repoFactory } from '../core/db/repo-factory'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { DepartmentEntity } from './department.entity'

dayjs.extend(duration)

export const departmentRepo = repoFactory(DepartmentEntity)

export const departmentService = {}
