import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Quote, UserCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'أحمد محمد',
    quote:
      'مفيد جداً. كانت الجلسة مع أخصائي العلاج الطبيعي تستحق العناء. تم شرح كل شيء بالتفصيل وكيفية تطبيقه في المنزل.',
  },
  {
    name: 'فاطمة علي',
    quote:
      'أفضل تجربة وأفضل فريق. شكراً جزيلاً وتقدير لكم. أنصح الجميع بزيارة مركز كنت.',
  },
  {
    name: 'محمد علي',
    quote:
      'الموظفون متعاونون والمعالجون مفيدون جداً في عملية علاج طفلي.',
  },
  {
    name: 'سارة أحمد',
    quote:
      'هذا المركز منظم بشكل استثنائي، مع فريق مخصص وماهر. شكراً لكم على ضمان تجربة سلسة.',
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

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-background" dir="rtl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle dir="rtl">ماذا يقول مرضانا</SectionTitle>
        {/* Limit the max width so two columns look balanced */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto max-w-5xl">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="w-full"
            >
              <Card className="h-full bg-card/80 backdrop-blur-sm border border-primary/20 shadow-lg hover:shadow-primary/20 transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-reverse space-x-4 p-4">
                    <UserCircle className="w-12 h-12 text-primary flex-shrink-0" />
                    <div className="flex-grow">
                      <Quote className="w-8 h-8 text-accent/50 mb-2" />
                      <p className="text-foreground italic mb-4 leading-relaxed" dir="rtl">
                        "{t.quote}"
                      </p>
                      <p className="font-semibold text-primary" dir="rtl">– {t.name}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
