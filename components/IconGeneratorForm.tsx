//components\IconGeneratorForm.tsx
import React, { useContext } from 'react';
import { IconGeneratorContext } from '@/context/IconGeneratorContext';
import { RadioGroup } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/20/solid'

const colorOptions = ['blue', 'red', 'orange', 'purple', 'yellow', 'pink', 'cyan', 'green', 'teal', 'black', 'lime', 'maroon', 'navy', 'gold', 'silver', 'indigo', 'magenta', 'olive', 'aqua', 'coral', 'violet', 'salmon', 'chartreuse'];
const styleOptions = ['metallic', 'polygon', 'pixelated', 'clay', 'gradient', 'flat', 'illustrated', 'minimalistic', 'hand-drawn', 'watercolor', 'isometric', 'neon', 'cartoonish', '3d', 'line-art', 'pop-art', 'doodle', 'grunge', 'sticker', 'realistic', 'mosaic', 'origami', 'chalkboard', 'woodcut'];
const modelOptions = [
  { name: 'Dalle 2', value: 'dall-e-2', description: '1 credit' },
  { name: 'Dalle 3', value: 'dall-e-3', description: '2 credits' },
];

const IconGeneratorForm: React.FC = () => {
  const context = useContext(IconGeneratorContext);

  if (!context) {
    return <div>Error: context not found</div>;
  }

  const { handleSubmit } = context;

  return (
    <div className='flex flex-col'>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        {/* Describe your icon */}
        <input type="text" name="noun" placeholder="Noun (e.g., chicken)" />
        <input type="text" name="adjective" placeholder="Adjective (e.g., angry)" />

        {/* Select primary color */}
        <select name="color">
          {colorOptions.map((colorOption) => (
            <option key={colorOption} value={colorOption}>{colorOption}</option>
          ))}
        </select>

        {/* Model type */}
        <RadioGroup name="model" defaultValue={modelOptions[0].value}>
          <RadioGroup.Label className="text-lg font-medium">Model</RadioGroup.Label>
          <div className="flex gap-16">
            {modelOptions.map((option) => (
              <RadioGroup.Option
                key={option.name}
                value={option.value}
                className={({ active, checked }) =>
                  `relative flex items-center rounded-lg px-5 py-4 cursor-pointer 
                  focus:outline-none ${active ? 'ring-2 ring-offset-2 ring-offset-sky-300 ring-white ring-opacity-60' : ''} 
                  ${checked ? 'bg-sky-900 bg-opacity-75 text-white' : 'bg-white'}`}>
                {({ checked }) => (
                  <>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label as="p" className={`font-medium  ${checked ? 'text-white' : 'text-gray-900'}`}>
                            {option.name}
                          </RadioGroup.Label>
                          <RadioGroup.Description as="span" className={`inline ${checked ? 'text-sky-100' : 'text-gray-500'}`}>
                            {option.description}
                          </RadioGroup.Description>
                        </div>
                      </div>
                      {checked && (
                        <div className="w-8 text-white">
                          <CheckIcon />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>

        {/* Select style */}
        <select name="style">
          {styleOptions.map((styleOption) => (
            <option key={styleOption} value={styleOption}>{styleOption}</option>
          ))}
        </select>

        <button type="submit">Generate Image</button>
      </form>
    </div>
  );
};

export default IconGeneratorForm;