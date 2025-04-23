"use client"

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Clock, Send, Facebook, Twitter, Instagram, Linkedin, Youtube, ChevronDown, Check, X, HelpCircle, MessageCircle, Star, AlertTriangle, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Footer } from '@/components/footer';
import { useState, ChangeEvent, FormEvent } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface FormData {
  name: string;
  email: string;
  subject: string;
  department: string;
  message: string;
}

interface FormErrors {
  name: string;
  email: string;
  subject: string;
  department: string;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    department: '',
    message: ''
  });
  
  const [formErrors, setFormErrors] = useState<FormErrors>({
    name: '',
    email: '',
    subject: '',
    department: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [showLiveChat, setShowLiveChat] = useState(false);
  const [feedbackRating, setFeedbackRating] = useState(0);
  const [feedbackComment, setFeedbackComment] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('contact');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleDepartmentChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      department: value
    }));
    
    if (formErrors.department) {
      setFormErrors(prev => ({
        ...prev,
        department: ''
      }));
    }
  };

  const validateForm = () => {
    const errors: FormErrors = {
      name: '',
      email: '',
      subject: '',
      department: '',
      message: ''
    };
    let isValid = true;
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
      isValid = false;
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
      isValid = false;
    }
    
    if (!formData.subject.trim()) {
      errors.subject = 'Subject is required';
      isValid = false;
    }
    
    if (!formData.department) {
      errors.department = 'Please select a department';
      isValid = false;
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
      isValid = false;
    }
    
    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError('');
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        department: '',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
  };

  const handleFeedbackSubmit = () => {
    if (feedbackRating > 0) {
      setFeedbackSubmitted(true);
      // In a real application, you would send this data to your backend
      setTimeout(() => {
        setFeedbackSubmitted(false);
        setFeedbackRating(0);
        setFeedbackComment('');
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative py-20"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#f14e9b] via-[#8e3fa8] to-[#2b59c3] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#f14e9b] via-[#8e3fa8] to-[#2b59c3] bg-clip-text text-transparent"
            >
              Contact Us
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-gray-600 mb-8"
            >
              Get in touch with us for any inquiries, feedback, or assistance
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Tabs Navigation */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="py-8"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Tabs defaultValue="contact" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="contact" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#f14e9b] data-[state=active]:to-[#8e3fa8] data-[state=active]:text-white">
                  Contact Form
                </TabsTrigger>
                <TabsTrigger value="emergency" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#f14e9b] data-[state=active]:to-[#8e3fa8] data-[state=active]:text-white">
                  Emergency Contacts
                </TabsTrigger>
                <TabsTrigger value="feedback" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#f14e9b] data-[state=active]:to-[#8e3fa8] data-[state=active]:text-white">
                  Feedback
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="contact">
                {/* Contact Information Section */}
                <motion.section 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="py-12"
                >
                  <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center"
                      >
                        <div className="bg-gradient-to-r from-[#f14e9b] to-[#8e3fa8] p-3 rounded-full mb-4">
                          <Mail className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-[#8e3fa8]">Email Us</h3>
                        <p className="text-gray-600 mb-2">For general inquiries:</p>
                        <a href="mailto:info@vignansuniversity.edu" className="text-[#2b59c3] hover:underline">
                          info@vignansuniversity.edu
                        </a>
                        <p className="text-gray-600 mt-4 mb-2">For admissions:</p>
                        <a href="mailto:admissions@vignansuniversity.edu" className="text-[#2b59c3] hover:underline">
                          admissions@vignansuniversity.edu
                        </a>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center"
                      >
                        <div className="bg-gradient-to-r from-[#f14e9b] to-[#8e3fa8] p-3 rounded-full mb-4">
                          <Phone className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-[#8e3fa8]">Call Us</h3>
                        <p className="text-gray-600 mb-2">Main Office:</p>
                        <a href="tel:+91-891-2739507" className="text-[#2b59c3] hover:underline">
                          +91-891-2739507
                        </a>
                        <p className="text-gray-600 mt-4 mb-2">Admissions Office:</p>
                        <a href="tel:+91-891-2739508" className="text-[#2b59c3] hover:underline">
                          +91-891-2739508
                        </a>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center"
                      >
                        <div className="bg-gradient-to-r from-[#f14e9b] to-[#8e3fa8] p-3 rounded-full mb-4">
                          <MapPin className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-[#8e3fa8]">Visit Us</h3>
                        <p className="text-gray-600">
                          Vignan's University<br />
                          Vadlamudi, Guntur<br />
                          Andhra Pradesh - 522213<br />
                          India
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </motion.section>

                {/* Social Media Section */}
                <motion.section 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="py-12 bg-white"
                >
                  <div className="container mx-auto px-4">
                    <motion.h2 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-[#f14e9b] to-[#8e3fa8] bg-clip-text text-transparent"
                    >
                      Connect With Us
                    </motion.h2>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="flex justify-center space-x-6"
                    >
                      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-[#f14e9b] to-[#8e3fa8] p-3 rounded-full hover:from-[#8e3fa8] hover:to-[#f14e9b] transition-all duration-300 transform hover:scale-110">
                        <Facebook className="h-6 w-6 text-white" />
                      </a>
                      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-[#f14e9b] to-[#8e3fa8] p-3 rounded-full hover:from-[#8e3fa8] hover:to-[#f14e9b] transition-all duration-300 transform hover:scale-110">
                        <Twitter className="h-6 w-6 text-white" />
                      </a>
                      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-[#f14e9b] to-[#8e3fa8] p-3 rounded-full hover:from-[#8e3fa8] hover:to-[#f14e9b] transition-all duration-300 transform hover:scale-110">
                        <Instagram className="h-6 w-6 text-white" />
                      </a>
                      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-[#f14e9b] to-[#8e3fa8] p-3 rounded-full hover:from-[#8e3fa8] hover:to-[#f14e9b] transition-all duration-300 transform hover:scale-110">
                        <Linkedin className="h-6 w-6 text-white" />
                      </a>
                      <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-[#f14e9b] to-[#8e3fa8] p-3 rounded-full hover:from-[#8e3fa8] hover:to-[#f14e9b] transition-all duration-300 transform hover:scale-110">
                        <Youtube className="h-6 w-6 text-white" />
                      </a>
                    </motion.div>
                  </div>
                </motion.section>

                {/* Contact Form Section */}
                <motion.section 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="py-16"
                  id="contact-form"
                >
                  <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                      <motion.h2 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-[#f14e9b] to-[#8e3fa8] bg-clip-text text-transparent"
                      >
                        Send Us a Message
                      </motion.h2>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-lg shadow-lg"
                      >
                        {submitSuccess && (
                          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md flex items-center">
                            <Check className="h-5 w-5 text-green-500 mr-2" />
                            <p className="text-green-700">Your message has been sent successfully! We'll get back to you soon.</p>
                          </div>
                        )}
                        
                        {submitError && (
                          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md flex items-center">
                            <X className="h-5 w-5 text-red-500 mr-2" />
                            <p className="text-red-700">{submitError}</p>
                          </div>
                        )}
                        
                        <form className="space-y-6" onSubmit={handleSubmit}>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                Your Name <span className="text-red-500">*</span>
                              </label>
                              <Input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="John Doe"
                                className={`w-full ${formErrors.name ? 'border-red-500' : ''}`}
                                value={formData.name}
                                onChange={handleChange}
                              />
                              {formErrors.name && (
                                <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>
                              )}
                            </div>
                            <div>
                              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Your Email <span className="text-red-500">*</span>
                              </label>
                              <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="john@example.com"
                                className={`w-full ${formErrors.email ? 'border-red-500' : ''}`}
                                value={formData.email}
                                onChange={handleChange}
                              />
                              {formErrors.email && (
                                <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
                              )}
                            </div>
                          </div>
                          
                          <div>
                            <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                              Department <span className="text-red-500">*</span>
                            </label>
                            <Select 
                              value={formData.department} 
                              onValueChange={handleDepartmentChange}
                            >
                              <SelectTrigger className={`w-full ${formErrors.department ? 'border-red-500' : ''}`}>
                                <SelectValue placeholder="Select a department" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="admissions">Admissions</SelectItem>
                                <SelectItem value="academic">Academic Affairs</SelectItem>
                                <SelectItem value="student">Student Services</SelectItem>
                                <SelectItem value="research">Research & Development</SelectItem>
                                <SelectItem value="placement">Placement Cell</SelectItem>
                                <SelectItem value="international">International Relations</SelectItem>
                                <SelectItem value="library">Library</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            {formErrors.department && (
                              <p className="mt-1 text-sm text-red-500">{formErrors.department}</p>
                            )}
                          </div>
                          
                          <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                              Subject <span className="text-red-500">*</span>
                            </label>
                            <Input
                              id="subject"
                              name="subject"
                              type="text"
                              placeholder="How can we help you?"
                              className={`w-full ${formErrors.subject ? 'border-red-500' : ''}`}
                              value={formData.subject}
                              onChange={handleChange}
                            />
                            {formErrors.subject && (
                              <p className="mt-1 text-sm text-red-500">{formErrors.subject}</p>
                            )}
                          </div>
                          
                          <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                              Message <span className="text-red-500">*</span>
                            </label>
                            <Textarea
                              id="message"
                              name="message"
                              placeholder="Your message here..."
                              className={`w-full min-h-[150px] ${formErrors.message ? 'border-red-500' : ''}`}
                              value={formData.message}
                              onChange={handleChange}
                            />
                            {formErrors.message && (
                              <p className="mt-1 text-sm text-red-500">{formErrors.message}</p>
                            )}
                          </div>
                          
                          <div className="flex justify-center">
                            <Button 
                              type="submit" 
                              className="bg-gradient-to-r from-[#f14e9b] to-[#8e3fa8] hover:from-[#8e3fa8] hover:to-[#f14e9b] text-white flex items-center"
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? (
                                <>
                                  <div className="h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                  Sending...
                                </>
                              ) : (
                                <>
                                  <Send className="h-4 w-4 mr-2" />
                                  Send Message
                                </>
                              )}
                            </Button>
                          </div>
                        </form>
                      </motion.div>
                    </div>
                  </div>
                </motion.section>

                {/* Live Chat Widget */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="fixed bottom-6 right-6 z-50"
                >
                  {!showLiveChat ? (
                    <Button
                      onClick={() => setShowLiveChat(true)}
                      className="bg-gradient-to-r from-[#f14e9b] to-[#8e3fa8] hover:from-[#8e3fa8] hover:to-[#f14e9b] text-white rounded-full p-4 shadow-lg flex items-center"
                    >
                      <MessageCircle className="h-6 w-6 mr-2" />
                      <span>Chat with us</span>
                    </Button>
                  ) : (
                    <div className="bg-white rounded-lg shadow-xl w-80 overflow-hidden">
                      <div className="bg-gradient-to-r from-[#f14e9b] to-[#8e3fa8] p-4 text-white flex justify-between items-center">
                        <h3 className="font-semibold">Live Support</h3>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-white hover:bg-white/20"
                          onClick={() => setShowLiveChat(false)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="p-4 h-80 overflow-y-auto">
                        <div className="bg-gray-100 p-3 rounded-lg mb-4">
                          <p className="text-sm">Hello! How can we help you today?</p>
                        </div>
                        <div className="flex justify-end mb-4">
                          <div className="bg-[#8e3fa8] text-white p-3 rounded-lg max-w-[80%]">
                            <p className="text-sm">Hi, I have a question about admissions.</p>
                          </div>
                        </div>
                        <div className="bg-gray-100 p-3 rounded-lg mb-4">
                          <p className="text-sm">I'd be happy to help with your admissions question. What would you like to know?</p>
                        </div>
                        <div className="flex justify-end mb-4">
                          <div className="bg-[#8e3fa8] text-white p-3 rounded-lg max-w-[80%]">
                            <p className="text-sm">What are the requirements for the Computer Science program?</p>
                          </div>
                        </div>
                        <div className="bg-gray-100 p-3 rounded-lg">
                          <p className="text-sm">For the Computer Science program, you need a high school diploma with strong grades in mathematics and science. You'll also need to submit your standardized test scores and a personal statement.</p>
                        </div>
                      </div>
                      <div className="p-4 border-t">
                        <div className="flex">
                          <Input
                            placeholder="Type your message..."
                            className="flex-1 mr-2"
                          />
                          <Button className="bg-gradient-to-r from-[#f14e9b] to-[#8e3fa8] hover:from-[#8e3fa8] hover:to-[#f14e9b] text-white">
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </TabsContent>
              
              <TabsContent value="emergency">
                <motion.section 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="py-12"
                >
                  <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                      <motion.h2 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-[#f14e9b] to-[#8e3fa8] bg-clip-text text-transparent"
                      >
                        Emergency Contacts
                      </motion.h2>
                      
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="bg-white p-8 rounded-lg shadow-lg"
                      >
                        <div className="flex items-center mb-6 p-4 bg-red-50 rounded-lg">
                          <AlertTriangle className="h-6 w-6 text-red-500 mr-3" />
                          <div>
                            <h3 className="text-xl font-semibold text-red-600">Campus Security</h3>
                            <p className="text-gray-600">24/7 Emergency Response</p>
                            <a href="tel:+91-891-2739999" className="text-[#2b59c3] hover:underline font-medium">
                              +91-891-2739999
                            </a>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold text-[#8e3fa8] mb-2">Health Services</h3>
                            <p className="text-gray-600 mb-2">Campus Medical Center</p>
                            <a href="tel:+91-891-2738888" className="text-[#2b59c3] hover:underline">
                              +91-891-2738888
                            </a>
                          </div>
                          
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold text-[#8e3fa8] mb-2">Counseling Services</h3>
                            <p className="text-gray-600 mb-2">Student Support</p>
                            <a href="tel:+91-891-2737777" className="text-[#2b59c3] hover:underline">
                              +91-891-2737777
                            </a>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg mb-6">
                          <h3 className="text-lg font-semibold text-[#8e3fa8] mb-2">IT Support</h3>
                          <p className="text-gray-600 mb-2">Technical Issues (24/7)</p>
                          <a href="tel:+91-891-2736666" className="text-[#2b59c3] hover:underline">
                            +91-891-2736666
                          </a>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h3 className="text-lg font-semibold text-[#8e3fa8] mb-2">External Emergency Services</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-gray-600 mb-1">Police</p>
                              <a href="tel:100" className="text-[#2b59c3] hover:underline">
                                100
                              </a>
                            </div>
                            <div>
                              <p className="text-gray-600 mb-1">Ambulance</p>
                              <a href="tel:108" className="text-[#2b59c3] hover:underline">
                                108
                              </a>
                            </div>
                            <div>
                              <p className="text-gray-600 mb-1">Fire</p>
                              <a href="tel:101" className="text-[#2b59c3] hover:underline">
                                101
                              </a>
                            </div>
                            <div>
                              <p className="text-gray-600 mb-1">Women's Helpline</p>
                              <a href="tel:1091" className="text-[#2b59c3] hover:underline">
                                1091
                              </a>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.section>
              </TabsContent>
              
              <TabsContent value="feedback">
                <motion.section 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="py-12"
                >
                  <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                      <motion.h2 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-[#f14e9b] to-[#8e3fa8] bg-clip-text text-transparent"
                      >
                        Share Your Feedback
                      </motion.h2>
                      
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="bg-white p-8 rounded-lg shadow-lg"
                      >
                        {feedbackSubmitted ? (
                          <div className="text-center py-8">
                            <div className="bg-green-50 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                              <Check className="h-8 w-8 text-green-500" />
                            </div>
                            <h3 className="text-xl font-semibold text-[#8e3fa8] mb-2">Thank You!</h3>
                            <p className="text-gray-600">Your feedback has been submitted successfully.</p>
                          </div>
                        ) : (
                          <>
                            <div className="mb-6">
                              <h3 className="text-lg font-semibold text-gray-700 mb-4">How would you rate your experience with our services?</h3>
                              <div className="flex justify-center space-x-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <button
                                    key={star}
                                    onClick={() => setFeedbackRating(star)}
                                    className={`p-2 rounded-full transition-colors ${
                                      feedbackRating >= star ? 'text-yellow-400' : 'text-gray-300'
                                    }`}
                                  >
                                    <Star className="h-8 w-8 fill-current" />
                                  </button>
                                ))}
                              </div>
                            </div>
                            
                            <div className="mb-6">
                              <h3 className="text-lg font-semibold text-gray-700 mb-4">What aspects of our service did you find most helpful?</h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center space-x-2">
                                  <input type="checkbox" id="helpful1" className="rounded text-[#8e3fa8] focus:ring-[#8e3fa8]" />
                                  <label htmlFor="helpful1" className="text-gray-700">Staff responsiveness</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <input type="checkbox" id="helpful2" className="rounded text-[#8e3fa8] focus:ring-[#8e3fa8]" />
                                  <label htmlFor="helpful2" className="text-gray-700">Communication clarity</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <input type="checkbox" id="helpful3" className="rounded text-[#8e3fa8] focus:ring-[#8e3fa8]" />
                                  <label htmlFor="helpful3" className="text-gray-700">Problem resolution</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <input type="checkbox" id="helpful4" className="rounded text-[#8e3fa8] focus:ring-[#8e3fa8]" />
                                  <label htmlFor="helpful4" className="text-gray-700">Service speed</label>
                                </div>
                              </div>
                            </div>
                            
                            <div className="mb-6">
                              <h3 className="text-lg font-semibold text-gray-700 mb-4">Do you have any suggestions for improvement?</h3>
                              <Textarea
                                placeholder="Your suggestions here..."
                                className="w-full min-h-[100px]"
                                value={feedbackComment}
                                onChange={(e) => setFeedbackComment(e.target.value)}
                              />
                            </div>
                            
                            <div className="flex justify-center">
                              <Button 
                                onClick={handleFeedbackSubmit}
                                className="bg-gradient-to-r from-[#f14e9b] to-[#8e3fa8] hover:from-[#8e3fa8] hover:to-[#f14e9b] text-white"
                                disabled={feedbackRating === 0}
                              >
                                Submit Feedback
                              </Button>
                            </div>
                          </>
                        )}
                      </motion.div>
                    </div>
                  </div>
                </motion.section>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="py-16 bg-white"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-[#f14e9b] to-[#8e3fa8] bg-clip-text text-transparent"
            >
              Frequently Asked Questions
            </motion.h2>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-lg shadow-lg"
            >
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left font-medium">
                    How do I apply for admission to Vignan's University?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-600">
                      You can apply for admission through our online application portal. Visit the Admissions page on our website, create an account, and follow the step-by-step application process. Make sure to have all required documents ready, including academic transcripts, standardized test scores, and identification documents.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left font-medium">
                    What are the tuition fees for different programs?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-600">
                      Tuition fees vary by program and level of study. For detailed information about fees, please visit our Tuition & Fees page or contact the Admissions Office directly. We also offer various scholarships and financial aid options for eligible students.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left font-medium">
                    Does the university provide on-campus housing?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-600">
                      Yes, Vignan's University provides on-campus housing options for students. We have separate hostels for male and female students with various amenities. Housing assignments are made on a first-come, first-served basis, so we recommend applying early.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left font-medium">
                    How can I schedule a campus tour?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-600">
                      Campus tours are available Monday through Friday from 9:00 AM to 4:00 PM. You can schedule a tour by contacting our Admissions Office or by filling out the Campus Tour Request form on our website. Tours typically last about 1-2 hours and include visits to academic buildings, libraries, and student facilities.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-left font-medium">
                    What career services does the university offer?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-600">
                      Our Career Services Office provides comprehensive support to students and alumni, including career counseling, resume writing workshops, interview preparation, job fairs, and networking events. We also have strong connections with industry partners who regularly recruit our graduates.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              
              <div className="mt-8 text-center">
                <p className="text-gray-600 mb-4">Still have questions?</p>
                <Button 
                  variant="outline" 
                  className="flex items-center mx-auto"
                  onClick={() => {
                    setActiveTab('contact');
                    const contactForm = document.getElementById('contact-form');
                    if (contactForm) {
                      contactForm.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Contact Our Support Team
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Office Hours Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="py-16"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-[#f14e9b] to-[#8e3fa8] bg-clip-text text-transparent"
            >
              Office Hours
            </motion.h2>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-r from-[#f14e9b] to-[#8e3fa8] p-2 rounded-full mr-4">
                  <Clock className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#8e3fa8]">Administrative Office</h3>
                  <p className="text-gray-600">Monday - Friday: 9:00 AM - 5:00 PM</p>
                  <p className="text-gray-600">Saturday: 9:00 AM - 1:00 PM</p>
                </div>
              </div>
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-r from-[#f14e9b] to-[#8e3fa8] p-2 rounded-full mr-4">
                  <Clock className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#8e3fa8]">Admissions Office</h3>
                  <p className="text-gray-600">Monday - Saturday: 9:00 AM - 5:00 PM</p>
                  <p className="text-gray-600">Sunday: Closed</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-[#f14e9b] to-[#8e3fa8] p-2 rounded-full mr-4">
                  <Clock className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#8e3fa8]">Student Services</h3>
                  <p className="text-gray-600">Monday - Friday: 8:30 AM - 4:30 PM</p>
                  <p className="text-gray-600">Saturday - Sunday: Closed</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
} 