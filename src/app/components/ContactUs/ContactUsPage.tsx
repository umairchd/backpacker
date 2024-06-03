"use client";

import ContactUsForm from "./ContactUsForm";
import OurContacts from "./OurContacts";

const ContactUsPage = () => {
  return (
    <section className="py-6">
      <div className="max-w-1320px px-3 sm:px-6 mx-auto">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-8">
            <ContactUsForm />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <OurContacts />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUsPage;
