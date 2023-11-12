//components\Form\IconGeneratorForm.tsx
import React from 'react';
import { RadioGroup } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/20/solid';
import { modelOptions } from '@/utils/options';

const ModelType: React.FC = () => {
  return (
    <div>
      <RadioGroup name="model" defaultValue={modelOptions[0].value}>
        <RadioGroup.Label className="text-lg font-medium">
          Model
        </RadioGroup.Label>
        <div className="flex flex-col md:flex-row gap-4 mt-4">
          {modelOptions.map((option) => (
            <RadioGroup.Option
              key={option.name}
              value={option.value}
              className={({ checked }) =>
                `relative flex items-center rounded-lg  py-4 px-5 cursor-pointer 
                  focus:outline-none
                  ${
                    checked
                      ? 'bg-indigo-500 bg-opacity-75 text-white'
                      : 'hover:border hover:border-indigo-500 hover:rounded-lg'
                  }`
              }
            >
              {({ checked }) => (
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <div className="text-sm ">
                      <RadioGroup.Label
                        as="p"
                        className={`font-medium  ${
                          checked ? 'text-white' : 'text-gray-900'
                        } `}
                      >
                        {option.name}
                      </RadioGroup.Label>
                      <RadioGroup.Description
                        as="span"
                        className={`inline ${
                          checked ? 'text-sky-100' : 'text-gray-500'
                        }`}
                      >
                        {option.description}
                      </RadioGroup.Description>
                    </div>
                  </div>
                  {checked && (
                    <div className=" w-8 text-white p-1 ">
                      <CheckIcon />
                    </div>
                  )}
                </div>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
};

export default ModelType;
