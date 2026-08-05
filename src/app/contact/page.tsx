import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { paths } from "@/lib/paths";
import { buildMetadata } from "@/lib/seo";
import { ContactForm } from "@/components/site/ContactForm";
import { ContactInfo } from "@/components/site/ContactInfo";
import { SiteChrome } from "@/components/site/SiteChrome";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "İletişim | Trabzon Sosyal Medya",
    description: "Ücretsiz keşif için yazın. 24 saat içinde dönüş.",
    path: paths.contact,
  });
}

export default async function ContactPage() {
  const [settings, districts, services] = await Promise.all([
    prisma.siteSetting.findUnique({ where: { id: "default" } }),
    prisma.district.findMany({ where: { published: true }, orderBy: { sortOrder: "asc" } }),
    prisma.service.findMany({ where: { published: true }, orderBy: { sortOrder: "asc" } }),
  ]);
  const s = settings!;

  return (
    <SiteChrome variant="inner">
      <main id="main">
        <section className="page-hero">
          <div className="container">
            <nav className="breadcrumb" aria-label="Sayfa yolu">
              <Link href={paths.home}>Ana sayfa</Link>
              <span aria-hidden="true">/</span>
              <span>İletişim</span>
            </nav>
            <span className="section-label">İletişim</span>
            <h1>Projenizi konuşalım.</h1>
            <p className="lead">
              Formu doldurun ya da WhatsApp’tan yazın. En geç 24 saat içinde size dönüş yapıyoruz.
            </p>
          </div>
        </section>
        <section className="contact section">
          <div className="container">
            <div className="contact-layout">
              <ContactInfo
                phone={s.phone}
                phoneDisplay={s.phoneDisplay}
                email={s.email}
                whatsapp={s.whatsapp}
                addressLine1={s.addressLine1}
                addressLine2={s.addressLine2}
              />
              <ContactForm
                districts={districts.map((d) => d.name)}
                services={services.map((x) => x.title)}
                labels={{
                  name: s.formNameLabel,
                  phone: s.formPhoneLabel,
                  email: s.formEmailLabel,
                  district: s.formDistrictLabel,
                  service: s.formServiceLabel,
                  message: s.formMessageLabel,
                  submit: s.formSubmitLabel,
                  success: s.formSuccessMsg,
                  error: s.formErrorMsg,
                }}
              />
            </div>
          </div>
        </section>
      </main>
    </SiteChrome>
  );
}
