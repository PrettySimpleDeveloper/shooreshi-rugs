import getPageBySlug from "@/lib/queries/getPageBySlug";
import {getTranslations} from "next-intl/server";
import Image from "next/image";
import {notFound} from "next/navigation";
import {PiEnvelope, PiMapPin, PiPhoneCall, PiUser} from "react-icons/pi";
import getContactUsData from "./data";
/**
 * The about-us route.
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#pages
 */
export default async function ContactUs({
  params: {locale}
}: {
  params: {locale: string};
}) {
  const language = locale.toUpperCase();

  // Fetch contact us from WordPress.
  const contactUsPage = await getPageBySlug("/contact-us", language);
  const blocks = contactUsPage.translation.blocks;

  const t = await getTranslations("ContactUsPage");

  // Fetch posts from WordPress.
  // const posts = await getAllPosts()

  // No data? Bail...
  if (!contactUsPage) {
    notFound();
  }

  const {
    heroImage,
    contactTitle,
    contactText,
    contactChannel,
    contactImage,
    faqsTitle,
    faqs
  } = getContactUsData(blocks);

  return (
    <article className="flex flex-col gap-y-16 pb-16">
      <div
        className="hero min-h-screen -mt-navbar"
        style={{
          backgroundImage: `url('${heroImage}')`
        }}
      >
        <div className="container">
          <div className="hero-content text-black text-center ">
            <div className="max-w-4xl mt-14 lg:mt-0">
              <h1
                className="text-3xl hidden"
                dangerouslySetInnerHTML={{__html: contactUsPage.title}}
              />

              <h2 className="mb-5 text-4xl font-bold leading-normal">
                {contactTitle}
              </h2>

              <p
                className="mb-5 text-2xl mt-8   text-center"
                dangerouslySetInnerHTML={{__html: contactText}}
              ></p>

              <div className="mt-12 grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-8">
                {contactChannel.map((item, idx) => {
                  let IconImage = PiUser;
                  if (
                    item.name.toLowerCase() === "address" ||
                    item.name === "آدرس"
                  ) {
                    IconImage = PiMapPin;
                  } else if (
                    item.name.toLowerCase() === "contact" ||
                    item.name === "تماس"
                  ) {
                    IconImage = PiPhoneCall;
                  } else if (
                    item.name.toLowerCase() === "email" ||
                    item.name === "ایمیل"
                  ) {
                    IconImage = PiEnvelope;
                  }

                  return (
                    <div
                      key={item.name}
                      className="flex flex-col items-center justify-center gap-4 border-4 border-solid border-black px-6 py-8 "
                    >
                      <IconImage className="text-8xl" />

                      <p
                        className="text-2xl font-bold"
                        dangerouslySetInnerHTML={{__html: item.name}}
                      ></p>

                      <p
                        className="font-normal"
                        dangerouslySetInnerHTML={{__html: item.text}}
                      ></p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <Image
          className="object-cover"
          src={contactImage.url}
          width={contactImage.width}
          height={contactImage.height}
          alt="contact image"
          priority={true}
        />
      </div>

      <section className="container">
        <div className="">
          <h2 className="text-center mb-5 text-4xl font-bold leading-normal">
            {t("Title")}
          </h2>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:basis-2/3">
              <form className="flex flex-col gap-2 items-stretch">
                <label className="form-control basis-1/2">
                  <div className="label">
                    <span className="label-text">{t("Form.FirstName")}</span>
                  </div>
                  <input type="text" className="input input-bordered w-full " />
                </label>

                <label className="form-control basis-1/2">
                  <div className="label">
                    <span className="label-text">{t("Form.LastName")}</span>
                  </div>
                  <input type="text" className="input input-bordered w-full " />
                </label>

                <label className="form-control basis-full">
                  <div className="label">
                    <span className="label-text">{t("Form.Email")}</span>
                  </div>
                  <input type="email" className="input input-bordered w-full" />
                </label>

                <label className="form-control basis-full">
                  <div className="label">
                    <span className="label-text">{t("Form.Message")}</span>
                  </div>
                  <textarea className="textarea textarea-bordered h-40"></textarea>
                </label>
              </form>
            </div>

            <div className="md:basis-1/3 shrink md:order-first">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3359.043314646226!2d51.667641124299585!3d32.65829147987592!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3fbc35f7062ce2bf%3A0x8e4c249bc95dfa5a!2sTermeh%20Travel!5e0!3m2!1sen!2sse!4v1720429330782!5m2!1sen!2sse"
                className="h-full w-full"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="">
          <h2 className="text-center mb-5 text-4xl font-bold leading-normal">
            {faqsTitle}
          </h2>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="collapse collapse-arrow bg-white"
              >
                <input type="radio" name="my-accordion-2" defaultChecked />
                <div className="collapse-title text-xl font-medium">
                  {faq.question}
                </div>
                <div className="collapse-content">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
