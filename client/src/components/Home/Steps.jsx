
const steps = [
    {
      number: "01",
      title: "Your Guide to Voting Made Simple",
      description: "Our voting web app is designed with students in mind, ensuring a seamless experience from registration to casting your vote. Follow these simple steps to make your voice heard."
    },
    {
      number: "02",
      title: "Step 1: Register for the Voting App",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat."
    },
    {
      number: "03",
      title: "Step 2: Explore Candidate Profiles",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat."
    }
  ]
  
  export default function Steps() {
    return (
      <div className="container mx-auto px-4 py-16">
        {steps.map((step, index) => (
          <div key={index} className="mb-16 last:mb-0">
            <div className="flex items-start gap-8">
              <div className="text-7xl md:text-8xl font-bold text-gray-900">
                {step.number}
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  {step.title}
                </h2>
                <p className="text-gray-600 max-w-2xl">
                  {step.description}
                </p>
              </div>
            </div>
            {index !== steps.length - 1 && (
              <div className="border-b border-gray-200 mt-16"></div>
            )}
          </div>
        ))}
      </div>
    )
  }
  
  