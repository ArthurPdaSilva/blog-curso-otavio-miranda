"use client";
import { Button } from "@/components/Button";
import { InputCheckbox } from "@/components/InputCheckBox";
import { InputText } from "@/components/InputText";
import { MarkdownEditor } from "@/components/MarkdownEditor";
import { createPostAction } from "@/features/post/actions/create-post-action";
import { updatePostAction } from "@/features/post/actions/update-post-action";
import {
  PublicPostForApiSchema,
  type PublicPostForApiDto,
} from "@/features/post/lib/schemas";
import { useRouter, useSearchParams } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ImageUploader } from "./ImageUploader";

type ManagePostFormUpdateProps = {
  mode: "update";
  publicPost: PublicPostForApiDto;
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

  let publicPost: undefined | PublicPostForApiDto;
  if (mode === "update") {
    publicPost = props.publicPost;
  }

  const [contentValue, setContentValue] = useState<string>(
    publicPost?.content || "",
  );

  const initialState = {
    formState: PublicPostForApiSchema.parse(publicPost || {}),
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

        {mode === "update" && (
          <InputCheckbox
            labelText="Publicar?"
            name="published"
            defaultChecked={formState.published}
            disabled={isPending}
          />
        )}

        <div className="mt-4">
          <Button disabled={isPending} type="submit">
            Enviar
          </Button>
        </div>
      </div>
    </form>
  );
}
