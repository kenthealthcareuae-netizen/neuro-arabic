import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { motion } from 'framer-motion';

const faqs = [
  {
    question: 'ما هو العلاج الطبيعي للحالات العصبية والعظام؟',
    answer:
      'العلاج الطبيعي في مركز كنت للرعاية الصحية يجمع بين تقنيات العلاج الطبيعي مع التدخلات السلوكية لمساعدة المرضى على تعديل أنماط الحركة، وإعادة بناء الروتين اليومي، واستعادة الثقة بعد السكتة الدماغية، أو باركنسون، أو إصابات العظام.',
  },
  {
    question: 'ما هي الحالات التي تدعمونها؟',
    answer:
      'نتخصص في إعادة التأهيل بعد السكتة الدماغية، وإدارة مرض باركنسون، والاضطرابات العصبية مثل التصلب المتعدد وإصابات الدماغ، وإصابات العظام مع التأثير السلوكي.',
  },
  {
    question: 'هل يمكنني الحصول على العلاج في المنزل؟',
    answer:
      'نعم. معالجونا المرخصون يقدمون جلسات مريحة في المنزل في جميع أنحاء دبي لأولئك الذين يفضلون التعافي في راحة منازلهم.',
  },
  {
    question: 'كيف يتم تطوير خطة العلاج الخاصة بي؟',
    answer:
      'بعد تقييم شامل، ننشئ خطة علاج شخصية مصممة خصيصاً لاحتياجاتك المعرفية والبدنية، مع تعديلات مستمرة لضمان التقدم الأمثل.',
  },
  {
    question: 'هل تقدمون خدمات دعم إضافية؟',
    answer:
      'بالطبع. نقدم الدعم النفسي المتكامل، وعلاج النطق، وعلاج البلع لمعالجة أي تحديات ثانوية ناتجة عن الحالات العصبية.',
  },
  {
    question: 'كم تستغرق كل جلسة وهل هي مؤلمة؟',
    answer:
      'كل جلسة تستغرق عادة 45 إلى 60 دقيقة ومصممة لتكون مريحة وآمنة، مع التركيز على التقدم التدريجي دون إزعاج غير ضروري.',
  },
  {
    question: 'كيف يمكنني حجز جلسة؟',
    answer:
      'ببساطة اتصل بنا على +971 50 754 7326 أو احجز عبر موقعنا الإلكتروني. فريقنا سيرشدك خلال الخطوات التالية.',
  },
  {
    question: 'هل أحتاج إلى إحالة من طبيب؟',
    answer:
      'لا حاجة لإحالة لبدء العلاج، رغم أن بعض شركات التأمين قد تتطلب ذلك. يرجى الاتصال بنا للتحقق من تغطيتك.',
  },
  {
    question: 'أين تقعون؟',
    answer:
      'عيادتنا تقع في كنت للرعاية الصحية، مبنى نشوان – 208C شارع المنخول – فوق بنك الإمارات دبي الوطني – الرفاع – دبي (صندوق البريد – 123657). نقدم أيضاً زيارات منزلية في جميع أنحاء المدينة للراحة القصوى.',
  },
  {
    question: 'ما الذي اختبره المرضى السابقون؟',
    answer:
      `"بعد سكتتي الدماغية، لم أستطع المشي أو رفع ذراعي. علاج كنت ساعدني على استعادة الاستقرار والثقة في أسابيع." – سارة، 58\n\n` +
      `"برنامجهم المنزلي بعد جراحة الركبة جعل تعافيي سلساً. الفريق كان مهنياً ومهتماً." – ديفيد، 64`,
  },
];

const SectionTitle = ({ children }) => (
  <motion.h2
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.5 }}
    className="text-3xl md:text-4xl font-bold text-center text-primary mb-12"
  >
    {children}
  </motion.h2>
);

const FaqSection = () => (
  <section id="faq" className="py-16 md:py-24 bg-secondary/30" dir="rtl">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle dir="rtl">الأسئلة الشائعة</SectionTitle>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto bg-card p-6 sm:p-8 rounded-lg shadow-xl border border-primary/10"
      >
        <Accordion type="single" collapsible className="w-full space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem
              value={`item-${index}`}
              key={index}
              className="border-b border-border last:border-b-0 rounded-md overflow-hidden transition-all hover:shadow-md bg-background/50 hover:bg-background"
            >
              <AccordionTrigger className="text-md sm:text-lg font-medium text-start px-6 py-4 flex justify-between items-center w-full hover:text-accent" dir="rtl">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed px-6 pb-4 pt-2 text-sm sm:text-base" dir="rtl">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </div>
  </section>
);

export default FaqSection;
