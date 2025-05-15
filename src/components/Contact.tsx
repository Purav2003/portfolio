import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form";
import { useToast } from "../hooks/use-toast";
import { MapPin, Mail, Phone, Linkedin, Github, Send, Loader2 } from "lucide-react";
import emailjs from '@emailjs/browser';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

// Initialize EmailJS with hardcoded credentials for now
// These credentials are already visible in the server logs and environment
const EMAILJS_PUBLIC_KEY = "0LdKcL5yREhBG4mFg";
const EMAILJS_SERVICE_ID = "service_96ulpbj";
const EMAILJS_TEMPLATE_ID = "template_svp12gk";

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [emailJSConfig, setEmailJSConfig] = useState({
    publicKey: '',
    serviceId: '',
    templateId: ''
  });
  const [emailJSInitialized, setEmailJSInitialized] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const emailFormRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  
  // Initialize EmailJS state with hardcoded credentials
  useEffect(() => {
    console.log("Setting EmailJS config from hardcoded values");
    
    setEmailJSConfig({
      publicKey: EMAILJS_PUBLIC_KEY,
      serviceId: EMAILJS_SERVICE_ID,
      templateId: EMAILJS_TEMPLATE_ID
    });
    
    setEmailJSInitialized(true);
    
    console.log("EmailJS initialized successfully with hardcoded credentials");
  }, []);
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    mode: "onChange",
  });
  
  // Check if form is complete
  useEffect(() => {
    const subscription = form.watch(() => {
      setIsFormComplete(form.formState.isValid);
    });
    return () => subscription.unsubscribe();
  }, [form.watch, form.formState.isValid]);

  // Create array of social profiles
  const socialProfiles = [
    {
      name: "Location",
      value: "Windsor, Ontario, Canada",
      icon: <MapPin className="h-5 w-5" />,
      link: null,
      linkText: null,
    },
    {
      name: "Email",
      value: "napayal@uwindsor.ca",
      icon: <Mail className="h-5 w-5" />,
      link: "mailto:napayal@uwindsor.ca",
      linkText: "Send an email",
    },
    {
      name: "Phone",
      value: "437-667-0197",
      icon: <Phone className="h-5 w-5" />,
      link: "tel:4376670197",
      linkText: "Call me",
    },
    {
      name: "LinkedIn",
      value: "payal-kash-40abb3225",
      icon: <Linkedin className="h-5 w-5" />,
      link: "https://linkedin.com/in/payal-kash-40abb3225",
      linkText: "Connect with me",
    },
    {
      name: "GitHub",
      value: "payal",
      icon: <Github className="h-5 w-5" />,
      link: "#",
      linkText: "Follow me",
    },
  ];

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Log form data for debugging
      console.log("Form submitted:", data);
      
      // First, save to database
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      
      // Parse the JSON response
      const responseData = await response.json();
      
      // Check if database save was successful
      if (responseData.success) {
        try {
          // Log EmailJS attempt
          console.log("Attempting to send email with EmailJS");
          
          // Send email notification using EmailJS with hardcoded credentials
          await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            {
              from_name: data.name,
              from_email: data.email,
              subject: data.subject,
              message: data.message,
            },
            EMAILJS_PUBLIC_KEY // Pass the public key explicitly
          );
          
          console.log("Email notification sent successfully");
        } catch (emailError) {
          // If email fails, still consider the form submission successful since data was saved to DB
          console.error("Email notification failed:", emailError);
          // Don't throw the error, just log it
        }
        
        // Show success toast
        toast({
          title: "Message sent successfully!",
          description: "Thank you for reaching out. I'll get back to you soon.",
        });
        
        // Add success animation
        if (formRef.current) {
          formRef.current.classList.add("animate-success");
          setTimeout(() => {
            form.reset();
            if (formRef.current) {
              formRef.current.classList.remove("animate-success");
            }
          }, 1000);
        } else {
          form.reset();
        }
      } else {
        throw new Error(responseData.message || 'Failed to submit form');
      }
    } catch (error) {
      console.error("Contact form error:", error);
      toast({
        title: "Error sending message",
        description: error instanceof Error ? error.message : "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 relative bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-gray-100/50 to-transparent dark:from-gray-800/50 -z-10"></div>
      
      {/* Circle decorations */}
      <div className="absolute top-40 left-10 w-32 h-32 rounded-full bg-primary/5 -z-10 animate-float"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 rounded-full bg-secondary/5 -z-10 animate-float" style={{ animationDelay: '1s' }}></div>
      
      <div className="container mx-auto px-4">
        <h2 className="section-heading reveal">Get In Touch</h2>
        <p className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-16 reveal">
          Have a question or want to work together? Feel free to contact me and I'll get back to you as soon as possible.
        </p>
        
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12">
          <div className="lg:w-2/5 reveal">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 hover-card h-full">
              <h3 className="text-2xl font-semibold mb-8 relative inline-block">
                Contact Information
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary/50"></span>
              </h3>
              
              <div className="space-y-7">
                {socialProfiles.map((profile, index) => (
                  <div key={`profile-${index}`} className="flex items-start group">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4 flex-shrink-0 transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                      {profile.icon}
                    </div>
                    <div>
                      <h4 className="font-medium text-lg mb-1">{profile.name}</h4>
                      <p className="text-gray-600 dark:text-gray-400 mb-1">{profile.value}</p>
                      {profile.link && (
                        <a 
                          href={profile.link} 
                          target={profile.link.startsWith('http') ? "_blank" : undefined}
                          rel={profile.link.startsWith('http') ? "noopener noreferrer" : undefined}
                          className="text-primary hover:underline flex items-center gap-1 text-sm"
                        >
                          {profile.linkText}
                          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <h4 className="font-medium text-lg mb-4">Follow Me</h4>
                <div className="flex gap-4">
                  <a 
                    href="https://linkedin.com/in/payal-kash-40abb3225" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-primary hover:text-white transition-colors duration-300"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a 
                    href="#github" 
                    className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-primary hover:text-white transition-colors duration-300"
                    aria-label="GitHub"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-3/5 reveal">
            <div 
              ref={formRef}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 hover-card"
            >
              <h3 className="text-2xl font-semibold mb-8 relative inline-block">
                Send Me a Message
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary/50"></span>
              </h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base">Your Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="John Doe" 
                              {...field} 
                              className="px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-primary/50 transition-all duration-300"
                            />
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
                          <FormLabel className="text-base">Your Email</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="john@example.com" 
                              type="email" 
                              {...field} 
                              className="px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-primary/50 transition-all duration-300"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base">Subject</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="How can I help you?" 
                            {...field} 
                            className="px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-primary/50 transition-all duration-300"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base">Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Your message here..." 
                            rows={5} 
                            {...field} 
                            className="px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-900 resize-none focus:ring-2 focus:ring-primary/50 transition-all duration-300"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-between items-center pt-2">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      All fields are required
                    </p>
                    <Button 
                      type="submit" 
                      disabled={isSubmitting || !isFormComplete}
                      className={`px-6 py-3 rounded-full transition-all duration-300 font-medium text-white flex items-center gap-2
                        ${isFormComplete ? 'bg-primary hover:bg-primary/90' : 'bg-gray-400 dark:bg-gray-700 cursor-not-allowed'}`}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
