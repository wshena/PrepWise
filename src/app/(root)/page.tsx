import InterviewCard from '@/components/InterviewCard'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Get interview ready with AI powered practice & feedback</h2>
          <p className="text-lg">
            Practice on real interview question & get instant feedback
          </p>

          <Button asChild className='btn-primary max-sm:w-full'>
            <Link href={'/interview'}>Start an Interview</Link>
          </Button>
        </div>
        <Image src={'/robot.png'} alt='robo-dude' width={400} height={400} className='max-sm:hidden' />
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Interview</h2>
        <div className="interview-section">
          {/* {dummyInterviews.map((interview) => (
            <InterviewCard key={interview.id} {...interview} />
          ))} */}
          {/* <p>You haven't taken an interview yet</p> */}
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Take an interview</h2>

        <div className="interview-section">
          {/* {dummyInterviews.map((interview) => (
            <InterviewCard key={interview.id} {...interview} />
          ))} */}
          {/* <p>There are no interview avalible</p> */}
        </div>
      </section>
    </>
  )
}

export default page