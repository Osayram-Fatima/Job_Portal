export const FilterLogic = (allJobs, searchQuery, location, category) => {
  return allJobs.filter((job) => {
    const matchesTitle = job.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = location === "" || job.location === location;
    const matchesCategory = category === "" || job.category === category;

    return matchesTitle && matchesLocation && matchesCategory;
  });
};