import Navbar from "@/components/common/navbar";
import SentimentAnalysisForm from "@/components/common/sentimentanalysisform";

export default function AnalyzePage() {
  return (
    <>
    <Navbar />
    <div className="flex justify-center items-center h-screen bg-white px-4 md:px-8 lg:px-32">
      <div className="w-full md:w-1/2 xl:w-2/5 p-8 rounded-3xl bg-white border-2 border-black">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-black mb-6 text-text">
            Audio Sentiment Analysis
          </h1>
          
          <div className="mt-12">
            <SentimentAnalysisForm />
          </div>
        </div>
      </div>
    </div>
    </>
  )
}