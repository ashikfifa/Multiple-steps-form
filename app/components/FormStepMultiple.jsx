"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";

// Validation Schemas
const schemas = [
  z.object({
    name: z.string().nonempty("Name is required."),
    email: z.string().email("Invalid email address."),
    dob: z
      .date({ required_error: "Date of Birth is required." })
      .refine((val) => val < new Date(), "Date of Birth cannot be in the future."),
  }),
  z.object({
    address1: z.string().nonempty("Address Line 1 is required."),
    address2: z.string().optional(),
    city: z.string().nonempty("City is required."),
    state: z.string().nonempty("State is required."),
    zip: z.string().nonempty("Zip is required."),
  }),
  z.object({
    username: z.string().nonempty("Username is required."),
    // password: z.string().min(4, "Password must be at least 4 characters."),
    // confirmPassword: z.string().refine(
    //   (value, ctx) => value === ctx.parent.password,
    //   "Passwords must match."
    // ),
  }),
];

const MultiStepForm = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const form = useForm({
    resolver: zodResolver(schemas[step]),
    defaultValues: {
      name: "",
      email: "",
      dob: null,
      address1: "",
      address2: "",
      city: "",
      state: "",
      zip: 0,
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const nextStep = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    if (step < schemas.length - 1) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const onSubmit = (data) => {
    const finalData = { ...formData, ...data };
    console.log("Final Data:", finalData);
  };

  return (
    <div className="flex items-center justify-center mt-10">
      <div className="border p-6 w-[500px] rounded-md">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(step === schemas.length - 1 ? onSubmit : nextStep)}
            className="space-y-6"
          >
            {step === 0 && (
              <>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dob"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Birth</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          value={field.value ? field.value.toISOString().split("T")[0] : ""}
                          onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value) : null)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {step === 1 && (
              <>
                <FormField
                  control={form.control}
                  name="address1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address Line 1</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address Line 2 (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your address (Optional)" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your city" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your state" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="zip"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Zip Code</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your zip code" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {step === 2 && (
              <>
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter your password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Confirm your password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            <div className="flex justify-between">
              {step > 0 && (
                <Button type="button" onClick={prevStep}>
                  Previous
                </Button>
              )}
              <Button type="submit">
                {step === schemas.length - 1 ? "Submit" : "Next"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default MultiStepForm;
