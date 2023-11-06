"use client";
import React, { useEffect, useState } from "react";
import FormContainer from "./formContainer";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation'
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
interface FormDetails {
  id: number;
  title: string;
  placeholder: string;
  type: string;
}

const MoreDetails = () => {
  const { data: session } = useSession();
  const [formData1, setFormData1] = useState({} as any) || [] as any;
  const [formData2, setFormData2] = useState([] as any);
  const router = useRouter()
  const axiosAuth=useAxiosAuth()

  useEffect(() => {
    if (!session?.user) {
      router.push("/")
    }
  }, [session?.user]);

  const [step, setStep] = useState<number>(1);
  const formdetail: FormDetails[] = [
    {
      id: 1,
      title: "Roll Number",
      placeholder: "Roll Number",
      type: "text",
    },
    {
      id: 2,
      title: "Semester",
      placeholder: "Semester",
      type: "number",
    },
  ];
  const formdetail2: FormDetails[] = [
    {
      id: 1,
      title: "Subjects",
      placeholder: "Subjects",
      type: "Array",
    },
    ];
    const submitData = async () => {
     console.log(formData1,"formData1")
      console.log(formData2, "formData2")
      const formDataFinal = {
        rollNo: formData1[1],
        semester:parseInt(formData1[2]),
        subject:formData2.map((item:any) => item.value)
      }
      try {
        const res = await axiosAuth.post("/detail/moreDetails", formDataFinal)
        console.log(res,"res") 
      } catch (err) {
        console.log(err,"err")
      }

      console.log(formDataFinal,"formDataFinal")
      router.push("/")
      
    }

  const nextStep = async() => {
    setStep(step + 1);
    if (step == 2) {
      await submitData()
    }
  };

  const previousStep = () => {
    setStep(step - 1);
  };

  const skipStep = () => {
    // Implement your skip logic, e.g., set step to a specific value
    setStep(2); // Skip to the last step in this example
  };

  let stepComponent;
  switch (step) {
    case 1:
      stepComponent = <FormContainer formDetails={formdetail} formData={formData1} setFormData={setFormData1}/>;
      break;
    case 2:
      stepComponent = <FormContainer formDetails={formdetail2} formData={formData2} setFormData={setFormData2}/>;
      break;
    default:
      stepComponent = null;
  }
  return (
    <div>
      <div className="p-5 m-18 mt-9">
        <div className="mx-20 p-4">
          <div className="flex items-center">
            <div className="flex items-center text-teal-600 relative">
              <div
                className={
                  step >= 1
                    ? "rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 bg-teal-100  border-teal-600"
                    : "rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-gray-300"
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="100%"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="feather feather-bookmark "
                >
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-teal-600">
                Acadamic Detail
              </div>
            </div>
            <div
              className={
                step >= 2
                  ? "flex-auto border-t-2 transition duration-500 ease-in-out border-teal-600"
                  : "flex-auto border-t-2 transition duration-500 ease-in-out border-gray-300"
              }
            ></div>
            <div className="flex items-center text-white relative">
              <div
                className={
                  step >= 2
                    ? "rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 bg-teal-300 border-teal-600"
                    : "rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-gray-300"
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="100%"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="feather feather-user-plus"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="8.5" cy="7" r="4"></circle>
                  <line x1="20" y1="8" x2="20" y2="14"></line>
                  <line x1="23" y1="11" x2="17" y2="11"></line>
                </svg>
              </div>
              <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-teal-600">
                Subjects
              </div>
            </div>

           
          </div>
        </div>
        {stepComponent}

        <div className="flex p-2 mt-4 mx-10">
          <button
            onClick={() => previousStep()}
            className="text-base hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
        hover:bg-gray-200  
        bg-gray-100 
        text-gray-700 
        border duration-200 ease-in-out 
        border-gray-600 transition"
          >
            Previous
          </button>
          <div className="flex-auto flex flex-row-reverse">
            <button
              onClick={() => nextStep()}
              className="text-base  ml-2  hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
        hover:bg-teal-600  
        bg-teal-600 
        text-teal-100 
        border duration-200 ease-in-out 
        border-teal-600 transition"
            >
             {step == 2 ? "Submit":"Next"} 
            </button>
            <button
              onClick={() => skipStep()}
              className="text-base hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
        hover:bg-teal-200  
        bg-teal-100 
        text-teal-700 
        border duration-200 ease-in-out 
        border-teal-600 transition"
            >
              Skip
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoreDetails;
{/* <div
className={
  step >= 3
    ? "flex-auto border-t-2 transition duration-500 ease-in-out border-teal-600"
    : "flex-auto border-t-2 transition duration-500 ease-in-out border-gray-300"
}
></div> */}