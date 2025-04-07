export const fetchSummarizations = async () => {
  const response = await fetch("/api/summarization");
  const data = await response.json();
  return data;
};
