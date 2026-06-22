// FilterLogic.js - Fixed Version
export const FilterLogic = (jobs, searchTerm, selectedCategory) => {
  // ✅ Check if jobs is an array
  if (!Array.isArray(jobs)) {
    console.warn("Jobs is not an array:", jobs);
    return []; // Return empty array if jobs is not valid
  }

  return jobs.filter(job => {
    const matchesSearch = 
      job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location?.toLowerCase().includes(searchTerm.toLowerCase());
    
    // ✅ Case-insensitive category matching (Navy === navy === NAVY)
    const matchesCategory = 
      !selectedCategory || 
      selectedCategory === "All" || 
      job.category?.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });
};