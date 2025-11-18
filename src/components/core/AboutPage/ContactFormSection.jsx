import React from 'react'
import ContactUsForm from '../../ContactPage/ContactUsForm'

const ContactFormSection = () => {
  return (
    <div className='mx-auto'>
      <h1 className='text-center text-4xl font-semibold'>
        Get in Touch
      </h1>
      <div className=' flex flex-col xs470:flex-row justify-center text-center text-richblack-300 mt-3'>
          
          We'd love to here for you,&nbsp;

        <p>Please fill out this form.</p>
      </div>
      <div className='mt-12 mx-auto'>
        <ContactUsForm />
      </div>
    </div>
  )
}

export default ContactFormSection
