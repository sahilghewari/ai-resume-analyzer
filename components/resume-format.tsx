
const ResumeFormat = () => {
  return (
    <div className='m-4 p-12 font-serif w-2/3 border border-black'>
      <div className="flex justify-center items-center flex-col mb-4">
        <h1 className="text-5xl font-bold">Jake Ryan</h1>
        <p>123-456-7890 | jake@su.edu | linkedin.com/in/jake | github.com/jake</p>
      </div>
      {/* Education  */}
      <div>
        <div className='border-b border-black w-full font-semibold text-xl '>
          <span>Education</span>
        </div>
        <div className="mx-4 my-2">
          <div className="flex justify-between items-center">
            <span className="font-bold">Southwestern University</span><span className="">Georgetown, TX</span>
          </div>
          <div className="flex justify-between items-center font-light italic">
            <span>Bachelor of Science in Computer Science</span><span>Aug 2018 - May 2024</span>
          </div>
        </div>
        <div className="mx-4 my-2">
          <div className="flex justify-between items-center">
            <span className="font-bold">Southwestern University</span><span className="">Georgetown, TX</span>
          </div>
          <div className="flex justify-between items-center font-light italic">
            <span>Bachelor of Science in Computer Science</span><span>Aug 2018 - May 2024</span>
          </div>
        </div>
      </div>
      {/* Experience */}
      <div className='mt-4'>
        <div className='border-b border-black w-full font-semibold text-xl'>
          <span>Experience</span>
        </div>
        <div className="mx-4 my-2">
          <div className="flex justify-between items-center">
            <span className="font-bold">Software Engineer Intern</span><span className="">Company Name</span>
          </div>
          <div className="flex justify-between items-center font-light italic">
            <span>Location</span><span>May 2023 - Aug 2023</span>
          </div>
          <ul className="list-disc list-inside mt-2 mx-4">
            <li>Developed a web application using React and Node.js.</li>
            <li>Collaborated with a team of 5 to design and implement new features.</li>
            <li>Participated in code reviews and contributed to the documentation.</li>
          </ul>
        </div>
        <div className="mx-4 my-2">
          <div className="flex justify-between items-center">
            <span className="font-bold">Software Engineer Intern</span><span className="">Company Name</span>
          </div>
          <div className="flex justify-between items-center font-light italic">
            <span>Location</span><span>May 2023 - Aug 2023</span>
          </div>
          <ul className="list-disc list-inside mt-2 mx-4">
            <li>Developed a web application using React and Node.js.</li>
            <li>Collaborated with a team of 5 to design and implement new features.</li>
            <li>Participated in code reviews and contributed to the documentation.</li>
          </ul>
        </div>
      </div>
      {/* Projects */}
      <div className='mt-4'>
        <div className='border-b border-black w-full font-semibold text-xl'>
          <span>Projects</span>
        </div>
        <div className="mx-4 my-2">
          <div className="flex justify-between items-center">
            <span>
              <span className="font-bold border-r border-black mr-2 pr-2">Personal Portfolio Website</span> 
              <span className="italic font-light">Python, Flask, React, PostgreSQL, Docker</span>
            </span>
            <span className="hover:underline"><a href="https://www.github.com">GitHub Link</a></span>
          </div>
          <ul className="list-disc list-inside mt-2">
            <li>Developed a personal portfolio website using HTML, CSS, and JavaScript.</li>
            <li>Showcased projects and skills to potential employers.</li>
            <li>Developed a personal portfolio website using HTML, CSS, and JavaScript.</li>
            <li>Showcased projects and skills to potential employers.</li>
          </ul>
        </div>
        <div className="mx-4 my-2">
          <div className="flex justify-between items-center">
            <span>
              <span className="font-bold border-r border-black mr-2 pr-2">Personal Portfolio Website</span> 
              <span className="italic font-light">Python, Flask, React, PostgreSQL, Docker</span>
            </span>
            <span className="hover:underline"><a href="https://www.github.com">GitHub Link</a></span>
          </div>
          <ul className="list-disc list-inside mt-2">
            <li>Developed a personal portfolio website using HTML, CSS, and JavaScript.</li>
            <li>Showcased projects and skills to potential employers.</li>
          </ul>
        </div>
      </div>
      {/* Technical skills */}
      <div className='mt-4'>
        <div className='border-b border-black w-full font-semibold text-xl'>
          <span>Technical Skills</span>
        </div>
        <div className="mx-4 my-2">
          <ul className="list-none mt-2">
            <li>Languages: Python, Java, JavaScript, C++</li>
            <li>Frameworks: React, Node.js, Flask</li>
            <li>Tools: Git, Docker, PostgreSQL</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ResumeFormat