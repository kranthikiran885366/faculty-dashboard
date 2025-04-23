"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, GraduationCap, Users, FileText, BookOpen, Clock, BellRing } from "lucide-react"
import { Footer } from "@/components/footer"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { motion } from "framer-motion"

export default function Home() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF4EB8] via-[#B23EFF] to-[#00CFFF] opacity-10"></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="space-y-6 order-1"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Faculty Dashboard{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF4EB8] to-[#B23EFF]">
                  Management System
                </span>
              </motion.h1>
              <motion.p 
                className="text-lg text-gray-600 max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                A comprehensive platform for university faculty to manage classes, track student performance, and
                streamline academic workflows.
              </motion.p>
              <motion.div 
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Button
                  className="bg-gradient-to-r from-[#FF4EB8] to-[#B23EFF] hover:from-[#B23EFF] hover:to-[#FF4EB8] text-white"
                  size="lg"
                  onClick={() => router.push("/dashboard")}
                >
                  Get Started
                </Button>
                <Button variant="outline" size="lg" onClick={() => router.push("/learn-more")}>
                  Learn More
                </Button>
              </motion.div>
            </motion.div>
            <motion.div 
              className="hidden lg:block order-2"
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ 
                duration: 0.8, 
                ease: "easeOut",
                type: "spring",
                stiffness: 50
              }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
            >
              <motion.img
                src="/gallery/homepage.jpg"
                alt="Faculty Dashboard"
                className="rounded-lg shadow-2xl w-full h-auto object-cover"
                initial={{ boxShadow: "0 0 0 rgba(0,0,0,0)" }}
                animate={{ 
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                transition={{ duration: 0.8, delay: 0.3 }}
                whileHover={{ 
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Comprehensive Faculty Management</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform offers a complete suite of tools designed specifically for academic institutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<CalendarDays className="h-10 w-10 text-[#FF4EB8]" />}
              title="Class & Lecture Management"
              description="Schedule classes, track attendance, and integrate with video conferencing tools."
            />
            <FeatureCard
              icon={<GraduationCap className="h-10 w-10 text-[#B23EFF]" />}
              title="Student Performance"
              description="Grade assignments, create custom rubrics, and analyze student performance trends."
            />
            <FeatureCard
              icon={<Users className="h-10 w-10 text-[#00CFFF]" />}
              title="Department Management"
              description="Manage faculty workload, course assignments, and departmental resources."
            />
            <FeatureCard
              icon={<FileText className="h-10 w-10 text-[#FF4EB8]" />}
              title="Research & Publications"
              description="Track research projects, manage publications, and facilitate collaborations."
            />
            <FeatureCard
              icon={<BookOpen className="h-10 w-10 text-[#B23EFF]" />}
              title="Course Management"
              description="Create and manage course materials, syllabi, and learning resources."
            />
            <FeatureCard
              icon={<Clock className="h-10 w-10 text-[#00CFFF]" />}
              title="Leave & Availability"
              description="Request and approve leaves, manage substitutions, and track availability."
            />
          </div>
        </div>
      </section>

      {/* Role-Based Access Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Role-Based Dashboards</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Tailored experiences for different roles within your institution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <RoleCard
              title="Faculty Dashboard"
              description="Manage teaching schedules, track attendance, and analyze student performance."
              features={["Class Management", "Grading Tools", "Student Analytics"]}
              color="from-[#FF4EB8] to-[#B23EFF]"
            />
            <RoleCard
              title="HOD Dashboard"
              description="Oversee department operations, faculty performance, and academic programs."
              features={["Faculty Tracking", "Department Analytics", "Course Oversight"]}
              color="from-[#B23EFF] to-[#00CFFF]"
            />
            <RoleCard
              title="Admin Dashboard"
              description="Control system-wide settings, user management, and institutional policies."
              features={["User Management", "System Configuration", "Reporting Tools"]}
              color="from-[#00CFFF] to-[#FF4EB8]"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our faculty management system.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I get started with the faculty dashboard?</AccordionTrigger>
                <AccordionContent>
                  Getting started is easy! Simply click the &quot;Get Started&quot; button, create your account using your
                  institutional email, and follow the setup wizard. Our system will guide you through the initial
                  configuration process.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>What features are available for faculty members?</AccordionTrigger>
                <AccordionContent>
                  Faculty members have access to a wide range of features including class management, attendance tracking,
                  grade management, course material organization, student performance analytics, and communication tools.
                  You can also manage your schedule and track research activities.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>How secure is the faculty dashboard?</AccordionTrigger>
                <AccordionContent>
                  We take security seriously. Our platform uses industry-standard encryption, secure authentication
                  protocols, and regular security audits. All data is backed up regularly, and we comply with
                  educational data protection regulations.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>Can I integrate with other educational tools?</AccordionTrigger>
                <AccordionContent>
                  Yes! Our platform supports integration with popular educational tools and learning management
                  systems. We provide APIs and built-in connectors for seamless integration with your existing
                  institutional software.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>What kind of support do you provide?</AccordionTrigger>
                <AccordionContent>
                  We offer comprehensive support including 24/7 technical assistance, detailed documentation,
                  video tutorials, and regular training sessions. Our dedicated support team is always ready
                  to help you make the most of the platform.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#FF4EB8] via-[#B23EFF] to-[#00CFFF]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Transform Your Institution?</h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8">
            Join hundreds of universities already using our platform to streamline academic workflows.
          </p>
          <Button
            size="lg"
            className="bg-white text-[#D6003A] hover:bg-gray-100"
            onClick={() => router.push("/contact")}
          >
            Request a Demo
          </Button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="border-none shadow-md hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="pb-2">
        <div className="mb-4">{icon}</div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-gray-600">{description}</CardDescription>
      </CardContent>
    </Card>
  )
}

interface RoleCardProps {
  title: string
  description: string
  features: string[]
  color: string
}

function RoleCard({ title, description, features, color }: RoleCardProps) {
  return (
    <Card className="border-none shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className={`h-2 bg-gradient-to-r ${color}`}></div>
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {features.map((feature: string, index: number) => (
            <li key={index} className="flex items-center gap-2">
              <BellRing className="h-4 w-4 text-[#B23EFF]" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
