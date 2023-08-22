"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { LuLoader } from "react-icons/lu";
import axios, { HttpStatusCode } from "axios";
import { useThreadFormStore } from "@/lib/store";
import { sleep } from "@/lib/utils";

interface QueryType {
  type?: "getThreads" | "getUserProfile";
}

export function QueryForm({ type = "getThreads" }: QueryType) {
  const FormSchema = z.object({
    thread_url: z
      .string({
        required_error:
          type === "getThreads"
            ? "Please enter an url."
            : "Please enter an username.",
      })
      .regex(
        type === "getThreads"
          ? /^(https:\/\/www\.threads\.net\/(@[\w.-]+\/post|t)\/[A-Za-z0-9_-]+)(\/\?[\w=&-]+)?$/
          : /^[a-zA-Z0-9](?!.*\.\.)(?!.*\.$)[\w.]{1,28}[a-zA-Z0-9_]$/,
        type === "getThreads"
          ? "Please enter a valid threads post link."
          : "Enter a valid username."
      ),
  });

  const threads = useThreadFormStore((state) => state.threads);
  const setThreads = useThreadFormStore((state) => state.setThreads);
  const clearThreads = useThreadFormStore((state) => state.clearThreads);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      toast({
        title: "Proccessing your request.",
        variant: "default",
        description: "Please wait while we're getting things things ready.",
        itemID: "t",
      });
      await sleep(3000, 6000);
      if (
        threads.hasOwnProperty("media") ||
        threads.hasOwnProperty("full_name")
      )
        clearThreads();
      await axios
        .get(
          `/api/${
            type === "getThreads" ? "getThreads" : "getUserProfile"
          }/?url=${data.thread_url}`
        )
        .then((res) => {
          if (res.status === HttpStatusCode.Ok) {
            // reset form and data if any
            form.reset({ thread_url: "" });

            setThreads(res.data);
            toast({
              title: "Ready to Download",
              variant: "default",
              description:
                "Congrats! Click the Download Threads Button to get your video downloaded",
              duration: 3000,
            });
            // console.log(threads);
          } else {
            !threads.hasOwnProperty("media") && clearThreads();
          }
        });
    } catch (error) {
      !threads.hasOwnProperty("media") && clearThreads();
      toast({
        title: "Opps!!",
        description: "We are looking into what's went wrong.",
        variant: "destructive",
        duration: 5000,
      });
      console.log("Nope");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="thread_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="lg:text-lg">
                Type {type === "getThreads" ? "URL" : "username"}
              </FormLabel>
              <FormDescription className="text-sm pb-1">
                {type === "getThreads"
                  ? "Copy threads post link and paste it."
                  : "Write down threads profile username"}
              </FormDescription>
              <FormControl>
                <Textarea
                  autoFocus
                  placeholder={
                    type === "getThreads"
                      ? "https://www.threads.net/t/u3y2g4n3"
                      : "@zuck"
                  }
                  className="resize-none rounded-xl bg-barcelona-tertiary-text text-lg"
                  rows={1}
                  cols={5}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="rounded-xl w-full"
          type="submit"
          size={"lg"}
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <>
              <LuLoader className="h-5 w-5 mr-2 animate-spin duration-1000 ease-in-out" />
              Please wait ...
            </>
          ) : (
            <span className="">Get Details</span>
          )}
        </Button>
      </form>
    </Form>
  );
}

export function AccordionDemo() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other
          components&apos; aesthetic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. Its animated by default, but you can disable it if you prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
