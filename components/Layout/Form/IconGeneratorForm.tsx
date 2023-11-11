//components\IconGeneratorForm.tsx
import React, { useContext } from 'react';
import { IconGeneratorContext } from '@/context/IconGeneratorContext';
import { RadioGroup } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/20/solid';
import {
  colorOptions,
  styleOptions,
  modelOptions,
  quantityOptions
} from '@/utils/options';

import Spinner from '../../Spinner';

const IconGeneratorForm: React.FC = () => {
  const context = useContext(IconGeneratorContext);

  if (!context) {
    return <div>Error: context not found</div>;
  }

  const { handleSubmit, loading } = context;

  return (
    <div className="flex flex-col">
      <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
        {/* Describe your icon */}
        <input type="text" name="noun" placeholder="Noun (e.g., robot)" />
        <input
          type="text"
          name="adjective"
          placeholder="Adjective (e.g., happy)"
        />
        {/* Select primary color */}
        <select name="color">
          {colorOptions.map((colorOption) => (
            <option key={colorOption} value={colorOption}>
              {colorOption}
            </option>
          ))}
        </select>
        {/* Select style */}
        <select name="style">
          {styleOptions.map((styleOption) => (
            <option key={styleOption} value={styleOption}>
              {styleOption}
            </option>
          ))}
        </select>{' '}
        {/* Model type */}
        <RadioGroup name="model" defaultValue={modelOptions[0].value}>
          <RadioGroup.Label className="text-lg font-medium">
            Model
          </RadioGroup.Label>
          <div className="flex gap-24 mt-4">
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
        {loading ? (
          <button
            type="button"
            className=" items-center px-4 py-2 inline-flex font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150  cursor-wait"
            disabled
          >
            <Spinner />
            Processing...
          </button>
        ) : (
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150 "
          >
            Generate Image
          </button>
        )}
      </form>
    </div>
  );
};

export default IconGeneratorForm;
