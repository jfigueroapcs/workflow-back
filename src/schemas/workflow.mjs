import z from 'zod'

const workflowSchema = z.object({
    title: z.string({
        invalid_type_error: 'Workflows title must be a string',
        required_error: 'Workflows title is required.'
    }),
    // condition: z.string({
    //     invalid_type_error: 'Workflows first condition must be a string',
    //     required_error: 'Workflows first condition is required.'
    // }),
    // action: z.string({
    //     invalid_type_error: 'Workflows first action must be a string',
    //     required_error: 'Workflows first action is required.'
    // }),
    // condicions: z.array(z.object({
    //     name: z.string(),
    //     dir: z.string(),
    // })).min(1),
    // actions: z.array(z.object({
    //     name: z.string(),
    //     dir: z.string(),
    // })).min(1),

})

export function validateWorkflow(input) {
    return workflowSchema.safeParse(input)
}

export function validatePartialWorkflow(input) {
    return workflowSchema.partial().safeParse(input)
}

//   module.exports = {
//     validateWorkflow,
//     validatePartialWorkflow
//   }