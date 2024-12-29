'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { HandIcon, MessageSquareIcon, UsersIcon, ArrowRightIcon, LinkedinIcon, MenuIcon } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const featuresRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const staggerChildren = {
    animate: { transition: { staggerChildren: 0.1 } }
  };

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 text-gray-800">
      <header className="container mx-auto px-4 py-4 sm:py-8">
        <nav className="flex justify-between items-center">
          <div className="text-xl sm:text-2xl font-bold text-blue-600">SignConnect</div>
          <div className="md:hidden">
            <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <MenuIcon className="h-6 w-6" />
            </Button>
          </div>
          <div className={`md:block ${isMenuOpen ? 'block' : 'hidden'} absolute md:relative top-16 md:top-0 left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none z-50`}>
            <NavigationMenu>
              <NavigationMenuList className="flex-col md:flex-row">
                <NavigationMenuItem>
                  <NavigationMenuTrigger>About</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[300px] gap-3 p-4 md:w-[300px] lg:w-[300px] md:grid-cols-2">
                      <li className="row-span-3 md:col-span-2">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            href="/"
                          >
                            <div className="mb-2 mt-4 text-lg font-medium">
                              SignConnect
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Breaking communication barriers with real-time sign language translation.
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <ListItem href="https://www.linkedin.com/in/shubham-choure-01a6b6287/" title="Shubham Choure">
                        Developer
                      </ListItem>
                      <ListItem href="https://www.linkedin.com/in/s41r4j/" title="Sairaj Jawalikar">
                        Developer
                      </ListItem>
                      <ListItem href="https://www.linkedin.com/in/anandi-bhosale-0abb9b301/" title="Anandi Bhosale">
                        Designer
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="#features" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()} onClick={scrollToFeatures}>
                      Features
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Contact</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[300px] gap-3 p-4 md:w-[300px] md:grid-cols-2">
                      <ListItem href="mailto:shubhamchoureps@gmail.com" title="Email Us">
                        Get in touch via email
                      </ListItem>
                      <ListItem href="tel:+919021258702" title="Call Us">
                        Speak with our team
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8 sm:py-16">
        <motion.div 
          className="text-center mb-12 sm:mb-16"
          initial="initial"
          animate="animate"
          variants={staggerChildren}
        >
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
            variants={fadeInUp}
          >
            Connect Beyond Words
          </motion.h1>
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto"
            variants={fadeInUp}
          >
            Break communication barriers with real-time sign language translation
          </motion.p>
          <motion.div variants={fadeInUp}>
            {/* <a href="/connect"> */}
            <a href="/index.html">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-bold">
              Let&apos;s Connect
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Button>
            </a>
            
          </motion.div>
        </motion.div>

        {/* <motion.div 
          className="grid sm:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16"
          variants={staggerChildren}
          initial="initial"
          animate="animate"
        >
          {[
            { name: "Shubham Choure", role: "Co-founder & Developer", linkedin: "https://www.linkedin.com/in/shubham-choure-01a6b6287/" },
            { name: "Sairaj Jawalikar", role: "Co-founder & Designer", linkedin: "https://www.linkedin.com/in/sairaj-jawalikar-01a6b6287/" }
          ].map((person, index) => (
            <motion.div 
              key={index} 
              className="bg-white rounded-lg p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4"
              variants={fadeInUp}
            >
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 shrink-0">
                Photo
              </div>
              <div className="text-center sm:text-left">
                <h2 className="text-xl font-semibold">{person.name}</h2>
                <p className="text-gray-600">{person.role}</p>
                <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 flex items-center justify-center sm:justify-start mt-2">
                  <LinkedinIcon className="h-5 w-5 mr-1" />
                  LinkedIn
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div> */}

        <motion.div 
          ref={featuresRef}
          className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16"
          variants={staggerChildren}
          initial="initial"
          animate="animate"
        >
          {[
            { icon: HandIcon, title: "Sign Language Recognition", description: "Advanced AI recognizes and interprets a wide range of sign language gestures" },
            { icon: MessageSquareIcon, title: "Real-time Translation", description: "Instant translation between sign language and text or speech" },
            { icon: UsersIcon, title: "Connect Communities", description: "Bridge the gap between deaf and hearing communities effortlessly" }
          ].map((feature, index) => (
            <motion.div
              id = "features" 
              key={index} 
              className="bg-white rounded-lg p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              variants={fadeInUp}
            >
              <feature.icon className="h-10 w-10 sm:h-12 sm:w-12 text-blue-600 mb-3 sm:mb-4" />
              <h2 className="text-lg sm:text-xl font-semibold mb-2">{feature.title}</h2>
              <p className="text-gray-600 text-sm sm:text-base">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="bg-white rounded-lg p-6 sm:p-8 shadow-lg mb-12 sm:mb-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="md:flex items-center">
            <div className="md:w-1/2 mb-6 md:mb-0">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Experience SignConnect</h2>
              <p className="text-gray-600 mb-4 text-sm sm:text-base">
                Our intuitive app makes communication seamless. Try it now and see the difference.
              </p>
              {/* <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                Download App
              </Button> */}
            </div>
            <div className="md:w-1/2 md:pl-8">
              <div className="bg-gray-200 rounded-lg aspect-video flex items-center justify-center">
                <span className="text-gray-500 text-sm sm:text-base">App Demo Video</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Ready to get started?</h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-5 sm:mb-6">
            Join thousands of users breaking communication barriers every day.
          </p>
          <a href="/connect">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-bold">
            Start Communication
          </Button>
          </a>
        </motion.div>
      </main>

      <footer className="bg-gray-100 mt-12 sm:mt-16">
        <div className="container mx-auto px-4 py-6 sm:py-8">
          <div className="md:flex justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="text-lg sm:text-xl font-bold text-blue-600 mb-2">SignConnect</div>
              <p className="text-gray-600 text-sm sm:text-base">Breaking barriers, building bridges</p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end space-x-2 sm:space-x-4">
              <Button variant="ghost" className="text-sm">Privacy Policy</Button>
              <Button variant="ghost" className="text-sm">Terms of Service</Button>
              <Button variant="ghost" className="text-sm">Contact Us</Button>
            </div>
          </div>
          <div className="mt-6 sm:mt-8 text-center text-gray-600 text-xs sm:text-sm">
            © 2024 SignConnect. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

const ListItem = ({ className, title, children, ...props }) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${className}`}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
}

