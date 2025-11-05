"use client";

import { useForm, ValidationError } from "@formspree/react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

export default function ContactPage() {
  const [state, handleSubmit] = useForm("mnnoblzw");

  if (state.succeeded) {
    return (
      <div
        className="container mx-auto max-w-7xl px-4 py-12 md:px-8 
                      min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center text-center"
      >
        <CheckCircle className="h-16 w-16 text-green-500 mb-6" />
        <h1 className="text-3xl font-bold text-white mb-4">
          Thanks for reaching out!
        </h1>
        <p className="text-lg text-gray-300">
          Your message has been sent successfully. I'll get back to you soon.
        </p>
      </div>
    );
  }

  if (state.errors) {
    return (
      <div
        className="container mx-auto max-w-7xl px-4 py-12 md:px-8 
                      min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center text-center"
      >
        <AlertCircle className="h-16 w-16 text-red-500 mb-6" />
        <h1 className="text-3xl font-bold text-white mb-4">
          Something went wrong.
        </h1>
        <p className="text-lg text-gray-300">
          Your message could not be sent. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <section
      id="contact"
      className="container mx-auto max-w-7xl px-4 py-20 md:px-8"
    >
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-center mb-12">
            Get In
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 ml-3">
              Touch
            </span>
          </h1>
          <p className="text-center text-gray-300 text-lg mb-12">
            Have a question or want to work together? Feel free to send me a
            message.
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-black/50 backdrop-blur-lg 
                     border border-yellow-400/30 
                     rounded-lg shadow-2xl shadow-yellow-400/10 p-8"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-yellow-400 mb-2"
              >
                Your Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                required
                className="block w-full rounded-md border-0 py-2.5 px-3.5 
                         bg-gray-800/60 text-white shadow-sm ring-1 ring-inset 
                         ring-gray-700 placeholder:text-gray-400 
                         focus:ring-2 focus:ring-inset focus:ring-yellow-400 
                         sm:text-sm sm:leading-6 transition"
                placeholder="Leela M"
              />
              <ValidationError
                prefix="Name"
                field="name"
                errors={state.errors}
                className="text-red-400 text-sm mt-1"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-yellow-400 mb-2"
              >
                Your Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required
                className="block w-full rounded-md border-0 py-2.5 px-3.5 
                         bg-gray-800/60 text-white shadow-sm ring-1 ring-inset 
                         ring-gray-700 placeholder:text-gray-400 
                         focus:ring-2 focus:ring-inset focus:ring-yellow-400 
                         sm:text-sm sm:leading-6 transition"
                placeholder="you@example.com"
              />
              <ValidationError
                prefix="Email"
                field="email"
                errors={state.errors}
                className="text-red-400 text-sm mt-1"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-yellow-400 mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="block w-full rounded-md border-0 py-2.5 px-3.5 
                         bg-gray-800/60 text-white shadow-sm ring-1 ring-inset 
                         ring-gray-700 placeholder:text-gray-400 
                         focus:ring-2 focus:ring-inset focus:ring-yellow-400 
                         sm:text-sm sm:leading-6 transition"
                placeholder="Your message..."
              />
              <ValidationError
                prefix="Message"
                field="message"
                errors={state.errors}
                className="text-red-400 text-sm mt-1"
              />
            </div>

            <ValidationError
              errors={state.errors}
              className="text-red-400 text-sm mt-1"
            />

            <div>
              <button
                type="submit"
                disabled={state.submitting}
                className="flex w-full items-center justify-center gap-x-2 
                         rounded-md bg-yellow-400 px-6 py-3 text-sm 
                         font-semibold text-black shadow-sm 
                         transition-all duration-300 hover:bg-yellow-300
                         disabled:bg-gray-500 disabled:cursor-not-allowed"
              >
                {state.submitting ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message <Send className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
    </section>
  );
}
