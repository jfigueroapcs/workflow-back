import crypto from 'node:crypto'
import graph from 'graph'

import { validateWorkflow, validatePartialWorkflow } from '../schemas/workflow.mjs'

import { WorkflowModel } from '../models/local-file-system/workflow.mjs'

export class workflowController {
  constructor() {

  }

  static async create(req, res) {
    console.log('create')
    const workflow = validateWorkflow(req.body)

    if (!workflow.success) {
      // 422 Unprocessable Entity
      return res.status(400).json({ error: JSON.parse(workflow.error.message) })
    }

    const newWF = await WorkflowModel.create({ input: workflow.data })
    // console.log('C => 24', newWF)
    res.status(201).json(newWF)
  }

  static async getBySlug(req, res) {
    console.log('getBySlug')
    const { slug } = req.params
    const wf = await WorkflowModel.getBySlug({ slug })

    res.json(wf)
  }

  static async getAll(req, res) {
    console.log('getAll')
    const { slug } = req.params
    res.json(await WorkflowModel.getAll(slug))
  }
}
