export default async function handleResponse(response: Response) {
  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      window.dispatchEvent(new Event("auth:logout"));
      throw new Error("Sessão expirada. Faça login novamente.");
    }

    const errorData = await response.json().catch(() => null);
    const errorMessage =
      errorData?.error || `Erro: ${response.status} - ${response.statusText}`;
    throw new Error(errorMessage);
  }

  return response.json();
}

export async function handleResponseStudent(response: Response) {
  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      window.dispatchEvent(new Event("auth:logout"));
      throw new Error("Sessão expirada. Faça login novamente.");
    }

    const errorData = await response.json().catch(() => null);
    const errorMessage =
      errorData?.error || `Erro: ${response.status} - ${response.statusText}`;
    throw new Error(errorMessage);
  }

  const data = await response.json().catch(() => ({}));
  return { status: response.status, ...data };
}
