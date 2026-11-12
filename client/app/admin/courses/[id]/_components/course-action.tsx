import { Button } from '@/components/ui/button'
import { ArrowLeft, Pencil, Trash } from 'lucide-react'

const CourseAction = () => {
  return (
    <div className='flex items-center gap-x-1'>
      <Button variant='outline'>
        <ArrowLeft />
        <span>Back</span>
      </Button>
      <Button variant='default'>
        <Pencil />
        <span>Draft</span>
      </Button>
      <Button variant='destructive'>
        <Trash />
        Delete
      </Button>
    </div>
  )
}

export default CourseAction
