"use client";
import { createPostAction } from "@/actions/post/create-post-action";
import { makePartialPublicPost, type PublicPost } from "@/dto/post";
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
  const [state, action, isPending] = useActionState(
    createPostAction,
    initialState,
  );

  useEffect(() => {
    if (state.errors.length > 0) {
      for (let i = 0; i < state.errors.length; i++) {
        toast.error(state.errors[i]);
      }
    }
  }, [state.errors]);

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
          defaultValue={formState.id}
        />
        <InputText
          labelText="Slug"
          name="slug"
          placeholder="Slug gerado automaticamente"
          type="text"
          readOnly
          defaultValue={formState.slug}
        />
        <InputText
          labelText="Autor"
          name="author"
          placeholder="Digite o nome do autor"
          type="text"
          defaultValue={formState.author}
        />
        <InputText
          labelText="Título"
          name="title"
          placeholder="Digite o título"
          type="text"
          defaultValue={formState.title}
        />
        <InputText
          labelText="Resumo"
          name="excerpt"
          placeholder="Digite o resumo"
          type="text"
          defaultValue={formState.excerpt}
        />
        <MarkdownEditor
          labelText="Conteúdo"
          value={contentValue}
          setValue={setContentValue}
          textAreaName="content"
        />

        <ImageUploader />

        <InputText
          labelText="Url da imagem de Capa"
          name="coverImageUrl"
          placeholder="Digite a url da imagem"
          type="text"
          defaultValue={formState.coverImageUrl}
        />

        <InputCheckbox
          labelText="Publicar?"
          name="published"
          defaultChecked={formState.published}
        />
        <div className="mt-4">
          <Button type="submit">Enviar</Button>
        </div>
      </div>
    </form>
  );
}
