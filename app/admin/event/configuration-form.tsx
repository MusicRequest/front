import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormLayout, FormLayoutActions } from "@/components/ui/form-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React from "react";
import useAxios from "@/components/hook/useAxios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BaseUrl } from "@/service/common.service";
import { Event } from "@/lib/types";

import { notifyError, notifySuccess } from "@/app/libs/utils/notify";
import { EventOptions, MessageDefault } from "@/lib/enum";
import { Checkbox } from "@/components/ui/checkbox";

import { confirm } from "@/components/ui/confirm/confirm";

const options = [
  {
    id: "recents",
    label: "Recents",
  },
  {
    id: "home",
    label: "Home",
  },
];

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Veuillez préciser un nom à l'évenement",
  }),
  options: z.any().optional(),
});

export default function ConfigurationForm({ event }: { event: Event }) {
  const axiosAuth = useAxios();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: event.name,
      options: event.options,
    },
  });
  const QueryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const r = await axiosAuth.put<any>(`${BaseUrl.Event}/${event.id}`, data);
      return r.data;
    },
    onSuccess: () => {
      notifySuccess(MessageDefault.Succes);
    },
    onError: (e) => {
      console.log(e);
      notifyError(MessageDefault.Error);
    },
  });

  const mutationRemove = useMutation({
    mutationFn: async () => {
      const r = await axiosAuth.delete<any>(`${BaseUrl.Event}/${event.id}`);
      return r.data;
    },
    onSuccess: () => {
      notifySuccess(MessageDefault.Succes);
      QueryClient.invalidateQueries({ queryKey: ["events"] });
    },
    onError: (e) => {
      console.log(e);
      notifyError(MessageDefault.Error);
    },
  });

  const removeEvent = async () => {
    if (await confirm({})) {
      mutationRemove.mutate();
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormLayout>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom de l&apos;évenement</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="options"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel>Fonctionnalités</FormLabel>
                </div>
                <FormField
                  control={form.control}
                  name="options"
                  render={({ field }) => {
                    return (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(
                              EventOptions.MusicRequest,
                            )}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([
                                    ...field.value,
                                    EventOptions.MusicRequest,
                                  ])
                                : field.onChange(
                                    field.value?.filter(
                                      (value: string) =>
                                        value !== EventOptions.MusicRequest,
                                    ),
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          Music Request
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="options"
                  render={({ field }) => {
                    return (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            disabled={true}
                            checked={field.value?.includes(
                              EventOptions.WallPicture,
                            )}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([
                                    ...field.value,
                                    EventOptions.WallPicture,
                                  ])
                                : field.onChange(
                                    field.value?.filter(
                                      (value: string) =>
                                        value !== EventOptions.WallPicture,
                                    ),
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          Wall Picture (en dev)
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </FormLayout>
        <FormLayoutActions>
          <Button
            type={"button"}
            variant={"outline"}
            onClick={() => removeEvent()}
            loading={mutationRemove.isPending}
          >
            Supprimer l&apos;évenement
          </Button>
          <Button loading={mutation.isPending}>Valider</Button>
        </FormLayoutActions>
      </form>
    </Form>
  );
}
