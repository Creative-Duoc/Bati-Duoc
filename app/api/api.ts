export const indicadorEconomico = async () => {
  const url = "https://mindicador.cl/api";
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
