//components\IconGeneratorForm.tsx
import React, { useContext } from 'react';
import { IconGeneratorContext } from '@/context/IconGeneratorContext';
import DescribeIcon from './DescribeIcon';
import SelectStyle from './SelectStyle';
import Spinner from '../Spinner';
import ModelType from './ModelType';

const IconGeneratorForm: React.FC = () => {
  const context = useContext(IconGeneratorContext);

  if (!context) {
    return <div>Error: context not found</div>;
  }

  const { handleSubmit, loading } = context;

  return (
    <div className="border min-h-full border-indigo-600 rounded-md p-4">
      <form className="flex flex-col gap-4 sm:gap-12" onSubmit={handleSubmit}>
        {/* Describe your icon */}
        <DescribeIcon />

        {/* Select primary color and style*/}
        <SelectStyle />

        {/* Model type */}
        <ModelType />

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
          <>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150 "
            >
              Generate Image
            </button>
            <p>DISCLAIMER: Image generation will take about 15 seconds!</p>
          </>
        )}
      </form>
    </div>
  );
};

export default IconGeneratorForm;
