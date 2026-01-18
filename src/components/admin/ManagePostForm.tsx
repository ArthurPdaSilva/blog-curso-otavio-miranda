"use client";
import { createPostAction } from "@/actions/post/create-post-action";
import { updatePostAction } from "@/actions/post/update-post-action";
import { makePartialPublicPost, type PublicPost } from "@/dto/post";
import { useRouter, useSearchParams } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "../Button";
import { InputCheckbox } from "../InputCheckBox";
import { InputText } from "../InputText";
import { MarkdownEditor } from "../MarkdownEditor";
import { ImageUploader } from "./ImageUploader";

type ManagePostFormUpdateProps = {
  mode: "update";
  publicPost: PublicPost;
};

type ManagePostFormCreateProps = {
  mode: "create";
};

type ManagePostFormProps =
  | ManagePostFormUpdateProps
  | ManagePostFormCreateProps;

export function ManagePostForm(props: ManagePostFormProps) {
  const { mode } = props;
  const searchParams = useSearchParams();
  const created = searchParams.get("created");
  const router = useRouter();

  let publicPost: undefined | PublicPost;
  if (mode === "update") {
    publicPost = props.publicPost;
  }

  const [contentValue, setContentValue] = useState<string>(
    publicPost?.content || "",
  );

  const initialState = {
    formState: makePartialPublicPost(publicPost),
    errors: [],
  };

  const actionsMap = {
    update: updatePostAction,
    create: createPostAction,
  };

  const [state, action, isPending] = useActionState(
    actionsMap[mode],
    initialState,
  );

  useEffect(() => {
    if (state.errors.length > 0) {
      for (let i = 0; i < state.errors.length; i++) {
        toast.error(state.errors[i]);
      }
    }
  }, [state.errors]);

  useEffect(() => {
    if (state.success) {
      toast.dismiss();
      toast.success("Post atualizado com sucesso");
    }
  }, [state.success]);

  useEffect(() => {
    if (created === "1") {
      toast.dismiss();
      toast.success("Post criado com sucesso");
      const url = new URL(window.location.href);
      url.searchParams.delete("created");
      router.replace(url.toString());
    }
  }, [created, router]);

  const { formState } = state;

  return (
    <form action={action} className="mb-16">
      <div className="flex flex-col gap-6">
        <InputText
          labelText="ID"
          name="id"
          placeholder="ID gerado automaticamente"
          type="text"
          readOnly
          disabled={isPending}
          defaultValue={formState.id}
        />
        <InputText
          labelText="Slug"
          name="slug"
          placeholder="Slug gerado automaticamente"
          type="text"
          readOnly
          disabled={isPending}
          defaultValue={formState.slug}
        />
        <InputText
          labelText="Autor"
          name="author"
          placeholder="Digite o nome do autor"
          type="text"
          disabled={isPending}
          defaultValue={formState.author}
        />
        <InputText
          labelText="Título"
          name="title"
          placeholder="Digite o título"
          type="text"
          disabled={isPending}
          defaultValue={formState.title}
        />
        <InputText
          labelText="Resumo"
          name="excerpt"
          placeholder="Digite o resumo"
          type="text"
          disabled={isPending}
          defaultValue={formState.excerpt}
        />
        <MarkdownEditor
          labelText="Conteúdo"
          value={contentValue}
          setValue={setContentValue}
          textAreaName="content"
        />

        <ImageUploader disabled={isPending} />

        <InputText
          labelText="Url da imagem de Capa"
          name="coverImageUrl"
          placeholder="Digite a url da imagem"
          type="text"
          disabled={isPending}
          defaultValue={formState.coverImageUrl}
        />

        <InputCheckbox
          labelText="Publicar?"
          name="published"
          defaultChecked={formState.published}
          disabled={isPending}
        />
        <div className="mt-4">
          <Button disabled={isPending} type="submit">
            Enviar
          </Button>
        </div>
      </div>
    </form>
  );
}
