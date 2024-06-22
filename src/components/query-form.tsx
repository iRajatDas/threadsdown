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
import { useThreadFormStore } from "@/lib/store";
import { fetchMedia } from "@/actions";
import { useAction } from "next-safe-action/hooks";
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
          : /^@?[a-zA-Z0-9](?!.*\.\.)(?!.*\.$)[\w.]{0,28}[a-zA-Z0-9]$/,
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

  const { execute, result, isExecuting } = useAction(fetchMedia, {
    onSuccess: async ({ data }) => {
      if (data) {
        // reset form and data if any
        // console.log(data?.data?.media);
        // form.reset({ thread_url: "" });

        setThreads(data.data);
        toast({
          title: "Ready to Download",
          variant: "default",
          description:
            "Congrats! Click the Download Threads Button to get your video downloaded",
          duration: 3000,
        });
      } else {
        !threads.hasOwnProperty("media") && clearThreads();
      }
    },
    onError: () => {
      !threads.hasOwnProperty("media") && clearThreads();
      toast({
        title: "Opps!!",
        description: "We are looking into what's went wrong.",
        variant: "destructive",
        duration: 5000,
      });
    },
  });

  const onSubmit = async (formData: z.infer<typeof FormSchema>) => {
    // process.env.NODE_ENV === "production" ? await sleep(5000, 10000) : null;
    await execute({
      usernameOrURL: formData.thread_url,
      type,
    });
    // const res = await fetchMedia({
    //   usernameOrURL: formData.thread_url,
    //   type,
    // });
    // // Result keys.
    // const { data, validationErrors, bindArgsValidationErrors, serverError } =
    //   res;
    // try {
    //   toast({
    //     title: "Proccessing your request.",
    //     variant: "default",
    //     description: "Please wait while we're getting things things ready.",
    //     itemID: "t",
    //   });
    //   process.env.NODE_ENV === "production" ? await sleep(5000, 10000) : null;
    //   if (
    //     threads.hasOwnProperty("media") ||
    //     threads.hasOwnProperty("full_name")
    //   )
    //     clearThreads();
    //   await fetchMedia(data.thread_url, type).then((res) => {
    //     if (res?.status === HttpStatusCode.Ok) {
    //       // reset form and data if any
    //       form.reset({ thread_url: "" });
    //       setThreads(res?.data);
    //       toast({
    //         title: "Ready to Download",
    //         variant: "default",
    //         description:
    //           "Congrats! Click the Download Threads Button to get your video downloaded",
    //         duration: 3000,
    //       });
    //       // console.log(threads);
    //     } else {
    //       !threads.hasOwnProperty("media") && clearThreads();
    //     }
    //   });
    // } catch (error) {
    //   !threads.hasOwnProperty("media") && clearThreads();
    //   toast({
    //     title: "Opps!!",
    //     description: "We are looking into what's went wrong.",
    //     variant: "destructive",
    //     duration: 5000,
    //   });
    //   console.log("Nope");
    // }
  };

  console.log(threads);

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
              <FormDescription className="pb-1 text-sm">
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
                  onKeyDown={(e) => {
                    // prevent new line
                    if (e.key === "Enter") {
                      e.preventDefault();
                      return;
                    }
                  }}
                  onPaste={(e) => {
                    // prevent pasting multiple lines, merge them into one
                    e.preventDefault();
                    const text = e.clipboardData.getData("text/plain");

                    // Replace multiple newlines with a single space and trim leading/trailing spaces
                    const singleLineText = text.replace(/\s+/g, " ").trim();

                    // Insert the processed text at the cursor position
                    const textarea = e.target as HTMLTextAreaElement;
                    const start = textarea.selectionStart;
                    const end = textarea.selectionEnd;

                    const before = textarea.value.substring(0, start);
                    const after = textarea.value.substring(end);

                    form.setValue(
                      "thread_url",
                      before + singleLineText + after
                    );

                    // Update the caret position
                    const newCaretPosition = start + singleLineText.length;
                    textarea.setSelectionRange(
                      newCaretPosition,
                      newCaretPosition
                    );
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-full rounded-xl"
          type="submit"
          size={"lg"}
          disabled={isExecuting}
        >
          {isExecuting ? (
            <>
              <LuLoader className="mr-2 h-5 w-5 animate-spin duration-1000 ease-in-out" />
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
