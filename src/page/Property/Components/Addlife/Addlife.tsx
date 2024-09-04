import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Loader from '../../../../components/Loader';
import useAddLife from './useaddlife';
import { IAddLife } from '../../life.props';
import { CancelButton, FormButton } from '../../../../components/Botton';
import { toast, Toaster } from 'react-hot-toast';

const AddLife: React.FC = () => {
  const { formData, loading, handleChange, handleSubmit, handleCancel, error } = useAddLife();
  const { register, handleSubmit: useFormSubmit, formState: { errors } } = useForm<IAddLife>();
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const fields = [
    { label: 'Title', name: 'title', type: 'text', validation: { required: 'Title is required' } },
    { label: 'Paragraph', name: 'paragraph', type: 'textarea', validation: { required: 'Paragraph is required' } },
    { label: 'Images', name: 'images', type: 'file' },
  ] as const;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).filter(file => ['image/jpeg', 'image/png'].includes(file.type));
      if (filesArray.length + (formData.images as unknown as File[]).length > 8) {
        toast('You can only upload up to 8 images.', {
          icon: '',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
        return;
      }

      const newFilesArray = [...(formData.images as unknown as File[]), ...filesArray];
      handleChange('images', newFilesArray);

      const previews = newFilesArray.map(file => URL.createObjectURL(file));
      setImagePreviews(previews);
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImagePreviews = imagePreviews.filter((_, i) => i !== index);
    setImagePreviews(newImagePreviews);
    
    const updatedImages = (formData.images as unknown as File[]).filter((_, i) => i !== index);
    handleChange('images', updatedImages);
  };

  return (
    <div className="flex flex-col items-center w-full h-screen p-8">
      <Toaster />
      <div className="bg-white shadow-md rounded-lg pt-6 pb-6 w-full">
        <div className="border-b-2 w-full">
          <h1 className="text-3xl mb-2 text-gray-700 ml-5">Add Property</h1>
        </div>
        {loading && <Loader />}
        {error && <div className="text-red-500 text-center">{error}</div>}
        <form onSubmit={useFormSubmit(handleSubmit)} className="space-y-6">
          <fieldset className="m-2 rounded border-opacity-60 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 m-4">
              {fields.map((field) => (
                <div key={field.name}>
                  <label className="block text-gray-700 text-base font-semibold mb-2" htmlFor={field.name}>
                    {field.label}:
                  </label>
                  {field.name === 'images' ? (
                    <input
                      type="file"
                      id={field.name}
                      {...register(field.name)}
                      onChange={handleImageChange}
                      multiple
                    />
                  ) : (
                    <input
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                      type={field.type}
                      id={field.name}
                      {...register(field.name as keyof IAddLife, field.validation)}
                      value={(formData[field.name as keyof IAddLife] as string) || ''}
                      onChange={(e) => handleChange(field.name as keyof IAddLife, e.target.value)}
                    />
                  )}
                  {errors[field.name as keyof IAddLife] && (
                    <span className="text-red-500 text-xs italic">
                      {errors[field.name as keyof IAddLife]?.message}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </fieldset>
          <div className="flex justify-start mt-6 ml-10">
            <FormButton className="py-2 px-4 rounded mr-4" type="submit">
              Add
            </FormButton>
            <CancelButton className="py-2 px-4 rounded" onClick={handleCancel} type="button">
              Cancel
            </CancelButton>
          </div>
        </form>
        {imagePreviews.length > 0 && (
          <div className="mt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {imagePreviews.map((src, index) => (
                <div key={index} className="relative">
                  <img src={src} alt={`preview-${index}`} className="object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white h-5 w-5 flex items-center justify-center rounded-full"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddLife;
