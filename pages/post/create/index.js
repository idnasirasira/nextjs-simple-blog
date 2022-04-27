const PostCreatePage = () => {
  return (
    <div className="container mx-auto h-screen flex items-center justify-center -mt-5">
      <div className="flex flex-col w-6/12 shadow-md border border-gray-100 p-10">
        <h1 className="text-center text-2xl">Create Post</h1>
        <form className="flex gap-3 flex-col" onSubmit={() => {}}>
          {/* {errorMessage && <p className="text-red-500">{errorMessage}</p>} */}

          <div className="flex flex-col">
            <label htmlFor="fullname" className="mb-2">
              Name
            </label>
            <input
              className="py-2 px-3 border border-gray-300 rounded-sm"
              type="text"
              name="fullname"
              autoComplete="fullname"
              //   value={name}
              //   onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="description" className="mb-2">
              Name
            </label>
            <textarea
              className="py-2 px-3 border border-gray-300 rounded-sm"
              type="text"
              name="description"
              autoComplete="description"
              //   value={name}
              //   onChange={(e) => setName(e.target.value)}
            ></textarea>
          </div>

          <div className="flex flex-col">
            <label htmlFor="file" className="mb-2">
              Images
            </label>
            <input
              className="py-2 px-3 border border-gray-300 rounded-sm"
              type="file"
              name="file"
              autoComplete="file"
              //   value={email}
              //   onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mt-3">
            <button className="w-full border border-gray-500 py-2 hover:bg-gray-500 hover:text-white transition-colors duration-300">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostCreatePage;
