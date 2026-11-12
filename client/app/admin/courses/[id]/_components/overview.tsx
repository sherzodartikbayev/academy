'use client'

import { Button } from '@/components/ui/button'
import { Field, FieldError } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { overviewSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Pencil, Save, X } from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { VscDiscard } from 'react-icons/vsc'
import z from 'zod'

const Overview = () => {
  const [edit, setEdit] = useState(false)

  const form = useForm<z.infer<typeof overviewSchema>>({
    resolver: zodResolver(overviewSchema),
    defaultValues: {}
  })

  function onSubmit() {}

  const toggleEdit = () => setEdit(prev => !prev)

  return (
    <div className='bg-sidebar p-6 rounded-md border'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-2xl font-semibold font-space-grotesk'>Overview</h2>
        <Button size='icon' variant='secondary' onClick={toggleEdit}>
          {edit ? <X /> : <Pencil />}
        </Button>
      </div>

      <Separator className='my-4' />

      {!edit && (
        <div className='grid grid-cols-2 gap-4'>
          <div className='flex flex-col space-y-0'>
            <h3 className='text-lg font-medium'>Title</h3>
            <p className='text-muted-foreground'>Webpack</p>
          </div>

          <div className='flex flex-col space-y-0'>
            <h3 className='text-lg font-medium'>Slug</h3>
            <p className='text-muted-foreground'>webpack</p>
          </div>

          <div className='flex flex-col space-y-0 col-span-2'>
            <h3 className='text-lg font-medium'>Excerpt</h3>
            <p className='text-muted-foreground'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum odit rem,
              repellendus eius eligendi incidunt quibusdam illum unde consequatur ex impedit. Quasi,
              magni natus. Natus corrupti rerum similique sit est?
            </p>
          </div>

          <div className='flex flex-col space-y-0'>
            <h3 className='text-lg font-medium'>Category</h3>
            <p className='text-muted-foreground'>Frontend</p>
          </div>

          <div className='flex flex-col space-y-0'>
            <h3 className='text-lg font-medium'>Level</h3>
            <p className='text-muted-foreground'>Beginner</p>
          </div>

          <div className='flex flex-col space-y-0'>
            <h3 className='text-lg font-medium'>Course for whom</h3>
            <p className='text-muted-foreground'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, quaerat?
            </p>
          </div>

          <div className='flex flex-col space-y-0'>
            <h3 className='text-lg font-medium'>What students will learn?</h3>
            <p className='text-muted-foreground'>JavaScript, TypeScript, Webpack</p>
          </div>

          <div className='flex flex-col space-y-0'>
            <h3 className='text-lg font-medium'>Category</h3>
            <p className='text-muted-foreground'>Frontend</p>
          </div>

          <div className='flex flex-col space-y-0 col-span-2'>
            <h3 className='text-lg font-medium'>Keywords</h3>
            <p className='text-muted-foreground line-clamp-4'>
              Frontend, Web, Webpack, webpack, vite, javascript, JavaScript, Javascript, Frontend,
              frontend, front-end, webpack lessons, webpack course, webpack full course.
            </p>
          </div>
        </div>
      )}

      {edit && (
        <>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <div className='grid grid-cols-2 gap-4'>
              <Controller
                name='title'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <Label htmlFor='email'>Title</Label>
                    <Input
                      {...field}
                      id='title'
                      placeholder='Next.js'
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name='slug'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <Label htmlFor='slug'>Slug</Label>
                    <Input
                      {...field}
                      id='slug'
                      placeholder='nextjs'
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name='excerpt'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className='gap-2 col-span-2' data-invalid={fieldState.invalid}>
                    <Label htmlFor='excerpt'>Excerpt</Label>
                    <Textarea
                      {...field}
                      id='excerpt'
                      placeholder='Next.js course'
                      className='resize-none h-24'
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name='level'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <Label htmlFor='level'>Level</Label>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder='Select a category' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value='BEGINNER'>Beginner</SelectItem>
                          <SelectItem value='INTERMEDIATE'>Intermediate</SelectItem>
                          <SelectItem value='ADVANCED'>Advanced</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name='category'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <Label htmlFor='category'>Category</Label>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder='Select a category' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value='FRONTEND'>Frontend</SelectItem>
                          <SelectItem value='BACKEND'>Backend</SelectItem>
                          <SelectItem value='MOBILE'>Mobile</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name='keywords'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className='gap-2 col-span-2' data-invalid={fieldState.invalid}>
                    <Label htmlFor='keywords'>Keywords</Label>
                    <Textarea
                      {...field}
                      id='keywords'
                      placeholder='Next.js course, React course, Frontend course'
                      className='h-24'
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Button type='submit' variant='secondary' size='lg' onClick={toggleEdit}>
                <VscDiscard />
                <span>Cancel</span>
              </Button>
              <Button type='submit' size='lg'>
                <Save />
                <span>Save changes</span>
              </Button>
            </div>
          </form>
        </>
      )}
    </div>
  )
}

export default Overview
