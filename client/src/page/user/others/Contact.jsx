import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const Contact = () => {
  return (
    <div className="flex flex-col items-center justify-between min-h-[90vh] bg-[#FFEFF1] p-8 py-8">
      <div className="flex flex-col items-center  justify-center">
        <h1 className="text-[45px]  mb-8">Contact</h1>
        <form className="w-full max-w-lg">
          <div className="grid grid-cols-1 gap-6">
            <div className="grid grid-cols-2 gap-4">
              <Input
                className="border-[0.8px] font-Inter border-[#C84253] rounded-lg p-2"
                placeholder="Name"
              />
              <Input
                className="border-[0.8px] font-Inter border-[#C84253] rounded-lg p-2"
                placeholder="Email*"
                required
                type="email"
              />
            </div>
            <Input
              className="border-[0.8px] font-Inter border-[#C84253] rounded-lg p-2"
              placeholder="Phone"
            />
            <Textarea
              className="border-[0.8px]  font-Inter focus:ring-transparent border-[#C84253] rounded-lg p-2 h-32"
              placeholder="Comment"
            />
            <Button className="bg-[#CC4254] text-lg hover:bg-[#c24051] text-white font-Inter w-[158px] rounded-sm py-2">
              Send
            </Button>
          </div>
        </form>
      </div>
      <div className="flex  bg-white flex-col items-center justify-center  w-full px-4 mt-14 py-16">
        <h1 className="text-5xl text-[#2C2C2C] font-Inter mb-2">
          Subscribe to our emails
        </h1>
        <p className="text-xl text-[#777777] font-Inter my-6">
          Join our email list for exclusive offers and latest news
        </p>
        <div className="flex border-[0.8px] border-[#C84253] rounded-xl">
          <Input
            className="border-none rounded-xl font-Inter text-[#777777] focus:ring-0 px-4 py-2"
            placeholder="Email"
            type="email"
          />
          <Button className="bg-white hover:bg-white font-black text-2xl  text-[#777777] px-4 py-2 rounded-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-right"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
              />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
