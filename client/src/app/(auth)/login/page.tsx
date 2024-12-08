import SignInForm from "@/components/auth/signin";
import Navbar from "@/components/common/navbar";
import React from "react";

const page = () => {
  return (
    <div className="bg-secondary">
      <Navbar />
      <SignInForm />;
    </div>
  );
};

export default page;