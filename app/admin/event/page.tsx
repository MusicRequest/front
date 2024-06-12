"use client";
import React, { useState } from "react";
import LoaderPage from "@/app/ui/common/LoaderPage";
import ErrorLanding from "@/components/error-landing";
import { useGetEvents } from "@/service/event";

import { PlusIcon } from "lucide-react";
import { VerticalSpacer } from "@/components/ui/vertical-spacer";
import PageHeading from "@/components/ui/page-heading";
import { Button } from "@/components/ui/button";
import { FolderPlusIcon } from "@heroicons/react/24/outline";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { BaseUrl } from "@/service/common.service";
import { notifyError, notifySuccess } from "@/app/libs/utils/notify";
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
import { Input } from "@/components/ui/input";
import { FormLayout, FormLayoutActions } from "@/components/ui/form-layout";
import useAxios from "@/components/hook/useAxios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ConfigurationForm from "@/app/admin/event/configuration-form";

export default function PageEvent() {
  const {
    data: events,
    error,
    isLoading: isLoadingEvent,
  } = useGetEvents({ options: { queryKey: ["events"] } });

  if (isLoadingEvent) {
    return <LoaderPage />;
  }

  if (error) {
    return <ErrorLanding />;
  }

  if (!events || (events && events.length === 0)) return <EmptyEvent />;

  const event = events[0];

  return (
    <VerticalSpacer>
      <PageHeading title={"Tableaux de bord"} />
      <div className="flex-col flex">
        <div className="flex-1 space-y-4">
          {/*<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">*/}
          {/*  <Card>*/}
          {/*    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">*/}
          {/*      <CardTitle className="text-sm font-medium">*/}
          {/*        Total Revenue*/}
          {/*      </CardTitle>*/}
          {/*      <svg*/}
          {/*        xmlns="http://www.w3.org/2000/svg"*/}
          {/*        viewBox="0 0 24 24"*/}
          {/*        fill="none"*/}
          {/*        stroke="currentColor"*/}
          {/*        strokeLinecap="round"*/}
          {/*        strokeLinejoin="round"*/}
          {/*        strokeWidth="2"*/}
          {/*        className="h-4 w-4 text-muted-foreground"*/}
          {/*      >*/}
          {/*        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />*/}
          {/*      </svg>*/}
          {/*    </CardHeader>*/}
          {/*    <CardContent>*/}
          {/*      <div className="text-2xl font-bold">$45,231.89</div>*/}
          {/*      <p className="text-xs text-muted-foreground">*/}
          {/*        +20.1% from last month*/}
          {/*      </p>*/}
          {/*    </CardContent>*/}
          {/*  </Card>*/}
          {/*  <Card>*/}
          {/*    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">*/}
          {/*      <CardTitle className="text-sm font-medium">*/}
          {/*        Subscriptions*/}
          {/*      </CardTitle>*/}
          {/*      <svg*/}
          {/*        xmlns="http://www.w3.org/2000/svg"*/}
          {/*        viewBox="0 0 24 24"*/}
          {/*        fill="none"*/}
          {/*        stroke="currentColor"*/}
          {/*        strokeLinecap="round"*/}
          {/*        strokeLinejoin="round"*/}
          {/*        strokeWidth="2"*/}
          {/*        className="h-4 w-4 text-muted-foreground"*/}
          {/*      >*/}
          {/*        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />*/}
          {/*        <circle cx="9" cy="7" r="4" />*/}
          {/*        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />*/}
          {/*      </svg>*/}
          {/*    </CardHeader>*/}
          {/*    <CardContent>*/}
          {/*      <div className="text-2xl font-bold">+2350</div>*/}
          {/*      <p className="text-xs text-muted-foreground">*/}
          {/*        +180.1% from last month*/}
          {/*      </p>*/}
          {/*    </CardContent>*/}
          {/*  </Card>*/}
          {/*  <Card>*/}
          {/*    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">*/}
          {/*      <CardTitle className="text-sm font-medium">Sales</CardTitle>*/}
          {/*      <svg*/}
          {/*        xmlns="http://www.w3.org/2000/svg"*/}
          {/*        viewBox="0 0 24 24"*/}
          {/*        fill="none"*/}
          {/*        stroke="currentColor"*/}
          {/*        strokeLinecap="round"*/}
          {/*        strokeLinejoin="round"*/}
          {/*        strokeWidth="2"*/}
          {/*        className="h-4 w-4 text-muted-foreground"*/}
          {/*      >*/}
          {/*        <rect width="20" height="14" x="2" y="5" rx="2" />*/}
          {/*        <path d="M2 10h20" />*/}
          {/*      </svg>*/}
          {/*    </CardHeader>*/}
          {/*    <CardContent>*/}
          {/*      <div className="text-2xl font-bold">+12,234</div>*/}
          {/*      <p className="text-xs text-muted-foreground">*/}
          {/*        +19% from last month*/}
          {/*      </p>*/}
          {/*    </CardContent>*/}
          {/*  </Card>*/}
          {/*  <Card>*/}
          {/*    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">*/}
          {/*      <CardTitle className="text-sm font-medium">*/}
          {/*        Active Now*/}
          {/*      </CardTitle>*/}
          {/*      <svg*/}
          {/*        xmlns="http://www.w3.org/2000/svg"*/}
          {/*        viewBox="0 0 24 24"*/}
          {/*        fill="none"*/}
          {/*        stroke="currentColor"*/}
          {/*        strokeLinecap="round"*/}
          {/*        strokeLinejoin="round"*/}
          {/*        strokeWidth="2"*/}
          {/*        className="h-4 w-4 text-muted-foreground"*/}
          {/*      >*/}
          {/*        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />*/}
          {/*      </svg>*/}
          {/*    </CardHeader>*/}
          {/*    <CardContent>*/}
          {/*      <div className="text-2xl font-bold">+573</div>*/}
          {/*      <p className="text-xs text-muted-foreground">*/}
          {/*        +201 since last hour*/}
          {/*      </p>*/}
          {/*    </CardContent>*/}
          {/*  </Card>*/}
          {/*</div>*/}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Configuration</CardTitle>
              </CardHeader>
              <CardContent className="">
                <ConfigurationForm event={event} />
              </CardContent>
            </Card>
            <Card className="col-span-4 md:col-span-3 ">
              <CardHeader>
                <CardTitle>Activité</CardTitle>
                <CardDescription>
                  You made 265 sales this month.
                </CardDescription>
              </CardHeader>
              <CardContent>{/*<RecentSales />*/}</CardContent>
            </Card>
          </div>
          {/*<Tabs defaultValue="overview" className="space-y-4">*/}
          {/*<TabsList>*/}
          {/*<TabsTrigger value="overview">Overview</TabsTrigger>*/}
          {/*<TabsTrigger value="analytics" disabled>*/}
          {/*  Analytics*/}
          {/*</TabsTrigger>*/}
          {/*<TabsTrigger value="reports" disabled>*/}
          {/*  Reports*/}
          {/*</TabsTrigger>*/}
          {/*<TabsTrigger value="notifications" disabled>*/}
          {/*  Notifications*/}
          {/*</TabsTrigger>*/}
          {/*</TabsList>*/}
          {/*<TabsContent value="overview" className="space-y-4">*/}

          {/*</TabsContent>*/}
          {/*</Tabs>*/}
        </div>
      </div>
    </VerticalSpacer>
  );
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Veuillez préciser un nom à l'évenement",
  }),
  options: z.any().optional(),
});

function EmptyEvent() {
  const [showDialog, setShowDialog] = useState(false);
  const QueryClient = useQueryClient();

  const axiosAuth = useAxios();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      options: [],
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const r = await axiosAuth.post<any>(BaseUrl.Event, data);
      return r.data;
    },
    onSuccess: () => {
      QueryClient.invalidateQueries({ queryKey: ["events"] });
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
    <>
      {/* Dialog*/}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-h-screen min-w-max overflow-auto">
          <DialogHeader>
            <DialogTitle>Création d&apos;un évenement</DialogTitle>
          </DialogHeader>
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
              </FormLayout>
              <FormLayoutActions>
                <Button>Valider</Button>
              </FormLayoutActions>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <div className="text-center">
        <FolderPlusIcon className="mx-auto h-10 w-10 text-gray-500" />
        <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">
          Aucun événement en cours
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Pour démarrer, veuillez créer un nouvel événement.
        </p>
        <div className="mt-6">
          <Button onClick={() => setShowDialog(true)}>
            <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            Commencer maintenant
          </Button>
        </div>
      </div>
    </>
  );
}
