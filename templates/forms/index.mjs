export function addFormsTemplate(files) {
  files.set(
    'src/components/ExampleForm.tsx',
    'import { zodResolver } from \'@hookform/resolvers/zod\'\nimport { useForm } from \'react-hook-form\'\nimport { z } from \'zod\'\nconst schema=z.object({email:z.email()})\ntype Values=z.infer<typeof schema>\nexport function ExampleForm(){const {register,handleSubmit,formState:{errors,isSubmitting}}=useForm<Values>({resolver:zodResolver(schema)});return <form onSubmit={handleSubmit(()=>undefined)}><label htmlFor="email">Email</label><input id="email" type="email" autoComplete="email" spellCheck={false} {...register(\'email\')}/>{errors.email?<p role="alert">{errors.email.message}</p>:null}<button disabled={isSubmitting} type="submit">{isSubmitting?\'Saving…\':\'Save\'}</button></form>}\n',
  )
}
