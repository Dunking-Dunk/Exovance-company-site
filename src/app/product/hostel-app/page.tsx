"use client"

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    Shield,
    Users,
    Clock,
    CheckCircle2,
    Utensils,
    Shirt,
    Calendar,
    ArrowRight,
    ExternalLink,
    Database,
    Smartphone,
    BarChart3,
    Settings,
    ChevronLeft,
    ChevronRight
} from "lucide-react";

const Page = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const heroImages = [
        {
            src: "/service/hostel/image-1.webp",
            alt: "Hostel Management Dashboard",
            title: "Smart Dashboard Interface"
        },
        {
            src: "/service/hostel/image-2.webp",
            alt: "Room Allocation System",
            title: "Automated Room Allocation"
        },
        {
            src: "/service/hostel/image-3.webp",
            alt: "Mobile Application",
            title: "Mobile App Interface"
        },
        {
            src: "/service/hostel/image-4.webp",
            alt: "Analytics Dashboard",
            title: "Real-time Analytics"
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                (prevIndex + 1) % heroImages.length
            );
        }, 4000);

        return () => clearInterval(interval);
    }, [heroImages.length]);

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            (prevIndex + 1) % heroImages.length
        );
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? heroImages.length - 1 : prevIndex - 1
        );
    };
    const features = [
        {
            icon: Shield,
            title: "Digital Gate Pass Management",
            description: "Streamlined approval workflows with secure tracking and reporting",
            details: "Eliminate manual gate pass processes with automated approval workflows, digital signatures, and real-time tracking for enhanced security and efficiency."
        },
        {
            icon: Database,
            title: "Automated Room Allocation System",
            description: "Centralized database eliminating manual spreadsheet management",
            details: "Advanced allocation algorithms that consider student preferences, department requirements, and availability to optimize room assignments automatically."
        },
        {
            icon: BarChart3,
            title: "Integrated Attendance Tracking",
            description: "Real-time monitoring with comprehensive reporting capabilities",
            details: "Automated attendance tracking with biometric integration, instant notifications to parents/guardians, and detailed analytics for administrators."
        },
        {
            icon: Utensils,
            title: "Meal Service Coordination",
            description: "Transparent scheduling and tracking systems for dining services",
            details: "Digital meal planning, dietary preference management, nutritional tracking, and automated billing for hostel dining services."
        },
        {
            icon: Shirt,
            title: "Laundry Management",
            description: "Efficient laundry service coordination and tracking",
            details: "QR code-based laundry tracking, automated pickup/delivery scheduling, and real-time status updates for all laundry items."
        },
        {
            icon: Settings,
            title: "Customizable Solutions",
            description: "Tailored features for your institution's specific needs",
            details: "Fully customizable platform that adapts to your unique operational requirements and integrates with existing institutional systems."
        }
    ];

    const benefits = [
        "Reduce administrative workload by 70%",
        "Improve operational efficiency",
        "Enhance student satisfaction",
        "Real-time data insights and analytics",
        "Seamless communication channels",
        "24/7 system availability"
    ];

    const stats = [
        { value: "70%", label: "Reduction in Manual Processes" },
        { value: "24/7", label: "System Availability" },
        { value: "100%", label: "Data Security" },
        { value: "< 2s", label: "Response Time" }
    ];

    return (
        <div className="min-h-screen text-customGrayLight z-20 relative">
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-20 pb-16 px-4 md:px-8 lg:px-16">
                <div className="absolute inset-0 bg-gradient-to-br from-customBlack via-customBlack to-customGrayDark/10" />

                <div className="relative max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8 lg:order-1">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-customGrayDark/20 border border-customGrayDark/40">
                                <Users className="h-4 w-4 text-customGrayLight/80" />
                                <span className="text-sm tracking-wide text-customGray">Smart Hostel Management</span>
                            </div>

                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] text-customGrayLight">
                                Transform Your
                                <span className="block text-transparent bg-gradient-to-r from-customGrayLight to-customGray bg-clip-text">
                                    Hostel Operations
                                </span>
                            </h1>

                            <p className="text-lg md:text-xl text-customGray max-w-2xl leading-relaxed">
                                Streamline hostel administration with our comprehensive digital platform designed to eliminate manual processes, enhance security, and improve student satisfaction.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    href="/contact"
                                    className="group px-8 py-4 bg-customGrayLight text-customBlack font-semibold rounded-lg transition-all duration-300 hover:bg-customGray transform hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] text-center"
                                >
                                    <span className="flex items-center justify-center gap-2">
                                        Schedule Demo
                                        <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                                    </span>
                                </Link>

                                <Link
                                    href="#features"
                                    className="group px-8 py-4 border border-customGrayDark text-customGrayLight font-semibold rounded-lg transition-all duration-300 hover:border-customGray hover:bg-customGrayDark/10 text-center"
                                >
                                    Learn More
                                </Link>
                            </div>
                        </div>

                        <div className="relative lg:order-2">
                            <div className="relative w-full aspect-[16/10] md:aspect-[4/3] lg:aspect-[16/10] rounded-2xl overflow-hidden border border-customGrayDark/40 bg-gradient-to-br from-customGrayDark/10 to-customBlack">
                                {/* Image Carousel */}
                                <div className="relative w-full h-full">
                                    {heroImages.map((image, index) => (
                                        <div
                                            key={index}
                                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                                                }`}
                                        >
                                            <Image
                                                src={image.src}
                                                alt={image.alt}
                                                fill
                                                className="object-cover"
                                                priority={index === 0}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-customBlack/80 via-transparent to-transparent" />

                                            {/* Image Title */}
                                            <div className="absolute bottom-6 left-6 right-6">
                                                <h3 className="text-xl md:text-2xl font-semibold text-customGrayLight">
                                                    {image.title}
                                                </h3>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Navigation Buttons */}
                                <button
                                    onClick={prevImage}
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-customBlack/60 backdrop-blur-sm border border-customGrayDark/40 text-customGrayLight hover:bg-customGrayDark/60 transition-all duration-300 hover:scale-110"
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </button>

                                <button
                                    onClick={nextImage}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-customBlack/60 backdrop-blur-sm border border-customGrayDark/40 text-customGrayLight hover:bg-customGrayDark/60 transition-all duration-300 hover:scale-110"
                                >
                                    <ChevronRight className="w-6 h-6" />
                                </button>

                                {/* Dots Indicator */}
                                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                    {heroImages.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentImageIndex(index)}
                                            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentImageIndex
                                                    ? 'bg-customGrayLight scale-125'
                                                    : 'bg-customGray/50 hover:bg-customGray'
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 px-4 md:px-8 lg:px-16 border-t border-customGrayDark/40">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-customGrayLight mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-sm md:text-base text-customGray">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Problem Statement */}
            <section className="py-20 px-4 md:px-8 lg:px-16 bg-customGrayDark/5">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-customGrayLight">
                        Addressing Institutional Challenges
                    </h2>

                    <p className="text-lg md:text-xl text-customGray leading-relaxed">
                        Through our work with various educational institutions, we have observed that hostel administration
                        teams consistently face challenges with manual processes that consume considerable time and resources.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 mt-12">
                        <div className="space-y-4 text-left">
                            <h3 className="text-xl font-semibold text-customGrayLight mb-4">Common Operational Bottlenecks:</h3>
                            {[
                                "Manual gate pass approval processes",
                                "Room allocation coordination challenges",
                                "Attendance monitoring difficulties",
                                "Laundry and meal service oversight",
                                "Administrative inefficiencies",
                                "Staff productivity concerns"
                            ].map((item, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <div className="w-2 h-2 rounded-full bg-customGray mt-2 flex-shrink-0" />
                                    <span className="text-customGray">{item}</span>
                                </div>
                            ))}
                        </div>

                        <div className="relative rounded-xl overflow-hidden">
                            <Image
                                src="/service/hostel/image-2.webp"
                                alt="Hostel Management Challenges"
                                width={400}
                                height={300}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 px-4 md:px-8 lg:px-16">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-customGrayLight mb-6">
                            Comprehensive Solution Features
                        </h2>
                        <p className="text-lg md:text-xl text-customGray max-w-3xl mx-auto">
                            Our Smart Hostel Management Platform addresses institutional challenges through intelligent automation and user-friendly interfaces.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="group p-8 rounded-2xl border border-customGrayDark/40 bg-customBlack/40 backdrop-blur-sm hover:border-customGray/60 transition-all duration-300 hover:transform hover:scale-[1.02]"
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="p-3 rounded-lg bg-customGrayDark/20 group-hover:bg-customGrayDark/30 transition-colors duration-300">
                                        <feature.icon className="h-6 w-6 text-customGrayLight" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-customGrayLight">
                                        {feature.title}
                                    </h3>
                                </div>

                                <p className="text-customGray mb-4 leading-relaxed">
                                    {feature.description}
                                </p>

                                <p className="text-sm text-customGrayDark leading-relaxed">
                                    {feature.details}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-20 px-4 md:px-8 lg:px-16 bg-customGrayDark/5">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-customGrayLight">
                                Why Choose Our Platform?
                            </h2>

                            <p className="text-lg text-customGray leading-relaxed">
                                Beyond our core features, we understand that each institution has unique operational requirements.
                                Our platform is designed to be fully customizable, allowing us to develop tailored solutions.
                            </p>

                            <div className="space-y-4">
                                {benefits.map((benefit, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-customGrayLight flex-shrink-0" />
                                        <span className="text-customGray">{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative aspect-[16/9] md:aspect-[4/3] lg:aspect-[16/10] rounded-2xl overflow-hidden border border-customGrayDark/40 bg-gradient-to-br from-customGrayDark/10 to-customBlack">
                            {/* Feature Images Carousel */}
                            <div className="relative w-full h-full">
                                {heroImages.map((image, index) => (
                                    <div
                                        key={`benefit-${index}`}
                                        className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === currentImageIndex
                                                ? 'opacity-100 scale-100'
                                                : 'opacity-0 scale-105'
                                            }`}
                                    >
                                        <Image
                                            src={image.src}
                                            alt={image.alt}
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-customBlack/60 via-transparent to-transparent" />

                                        {/* Feature highlight overlay */}
                                        <div className="absolute bottom-6 left-6 right-6">
                                            <div className="bg-customBlack/80 backdrop-blur-sm rounded-lg p-4 border border-customGrayDark/40">
                                                <h4 className="text-lg font-semibold text-customGrayLight mb-2">
                                                    {image.title}
                                                </h4>
                                                <p className="text-sm text-customGray">
                                                    {index === 0 && "Comprehensive dashboard for real-time hostel management"}
                                                    {index === 1 && "Intelligent room allocation based on preferences and availability"}
                                                    {index === 2 && "Mobile-first design for students and administrators"}
                                                    {index === 3 && "Advanced analytics for data-driven decision making"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Progress Bar */}
                            <div className="absolute top-6 left-6 right-6">
                                <div className="flex space-x-2">
                                    {heroImages.map((_, index) => (
                                        <div
                                            key={`progress-${index}`}
                                            className="flex-1 h-1 bg-customGray/30 rounded-full overflow-hidden"
                                        >
                                            <div
                                                className={`h-full bg-customGrayLight transition-all duration-300 ${index === currentImageIndex ? 'w-full' : 'w-0'
                                                    }`}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Customization Section */}
            <section className="py-20 px-4 md:px-8 lg:px-16">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-customGrayLight">
                        Fully Customizable Solutions
                    </h2>

                    <p className="text-lg md:text-xl text-customGray leading-relaxed">
                        Whether your priority is enhancing security protocols, improving communication channels, or streamlining
                        specific administrative processes, we work closely with management teams to ensure our solution aligns
                        perfectly with your institutional needs and standards.
                    </p>

                    <div className="grid md:grid-cols-3 gap-8 mt-12">
                        <div className="p-6 rounded-xl border border-customGrayDark/40 bg-customBlack/20">
                            <Shield className="h-8 w-8 text-customGrayLight mb-4 mx-auto" />
                            <h3 className="text-lg font-semibold text-customGrayLight mb-2">Security Protocols</h3>
                            <p className="text-customGray text-sm">Enhanced security measures with biometric access and digital monitoring</p>
                        </div>

                        <div className="p-6 rounded-xl border border-customGrayDark/40 bg-customBlack/20">
                            <Smartphone className="h-8 w-8 text-customGrayLight mb-4 mx-auto" />
                            <h3 className="text-lg font-semibold text-customGrayLight mb-2">Communication Channels</h3>
                            <p className="text-customGray text-sm">Seamless communication between students, staff, and administrators</p>
                        </div>

                        <div className="p-6 rounded-xl border border-customGrayDark/40 bg-customBlack/20">
                            <Settings className="h-8 w-8 text-customGrayLight mb-4 mx-auto" />
                            <h3 className="text-lg font-semibold text-customGrayLight mb-2">Administrative Processes</h3>
                            <p className="text-customGray text-sm">Streamlined workflows tailored to your specific requirements</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-customGrayDark/10 to-customBlack">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-customGrayLight">
                        Ready to Transform Your Hostel Management?
                    </h2>

                    <p className="text-lg md:text-xl text-customGray leading-relaxed">
                        We would be honored to present a comprehensive demonstration of how our platform could benefit
                        your institution. This includes a detailed review of your current processes and a customized
                        presentation showing how our solution could optimize your operations.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/contact"
                            className="group px-10 py-4 bg-customGrayLight text-customBlack font-semibold rounded-lg transition-all duration-300 hover:bg-customGray transform hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                        >
                            <span className="flex items-center justify-center gap-2">
                                Schedule a Demo
                                <Calendar className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                            </span>
                        </Link>

                        <Link
                            href="/service"
                            className="group px-10 py-4 border border-customGrayDark text-customGrayLight font-semibold rounded-lg transition-all duration-300 hover:border-customGray hover:bg-customGrayDark/10"
                        >
                            <span className="flex items-center justify-center gap-2">
                                View All Services
                                <ExternalLink className="w-5 h-5" />
                            </span>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Page;