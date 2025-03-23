import React from 'react'
import { getInterviewById } from '@/lib/actions/general.action';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import { getRandomInterviewCover } from '@/lib/utils';
import DisplayTechIcon from '@/components/DisplayTechIcon';
import Agent from '@/components/Agent';
import { getCurrentUser } from '@/lib/actions/auth.action';

const page = async ({params}:any) => {
  const {id} = params;
  const user = await getCurrentUser();
  const interview = await getInterviewById(id);

  if (!interview) redirect('/')

  return (
    <>
      <div className='flex flex-row gap-4 justify-between'>
        <div className="flex flex-row gap-4 items-center max-sm:flex-col">
          <div className="flex flex-row gap-4 items-center">
            <Image src={getRandomInterviewCover()} alt='cover-image' width={40} height={40} className='rounded-full object-cover size-[40px]' />
            <h3 className='capitalize'>{interview.role}</h3>
          </div>

          <DisplayTechIcon techStack={interview.techstack} />
        </div>

        <p className='bg-dark-200 px-4 py-2 rounded-lg h-fit capitalize'>{interview.type}</p>
      </div> 

      <Agent userName={user?.name!} interviewId={id} type='interview' questions={interview.questions} />
    </>
  )
}

export default page