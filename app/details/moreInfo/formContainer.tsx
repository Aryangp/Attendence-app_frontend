"use client"
import DropdownSelect from '@/app/components/Dropdown/DropdownComp';
import { type } from 'os'
import React,{useState} from 'react'

interface FormDetails {
    id: number,
    title: string,
    placeholder: string,
    type: string,
}

interface FormContainerProps {
    formDetails: FormDetails[];
    formData:any
    setFormData: (prev: any) => void;
}

const FormContainer = ({ formDetails, setFormData , formData}: FormContainerProps) => {
    
    // testing purpose for now
    const options = [
        { value: 'DAA', label: 'DAA' },
        { value: 'NSC', label: 'NSC' },
        { value: 'Python', label: 'Python' },
        { value: 'CLI', label: 'CLI' },
        { value: 'Artificial Intelligence', label: 'Artificial Intelligence' },
      ];
    
      const [selectedOptions, setSelectedOptions] = useState([]);
    

    return (
        <div className="mt-8 mx-20 p-4">
            {formDetails.map((formDetail: FormDetails) => (
               
                <div key={formDetail.id}>
                    <div className="font-bold text-gray-400 text-xs leading-8 uppercase h-6 mx-2 mt-3">{formDetail.title}</div>
                    <div className="flex flex-col md:flex-row">
                        {formDetail.type != 'Array' ? (
                        <div className=" w-full flex-1 mx-2 svelte-1l8159u">
                            <div className="bg-white my-2 p-1 flex border border-gray-200 rounded svelte-1l8159u">
                                <input 
                                    onChange={(e) => setFormData((prev) => ({ ...prev, [formDetail.id]: e.target.value }))} 
                                    placeholder={formDetail.placeholder} 
                                    type={formDetail.type} 
                                    className="p-1 px-2 appearance-none outline-none w-full text-gray-800" 
                                />
                            </div>
                        </div>
                        ):(
                           <DropdownSelect
                                    options={options}
                                    placeholder="Select Subjects"
                                    formid={formDetail.id}
                                    selectedOptions={formData}
                                    setSelectedOptions={setFormData}
                           /> 
                        )
                        }
                    </div>
                </div>
              
            ))}
        </div>
    )
}

export default FormContainer

