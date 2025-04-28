
import SignUpForm from "@/components/auth/signup";
import Navbar from "@/components/common/navbar";
import React from "react";

const page = () => {
  return (
    <div className="bg-secondary">
      <Navbar />
      <SignUpForm />
    </div>
  );
};

export default page;
