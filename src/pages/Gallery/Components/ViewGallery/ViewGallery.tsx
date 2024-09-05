import React from 'react';
import { CancelButton } from '../../../../components/Button';
import { IGallery } from '../../Gallery.props';
import useViewGallery from './useGallery';

const ViewGallery: React.FC<{ gallery: IGallery }> = ({ gallery }) => {
  const { isModalOpen, handleCloseModal } = useViewGallery();

  if (!isModalOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
      <div className="bg-main-bg gap-10 rounded-lg p-8 max-w-xl flex flex-col max-h-full overflow-hidden">
        <h1 className="text-2xl mb-4">Latest News Details</h1>
        <div className="flex flex-wrap overflow-y-auto max-h-96">
          <div className="w-full">
            <p className="mb-2"><strong>ID:</strong> {gallery._id}</p>
            <p className="mb-2"><strong>Title:</strong> {gallery.title}</p>
           
           
            {gallery.images && (
              <div className="mb-2">
                <strong>Image:</strong>
                <img src={gallery.images} alt="Latest News" className="mt-2" />
              </div>
            )}
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <CancelButton
            onClick={handleCloseModal}
            className="py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Close
          </CancelButton>
        </div>
      </div>
    </div>
  );
};

export default ViewGallery;
