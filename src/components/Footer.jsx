import React from 'react';

export default function Footer() {
    return (
        <footer className="bg-dark-950 border-t border-ui-border pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-1">
                        <a href="#hero" className="text-2xl font-heading font-bold gradient-text block mb-4">
                            LEADS ORBIT
                        </a>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Empowering businesses with futuristic digital solutions. We build the technology of tomorrow, today.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-4">Services</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-primary-400 transition-colors">Business Growth</a></li>
                            <li><a href="#" className="hover:text-primary-400 transition-colors">Automation</a></li>
                            <li><a href="#" className="hover:text-primary-400 transition-colors">Web Development</a></li>
                            <li><a href="#" className="hover:text-primary-400 transition-colors">Digital Marketing</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-4">Company</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-primary-400 transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-primary-400 transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-primary-400 transition-colors">Blog</a></li>
                            <li><a href="#" className="hover:text-primary-400 transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-4">Connect</h4>
                        <div className="flex space-x-4">
                            {['twitter', 'linkedin', 'instagram', 'github'].map((social) => (
                                <a
                                    key={social}
                                    href={`#${social}`}
                                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary-500 hover:text-white transition-all duration-300"
                                >
                                    <span className="capitalize">{social[0]}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Leads Orbit. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
