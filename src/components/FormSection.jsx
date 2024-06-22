import React, { useState } from 'react'
import PersonalDetailsForm from './forms/PersonalDetailsForm'
import { Button } from './ui/button'
import { ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-react'
import SummaryForm from './forms/SummaryForm'
import ExperienceForm from './forms/Experience'

const FormSection = () => {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(false);

  return (
    <div>
      <div className='flex justify-between items-center'>
        <Button variant="outline"
        size="sm"
        className="flex gap-2">
          <LayoutGrid /> Theme
        </Button>
        <div className='flex gap-2'>
          {
            activeFormIndex > 1 && 
            <Button size="sm" className="flex gap-2"
            onClick={() => setActiveFormIndex(activeFormIndex - 1)}
            >
              <ArrowLeft />
            </Button>
          }
          <Button 
          disabled={!enableNext}
          className="flex gap-2" size="sm"
          onClick={() => setActiveFormIndex(activeFormIndex + 1)}
          >
            Next <ArrowRight />
          </Button>
        </div>
      </div>

      {
        activeFormIndex == 1 
        ? <PersonalDetailsForm enableNext={(v) => setEnableNext(v)}/> 
        : activeFormIndex == 2
        ? <SummaryForm enableNext={(v) => setEnableNext(v)}/>
        : activeFormIndex ==3 
        ? <ExperienceForm enableNext={(v) => setEnableNext(v)}/>
        : null
      }
      
    </div>
  )
}

export default FormSection