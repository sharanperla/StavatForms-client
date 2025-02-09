import React from 'react'
import { Helmet } from 'react-helmet-async'

function Error() {
  return (
    <>
     <Helmet>
        <title>Home | My Website</title>
        <meta name="error page" content="Welcome stavat forms" />
        <meta name="keywords" content="JobSim, Job Simulation, Social Media, Cyber Awareness, Cybersecurity, Phishing Attack, Online Safety, Digital Security, Data Protection " />
        <meta property="og:title" content="Error | StavatForms" />
        <meta property="og:description" content="The best website for React developers!" />
        <meta property="og:image" content="/contact-form.png" />
      </Helmet>
    <div>
      <h1>Something went wrong!</h1>
    </div>
    </>
  )
}

export default Error
