"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import axios from "axios";





export default function Home() {

  const [formHeading,setFormHeading]=useState("Enter Your form Detail");
  const [ formDescription,setFormDescription]=useState("Enter Your Form Description Here ok")
  const [textAreaValue,setTextAreaValue]=useState("this is the textarea value");
  const [formFooter,setFormFooter]=useState("Enter Your Card Footer Here");

  const handleButtonClick=async ()=>{

    //get all the custom data enterted by admin

    //send it to backend


    const data= await axios.post("https://testrepo-g4se.onrender.com/hostsite",{
      heading:formHeading,
      description:formDescription,
      footer:formFooter
    })

    console.log(data);
    


    //render the page with the admin data
    console.log("BUtton is getting lciked")
  }

  return (
    <div className="flex w-full h-screen">
   <div className="w-1/2 m-4">

    <div>
      <label htmlFor="heading"  >Heading</label>
      <Input className="w-1/2 m-2" name="heading" value={formHeading} onChange={(e)=>setFormHeading(e.target.value)}/ >
    </div>
    
    <div>
      <label htmlFor="description">Description</label>
      <Input className="w-1/2 m-2" name="description" value={formDescription} onChange={(e)=>setFormDescription(e.target.value)}/ >
    </div>
    <div>
      <label htmlFor="footer">Footer</label>
      <Input className="w-1/2 m-2" name="footer" value={formFooter} onChange={(e)=>setFormFooter(e.target.value)}/ >
    </div>
    
    <div className="pt-3">

    <Button variant="outline" onClick={handleButtonClick}>Host</Button>
    </div>
    
    </div>

    <div className="w-px bg-gray-400"></div>


    <div className="w-1/2   flex items-center justify-center">
    <Card >
  <CardHeader>
    <CardTitle>{formHeading}</CardTitle>
    <CardDescription>{formDescription} </CardDescription>
  </CardHeader>
  <CardContent>
  <Textarea  />
  </CardContent>
  <CardFooter>
   {formFooter}
   
    
  </CardFooter>
  
</Card>

    </div>
  </div>
  );
}
