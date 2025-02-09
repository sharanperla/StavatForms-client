import React from 'react'
import { Helmet } from 'react-helmet-async'

function Error() {
  return (
    <>
      <Helmet>
        <title>Error | HackSocially</title>
        <meta name="Error page" content="Welcome hacksocially.space" />
        <meta name="keywords" content="hacksocially , JobSim, Job Simulation, Social Media, Cyber Awareness, Cybersecurity, Phishing Attack, Online Safety, Digital Security, Data Protection" />
        <meta property="og:title" content="Error | Hacksocially" />
        <meta property="og:description" content="The best website for cyberawareness!" />
        <meta property="og:image" content="https://hacksocially.space/contact-form.png" />
      </Helmet>
    <div>
      <h1>Something went wrong!</h1>
    </div>
    </>
  )
}

export default Error
