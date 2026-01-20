import ErrorMessage from "@/components/ErrorMessage";
import { getPublicUserFromApi } from "@/features/user/lib/get-user";
import { UpdateUserForm } from "./UpdateUserForm";

export async function UpdateUser() {
  const user = await getPublicUserFromApi();

  if (!user) {
    return (
      <ErrorMessage
        contentTitle="🫣"
        content="Você precisa fazer login novamente."
      />
    );
  }

  return <UpdateUserForm user={user} />;
}
