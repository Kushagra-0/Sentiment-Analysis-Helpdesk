import Navbar from '@/components/common/navbar'
import Link from 'next/link'

export default function Home() {
  return (
    <>
    <Navbar />
    <div className="flex justify-center items-center h-screen bg-white px-4 md:px-8 lg:px-32">
      <div className="w-full md:w-1/2 xl:w-2/5 p-8 rounded-3xl bg-white border-2 border-black">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-black mb-6 text-text">
            Sentiment Analytics
          </h1>
          
          <div className="max-w-2xl mx-auto mb-8">
            <p className="text-lg text-gray-700 mb-4 font-medium">
              Unlock insights from your customer interactions by analyzing the emotional tone of helpdesk calls.
            </p>
            <p className="text-md text-gray-600 mb-6 font-medium">
              Our AI-powered tool helps you understand customer sentiment, improve service quality, and enhance customer experience.
            </p>
          </div>

          <div className="flex flex-col items-center space-y-4">
            <Link 
              href="/analyze" 
              className="w-full py-3 px-6 bg-black text-white font-bold rounded-2xl hover:bg-gray-900 transition-colors duration-300 text-center"
            >
              Start Analyzing
            </Link>
            
            <Link 
              href="/register" 
              className="w-full py-3 px-6 border-2 border-black text-black font-bold rounded-2xl hover:bg-gray-100 transition-colors duration-300 text-center"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}