import {TbLicense} from 'react-icons/tb'
import {GrUserAdmin} from 'react-icons/gr'
import {MdSupervisorAccount} from 'react-icons/md'
export const services = [
    {
      icon: (
       <TbLicense/>
      ),
      title: 'Licensing',
      description: 'Plan it, create it, launch it. Collaborate seamlessly with all the organization and hit your marketing goals every month with our marketing plan.',
    },
    {
      icon: (
     <GrUserAdmin className='invert-0 dark:invert'/>
      ),
      title: 'Administration',
      description: 'Protect your organization, devices and stay compliant with our structured workflows and custom permissions made for you.',
    },
    {
      icon: (
      <MdSupervisorAccount/>
      ),
      title: 'Supervision',
      description: 'Auto-assign tasks, send Slack messages, and much more. Now power up with hundreds of new templates to help you get started.',
    },
  
  ];