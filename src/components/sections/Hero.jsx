import React, { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea as ShadcnTextarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import emailjs from '@emailjs/browser';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ArrowRight, PhoneCall } from 'lucide-react';
import { useConfig } from '@/contexts/ConfigContext';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import FreeSessionModal from '@/components/ui/FreeSessionModal';

// WhatsApp SVG
const WhatsappSVG = props => (
  <svg viewBox="0 0 24 24" width={24} height={24} fill="currentColor" {...props}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
  </svg>
);

const HERO_WA   = 'https://wa.me/971507547326';
const HERO_CALL = 'tel:+971507547326';

// Plain form content (no motion)
function QuickBookingFormContent({ onBack }) {
  const { toast } = useToast()
  const { emailjsConfig } = useConfig()
  const [formData, setFormData] = useState({ name:'', phone:'', email:'', message:'' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = e => {
    const { id, value } = e.target
    setFormData(p => ({ ...p, [id]: value }))
  }
  const handleSubmit = async e => {
    e.preventDefault()
    if (!formData.name || !formData.phone) {
      toast({ title:'Submission Error', description:'Name and phone required.', variant:'destructive' })
      return
    }
    setIsSubmitting(true)
    try {
      // Capture GCLID and UTM parameters
      const gclid = localStorage.getItem('gclid') || new URLSearchParams(window.location.search).get('gclid');
      const utmParams = {
        utm_source: new URLSearchParams(window.location.search).get('utm_source'),
        utm_medium: new URLSearchParams(window.location.search).get('utm_medium'),
        utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign'),
        utm_term: new URLSearchParams(window.location.search).get('utm_term'),
        utm_content: new URLSearchParams(window.location.search).get('utm_content')
      };

      await emailjs.send(
        emailjsConfig.serviceId, emailjsConfig.templateId,
        { 
          from_name: formData.name, 
          phone: formData.phone,
          email: formData.email||'N/A',
          subject:'Lead from Hero Form',
          message: `FORM METHOD: Hero Quick Booking

LEAD DETAILS:
Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email || 'N/A'}
Message: ${formData.message || 'N/A'}

TRACKING DATA:
GCLID: ${gclid || 'N/A'}
UTM Source: ${utmParams.utm_source || 'N/A'}
UTM Medium: ${utmParams.utm_medium || 'N/A'}
UTM Campaign: ${utmParams.utm_campaign || 'N/A'}
UTM Term: ${utmParams.utm_term || 'N/A'}
UTM Content: ${utmParams.utm_content || 'N/A'}
Page URL: ${window.location.href}
User Agent: ${navigator.userAgent}
Timestamp: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Dubai' })}`,
          gclid: gclid || 'N/A',
          utm_source: utmParams.utm_source || 'N/A',
          utm_campaign: utmParams.utm_campaign || 'N/A'
        },
        emailjsConfig.publicKey
      )

      // Google Ads Conversion Tracking
      if (typeof gtag !== 'undefined') {
        gtag('event', 'conversion', {
          'send_to': 'AW-16614033926/29hRCIHVqasbEIaUmPI9',
          'value': 0,
          'currency': 'AED',
          'transaction_id': new Date().toISOString(),
          'gclid': gclid || localStorage.getItem('gclid')
        });
      }

      // Google Tag Manager DataLayer Event
      if (typeof dataLayer !== 'undefined') {
        dataLayer.push({
          'event': 'hero_form_submission',
          'form_type': 'hero_quick_booking',
          'lead_name': formData.name,
          'lead_phone': formData.phone,
          'lead_email': formData.email || 'N/A',
          'gclid': gclid || localStorage.getItem('gclid'),
          'utm_source': utmParams.utm_source,
          'utm_campaign': utmParams.utm_campaign,
          'conversion_value': 0,
          'timestamp': new Date().toISOString()
        });
      }

      // Meta Pixel Lead Event via GTM
      if (typeof dataLayer !== 'undefined') {
        dataLayer.push({
          event: 'fb_lead',
          content_name: 'Hero Form Submission',
          content_category: 'Healthcare',
          value: 0,
          currency: 'AED',
          gclid: gclid || localStorage.getItem('gclid')
        });
      }

      toast({ title:'Request Received', description:'Redirecting to thank you page...' })
      setFormData({ name:'', phone:'', email:'', message:'' })
      setTimeout(() => {
        window.location.href = emailjsConfig.redirectUrl;
      }, 800);
    } catch (error) {
      console.error('Hero form submission error:', error);
      toast({ 
        title:'Error', 
        description:`Failed to send: ${error.message || 'Unknown error'}. Please try again.`, 
        variant:'destructive' 
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-4 p-6 bg-card rounded-lg shadow-xl border border-primary/10">
      <Button variant="ghost" size="sm" className="mb-4 font-bold uppercase tracking-wide" onClick={onBack}>
        ← رجوع
      </Button>
      <h3 className="text-2xl font-semibold text-primary" dir="rtl">نموذج الحجز السريع</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name" className="block text-sm mb-1" dir="rtl">الاسم الكامل*</Label>
          <Input id="name" value={formData.name} onChange={handleChange} placeholder="مثال: أحمد محمد" dir="rtl" required disabled={isSubmitting}/>
        </div>
        <div>
          <Label htmlFor="phone" className="block text-sm mb-1" dir="rtl">رقم الهاتف*</Label>
          <Input id="phone" value={formData.phone} onChange={handleChange} placeholder="مثال: 0501234567" dir="ltr" style={{ direction: 'ltr', textAlign: 'left' }} required disabled={isSubmitting}/>
        </div>
        <div>
          <Label htmlFor="email" className="block text-sm mb-1" dir="rtl">البريد الإلكتروني (اختياري)</Label>
          <Input id="email" value={formData.email} onChange={handleChange} placeholder="مثال: example@mail.com" dir="rtl" disabled={isSubmitting}/>
        </div>
        <div>
          <Label htmlFor="message" className="block text-sm mb-1" dir="rtl">رسالة إضافية</Label>
          <ShadcnTextarea id="message" value={formData.message} onChange={handleChange} placeholder="أي تفضيلات أو أسئلة؟" dir="rtl" rows={3} disabled={isSubmitting}/>
        </div>
        <Button
          type="submit"
          size="lg"
          className="w-full bg-accent text-accent-foreground py-3 font-bold uppercase tracking-wide"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'جاري الإرسال…' : 'إرسال الحجز'}
        </Button>
      </form>
    </div>
  )
}

export default function HeroSection() {
  const [showForm, setShowForm] = useState(false)
  const [showFreeSession, setShowFreeSession] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const imgRef = useRef(null)
  const { images } = useConfig()

  // parallax / tilt
  const mouseX = useMotionValue(0), mouseY = useMotionValue(0)
  const cfg = { stiffness:150, damping:20, mass:1 }
  const rotateX = useSpring(useTransform(mouseY,[-0.5,0.5],['10deg','-10deg']),cfg)
  const rotateY = useSpring(useTransform(mouseX,[-0.5,0.5],['-10deg','10deg']),cfg)
  const scale   = useSpring(1,cfg)

  const handleMouseMove = e => {
    const rect = imgRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set((e.clientX-rect.left-rect.width/2)/(rect.width/2))
    mouseY.set((e.clientY-rect.top-rect.height/2)/(rect.height/2))
    scale.set(1.05)
  }
  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); scale.set(1) }

  // Scroll detection for popup
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Show popup when user scrolls 30% of viewport height
      if (scrollY > windowHeight * 0.3 && !hasScrolled) {
        setHasScrolled(true);
        // Show popup after a small delay
        setTimeout(() => {
          setShowFreeSession(true);
        }, 1000);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasScrolled]);

  // Reset scroll state on page load (session-based)
  useEffect(() => {
    setHasScrolled(false);
  }, []);

  return (
    <>
      <section
        className="relative flex items-center overflow-hidden py-12 md:py-20 bg-gradient-to-br from-background via-primary/5 to-background"
        style={{ minHeight:'calc(100vh-140px)', perspective:'1200px' }}
      >
        {/* Decorative blobs omitted */}

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left: static hero image */}
            <div className="lg:col-span-5 mt-10 lg:mt-0" dir="rtl">
              <motion.div
                ref={imgRef}
                className="aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-background mx-auto max-w-md lg:max-w-none"
                initial={{ opacity:0, scale:0.8 }}
                animate={{ opacity:1, scale:1 }}
                transition={{ type:'spring', stiffness:50, damping:12, duration:1, delay:0.4 }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ transformStyle:'preserve-3d', rotateX, rotateY, scale }}
              >
                <img
                  src={images.heroImage}
                  alt="جلسة علاج طبيعي"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>

            {/* Right: copy ↔ form toggle */}
            <div className="lg:col-span-7" dir="rtl">
              <AnimatePresence mode="wait">
                {showForm ? (
                  <motion.div
                    key="form"
                    initial={{ x:-50, opacity:0 }}
                    animate={{ x:0, opacity:1 }}
                    exit={{ x:-50, opacity:0 }}
                    transition={{ duration:0.4 }}
                  >
                    <QuickBookingFormContent onBack={() => setShowForm(false)}/>
                  </motion.div>
                ) : (
                  <motion.div
                    key="copy"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={{
                      hidden:{ opacity:0, y:50 },
                      visible:{ opacity:1, y:0, transition:{ type:'spring', stiffness:80, damping:15, delay:0.2 } },
                      exit:{ opacity:0, y:50, transition:{ duration:0.3 } }
                    }}
                  >
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-8 text-center lg:text-right" dir="rtl">
                      <span className="block text-primary">استعد استقلالك وثقتك</span>
                      <span className="block gradient-text-alt">مع العلاج الطبيعي المتخصص</span>
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto lg:mr-0 leading-relaxed" dir="rtl">
                      في مركز كنت للرعاية الصحية، نقدم خدمات العلاج الطبيعي المتقدمة لاستعادة الحركة، وإعادة التأهيل، وإدارة الألم، وتحسين جودة الحياة للمرضى من جميع الأعمار.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start mb-10" dir="rtl">
                      <Button
                        size="lg"
                        className="bg-accent text-accent-foreground px-6 sm:px-10 py-4 shadow-lg hover:bg-accent/90 hover:shadow-xl transition-transform hover:scale-105 font-bold uppercase tracking-wide w-full sm:w-auto"
                        onClick={() => setShowForm(true)}
                      >
                        <ArrowRight className="mr-3 h-5 w-5"/> احجز جلستك المجانية
                      </Button>
                      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <WhatsAppButton 
                          size="lg" 
                          variant="outline"
                          className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white px-6 sm:px-8 py-4 transition-all duration-300 hover:scale-105 font-bold uppercase tracking-wide shadow-lg hover:shadow-xl w-full sm:w-auto"
                          phoneNumber="+971507547326"
                        >
                          <WhatsappSVG className="w-5 h-5 ml-3"/>
                          واتساب
                        </WhatsAppButton>
                        <Button size="lg" variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-6 sm:px-8 py-4 transition-all duration-300 hover:scale-105 font-bold uppercase tracking-wide shadow-lg hover:shadow-xl w-full sm:w-auto" asChild>
                          <a href={HERO_CALL}>
                            <PhoneCall className="w-5 h-5 ml-3"/>
                            اتصل بنا
                          </a>
                        </Button>
                      </div>
                    </div>
                    <Button size="md" variant="ghost" className="text-primary hover:text-accent underline font-bold uppercase tracking-wide mt-4" asChild>
                      <a href="#services" dir="rtl">استكشف خدماتنا ←</a>
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp & Call buttons */}
      {/* <div className="fixed bottom-8 right-8 flex flex-col gap-3 z-50">
        <WhatsAppButton 
          className="bg-green-500 hover:bg-green-600 w-14 h-14 rounded-full text-white shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-110 border-2 border-green-400 hover:border-green-300 flex items-center justify-center"
          phoneNumber="+971507547326"
        >
          <WhatsappSVG className="w-6 h-6"/>
        </WhatsAppButton>
        <a href={HERO_CALL} className="bg-blue-500 hover:bg-blue-600 w-14 h-14 rounded-full text-white shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-110 border-2 border-blue-400 hover:border-blue-300 flex items-center justify-center">
          <PhoneCall size={24}/>
        </a>
      </div> */}

      {/* Free Session Modal */}
      <FreeSessionModal
        isOpen={showFreeSession}
        onClose={() => {
          setShowFreeSession(false);
          // Don't reset hasScrolled - popup should only show once per session
        }}
      />
    </>
  )
}
