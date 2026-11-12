import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { FolderKanban, ImageIcon, List, MessageSquareReply } from 'lucide-react'
import Link from 'next/link'
import CourseAction from './_components/course-action'
import Curriculum from './_components/curriculum'
import Overview from './_components/overview'
import Overviews from './_components/reviews'
import Thumbnail from './_components/thumbnail'

interface PageProps {
  params: Promise<{ id: string }>
  searchParams: { [key: string]: string }
}

const CourseDetailPage = async ({ params, searchParams }: PageProps) => {
  const { id } = await params
  const { tab } = await searchParams

  return (
    <div className='mt-4'>
      <div className='flex justify-between items-center'>
        <h2 className='text-2xl font-space-grotesk font-semibold'>Webpack</h2>
        <CourseAction />
      </div>
      <Separator className='my-4' />
      <div className='grid grid-cols-5 gap-x-4'>
        <div className='col-span-1'>
          <div className='bg-sidebar rounded-md border p-2'>
            <h3 className='font-space-grotesk font-semibold text-lg'>Course Details</h3>
            <Separator className='my-2' />
            <div className='flex flex-col space-y-2'>
              {items.map(item => (
                <Button
                  key={item.title}
                  variant={tab === item.title ? 'secondary' : 'ghost'}
                  className='flex justify-start w-full'
                  render={
                    <Link
                      href={{
                        pathname: `/admin/courses/${id}`,
                        query: { tab: item.title }
                      }}
                    >
                      <item.icon />
                      <span className='capitalize'>{item.title}</span>
                    </Link>
                  }
                  nativeButton={false}
                ></Button>
              ))}
            </div>
          </div>
        </div>
        <div className='col-span-4'>
          {tab === 'overview' && <Overview />}
          {tab === 'curriculum' && <Curriculum />}
          {tab === 'thumbnail' && <Thumbnail />}
          {tab === 'reviews' && <Overviews />}
        </div>
      </div>
    </div>
  )
}

export default CourseDetailPage

const items = [
  { title: 'overview', icon: FolderKanban },
  { title: 'curriculum', icon: List },
  { title: 'thumbnail', icon: ImageIcon },
  { title: 'reviews', icon: MessageSquareReply }
]
