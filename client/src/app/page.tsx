import Navbar from '@/components/common/navbar'
import Link from 'next/link'
import { CheckCircle, BarChart2, Shield } from 'lucide-react'

export default function Home() {
  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-400 to-blue-600 px-4 md:px-8 lg:px-32">
        <div className="w-full md:w-1/2 xl:w-2/5 p-8 rounded-3xl bg-white border-2 border-black shadow-lg">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-black mb-6 text-black">
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
                className="w-full py-3 px-6 bg-blue-500 text-white font-bold rounded-2xl hover:bg-blue-600 transition-colors duration-300 text-center"
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

      {/* Features Section */}
      <div className="bg-white py-16 px-4 md:px-8 lg:px-32 bg-gradient-to-r from-blue-400 to-blue-600">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black text-center mb-12 text-white">
            Why Choose Our Platform
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: CheckCircle,
                title: "Accurate Analysis",
                description: "Leverage advanced AI to precisely capture the emotional nuances in customer interactions."
              },
              {
                icon: BarChart2,
                title: "Comprehensive Insights",
                description: "Receive detailed reports that break down sentiment across different dimensions of customer communication."
              },
              {
                icon: Shield,
                title: "Data Privacy",
                description: "Rest assured with our robust security measures that protect your sensitive customer data."
              }
            ].map(({ icon: Icon, title, description }, index) => (
              <div 
                key={index} 
                className="bg-white border-2 border-black rounded-3xl p-6 text-center hover:shadow-lg transition-shadow duration-300 hover:bg-blue-50"
              >
                <div className="flex justify-center mb-4">
                  <Icon className="w-12 h-12 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-black">{title}</h3>
                <p className="text-gray-600 font-medium">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-white py-16 px-4 md:px-8 lg:px-32 bg-gradient-to-r from-blue-400 to-blue-600">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black text-center mb-16 text-white">
            How It Works
          </h2>
          
          <div className="space-y-8">
            {[
              {
                step: "1",
                title: "Upload Recordings",
                description: "Easily upload customer call recordings or transcripts to our secure platform. Support for multiple file formats ensures a seamless integration with your existing workflow."
              },
              {
                step: "2",
                title: "AI Analysis",
                description: "Our advanced AI meticulously analyzes the emotional tone of each interaction. Using state-of-the-art natural language processing, we identify subtle sentiment nuances and contextual emotional patterns."
              },
              {
                step: "3",
                title: "Actionable Insights",
                description: "Receive comprehensive, detailed reports that go beyond simple sentiment scores. Our platform provides actionable recommendations to improve customer experience, agent performance, and overall service quality."
              }
            ].map(({ step, title, description }, index) => (
              <div 
                key={index} 
                className="bg-white border-2 border-black rounded-3xl p-10 text-left hover:shadow-lg transition-shadow duration-300 hover:bg-blue-50"
              >
                <div className="text-8xl font-black text-gray-200 mb-6 leading-none">{step}</div>
                <h3 className="text-3xl font-bold mb-6 text-black">{title}</h3>
                <p className="text-lg text-gray-600 font-medium">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* Call to Action Section */}
      <div className="bg-white py-16 px-4 md:px-8 lg:px-32 bg-gradient-to-r from-blue-400 to-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black mb-6 text-white">
            Ready to Transform Your Customer Experience?
          </h2>
          <p className="text-lg text-gray-900 mb-8 max-w-2xl mx-auto">
            Join hundreds of businesses leveraging AI-powered sentiment analysis to understand and improve customer interactions.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              href="/register" 
              className="w-full sm:w-auto py-3 px-6 bg-white   text-black font-bold rounded-2xl hover:bg-gray-300 transition-colors duration-300"
            >
              Get Started Free
            </Link>
            
            <Link 
              href="/demo" 
              className="w-full sm:w-auto py-3 px-6 border-2 border-black text-black font-bold rounded-2xl hover:bg-gray-100 transition-colors duration-300"
            >
              Watch Demo
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}