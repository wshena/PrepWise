import { cn, getTechLogos } from '@/lib/utils'
import Image from 'next/image';
import React from 'react'

const DisplayTechIcon = async ({techStack}:TechIconProps) => {
  const techIcons = await getTechLogos(techStack);

  return (
    <div className='flex flex-row'>{techIcons?.slice(0, 3).map(({tech, url}, idx) => (
      <div key={tech} className={cn("relative group bg-dark-300 rounded-full p-2 flex-center", idx >= 1 && '-ml-1')}>
        <span className="tech-tooltip">{tech}</span>
        <Image src={url} alt={tech} width={100} height={100} className='size-5' />
      </div>
    ))}</div>
  )
}

export default DisplayTechIcon