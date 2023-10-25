import slugify from 'slugify'
import crypto from 'node:crypto'
import fs, { readFileSync } from 'node:fs'
import { readJSON } from '../../utils.mjs'

const workflowJSON = readJSON('./db/workflow.json')
// const workflowJSON = JSON.parse(readFileSync('./src/db/workflow.json', 'utf8'))
const defaultWorkflow = readJSON('./db/defaultWorkflow.json')

export function getSlug(params) {
  return slugify(params, {
    lower: true,
    strict: true
  })
}
export function bySlug(slug) {
  const wf = workflowJSON.find(item => item.slug === slug)
  return {
    success: wf !== undefined ? true : false,
    data: wf
  }

}



export class WorkflowModel {
  constructor() { }

  static async getAll() {
    return {
      success: workflowJSON.length > 0 ? true : false,
      data: workflowJSON
    }
  }
  
  static async getBySlug({ slug }) {
    const wf = await bySlug(slug)
    return wf
  }

  static async create({ input }){
    const slug = getSlug(input.title)
    const wf = await bySlug(slug)

    if (wf.data !== undefined) {
      return {
        success: false,
        msj: 'A workflow with the same name already exists'
      }
    }

    const newWorkflow = {
      id: crypto.randomUUID(),
      slug,
      ...input,
      workflow: defaultWorkflow
    }

    workflowJSON.push(newWorkflow)

    return {
      success: workflowJSON.length > 0 ? true : false,
      data: newWorkflow
    }

  }

  // require line 7 => const workflowJSON = JSON.parse(readFileSync('./src/db/workflow.json', 'utf8'))
  static async createWithFile({ input }) {

    const slug = getSlug(input.title)
    const wf = await bySlug(slug)

    if (wf.data !== undefined) {
      return {
        success: false,
        msj: 'A workflow with the same name already exists'
      }
    }

    const newWorkflow = {
      id: crypto.randomUUID(),
      slug,
      ...input,
      workflow: defaultWorkflow
    }

    // console.log(defaultWorkflow)

    fs.readFile('./src/db/workflow.json', 'utf8', (err, data) => {
      if (err) {
        console.log(`Error reading file from disk: ${err}`)
      } else {
        const databases = JSON.parse(data)
        databases.push(newWorkflow)

        fs.writeFile('./src/db/workflow.json', JSON.stringify(databases, null, 2), err => {
          if (err) {
            console.log(`Error writing file: ${err}`)
          }
        })
      }
    })


    // return workflowJSON
    return {
      // success: workflowJSON.length > 0 ? true : false,
      data: newWorkflow
    }
  }

  static async delete({ id }) { }

  static async update({ id, input }) { }

}