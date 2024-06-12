"use client";
import { VerticalSpacer } from "@/components/ui/vertical-spacer";
import PageHeading from "@/components/ui/page-heading";
import { DataTable } from "@/components/ui/data-table/data-table";
import React, { useEffect, useState } from "react";
import columnsVisitor from "@/app/admin/visitor/columns-visitor";
import LoaderPage from "@/app/ui/common/LoaderPage";
import ErrorLanding from "@/components/error-landing";
import { KeyCache } from "@/lib/enum";
import { useGetVisitors } from "@/service/visitor";
import { useGetEvents } from "@/service/event";
import { Visitor } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormLayout, FormLayoutActions } from "@/components/ui/form-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "@/components/hook/useAxios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { BaseUrl } from "@/service/common.service";
import { notifyError, notifySuccess } from "@/app/libs/utils/notify";
import { Switch } from "@/components/ui/switch";

export default function PageVisitor() {
  const [showUpdated, setShowUpdated] = useState(false);
  const [selectedVisitor, setSelectedVisitor] = useState<Visitor | null>(null);

  const {
    data: events,
    error,
    isLoading: isLoadingEvent,
  } = useGetEvents({ options: { queryKey: ["events"] } });

  const {
    data,
    error: errorVisitor,
    isLoading: isLoadingVisitor,
  } = useGetVisitors({
    eventId: events?.[0].id as string,
    options: { queryKey: [KeyCache.Visitors], enabled: !!events?.[0] },
  });

  if (isLoadingEvent || isLoadingVisitor) {
    return <LoaderPage />;
  }

  if (error || errorVisitor) {
    return <ErrorLanding />;
  }

  const openModalVisitor = async (v: Visitor) => {
    setSelectedVisitor(v);
    setShowUpdated(true);
  };

  return (
    <VerticalSpacer>
      <DialogUpdateVisitor
        visitor={selectedVisitor}
        showDialog={showUpdated}
        setShowDialog={setShowUpdated}
      />
      <PageHeading title={"Visiteur"} />
      <DataTable
        columns={columnsVisitor({ editVisitor: (v) => openModalVisitor(v) })}
        data={data || []}
      />
    </VerticalSpacer>
  );
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Veuillez préciser un nom à l'évenement",
  }),
  isNotAllowed: z.boolean(),
});

const DialogUpdateVisitor = ({
  visitor,
  showDialog,
  setShowDialog,
}: {
  visitor: Visitor | null;
  showDialog: boolean;
  setShowDialog: (state: boolean) => void;
}) => {
  const QueryClient = useQueryClient();

  const axiosAuth = useAxios();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      isNotAllowed: false,
    },
  });

  useEffect(() => {
    if (showDialog && visitor) {
      form.setValue("isNotAllowed", visitor.isNotAllowed);
      form.setValue("name", visitor.name);
    } else {
      form.reset();
    }
    /* eslint-disable-next-line */
  }, [showDialog, visitor]);

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const r = await axiosAuth.put<any>(
        `${BaseUrl.Visitor}/${visitor?.id}`,
        data,
      );
      return r.data;
    },
    onSuccess: () => {
      QueryClient.invalidateQueries({ queryKey: [KeyCache.Visitors] });
      notifySuccess();
      setShowDialog(false);
    },
    onError: (e) => {
      console.log(e);
      notifyError();
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values);
  }

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent className="max-h-screen min-w-max overflow-auto">
        <DialogHeader>
          <DialogTitle>Mise à jour de l&apos;utilisateur</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormLayout>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pseudo</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isNotAllowed"
                render={({ field }) => (
                  <FormItem className={"flex flex-col"}>
                    <FormLabel>Bloqué l&apos;utilisateur</FormLabel>
                    <FormControl>
                      <Switch
                        onCheckedChange={(value) => field.onChange(value)}
                        checked={!!field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormLayout>
            <FormLayoutActions>
              <Button loading={mutation.isPending}>Valider</Button>
            </FormLayoutActions>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
