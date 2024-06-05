const SortFilterBlogs = ({ setSortOption, sortOption }) => {
  return (
    <div className=" w-full ">
      <select
        value={sortOption}
        onChange={e => setSortOption(e.target.value)}
        className="select select-accent  w-full max-w-none md:max-w-lg bg-transparent"
      >
        <option value="">Sort options</option>
        <option value="option1">JavaScript</option>
        <option value="option2">Vue</option>
        <option value="option3">MongoDB</option>
      </select>
    </div>
  );
};

export default SortFilterBlogs;
