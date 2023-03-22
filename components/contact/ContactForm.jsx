import Link from "next/link";
import React from "react";

const INITIAL_STATE = {
  name: "",
  email: "",
  message: "",
};

const ContactForm = () => {
  const [contactForm, setContactForm] = React.useState(INITIAL_STATE);
  const [hasError, setHasError] = React.useState(null);

  const handleChange = (evt) => {
    setContactForm((oldVal) => ({
      ...oldVal,
      [evt.target.name]: evt.target.value,
    }));
  };

  const handleSubmit = async () => {
    setHasError(null);

    const { name, email, message } = contactForm;

    if (!name || !email || !message) {
      setHasError(true)
    }
  };

  return (
    <form
      onSubmit={(evt) => evt.preventDefault()}
      id="contact-form"
      method="post"
    >
      <div className="flex space-x-7">
        <div className="mb-6 w-1/2">
          <label className="font-display text-jacarta-700 mb-1 block text-sm dark:text-white">
            Name<span className="text-red">*</span>
          </label>
          <input
            name="name"
            className="contact-form-input dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 hover:ring-2 dark:text-white"
            id="name"
            type="text"
            required
            onChange={handleChange}
            value={contactForm.name}
          />
        </div>

        <div className="mb-6 w-1/2">
          <label className="font-display text-jacarta-700 mb-1 block text-sm dark:text-white">
            Email<span className="text-red">*</span>
          </label>
          <input
            name="email"
            className="contact-form-input dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 hover:ring-2 dark:text-white"
            id="email"
            type="email"
            required
            value={contactForm.email}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="font-display text-jacarta-700 mb-1 block text-sm dark:text-white">
          Message<span className="text-red">*</span>
        </label>
        <textarea
          id="message"
          className="contact-form-input dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 hover:ring-2 dark:text-white"
          required
          name="message"
          rows="5"
          value={contactForm.message}
          onChange={handleChange}
        ></textarea>
      </div>

      <button
        type="submit"
        className="bg-accent shadow-accent-volume hover:bg-accent-dark rounded-full py-3 px-8 text-center font-semibold text-white transition-all"
        id="contact-form-submit"
        onClick={handleSubmit}
      >
        Submit
      </button>

      <div
        id="contact-form-notice"
        className="relative mt-4 hidden rounded-lg border border-transparent p-4"
      ></div>
    </form>
  );
};

export default ContactForm;
