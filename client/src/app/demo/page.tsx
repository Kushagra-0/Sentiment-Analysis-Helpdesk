import Navbar from "@/components/common/navbar";

export default function AnalyzePage() {
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-400 to-blue-600 px-4 md:px-8 lg:px-32">
        <div className="w-full md:w-1/2 xl:w-3/5 p-8 rounded-3xl bg-white border-2 border-black shadow-lg">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-black text-black mb-6">
              DEMO
            </h1>

            <div className="mt-12">
              <video width="700" height="360" controls>
                <source src="/demo2.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="my-3">
              Welcome to the Demo!
            </div>
            <div className="my-3">
              In this video, we'll walk you through a quick demonstration of how Sentiment Analysis works. Whether you're here to explore features, understand the workflow, or see it in action—this demo has you covered.

              What You'll See:
            </div>
            <ul>
              <li>A real-time overview of the main interface</li>
              <li>Step-by-step usage of core features</li>
              <li>Key highlights that make this project unique</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}