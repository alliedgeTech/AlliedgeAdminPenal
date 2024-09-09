const Loader = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-30 z-50">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-solid border-fontColor border-t-transparent"></div>
    </div>
  );
};

export default Loader;
