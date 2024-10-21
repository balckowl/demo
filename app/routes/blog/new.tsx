import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/start'
import { db } from '../../db'
import { postsTable } from '../../db/schema'
import { css } from '../../../styled-system/css'
import { FieldApi, useForm } from '@tanstack/react-form'
import { z } from 'zod'
import { zodValidator } from '@tanstack/zod-form-adapter'
import { container } from '../../../styled-system/patterns'

export const submitPost = createServerFn("POST", async (value: fromType) => {
  const { title, content } = value

  const post = await db.insert(postsTable).values({
    title,
    content
  })

  return post
})

export const Route = createFileRoute('/blog/new')({
  component: New,
})

const formSchema = z.object({
  title: z.string().min(1, { message: "何か書いてください。" }),
  content: z.string().min(1, { message: "何か書いてください。" })
})

type fromType = z.infer<typeof formSchema>

function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em>{field.state.meta.errors.join(',')}</em>
      ) : null}
      {field.state.meta.isValidating ? 'Validating...' : null}
    </>
  )
}

function New() {

  const navigate = useNavigate()

  const form = useForm({
    defaultValues: {
      title: "",
      content: ""
    } as fromType,
    onSubmit: async ({ value }) => {
      const res = await submitPost(value)
      console.log(res)
      navigate({ to: "/" })
    },
    validatorAdapter: zodValidator(),
    validators: {
      onChange: formSchema
    }
  })

  return (
    // <form onSubmit={async (e: FormEvent<HTMLFormElement>) => {
    //   e.preventDefault()
    //   const formData = new FormData(e.target as HTMLFormElement)
    //   const res = await submitPost(formData)
    //   console.log(res)
    //   navigate({ to: "/" })
    // }}
    //   className={container({
    //     display: "flex",
    //     flexDirection: "column",
    //     gap: "10px",
    //     mt: "15px"
    //   })}
    // >
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
      className={container({
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        mt: "15px"
      })}
    >
      <form.Field
        name="title"
        children={(field) => {
          return (
            <>
              <input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className={css({
                  border: "1px solid black",
                  p: "10px"
                })} placeholder='記事のタイトル' />
              <FieldInfo field={field} />
            </>
          )
        }}
      />
      <form.Field
        name="content"
        children={(field) => {
          return (
            <>
              <textarea
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className={css({
                  border: "1px solid black",
                  resize: "none",
                  height: "200px",
                  p: "10px"
                })} placeholder='記事の内容' />
              <FieldInfo field={field} />
            </>
          )
        }}
      />
      <button type="submit" className={css({
        bg: "pink",
        p: "10px"
      })}>Submit</button>
    </form>
  )
}
