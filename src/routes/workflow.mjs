import { Router } from 'express'
import { workflowController } from '../controllers/workflow.mjs'

export const workflowRouter = Router()

workflowRouter.get('/', workflowController.getAll)

workflowRouter.post('/', workflowController.create)

workflowRouter.get('/:slug', workflowController.getBySlug)
